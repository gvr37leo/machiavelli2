class Client{

    onReceived = new EventSystem<any>()
    socket: WebSocket;
    gameview: GameView;
    clientid:number

    constructor(){
        this.gameview = new GameView()
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
                this.gameview.renderDatabase(db)
                this.gameview.loadDB(db)

                var gamecontainer = document.querySelector('#gamecontainer')
                gamecontainer.innerHTML = ''
                gamecontainer.appendChild(this.gameview.root)
                
            }
        })

        this.gameview.outputEvents.listen(e => {
            this.send(e.val.type,e.val.data)
        })
    }

    start(){
        this.send('gamestart',{})
    }


    send(event,data){
        this.socket.send(JSON.stringify({type:event,data:data}))
    }

    
    
    convertDB(gamedb:GameDB){
        gamedb.cardStore = new Store()
        gamedb.cardStore.hardset(gamedb.cards)
        gamedb.playerStore = new Store()
        gamedb.playerStore.hardset(gamedb.players)
        gamedb.roleStore = new Store()
        gamedb.roleStore.hardset(gamedb.roles)
        return gamedb
    }
}