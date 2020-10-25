class Game{
    

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