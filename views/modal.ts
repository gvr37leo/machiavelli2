
class Modal{

    rootelement:HTMLElement
    containerelement:HTMLElement

    constructor(){
        this.rootelement = string2html(`<div style="
            position:absolute; top:100px; right:100px; bottom:100px; left:100px; 
            border:1px solid black; 
            border-radius:3px;
            box-shadow: 2px 2px 7px 2px black;">
            <div id="container"></div>
        </div>`)
        this.containerelement = this.rootelement.querySelector('#container')
    }

    set(element:HTMLElement){
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
        this.rootelement.style.display = ''
    }

    hide(){
        this.rootelement.style.display = 'none'
    }
}