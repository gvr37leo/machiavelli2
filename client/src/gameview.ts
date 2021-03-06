class GameEvent{
    type:string
    data:any
}

class GameView{
    root: HTMLElement
    board: BoardView
    playerviews:PlayerView[] = []
    roleviews:RoleView[] = []
    carddisplay: CardDisplayView
    modal: Modal
    mulliganview: MulliganView
    outputEvents = new EventSystem<GameEvent>()
    gamedb:GameDB

    constructor(){





    }

    renderDatabase(gamedb:GameDB){
        this.gamedb = gamedb
        this.mulliganview = new MulliganView()
        this.modal = new Modal()
        document.body.appendChild(this.modal.rootelement)

        this.carddisplay = new CardDisplayView()
        

        this.board = new BoardView()
        this.root = this.board.root

        for(let player of this.gamedb.playerStore.list()){
            let playerview = new PlayerView()
            this.playerviews.push(playerview)
            playerview.set(player)
            this.board.playerlist.appendChild(playerview.root)
            playerview.root.addEventListener('click',() => {
                this.board.loadDashboard(player)
            })
        }

        for(let role of this.gamedb.roleStore.list()){
            let roleview = new RoleView()
            this.roleviews.push(roleview)
            roleview.set(role)
            this.board.rolelist.appendChild(roleview.root)
        }

        this.carddisplay.onCardPlayed.listen((e) => {
            this.outputGameEvent('build',{
                playerid:determineActivePlayer(this.gamedb).id,
                cardid:e.val,
            })
            this.modal.hide()
        })

        this.board.showhand.addEventListener('click',() => {
            //make it so you can play the cards from this list
            this.carddisplay.loadCards(this.board.loadedPlayer.hand,true)
            this.modal.setAndShow(this.carddisplay.root)
        })

        this.board.specialability.addEventListener('click',() => {
            this.outputGameEvent('specialability',{})
        })

        this.board.passbutton.addEventListener('click',() => {
            this.outputGameEvent('pass',{})
        })
    }

    loadDB(gamedb:GameDB){
        this.gamedb = gamedb
        if(determineActivePlayer(this.gamedb) != null){
            this.board.loadDashboard(determineActivePlayer(this.gamedb))
        }

        for(var playerview of this.playerviews){
            playerview.setCrownWearer(playerview.player.id == this.gamedb.game.crownwearer)
            playerview.setHighlight(playerview.player.id == determineActivePlayer(this.gamedb).id)
        }

        for(var role of this.roleviews){
            role.setHighlight(role.role.id == this.gamedb.game.roleturn)
        }
    }

    outputGameEvent(type,data){
        this.outputEvents.trigger({type,data})
    }
}

function determineActivePlayer(gamedb:GameDB){
    var role = gamedb.roleStore.get(gamedb.game.roleturn)
    var player = gamedb.playerStore.get(role.player)
    return player
    
}
