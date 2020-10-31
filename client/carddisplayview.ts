class CardDisplayView{
    root: HTMLElement
    onCardPlayed = new EventSystem<number>()


    constructor(){

        this.root = string2html(`
            <div style="display:flex; justify-content:center;">

            </div>
        `)
    }


    loadCards(cardids:number[], playable:boolean){
        this.root.innerHTML = ''
        
        for(let cardid of cardids){
            let card = cardStore.get(cardid)
            
            let cardview = new CardView()
            cardview.set(card)
            
            if(playable){
                let wrapper = new PlayWrapper()
                wrapper.setItem(cardview.root)
                this.root.appendChild(wrapper.root)
                wrapper.root.addEventListener('click', () => {
                    this.onCardPlayed.trigger(cardid)
                })
            }else{
                this.root.appendChild(cardview.root)
            }

            
        }
        
    }

}

