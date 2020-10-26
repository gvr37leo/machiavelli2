class BoardView{
    root: HTMLElement;
    playerlist: HTMLElement;
    rolelist: HTMLElement;
    money: HTMLElement;
    playerrole: HTMLElement;
    showhand: HTMLElement;
    showboard: HTMLElement;
    passbutton: HTMLElement;
    loadedPlayer:Player
    specialability: HTMLElement;

    constructor(){
        this.root = string2html(`
        <div>
            <div style="display:flex; justify-content:space-between;">
                <div id="playerlist"></div>
                <div style="display:flex;" id="rolelist"></div>
            </div>
        
            <div id="dashboard" style="display:flex; justify-content:space-evenly;">
                <div>
                    money
                    <div id="money"></div>
                </div>
                <div>
                    role
                    <div id="playerrole"></div>
                </div>
                <button id="showhand">showhand</button>
                <button id="showboard">showboard</button>
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
        this.showboard = this.root.querySelector('#showboard')
        this.passbutton = this.root.querySelector('#passbutton')
        this.specialability = this.root.querySelector('#specialability')

        
    }

    loadDashboard(player:Player){
        var role = roleStore.get(player.id)
        this.money.innerText = player.money as any
        this.playerrole.innerText = role.name
        this.loadedPlayer = player

    }



}