/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="node_modules/utilsx/utils.ts" />
/// <reference path="node_modules/eventsystemx/EventSystem.ts" />

/// <reference path="./src/models.ts" />
/// <reference path="./src/eventqueue.ts" />
/// <reference path="./src/gamelogic.ts" />
/// <reference path="./src/utils.ts" />
/// <reference path="./src/mulliganView.ts" />
/// <reference path="./src/store.ts" />
/// <reference path="./src/dbgen.ts" />
/// <reference path="./views/boardview.ts" />
/// <reference path="./views/cardview.ts" />
/// <reference path="./views/roleview.ts" />
/// <reference path="./views/gameview.ts" />
/// <reference path="./views/playerview.ts" />



let {playerStore,roleStore,cardStore} = genDB()


let manager = new GameManager()
let mulliganview = new MulliganView()
let gameview = new GameView(manager.game)

mulliganview.onMulliganConfirmed.listen(e => {
    manager.eventQueue.addAndTrigger('mulliganconfirmed',{
        id:e.val.id,
        chosen:e.val.chosen,
    })
})

manager.outputEvents.listen((e) => {
    if(e.val.type == 'mulligan'){
        mulliganview.display(e.val.data)
    }
})

manager.setupListeners()
manager.start()

document.body.appendChild(gameview.root)




