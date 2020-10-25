class PlayerView{
    root: HTMLElement;
    name: HTMLElement;

    constructor(){

        this.root = string2html(`
            <div>
                <div id="name"></div>
            </div>
        `)

        this.name = this.root.querySelector('#name')

    }

    set(player:Player){
        this.name.innerText = player.name
    }
}