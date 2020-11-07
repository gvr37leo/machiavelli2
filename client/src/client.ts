class Client{

    onReceived = new EventSystem<any>()
    socket: WebSocket;
    gameview: GameView;
    clientid:number

    constructor(){
        var mulliganview = new MulliganView()
        document.body.appendChild(mulliganview.modal.rootelement)
        mulliganview.modal.hide()
        mulliganview.onMulliganConfirmed.listen(e => {
            this.send('mulliganconfirmed',e.val)
        })
        this.socket = new WebSocket('ws://localhost:8080');
        this.socket.addEventListener('message',(e) => {
            this.onReceived.trigger(JSON.parse(e.data))
        })

        // var db = this.getDataBase()
        
        this.onReceived.listen((e) => {
            if(e.val.event == 'mulligan'){
                mulliganview.display(e.val.data)
            }
        
            if(e.val.event == 'dataupdate'){
                var db = this.convertDB(e.val.data)
                playerStore = db.playerStore
                roleStore = db.roleStore
                cardStore = db.cardStore
                this.gameview = new GameView()
                this.gameview.board.loadDashboard(db.players[0])
                
            }
        })

        // this.gameview.outputEvents.listen(e => {
        //     this.send(e.val.type,e.val.data)
        // })
    }

    start(){
        this.send('gamestart',{})
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