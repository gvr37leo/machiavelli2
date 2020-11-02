class RNG{
    public mod:number = 4294967296
    public multiplier:number = 1664525
    public increment:number = 1013904223

    constructor(public seed:number){

    }

    next(){
        this.seed = (this.multiplier * this.seed + this.increment) % this.mod
        return this.seed
    }

    norm(){
        return this.next() / this.mod
    }
    
    
    range(min:number,max:number){
        return this.norm() * to(min,max) + min
    }
}

function to(a,b){
    return b-a
}

export function findbyid<T>(arr:T[],id:number):T{
    return arr.find((o:any) => o.id == id)
}

export function removebyid<T>(arr:T[],id:number):T{
    let index = arr.findIndex((i:any) => i.id == id)
    return arr.splice(index,1)[0]
}

export function removeval<T>(arr:T[],val:number):T{
    let index = arr.findIndex((v:any) => v == val)
    return arr.splice(index,1)[0]
}

var rng = new RNG(0)
export function shuffle(array:any[]){
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(rng.norm() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

export function count(arr,cb){
    var count = 0
    for(var item of arr){
        if(cb(item)){
            count++
        }
    }
    return count
}

export function any<T>(arr:T[],cb:(item:T) => boolean){
    return arr.findIndex(i => cb(i)) >= 0
}

export function last<T>(arr:T[]){
    return arr[arr.length - 1]
}

export function copy(obj){
    return Object.assign({},obj)
}

