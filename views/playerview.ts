class PlayerView{
    root: HTMLElement;
    name: HTMLElement;
    player: Player;
    crown: HTMLElement;

    constructor(){

        this.root = string2html(`
            <div class="player">
                <div id="name"></div>
                <div id="crown">crownwearer</div>
            </div>
        `)

        this.name = this.root.querySelector('#name')
        this.crown = this.root.querySelector('#crown')

    }

    set(player:Player){
        this.player = player
        this.name.innerText = player.name
    }

    setHighlight(on:boolean){
        if(on){
            this.root.classList.add('highlighted')
        }else{
            this.root.classList.remove('highlighted')
        }
    }

    setCrownWearer(on:boolean){
        if(on){
            this.crown.style.display = ''
        }else{
            this.crown.style.display = 'none'
        }
    }


}