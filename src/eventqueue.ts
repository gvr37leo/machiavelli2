

class EventQueue{
    idcounter = 0
    listeners:{id:number, type: string; cb: (data: any) => void; }[]
    events:{type:string,data:any}[]

    constructor(){
        this.listeners = []
        this.events = []
    }

    listen(type:string,cb:(data:any) => void){
        var id = this.idcounter++
        this.listeners.push({
            id:id,
            type: type,
            cb,
        })
        return id
    }

    listenOnce(type:string,cb:(data:any) => void){
        let id = this.listen(type,(data) => {
            this.unlisten(id)
            cb(data)
        })
        return id
    }

    unlisten(id:number){
        var index = this.listeners.findIndex(o => o.id == id)
        this.listeners.splice(index,1)
    }

    process(){
        while(this.events.length > 0){
            try {
                let current = this.events.shift()
                var listeners = this.listeners.filter(l => l.type == current.type)
                for(var listener of listeners){
                    listener.cb(current.data)
                }
            } catch (error) {
                console.log(error)
            }
            
        }
    }
    
    add(type:string,data:any){
        this.events.push({
            type: type,
            data,
        } as any)
    }

    addAndTrigger(type:string,data:any){
        this.add(type,data)
        this.process()
    }
}