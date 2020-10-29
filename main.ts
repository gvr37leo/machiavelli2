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
/// <reference path="./networklayer/wire.ts" />
/// <reference path="./views/wrapperList.ts" />
/// <reference path="./src/gameDB.ts" />




var wire = new Wire()

var server = new Server(wire)

var clients = [
    new Client(wire),
    new Client(wire),
    new Client(wire),
    new Client(wire),
]

document.body.appendChild(gameview.root)













// mulliganview.confirmchoice([true,false,false,false,false])
// mulliganview.confirmchoice([true,false,false,false])
// mulliganview.confirmchoice([true,false,false])
// mulliganview.confirmchoice([true,false])
// mulliganview.confirmchoice([true,false])





//2 gold
//2 cards
//crownwearer set
//player 0 rolepick






