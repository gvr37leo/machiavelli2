class CardView{
    root: HTMLElement;
    cost:HTMLElement
    name:HTMLElement
    description:HTMLElement
    role:HTMLElement
    image: HTMLImageElement;


    constructor(){
        this.root = string2html(`
        <div style="border:3px solid black; margin:5px; padding:5px; border-radius:3px;">
            <img width="100" src="" alt="">
            <div id="cost">cost</div>
            <div id="name">name</div>
            <div id="description">description</div>
            <div id="role">role</div>
        </div>
        `)

        this.image = this.root.querySelector('img')
        this.cost = this.root.querySelector('#cost')
        this.name = this.root.querySelector('#name')
        this.description = this.root.querySelector('#description')
        this.role = this.root.querySelector('#role')

    }

    set(card:Card){
        this.cost.innerText = card.cost
        this.name.innerText = card.name
        var role = roleStore.get(card.role)
        this.role.innerText = role?.color ?? ''
        this.image.src = card.image
    }


}