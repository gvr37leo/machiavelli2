class Game{
    players:Player[] = []
    roles:Role[] = []
    cards:Card[] = []

    deck:number[] = []
    discardPile:number[] = []
    crownwearer = 0
    murderedRole
    burgledRole
    firstFinishedPlayer
    discardedRoles:number[] = []
    kingshownRole:number = null
    playerturn
    roleturn

    constructor(){
        this.players = [
            new Player(),
            new Player(),
            new Player(),
            new Player(),
        ]

        this.roles = [
            new Role(),
            new Role(),
            new Role(),
            new Role(),
            new Role(),
            new Role(),
            new Role(),
            new Role(),
        ]

        this.deck = [
        ]
        for(var i = 0; i < 65;i++){
            this.cards.push(new Card())
        }
    }

}

class Role{
    id:number
    player
    name
    color
    image
}

class Player{
    id:number
    name:string
    hand:number[]
    buildings:number[]
    money:number
}

class Card{
    id:number
    points
    isAction
    isAnyRole

    role
    cost
    name
    image
}