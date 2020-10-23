function findbyid<T>(arr:T[],id:number):T{
    return arr.find((o:any) => o.id == id)
}

function removebyid<T>(arr:T[],id:number):T{
    var index = arr.findIndex((i:any) => i.id == id)
    return arr.splice(index,1)[0]
}