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
/// <reference path="./views/carddisplayview.ts" />
/// <reference path="./views/modal.ts" />



let {playerStore,roleStore,cardStore} = genDB()


let manager = new GameManager()
let mulliganview = new MulliganView()
let gameview = new GameView(manager.game)
gameview.board.loadDashboard(playerStore.list()[0])


mulliganview.onMulliganConfirmed.listen(e => {
    var mulligandata = {
        mulliganid:e.val.mulliganid,
        chosenoptions:e.val.chosenoptions,
    }
    console.log(mulligandata,JSON.stringify(mulligandata))
    manager.eventQueue.addAndTrigger('mulliganconfirmed',mulligandata)
})

manager.outputEvents.listen((e) => {
    if(e.val.type == 'mulligan'){
        mulliganview.display(e.val.data)
    }
})

manager.setupListeners()
manager.start()
manager.eventQueue.addAndTrigger('mulliganconfirmed',{mulliganid:0,chosenoptions:[true,false,false,false,false]})
manager.eventQueue.addAndTrigger('mulliganconfirmed',{mulliganid:1,chosenoptions:[true,false,false,false]})
manager.eventQueue.addAndTrigger('mulliganconfirmed',{mulliganid:2,chosenoptions:[true,false,false]})
manager.eventQueue.addAndTrigger('mulliganconfirmed',{mulliganid:3,chosenoptions:[true,false]})
manager.eventQueue.addAndTrigger('mulliganconfirmed',{"mulliganid":4,"chosenoptions":[false,true]})
// manager.eventQueue.addAndTrigger('mulliganconfirmed',{"mulliganid":5,"chosenoptions":[true,false]})




//2 gold
//2 cards
//crownwearer set
//player 0 rolepick

document.body.appendChild(gameview.root)




