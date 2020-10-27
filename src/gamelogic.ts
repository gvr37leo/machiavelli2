
//condotierre
//select player
//select building

//startofgame/moordenaar/dief
//select role

//magier select between 2 options


//start of round
//select cards to buy
class GameEvent{
    type:string
    data:any
}


class GameManager{

    eventQueue = new EventQueue()
    game = new Game()
    outputEvents = new EventSystem<GameEvent>()

    constructor(){

    }

    setupListeners(){


        this.eventQueue.listen('gamestart',(data) => {
            this.game.deck = cardStore.list().map(c => c.id)
            shuffle(this.game.deck)

            for(var role of roleStore.list()){
                role.player = null
            }

            
            for(let player of playerStore.list()){
                player.money += 2
                player.hand.push(...this.game.deck.splice(0,2))
            }
            this.game.crownwearer = 0
            this.game.burgledRole = null
            this.game.murderedRole = null
            this.eventQueue.add('roundstart',{})
            //4 gebouwkaarten
            //2 goud
        })

        this.eventQueue.listen('roundstart',(data) => {
            var charttable = {
                2:0,
                3:0,
                4:2,
                5:1,
                6:0,
                7:0,
            }
            var players = playerStore.list()
            this.game.rolestopick = roleStore.list().map(r => r.id)
            // shuffle(this.game.rolestopick)
            // var ontable = this.game.rolestopick.splice(0,charttable[players.length])
            // var down = this.game.rolestopick.splice(0,1)

            this.eventQueue.add('rolepick',{
                player:0,
            })
        })

        this.eventQueue.listen('rolepick',(data) => {
            // data.player

            this.pickOne(this.game.rolestopick,'role',(pickedroleid,unpicked) => {
                var role = roleStore.get(pickedroleid)
                role.player = data.player
                this.game.rolestopick = unpicked
                var nextplayer = data.player + 1

                if(nextplayer == playerStore.list().length){//todo dit moet niet hardcoded
                    this.setRoleTurn(0)
                }else{
                    this.eventQueue.add('rolepick',{
                        player:nextplayer,
                    })
                }
            })
        })

        this.eventQueue.listen('roleturn',(data) => {
            // data.roleid

            

            let role = roleStore.get(data.role)
            if(role.player == null || this.game.murderedRole == data.role){
                this.incrementRoleTurn()
            }else{
                

                let playerOfCurrentRole = playerStore.get(role.player)
                playerOfCurrentRole.buildactions = 1
                if(this.game.burgledRole != null && this.game.burgledRole == data.role){
                    let thiefrole = roleStore.list().find(r => r.name == 'thief')
                    let burgledrole = roleStore.get(this.game.burgledRole)
                    let thiefplayer = playerStore.get(thiefrole.player)
                    let burgledplayer = playerStore.get(burgledrole.player)
                    thiefplayer.money += burgledplayer.money
                    burgledplayer.money = 0
                    //transfer the money from the burgledrole player to the thiefrole player
                }
    
                this.updateClients()
                this.pickOne(['money','cards'],'text',(pick) => {
                    if(pick == 'money'){
                        playerOfCurrentRole.money += 2
                        // roleturn is increased via pass button
                        this.updateClients()
                    }else if(pick == 'cards'){
                        let mulligancards = this.game.deck.splice(0,2)
                        this.pickOne(mulligancards,'card',(cardid,unpicked) => {
                            playerOfCurrentRole.hand.push(cardid)
                            this.game.discardPile.push(...unpicked)
                            this.updateClients()
                        })
                    }
                })
            }
        })

        this.eventQueue.listen('specialability',(data) => {
            var role = roleStore.get(this.game.roleturn)
            var playerOfCurrentRole = playerStore.get(role.player)


            //role specific stuff
            if(role.name == 'moordenaar'){
                let possibleroles = roleStore.list().slice(1,8).map(r => r.id)//roles after moordenaar
                this.pickOne(possibleroles,'role',(roleid) => {
                    this.game.murderedRole = roleid
                })
                
            }else if(role.name == 'dief'){
                let possibleroles = roleStore.list().slice(2,8).map(r => r.id)//roles after dief
                this.pickOne(possibleroles,'role',(roleid) => {
                    this.game.burgledRole = roleid
                })
            }else if(role.name == 'magier'){
                this.pickOne(['swapplayer','swapdeck'],'text',(a,b,[swapplayer,swapdeck]) => {
                    if(swapplayer){
                        let possibleplayers = playerStore.list().filter(p => p.id != playerOfCurrentRole.id).map(r => r.id)//everyone except self
                        this.pickOne(possibleplayers,'player',(playerid) => {
                            let player = playerStore.get(playerid)
                            let temp = player.hand
                            player.hand = playerOfCurrentRole.hand
                            playerOfCurrentRole.hand = temp
                        })
                    }else if(swapdeck){
                        this.pickMultiple(0,10,playerOfCurrentRole.hand,'card',(chosen,unchosen) => {
                            playerOfCurrentRole.hand = unchosen
                            playerOfCurrentRole.hand.push(...this.game.deck.splice(0,chosen.length))
                            this.game.discardPile.push(...chosen)
                        })
                    }
                    
                })
            }else if(role.name == 'koning'){
                this.game.crownwearer = playerOfCurrentRole.id
                this.processTaxes(role.id)
            }else if(role.name == 'prediker'){
                this.processTaxes(role.id)
            }else if(role.name == 'koopman'){
                playerOfCurrentRole.money++
                this.processTaxes(role.id)
            }else if(role.name == 'bouwmeester'){
                playerOfCurrentRole.hand.push(...this.game.deck.splice(0,2))
                playerOfCurrentRole.buildactions = 3
            }else if(role.name == 'condotierre'){
                this.processTaxes(role.id)


                let possibleplayers = playerStore.list().map(p => p.id)
                var predikerplayer = roleStore.list().find(r => r.name == 'prediker').player
                removeval(possibleplayers,predikerplayer)
                

                this.pickOne(possibleplayers,'player',(playerid) => {
                    let targetedPlayer = playerStore.get(playerid)
                    this.pickOne(targetedPlayer.buildings,'card',(buildingid,unchosen) => {
                        let building = cardStore.get(buildingid)
                        playerOfCurrentRole.money -= building.cost - 1
                        targetedPlayer.buildings = unchosen
                    })
                })
            }
        })

        this.eventQueue.listen('build',(data) => {
            // data.playerid
            // data.cardid
            this.payForCard(data.playerid,data.cardid)
            
            
        })

        this.eventQueue.listen('pass',(data) => {
            this.incrementRoleTurn()
            
        })


        // this.eventQueue.listen('mulliganconfirmed',(data) => {
        //     data.mulliganid
        //     // data.player
        //     // data.chosenoptions
        // })

        
    }

    updateClients(){
        this.outputEvents.trigger({
            type:'dataupdate',
            data:{},
        })
    }

    getActivePlayer(){
        var role = roleStore.get(this.game.roleturn)
        var player = playerStore.get(role.player)
        return player
    }

    calculatePlayerScores(){
        for(var player of playerStore.list()){
            var buildings = player.buildings.map(cid => cardStore.get(cid))
            var buildingscore = buildings.reduce((p,c) => p + c.points,0)
            var finishscore = 0
            if(buildings.length >= 8){
                if(this.game.firstFinishedPlayer == player.id){
                    finishscore = 4
                }else{
                    finishscore = 2
                }
            }
            

            var uniqueresults = [
                buildings.findIndex((b) => b.role == 0),
                buildings.findIndex((b) => b.role == 1),
                buildings.findIndex((b) => b.role == 2),
                buildings.findIndex((b) => b.role == 3),
                buildings.findIndex((b) => b.isAnyRole),
            ]

            var uniqueitems = count(uniqueresults,(res) => res >= 0)
            var combiscore = uniqueitems >= 5 ? 3 : 0 

            var score = buildingscore + finishscore + combiscore
            player.score = score
        }
    }

    isGameOver():boolean{
        for(var player of playerStore.list()){
            var buildings = player.buildings.map(cid => cardStore.get(cid))
            if(buildings.length >= 8){
                return true
            }
        }
        return false
    }

    start(){
        this.eventQueue.addAndTrigger('gamestart',{})
    }

    private payForCard(playerid:number,cardid:number){
        let player = playerStore.get(playerid)
        let card = cardStore.get(cardid)
        
        if(card.cost <= player.money && player.buildactions > 0){
            removeval(player.hand,cardid)
            player.buildactions--
            player.buildings.push(cardid)
            player.money -= card.cost
        }
    }

    setRoleTurn(roleid){
        this.game.roleturn = roleid
        this.eventQueue.add('roleturn',{role:roleid})
    }

    incrementRoleTurn(){

        this.game.roleturn++
        if(this.game.roleturn >= roleStore.list().length){
            if(this.isGameOver()){
                this.calculatePlayerScores()
                
                var sortedplayers = playerStore.list().sort((a,b) => a.score - b.score)
                var winner = last(sortedplayers)
                console.log(winner);
            }else{
                this.eventQueue.add('roundstart',{})
            }
        }else{
            this.eventQueue.add('roleturn',{role:this.game.roleturn})
        }
    }

    pickOne(values:any[],type:string,cb:(pick:any,unpicked:any[],flags:boolean[]) => void){
        this.pickMultiple(1,1,values,type,(chosen,unchosen,flags) => {
            cb(chosen[0],unchosen,flags)
        })
    }

    pickMultiple(min,max,values:any[],type:string,cb:(chosen:any[],unchosen:any[],flags:boolean[]) => void){
        this.pickLowLevel(min,max,values.map((v,i) => {return {type:type,value:v}}),(flags) => {
            let result = this.convert(values,flags)
            cb(result.picked,result.unpicked,flags)
        })
    }
    
    mulliganidcounter = 0
    pickLowLevel(min,max,options:SelectOption[],cb:(data:boolean[]) => void){
        let id = this.mulliganidcounter++
        this.listen2MulliganIdOnce(id,cb)
        this.outputEvents.trigger({type:'mulligan',data:{
            id,
            min,
            max,
            options,
        }})
        //store muliggan event with the options attached to it
        // when someone confirms the mulligan event send this {id,[]chosenoptions}
        
    }

    convert<T>(values:T[],flags:boolean[]){
        let picked:T[] = []
        let unpicked:T[] = []
        for(let i = 0; i < flags.length;i++){
            if(flags[i]){
                picked.push(values[i])
            }else{
                unpicked.push(values[i])
            }
        }

        return {
            picked,
            unpicked,
        }
    }

    listen2MulliganIdOnce(mulliganid,cb){
        let listenid = this.eventQueue.listen('mulliganconfirmed',(event) => {
            if(event.mulliganid == mulliganid){
                this.eventQueue.unlisten(listenid)
                cb(event.chosenoptions)
            }
        })
    }

    processTaxes(roleid){
        let role = roleStore.get(roleid)
        let player = playerStore.get(role.player)
        let buildings = player.buildings.map(bid => cardStore.get(bid))
        let samecoloredbuildings = buildings.filter(b => b.role == roleid)
        player.money += samecoloredbuildings.length
    }
}

class SelectOption{
    type:string
    value:any
}

//phases
//select roles
//put 0..2 cards open(king gets replaced)

//play roles
//repeat till someone has 8 buildings

//actions/events
//build card
//pass
//murder
//steal
//destroy
//special ability

//beurt
//karaktereigenschap gebruiken
//2 goud of select 1/2 cards
//1 kaart bouwen

//moordenaar vermoord een karakter
//dief besteel een karakter
//magier ruil kaarten met een speler of ruil een aantal kaarten met het dek
//koning krijgt kroon en goudstuk voor gele kaarten
//prediker gebouwen veilig en en 1 goudstuk voor elk vlauw gebouw
//koopman 1 goudstuk plus 1 goudstuk voor elk groen gebauw
//bouwmeester trek 2 kaarten, max 3 kaarten bouwen
//conotierre krijgt geld van rode gebouwen en kan gebouwen voor kosten -1 verwoesten