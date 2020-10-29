class Server{

    onReceived = new EventSystem()

    constructor(public wire:Wire){
        let {playerStore,roleStore,cardStore} = genDB()
        
        let manager = new GameManager()
        manager.setupListeners()
        manager.start()

        mulliganview.onMulliganConfirmed.listen(e => {
            var mulligandata = {
                mulliganid:e.val.mulliganid,
                chosenoptions:e.val.chosenoptions,
            }
            manager.eventQueue.addAndTrigger('mulliganconfirmed',mulligandata)
        })
    }

    sendAll(event,data){

    }

    send(event,client,data){
        
    }

}