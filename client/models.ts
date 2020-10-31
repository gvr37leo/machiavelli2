class Game{
    
    started:boolean
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

class Role{
    id:number
    player
    name
    color
    image
    specialUsed:boolean
}

class Player{
    id:number
    name:string
    hand:number[]
    buildings:number[]
    money:number
    score:number
    buildactions:number
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