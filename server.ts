var express = require('express')
var app = express()

app.use(express.static('./'))

app.listen(8000, () => {
    console.log('listening')
})











class ClientRegistration{
    id:number
    playerid:number

    constructor(
        public socket,
    ){

    }
}

class Server{

    onReceived = new EventSystem<any>()
    wss: any
    gamemanager: GameManager
    clientStore:Store<ClientRegistration>

    constructor(public wire:Wire){
        this.wss = new WSServer({port:8080})
        this.wss.on('connection',(ws) => {
            let client = new ClientRegistration(ws)
            this.clientStore.add(client)
            var player = new Player()
            this.gamemanager.gamedb.playerStore.add(player)
            client.playerid = player.id
            //add player to game

            ws.send('join',{clientid:client.id})

            ws.on('message',(message) => {
                this.onReceived.trigger(JSON.parse(message))
            })

            ws.on('close', () => {
                this.gamemanager.gamedb.playerStore.remove(client.playerid)
                this.clientStore.remove(client.id)
            })
        })

        let {playerStore,roleStore,cardStore} = genDB()
        var gamedb = new GameDB()
        gamedb.cards = cardStore.list()
        gamedb.cardStore = cardStore
        gamedb.players = playerStore.list()
        gamedb.playerStore = playerStore
        gamedb.roles = roleStore.list()
        gamedb.roleStore = roleStore
        this.gamemanager = new GameManager(gamedb)
        this.gamemanager.setupListeners()
        this.gamemanager.start()
        this.gamemanager.outputEvents.listen(e => {
            this.sendAll(e.val.type,e.val.data)
        })

        this.onReceived.listen(e => {
            if(e.val.type == 'mulliganconfirmed'){
                var mulligandata = {
                    mulliganid:e.val.mulliganid,
                    chosenoptions:e.val.chosenoptions,
                }
                this.gamemanager.eventQueue.addAndTrigger('mulliganconfirmed',mulligandata)
            }
        })

    }

    sendAll(event,data){
        this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send({event,data});
              }
        })
    }

    send(event,client,data){
        
    }

}