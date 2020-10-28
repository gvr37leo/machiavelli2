
function genDB(){

    let cardStore = new Store<Card>()
    let roleStore = new Store<Role>()
    let playerStore = new Store<Player>()

    

    let moordenaar = createRole('moordenaar','white','/res/moordenaar.png')
    let dief = createRole('dief','white','/res/dief.png')
    let magier = createRole('magier','white','/res/magier.png')
    let koning = createRole('koning','yellow','/res/koning.png')
    let prediker = createRole('prediker','blue','/res/prediker.png')
    let koopman = createRole('koopman','green','/res/koopman.png')
    let bouwmeester = createRole('bouwmeester','white','/res/bouwmeester.png')
    let condotierre = createRole('condotierre','red','/res/condotierre.png')


    let roles:Role[] = [
        moordenaar,
        dief,
        magier,
        koning,
        prediker,
        koopman,
        bouwmeester,
        condotierre,
    ]
    roleStore.set(roles)

    let players:Player[] = [
        createPlayer('paul'),
        createPlayer('wietse'),
        createPlayer('marijn'),
        createPlayer('geke'),
    ]
    playerStore.set(players)

    let cards:Card[] = [
        ...duplicate(createCard(koning.id,3,'jachtslot','/res/jachtslot.png'),5),
        ...duplicate(createCard(koning.id,4,'slot','/res/slot.png'),4),
        ...duplicate(createCard(koning.id,5,'paleis','/res/paleis.png'),3),
        ...duplicate(createCard(prediker.id,1,'tempel','/res/tempel.png'),3),
        ...duplicate(createCard(prediker.id,2,'kerk','/res/kerk.png'),3),
        ...duplicate(createCard(prediker.id,3,'abdij','/res/abdij.png'),3),
        ...duplicate(createCard(prediker.id,4,'kathedraal','/res/kathedraal.png'),2),
        ...duplicate(createCard(koopman.id,1,'taveerne','/res/taveerne.png'),5),
        ...duplicate(createCard(koopman.id,2,'gildehuis','/res/gildehuis.png'),3),
        ...duplicate(createCard(koopman.id,2,'markt','/res/markt.png'),4),
        ...duplicate(createCard(koopman.id,3,'handelshuis','/res/handelshuis.png'),3),
        ...duplicate(createCard(koopman.id,4,'haven','/res/haven.png'),3),
        ...duplicate(createCard(koopman.id,5,'raadhuis','/res/raadhuis.png'),2),
        ...duplicate(createCard(condotierre.id,1,'wachttoren','/res/wachttoren.png'),3),
        ...duplicate(createCard(condotierre.id,2,'kerker','/res/kerker.png'),3),
        ...duplicate(createCard(condotierre.id,3,'toernooiveld','/res/toernooiveld.png'),3),
        ...duplicate(createCard(condotierre.id,5,'vesting','/res/vesting.png'),2),
        ...duplicate(createCard(null,2,'hof der wonderen','/res/hofderwonderen.png'),1),
        ...duplicate(createCard(null,3,'verdedigingstoren','/res/verdedigingstoren.png'),2),
        ...duplicate(createCard(null,5,'laboratorium','/res/laboratorium.png'),1),
        ...duplicate(createCard(null,5,'smederij','/res/smederij.png'),1),
        ...duplicate(createCard(null,5,'observatorium','/res/observatorium.png'),1),
        ...duplicate(createCard(null,5,'kerkhof','/res/kerkhof.png'),1),
        ...duplicate(createCard(null,6,'bibliotheek','/res/bibliotheek.png'),1),
        ...duplicate(createCard(null,6,'school voor magiers','/res/schoolvoormagiers.png'),1),
        ...duplicate(createCard(null,6,'drakenburcht','/res/drakenburcht.png'),1),
        ...duplicate(createCard(null,6,'universiteit','/res/universiteit.png'),1),
    ]
    cardStore.set(cards)
    
    

    return {
        cardStore,
        roleStore,
        playerStore,
    }
}

function createRole(name,color,image):Role{
    return {
        id:null,
        name,
        color,
        image,
        player:null,
        specialUsed:false,
    }
}

function createCard(role,cost,name,image:string):Card{
    return {
        id:null,
        cost,
        image,
        isAction:false,
        isAnyRole:false,
        name,
        points:0,
        role,
    }
}

function createPlayer(name):Player{
    return {
        id:null,
        money:0,
        name,
        buildings:[],
        hand:[],
        score:0,
        buildactions:0,
    }
}

function duplicate(object,amount){
    var newarr = new Array(amount).fill(0)
    var maps = newarr.map(() => copy(object))
    return maps
}

function copy(object){
    return Object.assign({},object)
}