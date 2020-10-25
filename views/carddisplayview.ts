class CardDisplayView{
    root: HTMLElement



    constructor(){

        this.root = string2html(`
            <div>

            </div>
        `)
    }


    displayCards(cardids:number[]){
        this.root.innerHTML = ''
        
        for(var id of cardids){
            var card = cardStore.get(id)
            var cardview = new CardView()
            cardview.set(card)
            this.root.appendChild(cardview.root)
        }
        
    }

}