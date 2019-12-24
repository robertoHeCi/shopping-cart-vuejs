export default class Repository {

    constructor(persistencePort){
        this.persistenceAdapter = persistencePort.adapter
    }

    static createInstance(persistencePort){
        return new Repository(persistencePort)
    }

    /**
    * Returns all stored values
    *
    * @return {Object} stored
    */
    getAll(){
        return this.persistenceAdapter.getAll()
    }

    /**
    * Returns all stored items with all dependencies
    *
    * @return {Object} stored item
    */
    getAllRecursive(){
        return this.persistenceAdapter.getAllRecursive()
    }

    /**
    * Returns Items by data
    * @param {Array<Object>} data
    * @return {Object} stored Item
    */
    getByData(data){
        return this.persistenceAdapter.findByData(data)
    }

    /**
    * Returns Count
    * @return {Number} stored Items count
    */
    getCount(){
        return this.persistenceAdapter.count()
    }

    /**
    * Store Item passed by param
    *
    */
    create(data){
        return this.persistenceAdapter.save(data)
    }

    /**
    * Store Item passed by param
    *
    */
    insert(data){
        return this.persistenceAdapter.insert(data)
    }

    /**
    * Updates Item with data passed by param
    */
    update(item, data){
        return this.persistenceAdapter.update(item.id, data)
    }

    /**
    * Deletes Item with data passed by param
    */
    deleteBy(data){
        return this.persistenceAdapter.deleteBy(data)
    }

    /**
    * Deletes all data stored
    */
    deleteAll(){
        return this.persistenceAdapter.deleteAll()
    }

    /**
    * Deletes Item by Id
    */
    deleteById(id){
        return this.persistenceAdapter.deleteById(id)
    }
}
