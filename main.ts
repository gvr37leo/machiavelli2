/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="node_modules/utilsx/utils.ts" />
/// <reference path="node_modules/eventsystemx/EventSystem.ts" />

/// <reference path="./src/models.ts" />
/// <reference path="./src/eventqueue.ts" />
/// <reference path="./src/gamelogic.ts" />
/// <reference path="./src/utils.ts" />
/// <reference path="./views/mulliganView.ts" />
/// <reference path="./src/store.ts" />
/// <reference path="./src/dbgen.ts" />
/// <reference path="./views/boardview.ts" />
/// <reference path="./views/cardview.ts" />
/// <reference path="./views/roleview.ts" />
/// <reference path="./views/gameview.ts" />
/// <reference path="./views/playerview.ts" />
/// <reference path="./views/carddisplayview.ts" />
/// <reference path="./views/modal.ts" />
/// <reference path="./networklayer/client.ts" />
/// <reference path="./networklayer/server.ts" />


let {playerStore,roleStore,cardStore} = genDB()


let manager = new GameManager()
let mulliganview = new MulliganView()
let gameview = new GameView(manager.game)
gameview.board.loadDashboard(playerStore.list()[0])

var mulliganevents = []

mulliganview.onMulliganConfirmed.listen(e => {
    var mulligandata = {
        mulliganid:e.val.mulliganid,
        chosenoptions:e.val.chosenoptions,
    }
    mulliganevents.push(mulligandata)
    manager.eventQueue.addAndTrigger('mulliganconfirmed',mulligandata)
})

function logMulliganData(){
    console.log(JSON.stringify(mulliganevents));
}

manager.outputEvents.listen((e) => {
    if(e.val.type == 'mulligan'){
        mulliganview.display(e.val.data)
    }

    if(e.val.type == 'dataupdate'){
        gameview.updateView()
    }
})



manager.setupListeners()
manager.start()

// mulliganview.confirmchoice([true,false,false,false,false])
// mulliganview.confirmchoice([true,false,false,false])
// mulliganview.confirmchoice([true,false,false])
// mulliganview.confirmchoice([true,false])
// mulliganview.confirmchoice([true,false])





//2 gold
//2 cards
//crownwearer set
//player 0 rolepick

document.body.appendChild(gameview.root)




