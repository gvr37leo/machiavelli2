class MulliganItemWrapper{

    selected = false
    root: HTMLElement
    itemcontainer: HTMLElement
    onItemClicked = new EventSystem<boolean>()

    constructor(){
        this.root = string2html(`
            <div>
                <div id="itemcontainer" class="itemcontainer"></div>
            </div>
        `)

        this.itemcontainer = this.root.querySelector('#itemcontainer')
        this.itemcontainer.addEventListener('click', () => {
            this.toggle()
            this.onItemClicked.trigger(this.selected)
        })

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

class PlayWrapper{

    root: HTMLElement
    itemcontainer: HTMLElement


    constructor(){
        this.root = string2html(`
            <div>
                <div id="itemcontainer" class="itemcontainer"></div>
            </div>
        `)

        this.itemcontainer = this.root.querySelector('#itemcontainer')
    }

    setItem(element:HTMLElement){
        this.itemcontainer.innerHTML = ''
        this.itemcontainer.appendChild(element)
    }

}
