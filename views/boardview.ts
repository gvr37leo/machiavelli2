class BoardView{
    root: HTMLElement;
    playerlist: HTMLElement;
    rolelist: HTMLElement;
    money: HTMLElement;
    playerrole: HTMLElement;
    showhand: HTMLElement;
    passbutton: HTMLElement;
    loadedPlayer:Player
    specialability: HTMLElement;
    buildingcontainer: HTMLElement;
    cdv: CardDisplayView;

    constructor(){
        this.root = string2html(`
        <div style="margin:10px; padding:10px;">
            <div style="display:flex; justify-content:space-between;">
                <div id="playerlist"></div>
                <div style="display:flex;" id="rolelist"></div>
            </div>
            <div style="border:1px solid black; margin:10px; min-height:300px;" id="buildingcontainer">
            </div>
            <div id="dashboard" style="border:1px solid black; border-radius:3px; display:flex; justify-content:space-evenly;">
                <div>
                    money
                    <div id="money"></div>
                </div>
                <div>
                    role
                    <div id="playerrole"></div>
                </div>
                <button id="showhand">showhand</button>
                <button id="specialability">specialability</button>
                <div><button id="passbutton">pass</button></div>
            </div>
        </div>
        `)

        this.playerlist = this.root.querySelector('#playerlist')
        this.rolelist = this.root.querySelector('#rolelist')
        this.money = this.root.querySelector('#money')
        this.playerrole = this.root.querySelector('#playerrole')
        this.showhand = this.root.querySelector('#showhand')
        this.passbutton = this.root.querySelector('#passbutton')
        this.specialability = this.root.querySelector('#specialability')
        this.buildingcontainer = this.root.querySelector('#buildingcontainer')
        this.cdv = new CardDisplayView()
        this.buildingcontainer.appendChild(this.cdv.root)

    }

    loadDashboard(player:Player){
        var playerroles = roleStore.list().filter(r => r.player == player.id)
        // var role = roleStore.get(player.id)
        this.money.innerText = player.money as any
        this.playerrole.innerText = playerroles.map(r => r.name).join(',')
        this.loadedPlayer = player
        this.cdv.loadCards(player.buildings)


    }



}