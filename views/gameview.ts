class GameView{
    root: HTMLElement
    board: BoardView
    playerviews:PlayerView[] = []
    roleviews:RoleView[] = []
    carddisplay: CardDisplayView
    modal: Modal

    constructor(game:Game){
        this.modal = new Modal()
        document.body.appendChild(this.modal.rootelement)

        this.carddisplay = new CardDisplayView()
        

        this.board = new BoardView()
        this.root = this.board.root

        this.carddisplay.onCardPlayed.listen((e) => {
            manager.eventQueue.addAndTrigger('build',{
                playerid:manager.getActivePlayer().id,
                cardid:e.val,
            })
            this.modal.hide()
        })

        this.board.showhand.addEventListener('click',() => {
            //make it so you can play the cards from this list
            this.carddisplay.loadCards(this.board.loadedPlayer.hand)
            this.modal.setAndShow(this.carddisplay.root)
        })

        this.board.specialability.addEventListener('click',() => {
            manager.eventQueue.addAndTrigger('specialability',{})
        })

        this.board.passbutton.addEventListener('click',() => {
            manager.eventQueue.addAndTrigger('pass',{})
        })

        for(let player of playerStore.list()){
            let playerview = new PlayerView()
            this.playerviews.push(playerview)
            playerview.set(player)
            this.board.playerlist.appendChild(playerview.root)
            playerview.root.addEventListener('click',() => {
                this.board.loadDashboard(player)
            })
        }

        for(let role of roleStore.list()){
            let roleview = new RoleView()
            this.roleviews.push(roleview)
            roleview.set(role)
            this.board.rolelist.appendChild(roleview.root)
        }
    }

    updateView(){
        this.board.loadDashboard(manager.getActivePlayer())

        for(var player of this.playerviews){
            player.setCrownWearer(player.player.id == manager.game.crownwearer)
            player.setHighlight(player.player.id == manager.getActivePlayer().id)
        }

        for(var role of this.roleviews){
            role.setHighlight(role.role.id == manager.game.roleturn)
        }
    }
}