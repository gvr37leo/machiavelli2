export class Store<T>{
    idcounter = 0
    map = new Map<number,T>()

    constructor(){

    }

    set(list:T[]){
        for(let item of list){
            this.add(item)
        }
    }

    add(item:T){
        item['id'] = this.idcounter++
        this.map.set(item['id'],item)
    }

    remove(id){
        var item = this.map.get(id)
        this.map.delete(id)
        return item
    }

    list(){
        return Array.from(this.map.values())
    }

    get(id){
        return this.map.get(id)
    }
}