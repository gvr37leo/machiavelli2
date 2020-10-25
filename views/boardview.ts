class BoardView{
    root: HTMLElement;
    playerlist: HTMLElement;
    rolelist: HTMLElement;
    money: HTMLElement;
    playerrole: HTMLElement;
    showhand: HTMLElement;
    showboard: HTMLElement;
    passbutton: HTMLElement;

    constructor(){
        this.root = string2html(`
        <div>
            <div>
                <div id="playerlist"></div>
                <div id="rolelist"></div>
            </div>
        
            <div id="dashboard">
                <div id="money"></div>
                <div id="playerrole"></div>
                <div id="showhand"></div>
                <div id="showboard"></div>
                <div><button id="passbutton"></button></div>
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
    }



}