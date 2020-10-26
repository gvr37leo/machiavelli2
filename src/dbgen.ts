
function genDB(){

    let cardStore = new Store<Card>()
    let roleStore = new Store<Role>()
    let playerStore = new Store<Player>()

    

    let moordenaar = createRole('moordenaar','white')
    let dief = createRole('dief','white')
    let magier = createRole('magier','white')
    let koning = createRole('koning','yellow')
    let prediker = createRole('prediker','blue')
    let koopman = createRole('koopman','green')
    let bouwmeester = createRole('bouwmeester','white')
    let condotierre = createRole('condotierre','red')


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
        ...duplicate(createCard(koning.id,3,'jachtslot',9),5),
        ...duplicate(createCard(koning.id,4,'slot',10),4),
        ...duplicate(createCard(koning.id,5,'paleis',11),3),
        ...duplicate(createCard(prediker.id,1,'tempel',12),3),
        ...duplicate(createCard(prediker.id,2,'kerk',13),3),
        ...duplicate(createCard(prediker.id,3,'abdij',14),3),
        ...duplicate(createCard(prediker.id,4,'kathedraal',15),2),
        ...duplicate(createCard(koopman.id,1,'taveerne',16),5),
        ...duplicate(createCard(koopman.id,2,'gildehuis',17),3),
        ...duplicate(createCard(koopman.id,2,'markt',18),4),
        ...duplicate(createCard(koopman.id,3,'handelshuis',19),3),
        ...duplicate(createCard(koopman.id,4,'haven',20),3),
        ...duplicate(createCard(koopman.id,5,'raadhuis',21),2),
        ...duplicate(createCard(condotierre.id,1,'wachttoren',22),3),
        ...duplicate(createCard(condotierre.id,2,'kerker',23),3),
        ...duplicate(createCard(condotierre.id,3,'toernooiveld',24),3),
        ...duplicate(createCard(condotierre.id,5,'vesting',25),2),
        ...duplicate(createCard(null,2,'hof der wonderen',26),1),
        ...duplicate(createCard(null,3,'verdedigingstoren',27),2),
        ...duplicate(createCard(null,5,'laboratorium',28),1),
        ...duplicate(createCard(null,5,'smederij',29),1),
        ...duplicate(createCard(null,5,'observatorium',30),1),
        ...duplicate(createCard(null,5,'kerkhof',31),1),
        ...duplicate(createCard(null,6,'bibliotheek',32),1),
        ...duplicate(createCard(null,6,'school voor magiers',33),1),
        ...duplicate(createCard(null,6,'drakenburcht',34),1),
        ...duplicate(createCard(null,6,'universiteit',35),1),
    ]
    cardStore.set(cards)
    
    

    return {
        cardStore,
        roleStore,
        playerStore,
    }
}

function createRole(name,color):Role{
    return {
        id:null,
        name,
        color,
        image:null,
        player:null,
    }
}

function createCard(role,cost,name,image):Card{
    return {
        id:null,
        cost,
        image:null,
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