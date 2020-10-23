
//condotierre
//select player
//select building

//startofgame/moordenaar/dief
//select role

//magier select between 2 options


//start of round
//select cards to buy

class GameManager{

    eventQueue = new EventQueue()
    game = new Game()

    constructor(){

    }

    setupListeners(){

        this.eventQueue.listen('gamestart',(data) => {
            for(var player of this.game.players){
                player.money += 2
                player.hand.push(...this.game.deck.splice(0,2))
            }
            this.game.crownwearer = 0
            this.eventQueue.add('roundstart',{})
            //4 gebouwkaarten
            //2 goud
        })

        this.eventQueue.listen('roundstart',(data) => {
            //
        })

        this.eventQueue.listen('roleturn',(data) => {
            // data.roleid
            var role = this.getRole(data.roleid)
            var playerOfCurrentRole = this.getPlayer(role.player)
            if(this.game.burgledRole == data.roleid){
                var thiefrole = this.game.roles.find(r => r.name == 'thief')
                var burgledrole = this.getRole(this.game.burgledRole)
                var thiefplayer = this.getPlayer(thiefrole.player)
                var burgledplayer = this.getPlayer(burgledrole.player)
                thiefplayer.money += burgledplayer.money
                burgledplayer.money = 0
                //transfer the money from the burgledrole player to the thiefrole player
            }

            this.pickOne(['money','cards'],'text',(pick) => {
                if(pick == 'money'){
                    playerOfCurrentRole.money += 2
                }else if(pick == 'cards'){
                    var mulligancards = this.game.deck.splice(0,2)
                    this.pickOne(mulligancards,'card',(cardid,unpicked) => {
                        playerOfCurrentRole.hand.push(cardid)
                        this.game.discardPile.push(...unpicked)
                    })
                }
            })

            if(role.name == 'moordenaar'){
                var possibleroles = []//roles after moordenaar
                this.pickOne(possibleroles,'role',(roleid) => {
                    this.game.murderedRole = roleid
                })
                
            }else if(role.name == 'dief'){
                var possibleroles = []//roles after dief
                this.pickOne(possibleroles,'role',(roleid) => {
                    this.game.burgledRole = roleid
                })
            }else if(role.name == 'magier'){
                this.pickOne(['swapplayer','swapdeck'],'text',([swapplayer,swapdeck]) => {
                    if(swapplayer){
                        var possibleplayers = []
                        this.pickPlayer(possibleplayers,(playerid) => {
                            var player = this.getPlayer(playerid)
                            var temp = player.hand
                            player.hand = playerOfCurrentRole.hand
                            playerOfCurrentRole.hand = temp
                        })
                    }else if(swapdeck){
                        this.pickCards(0,10,[],(chosenoptions) => {

                        })
                    }
                    
                })
            }else if(role.name == 'koning'){
                this.processTaxes(role.id)
            }else if(role.name == 'prediker'){
                this.processTaxes(role.id)
            }else if(role.name == 'koopman'){
                this.processTaxes(role.id)
            }else if(role.name == 'bouwmeester'){
                
            }else if(role.name == 'condotierre'){
                this.processTaxes(role.id)

                this.pickPlayers(1,1,this.game.players.map(p => p.id),(chosenoptions) => {
                    var player = this.game.players[chosenoptions.findIndex(o => o)]
                    this.pickCards(1,1,player.buildings,() => {

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
            data.playerid
        })

        this.eventQueue.listen('murder',(data) => {
            data.roleid

        })

        this.eventQueue.listen('steal',(data) => {
            data.role
        })

        this.eventQueue.listen('destroy',(data) => {
            data.player
            data.card
        })

        this.eventQueue.listen('mulliganConfirmed',(data) => {
            data.mulliganid
            // data.player
            // data.chosenoptions
        })

        
    }

    start(){
        this.eventQueue.addAndTrigger('gamestart',{})
    }

    private payForCard(playerid:number,cardid:number){
        var player = findbyid(this.game.players,playerid)
        var cardid = removebyid(player.hand,cardid)
        var card = findbyid(this.game.cards,cardid) 
        if(card.cost <= player.money){
            player.buildings.push(card.id)
            player.money -= card.cost
        }
    }

    

    pickOne(values:any[],type:string,cb:(pick:any,unpicked:any[],flags:boolean[]) => void){
        this.pickMultiple(1,1,values,type,(chosen,unchosen,flags) => {
            cb(chosen[0],unchosen,flags)
        })
    }

    pickMultiple(min,max,values:any[],type:string,cb:(chosen:any[],unchosen:any[],flags:boolean[]) => void){
        this.pickLowLevel(min,max,values.map((v,i) => {return {type:type,value:v}}),(flags) => {
            var result = this.convert(values,flags)
            cb(result.picked,result.unpicked,flags)
        })
    }
    
    pickLowLevel(min,max,options:SelectOption[],cb:(data:boolean[]) => void){
        var id = Math.random()

        this.listen2MulliganIdOnce(id,cb)
        
    }

    convert<T>(values:T[],flags:boolean[]){
        var picked:T[] = []
        var unpicked:T[] = []
        for(var i = 0; i < flags.length;i++){
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
        var listenid = this.eventQueue.listen('mulliganconfirmed',(data) => {
            if(data.mulliganid == mulliganid){
                this.eventQueue.unlisten(listenid)
                cb(data)
            }
        })
    }

    processTaxes(roleid){
        var role = findbyid(this.game.roles,roleid)
        var player = findbyid(this.game.players,role.player)
        var buildings = player.buildings.map(bid => findbyid(this.game.cards,bid))
        buildings.filter(b => b.role)
    }

    getRole(id){
        return findbyid(this.game.roles,id)
    }

    getPlayer(id){
        return findbyid(this.game.players,id)
    }

    getCard(id){
        return findbyid(this.game.cards,id)
    }
}



class SelectView{

}

class SelectOption{
    type:String
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