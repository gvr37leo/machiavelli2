class Client{

    onReceived = new EventSystem<any>()
    socket: WebSocket;
    gameview: GameView;
    clientid:number

    constructor(){
        this.socket = new WebSocket('ws://localhost:8000');
        this.socket.addEventListener('message',(e) => {
            this.onReceived.trigger(e.data)
        })

        var db = this.getDataBase()
        this.gameview = new GameView(db)
        this.gameview.board.loadDashboard(db.players[0])
        this.onReceived.listen((e) => {
            if(e.val.type == 'mulligan'){
                this.gameview.mulliganview.display(e.val.data)
            }
        
            if(e.val.type == 'dataupdate'){
                this.gameview.updateView()
            }
        })

        this.gameview.outputEvents.listen(e => {
            this.send(e.val.type,e.val.data)
        })
    }

    join(){

    }

    send(event,data){
        this.socket.send(JSON.stringify({type:event,data:data}))
    }

    getDataBase():GameDB{
        var db = this.convertDB(null)
        return db
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