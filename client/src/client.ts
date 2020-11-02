class Client{

    onReceived = new EventSystem<any>()
    socket: WebSocket;
    gameview: GameView;
    clientid:number

    constructor(){
        this.socket = new WebSocket('ws://localhost:8080');
        this.socket.addEventListener('message',(e) => {
            this.onReceived.trigger(e.data)
        })

        // var db = this.getDataBase()
        
        this.onReceived.listen((e) => {
            if(e.val.type == 'mulligan'){
                this.gameview.mulliganview.display(e.val.data)
            }
        
            if(e.val.type == 'dataupdate'){
                var db = this.convertDB(e.val.data)
                this.gameview = new GameView()
                this.gameview.board.loadDashboard(db.players[0])
                
            }
        })

        // this.gameview.outputEvents.listen(e => {
        //     this.send(e.val.type,e.val.data)
        // })
    }


    send(event,data){
        this.socket.send(JSON.stringify({type:event,data:data}))
    }

    
    
    convertDB(gamedb:GameDB){
        gamedb.cardStore = new Store()
        gamedb.cardStore.set(gamedb.cards)
        gamedb.playerStore = new Store()
        gamedb.playerStore.set(gamedb.players)
        gamedb.roleStore = new Store()
        gamedb.roleStore.set(gamedb.roles)
        return gamedb
    }
}