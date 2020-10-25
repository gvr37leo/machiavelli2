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
        this.board.showhand.addEventListener('click',() => {
            this.carddisplay.displayCards(this.board.loadedPlayer.hand)
            this.modal.setAndShow(this.carddisplay.root)
        })

        this.board.showboard.addEventListener('click',() => {
            this.carddisplay.displayCards(this.board.loadedPlayer.buildings)
            this.modal.setAndShow(this.carddisplay.root)
        })

        for(let player of playerStore.list()){
            let playerview = new PlayerView()
            playerview.set(player)
            this.board.playerlist.appendChild(playerview.root)
            playerview.root.addEventListener('click',() => {
                this.board.loadDashboard(player)
            })
        }

        for(let role of roleStore.list()){
            let roleview = new RoleView()
            roleview.set(role)
            this.board.rolelist.appendChild(roleview.root)
        }
    }

}