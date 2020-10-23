
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

            this.pickFlatOptions(1,1,['money','cards'],([money,cards]) => {
                if(money){
                    playerOfCurrentRole.money += 2
                }else if(cards){
                    var mulligancards = this.game.deck.splice(0,2)
                    this.pickCards(1,1,mulligancards,(chosenoptions) => {
                        
                    })
                }
            })
            

            //earn money
            //or
            //pick 1 of 2 cards
            //build 1 card

            

            if(role.name == 'moordenaar'){
                var possibleroles = []//roles after moordenaar
                this.pickRole(possibleroles,(roleid) => {
                    this.game.murderedRole = roleid
                })
                
            }else if(role.name == 'dief'){
                var possibleroles = []//roles after dief
                this.pickRole(possibleroles,(roleid) => {
                    this.game.burgledRole = roleid
                })
            }else if(role.name == 'magier'){
                this.pickFlatOptions(1,1,['swapplayer','swapdeck'],([swapplayer,swapdeck]) => {
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

    pickCards(min,max,cardids:number[],cb:(data:boolean[]) => void){
        var cards = cardids.map(cid => findbyid(this.game.cards,cid))
        return this.pickLowLevel(min,max,[],cb)
    }

    pickRole(roleids,cb:(roleid:number) => void){
        this.pickLowLevelFromArray(1,1,roleids,(id) => null,(filoptions) => {
            cb(filoptions[0])
        })
    }
    
    pickRoles(min,max,roleids:number[],cb:(data:boolean[]) => void){
        var role = roleids.map(rid => findbyid(this.game.roles,rid))
        return this.pickLowLevel(min,max,[],cb)
    }

    pickPlayer(playerids,cb:(playerid:number) => void){
        this.pickLowLevelFromArray(1,1,playerids,(id) => null,(filoptions) => {
            cb(filoptions[0])
        })
    }
    
    pickPlayers(min,max,playerids:number[],cb:(data:boolean[]) => void){
        var role = playerids.map(pid => findbyid(this.game.players,pid))
        return this.pickLowLevel(min,max,[],cb)
    }
    
    pickFlatOptions(min,max,options:string[],cb:(data:boolean[]) => void){
    
        return this.pickLowLevel(min,max,[],cb)
    }

    pickLowLevelFromArray(min,max,ids:number[],id2option:(id:number) => SelectOption,cb:(filtoptions:number[]) => void){
        this.pickLowLevel(min,max,ids.map(id => id2option(id)),(chosenoptions) => {
            var res = []
            chosenoptions.forEach((v,i) => {
                if(v == true){
                    res.push(ids[i])
                }
            })
            cb(res)
        })
    }
    
    
    pickLowLevel(min,max,options:SelectOption[],cb:(data:boolean[]) => void){
        var id = 10
        this.listen2MulliganIdOnce(10,cb)
        return 10
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
    html:HTMLElement
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