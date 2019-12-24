import VuexORMAdapter from '@/adapters/VuexORMAdapter'

export default class StorePort {
    constructor(entity){
        this.adapter = VuexORMAdapter.createInstance(entity)
    }

    static createInstance(entity){
        return new StorePort(entity)
    }

}
