export class Game{
    

    deck:number[] = []
    discardPile:number[] = []
    crownwearer = 0
    murderedRole = 0
    burgledRole = 0
    firstFinishedPlayer
    discardedRoles:number[] = []
    kingshownRole:number = null
    // playerturn:number
    roleturn:number = 0
    rolestopick:number[] = []

    constructor(){

    }

}

export class Role{
    id:number
    player
    name
    color
    image
    specialUsed:boolean
}

export class Player{
    id:number
    name:string
    hand:number[]
    buildings:number[]
    money:number
    score:number
    buildactions:number
}

export class Card{
    id:number
    points
    isAction
    isAnyRole

    role
    cost
    name
    image
}