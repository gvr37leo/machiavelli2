class Modal{

    rootelement:HTMLElement
    containerelement:HTMLElement
    closebutton: HTMLElement
    isHidden:boolean

    constructor(){
        this.rootelement = string2html(`<div style="
            position:absolute; top:100px; right:150px; bottom:100px; left:150px; 
            border:1px solid black; 
            border-radius:3px;
            box-shadow: 2px 2px 7px 2px black;
            background-color: white;
            color: black;">
            <div style="position:absolute; top:5px; right:5px;" id="closebutton">X</div>
            <div id="container"></div>
        </div>`)
        this.containerelement = this.rootelement.querySelector('#container')
        this.closebutton = this.rootelement.querySelector('#closebutton')
        this.hide()
        this.closebutton.addEventListener('click', () => {
            this.hide()
        })
    }

    attachtodocument(){
        document.body.appendChild(this.rootelement)
    }

    set(element:HTMLElement){
        this.containerelement.innerHTML = ''
        this.containerelement.appendChild(element)
    }

    setAndShow(element:HTMLElement){
        this.set(element)
        this.show()
    }

    toggle(){
        if(this.rootelement.style.display == 'none'){
            this.show()
        }else{
            this.hide()
        }
    }

    show(){
        this.isHidden = false
        this.rootelement.style.display = ''
    }

    hide(){
        this.isHidden = true
        this.rootelement.style.display = 'none'
    }
}