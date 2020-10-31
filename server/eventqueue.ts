

class EventQueue{
    idcounter = 0
    listeners:{id:number, type: string; cb: (data: any) => void; }[]
    events:{type:string,data:any}[]
    onProcessFinished = new EventSystem<any>()
    rules:{event,error,rulecb}[] = []

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
                
                let matchingrules = this.rules.filter(r => r.event == current.type)
                let offendingrules = matchingrules.filter(r => r.rulecb(current.data) == false)
                if(offendingrules.length == 0){
                    var listeners = this.listeners.filter(l => l.type == current.type)
                    for(var listener of listeners){
                        listener.cb(current.data)
                    }
                }else{
                    offendingrules.forEach(r => console.log(r.error))
                }
            } catch (error) {
                console.log(error)
            }
        }
        this.onProcessFinished.trigger(0)
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

    addRule(event,error,rulecb:(e:any) => boolean){
        this.rules.push({event,error,rulecb})
    }
}