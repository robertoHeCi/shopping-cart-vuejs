// Ports
import StorePort from "@/ports/StorePort";

// Repository
import Repository from "@/repositories/Repository";

// Models
import Product from "@/models/Product";

// Lodash
import _isNull from 'lodash/isNull'

export default class ProductsDomain {

    PRODUCTS = [
        {
            description: "VueJS Mobile Case",
            code: "MOBILECASE",
            image: "mobile_case.jpg",
            image_xl: "mobile_case.jpg",
            price: "25.55"
        },
        {
            description: "VueJS Pillow",
            code: "PILLOW",
            image: "pillow.jpg",
            image_xl: "pillow.jpg",
            price: "17"
        },
        {
            description: "JS mug",
            code: "MUG",
            image: "mug.jpg",
            image_xl: "mug@2x.jpg",
            price: "12.99"
        }

    ];


    constructor(mockAdapter) {
        this.storeRepository = _isNull(mockAdapter)
            ? Repository.createInstance(StorePort.createInstance(Product))
            : mockAdapter
    }

    /**
    * Create a ProductsDomain instance
    * 
    * @param {Class} mockAdapter Adapter to mocks Vuex
    *
    * @return {ProductsDomain} Returns product domain class
    */
    static createInstance(mockAdapter = null) {
        return new ProductsDomain(mockAdapter)
    }

    /**
    * Store products in Vuex
        
    * @return {Promise}
    */
    loadData() {
        return this.storeRepository.create(this.PRODUCTS)
    }

    /**
    * Returns product by code
    * 
    * @param {String} productCode product code
    *        
    * @return {Promise} Product
    */
    getProductByProductCode(productCode) {
        return this.storeRepository.getByData([{ code: productCode }])
    }

}