class PlayerView{
    root: HTMLElement;
    name: HTMLElement;
    player: Player;
    crown: HTMLElement;

    constructor(){

        this.root = string2html(`
            <div class="player" style="display:flex; align-items:center; padding:5px; margin-bottom:5px;">
                <div style="margin-right:5px;" id="name"></div>
                <img id="crown" width="40" src="/res/crown-solid.svg" />
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