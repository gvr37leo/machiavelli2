import { Player, Role, Card, Game } from "./models"
import { Store } from "./store"

export class GameDB{
    players:Player[]
    roles:Role[]
    cards:Card[]
    game:Game
    cardStore: Store<Card>
    playerStore: Store<Player>
    roleStore: Store<Role>
}