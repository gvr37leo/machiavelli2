function findbyid<T>(arr:T[],id:number):T{
    return arr.find((o:any) => o.id == id)
}

function removebyid<T>(arr:T[],id:number):T{
    let index = arr.findIndex((i:any) => i.id == id)
    return arr.splice(index,1)[0]
}

function removeval<T>(arr:T[],val:number):T{
    let index = arr.findIndex((v:any) => v == val)
    return arr.splice(index,1)[0]
}

function shuffle(array:any[]){
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
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