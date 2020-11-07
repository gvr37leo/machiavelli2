/// <reference path="../node_modules/vectorx/vector.ts" />
/// <reference path="../node_modules/utilsx/utils.ts" />
/// <reference path="./src/models.ts" />
/// <reference path="./src/eventqueue.ts" />
/// <reference path="./src/mulliganView.ts" />
/// <reference path="./src/store.ts" />
/// <reference path="./src/boardview.ts" />
/// <reference path="./src/cardview.ts" />
/// <reference path="./src/roleview.ts" />
/// <reference path="./src/gameview.ts" />
/// <reference path="./src/playerview.ts" />
/// <reference path="./src/carddisplayview.ts" />
/// <reference path="./src/modal.ts" />
/// <reference path="./src/client.ts" />

/// <reference path="./src/wrapperList.ts" />
/// <reference path="./src/gamedb.ts" />
/// <reference path="../node_modules/eventsystemx/EventSystem.ts" />

var cardStore:Store<Card>
var playerStore:Store<Player>
var roleStore:Store<Role>

var client = new Client()

document.querySelector('#startbutton').addEventListener('click',() => {
    client.start()
})

// document.body.appendChild(client.gameview.root)


// mulliganview.confirmchoice([true,false,false,false,false])
// mulliganview.confirmchoice([true,false,false,false])
// mulliganview.confirmchoice([true,false,false])
// mulliganview.confirmchoice([true,false])
// mulliganview.confirmchoice([true,false])



