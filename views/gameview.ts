class GameView{
    root: HTMLElement


    constructor(game:Game){

        

        var board = new BoardView()
        this.root = board.root

        for(var player of playerStore.list()){
            var playerview = new PlayerView()
            playerview.set(player)
            board.playerlist.appendChild(playerview.root)
        }

        for(var role of roleStore.list()){
            var roleview = new RoleView()
            roleview.set(role)
            board.rolelist.appendChild(roleview.root)
        }
    }

}