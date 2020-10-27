class RoleView{
    root: HTMLElement;
    image: HTMLImageElement;
    color: HTMLElement;
    name: HTMLElement;
    role: Role;

    constructor(){
        this.root = string2html(`
        <div class="role" style="margin:5px; padding:5px; border-radius:3px;">
            <img width="100" src="" alt="">
            <div id="name" >name</div>
            <div id="color" >color</div>
        </div>
        `)

        this.image = this.root.querySelector('img')
        this.color = this.root.querySelector('#color')
        this.name = this.root.querySelector('#name')
    }

    set(role:Role){
        this.role = role
        this.name.innerText = role.name
        this.color.innerText = role.color
        this.image.src = role.image
    }

    setHighlight(on:boolean){
        if(on){
            this.root.classList.add('highlighted')
        }else{
            this.root.classList.remove('highlighted')
        }
    }

}