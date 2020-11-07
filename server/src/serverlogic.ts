import ws from 'ws'
import { createPlayer, genDB } from './dbgen'
import { EventSystem } from './eventqueue'
import { GameDB } from './gameDB'
import { GameManager } from './gamelogic'
import { Game, Player } from './models'
import { Store } from './store'


class ClientRegistration{
    id:number
    playerid:number

    constructor(
        public socket,
    ){

    }
}

export class Server{

    onReceived = new EventSystem<any>()
    wss: any
    gamemanager: GameManager
    clientStore = new Store<ClientRegistration>()

    constructor(){
        this.wss = new ws.Server({port:8080})
        this.wss.on('connection',(ws) => {
            let client = new ClientRegistration(ws)
            this.clientStore.add(client)
            var player = createPlayer('random name')
            this.gamemanager.gamedb.playerStore.add(player)
            client.playerid = player.id
            this.gamemanager.updateClients()
            //add player to game

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
        gamedb.game = new Game()
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
            this.gamemanager.eventQueue.addAndTrigger(e.val.type,e.val.data)
        })

    }

    sendAll(event,data){
        this.wss.clients.forEach((client) => {
            if (client.readyState === ws.OPEN) {
                client.send(JSON.stringify({event,data}));
              }
        })
    }

    send(event,client,data){
        
    }

}