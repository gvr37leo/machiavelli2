/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="node_modules/utilsx/utils.ts" />
/// <reference path="./src/models.ts" />
/// <reference path="./src/eventqueue.ts" />
/// <reference path="./src/gamelogic.ts" />
/// <reference path="./src/utils.ts" />





var manager = new GameManager()

manager.setupListeners()

manager.start()



