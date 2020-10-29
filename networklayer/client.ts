class Client{

    onReceived = new EventSystem()

    constructor(public wire:Wire){
        
        let gameview = new GameView(manager.game)
        gameview.board.loadDashboard(playerStore.list()[0])

        manager.outputEvents.listen((e) => {
            if(e.val.type == 'mulligan'){
                gameview.mulliganview.display(e.val.data)
            }
        
            if(e.val.type == 'dataupdate'){
                gameview.updateView()
            }
        })
    }

    send(event,data){
        
    }

    getDataBase(){
        
    }

}