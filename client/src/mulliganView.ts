
class MulliganData{
    id:number
    min:number
    max:number
    options:SelectOption[]
}

class MulliganView{
    rendermap = new Map<string,(val:any) => HTMLElement>()
    onMulliganConfirmed = new EventSystem<{mulliganid:number,chosenoptions:boolean[]}>()
    itemscontainer: HTMLElement
    confirmbutton: HTMLElement

    // choices:boolean[] = []
    mulligandata: MulliganData
    modal: Modal
    wrappers: MulliganItemWrapper[]

    constructor(){
        this.modal = new Modal()
        this.modal.attachtodocument()
        this.modal.set(string2html(`
            <div style="    display: flex;
            flex-direction: column;
            justify-content: center;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;">
                <div id="items" style="display: flex; flex-wrap:wrap; justify-content: space-around;">
                    
                </div>
                <div style="display: flex; justify-content: center;">
                    <button id="confirmbutton">confirmmulligan</button>
                </div>

            </div>
        `))
        
        this.itemscontainer = this.modal.rootelement.querySelector('#items')
        this.confirmbutton = this.modal.rootelement.querySelector('#confirmbutton')

        document.addEventListener('keydown', e => {
            if(e.key == 'Enter' && this.modal.isHidden == false){
                this.confirmbutton.click()
            }
        })

        this.confirmbutton.addEventListener('click',(e) => {
            var choices = this.wrappers.map(w => w.selected)
            this.confirmchoice(choices)

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
        // this.choices = new Array(data.options.length).fill(false)
        this.itemscontainer.innerHTML = ''
        for (let i = 0; i < data.options.length; i++) {
            const option = data.options[i];
            let html = this.rendermap.get(option.type)(option.value)
            let wrapper = new MulliganItemWrapper()
            this.wrappers.push(wrapper)
            wrapper.setItem(html)

            wrapper.itemcontainer.addEventListener('click', () => {
                if(this.mulligandata.min == 1 && this.mulligandata.max == 1){
                    this.wrappers.forEach(w => w.deselect())
                    wrapper.select()
                }
            })

            this.itemscontainer.appendChild(wrapper.root)
        }
        this.modal.show()
    }

    // setChoice(index,val){
    //     this.choices[index] = val
    //     if(val){
    //         this.wrappers[index].select()
    //     }else{
    //         this.wrappers[index].deselect()
    //     }
        
    // }
}

function count(arr,cb){
    var count = 0
    for(var item of arr){
        if(cb(item)){
            count++
        }
    }
    return count
}


