class CardDisplayView{
    root: HTMLElement
    onCardPlayed = new EventSystem<number>()


    constructor(){

        this.root = string2html(`
            <div style="display:flex;">

            </div>
        `)
    }


    loadCards(cardids:number[]){
        this.root.innerHTML = ''
        
        for(let cardid of cardids){
            let card = cardStore.get(cardid)
            let cdiw = new CardDisplayItemWrapper()
            let cardview = new CardView()
            cdiw.setItem(cardview.root)
            cardview.set(card)
            this.root.appendChild(cdiw.root)

            
            cdiw.playbutton.addEventListener('click', () => {
                this.onCardPlayed.trigger(cardid)
                
                
            })
        }
        
    }

}

class CardDisplayItemWrapper{

    root: HTMLElement
    itemcontainer: HTMLElement
    playbutton: HTMLElement

    constructor(){
        this.root = string2html(`
            <div>
                <div id="itemcontainer" class="itemcontainer"></div>
                <div style="display: flex; justify-content: center;">
                    <button id="playbutton">play</button>
                </div>
            </div>
        `)

        this.itemcontainer = this.root.querySelector('#itemcontainer')
        this.playbutton = this.root.querySelector('#playbutton')
    }

    setItem(element:HTMLElement){
        this.itemcontainer.innerHTML = ''
        this.itemcontainer.appendChild(element)
    }

}