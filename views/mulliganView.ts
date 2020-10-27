class MulliganView{
    rendermap = new Map<string,(val:any) => HTMLElement>()
    onMulliganConfirmed = new EventSystem<{mulliganid:number,chosenoptions:boolean[]}>()
    root:HTMLElement
    itemscontainer: HTMLElement
    confirmbutton: HTMLElement

    choices:boolean[] = []
    mulligandata: MulliganData
    modal: Modal
    wrappers: MulliganItemWrapper[]

    constructor(){
        this.modal = new Modal()
        this.modal.attachtodocument()
        
        this.root = string2html(`
            <div>
                <div id="items" style="display: flex; justify-content: space-around;">
                    
                </div>
                <div style="display: flex; justify-content: center;">
                    <button id="confirmbutton">confirmmulligan</button>
                </div>

            </div>
        `)
        this.itemscontainer = this.root.querySelector('#items')
        this.confirmbutton = this.root.querySelector('#confirmbutton')

        document.addEventListener('keydown', e => {
            if(e.key == 'Enter' && this.modal.isHidden == false){
                this.confirmbutton.click()
            }
        })

        this.confirmbutton.addEventListener('click',(e) => {
            this.confirmchoice(this.choices)

        })

        this.rendermap.set('card',(id) => {
            var cv = new CardView()
            cv.set(cardStore.get(id))
            return cv.root
        })

        this.rendermap.set('player',(id) => {
            var pv = new PlayerView()
            pv.set(playerStore.get(id))
            return pv.root
        })

        this.rendermap.set('role',(id) => {
            var rv = new RoleView()
            rv.set(roleStore.get(id))
            return rv.root
        })

        this.rendermap.set('text',(text) => {
            
            let element = string2html(`<div>${text}</div>`)
            return element
        })
    }

    confirmchoice(choice:boolean[]){
        this.modal.hide()
        var choicecount = count(choice,a => a)
        if(inRange(this.mulligandata.min,this.mulligandata.max,choicecount)){
            this.onMulliganConfirmed.trigger({
                mulliganid:this.mulligandata.id,
                chosenoptions:choice,
            })
        }
    }

    display(data:MulliganData){
        this.mulligandata = data
        this.wrappers = []
        this.choices = new Array(data.options.length).fill(false)
        this.itemscontainer.innerHTML = ''
        for (let i = 0; i < data.options.length; i++) {
            const option = data.options[i];
            let html = this.rendermap.get(option.type)(option.value)
            let wrapper = new MulliganItemWrapper()
            this.wrappers.push(wrapper)
            wrapper.setItem(html)

            html.addEventListener('click',(e) => {
                if(this.mulligandata.min == 1 && this.mulligandata.max == 1){
                    
                    this.choices.forEach((v,j) => {
                        this.setChoice(j,false)    
                    })
                    this.setChoice(i,true)
                }else{
                    this.setChoice(i,!this.choices[i])
                }
            })

            this.itemscontainer.appendChild(wrapper.root)
        }
        this.modal.setAndShow(this.root)
    }

    setChoice(index,val){
        this.choices[index] = val
        if(val){
            this.wrappers[index].select()
        }else{
            this.wrappers[index].deselect()
        }
        
    }
}

class MulliganData{
    id:number
    min:number
    max:number
    options:SelectOption[]
}

class MulliganItemWrapper{

    selected = false
    root: HTMLElement
    itemcontainer: HTMLElement
    selectbutton: HTMLElement

    constructor(){
        this.root = string2html(`
            <div>
                <div id="itemcontainer" class="itemcontainer"></div>
                <div>
                    <button id="selectbutton">select</button>
                </div>
            </div>
        `)

        this.itemcontainer = this.root.querySelector('#itemcontainer')
        this.selectbutton = this.root.querySelector('#selectbutton')
    }

    setItem(element:HTMLElement){
        this.itemcontainer.innerHTML = ''
        this.itemcontainer.appendChild(element)
    }

    toggle(){
        this.selected = !this.selected
        if(this.selected){
            this.itemcontainer.classList.add('selected')
        }else{
            this.itemcontainer.classList.remove('selected')
        }
    }

    deselect(){
        this.selected = false
        this.itemcontainer.classList.remove('selected')
    }

    select(){
        this.selected = true
        this.itemcontainer.classList.add('selected')
    }

}