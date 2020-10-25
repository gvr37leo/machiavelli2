class Store<T>{
    idcounter = 0
    map = new Map<number,T>()

    constructor(){

    }

    set(list:T[]){
        for(let item of list){
            item['id'] = this.idcounter++
            this.map.set(item['id'],item)
        }
    }

    list(){
        return Array.from(this.map.values())
    }

    get(id){
        return this.map.get(id)
    }
}