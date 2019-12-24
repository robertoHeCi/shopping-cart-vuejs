import _head from 'lodash/head'
import _isArray from 'lodash/isArray'
import _merge from 'lodash/merge'
import PersistenceInterface  from '@/ports/PersistenceInterface'

export default class VuexORMAdapter extends PersistenceInterface {

    constructor(entity){
        super()
        this.entity = entity
    }

    static createInstance(entity){
        return new VuexORMAdapter(entity)
    }

    /**************************************************************************/
    /****************************** RETRIEVE DATA *****************************/
    /**************************************************************************/

    getAll(){
        return this.entity.query().all()
    }

    getAllRecursive(){
        return this.entity.query().withAllRecursive().all()
    }

    findBy(field,value){
        return this.entity.query().withAll().where(field,value).get()
    }

    findByData(data){
        const query=this.entity.query().withAllRecursive()
        const where = data.map((object)=>{
            let key=Object.keys(object)[0]
            let value = object[key]
            return query.where(key,value)
        })
        return this.serializeObject(_merge(...where).get())
    }

    count(){
        return this.entity.query().count()
    }

    /**************************************************************************/
    /******************************** UPDATE DATA *****************************/
    /**************************************************************************/

    update(id, data){
        return this.entity.update({
            where: id,
            data: data
        }).then(dataUpdated => dataUpdated)
        .catch(e => e)
    }

    /**************************************************************************/
    /******************************** CREATE DATA *****************************/
    /**************************************************************************/

    async save(data) {
        const insertedData = await this.entity.create({ data: data })
        return this.serializeObject(insertedData)
    }

    async create(data) {
        const createdData = await this.entity.new()
        return this.update(createdData.id,data)
    }

    async insert(data) {
        const insertedData = await this.entity.insert({ data: data })
        return this.serializeObject(insertedData[this.entity.entity])
    }


    /**************************************************************************/
    /******************************** DELETE DATA *****************************/
    /**************************************************************************/

    deleteById(id){
        return this.entity.delete(id);
    }

    deleteBy(data){
        return this.entity.delete(record => {
            return _head(data.map(object =>{
                let key = Object.keys(object)[0]
                let value = object[key]
                return record[key] === value
            }))
        })
    }

    deleteAll(){
        return this.entity.deleteAll()
    }

    /**************************************************************************/
    /******************************** UTILS ***********************************/
    /**************************************************************************/

    serializeObject(dbResponse){
        if(_isArray(dbResponse) && dbResponse.length == 1 ){
            return dbResponse[0]
        }else{
            return dbResponse
        }
    }
}
