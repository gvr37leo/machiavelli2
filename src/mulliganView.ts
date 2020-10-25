class MulliganView{
    rendermap = new Map<string,(val:any) => HTMLElement>()
    onMulliganConfirmed = new EventSystem<{id:number,chosen:boolean[]}>()
    root:HTMLElement
    itemscontainer: HTMLElement
    confirmbutton: HTMLElement

    mulliganid:number
    choices:boolean[] = []

    constructor(){
        this.root = string2html(`
            <div>
                <div id="items">
                    
                </div>
                <div>
                    <button id="confirmbutton">confirmmulligan</button>
                </div>

            </div>
        `)
        this.itemscontainer = this.root.querySelector('#items')
        this.confirmbutton = this.root.querySelector('#confirmbutton')
        this.confirmbutton.addEventListener('click',(e) => {
            this.onMulliganConfirmed.trigger({
                id:this.mulliganid,
                chosen:this.choices,
            })
        })

        this.rendermap.set('card',(id) => {
            let card = cardStore.get(id)
            return null
        })

        this.rendermap.set('player',(id) => {
            let player = playerStore.get(id)
            return null
        })

        this.rendermap.set('role',(id) => {
            let role = roleStore.get(id)
            return null
        })

        this.rendermap.set('text',(text) => {
            
            let element = string2html(`<div>${text}</div>`)
            return element
        })
    }

    display(data:MulliganData){
        this.choices = new Array(data.options.length).fill(false)
        this.mulliganid = data.id
        this.itemscontainer.innerHTML = ''
        for (let i = 0; i < data.options.length; i++) {
            const option = data.options[i];
            let html = this.rendermap.get(option.type)(option.value)

            html.addEventListener('click',(e) => {
                //html.border selected toggle
                html
                this.choices[i] = !this.choices[i]
            })

            this.itemscontainer.appendChild(html)
        }
    }
}

class MulliganData{
    id:number
    min:number
    max:number
    options:SelectOption[]
}