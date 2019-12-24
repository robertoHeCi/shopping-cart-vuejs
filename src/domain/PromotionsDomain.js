// Ports
import StorePort from "@/ports/StorePort";

// Repository
import Repository from "@/repositories/Repository";

// Models
import Promotion from "@/models/Promotion";

// Lodash
import _isNull from 'lodash/isNull'

export default class PromotionsDomain {

    PROMOTIONS = [
        {
            product_code: "MOBILECASE",
            description: '3X2 MOBILECASE offer',
            required_quantity: 3,
            free_quantity: 2,
        },
        {
            product_code: "PILLOW",
            description: '2x1 PILLOW offer',
            required_quantity: 2,
            free_quantity: 1,
        }
    ];

    constructor(mockAdapter = null) {
        this.storeRepository = _isNull(mockAdapter)
            ? Repository.createInstance(StorePort.createInstance(Promotion))
            : mockAdapter
    }

    /**
    * Create a PromotionsDomain instance
    * 
    * @param {Class} mockAdapter Adapter to mocks Vuex

    * @return {PromotionsDomain} PromotionsDomain class.
    */
    static createInstance(mockAdapter) {
        return new PromotionsDomain(mockAdapter)
    }

    /**
    * Store promotions in Vuex
        
    * @return {Promise}
    */
    loadData() {
        return this.storeRepository.create(this.PROMOTIONS)
    }

    /**
    * Returns all promotions stored in Vuex
    
    * @return {Promise}
    */
    getAll() {
        return this.storeRepository.getAllRecursive()
    }

    /**
    * Returns promotion price by quantity and promotion
    * 
    * @param {Number} productPositionQuantity Quantity of products 
    * @param {Object} promotion Promotion to apply

    * @return {Number} Return number of free products.
    */
    getPromotionPrice(productPositionQuantity, promotion) {
        const freeProducts = this.getFreeProductsByPromotion(productPositionQuantity, promotion.required_quantity, promotion.free_quantity)
        return freeProducts > 0 ? promotion.product.price * freeProducts : 0
    }

    /**
    * Return the number of free products by quantity, required quantity and free quantity
    * 
    * @param {Number} productQuantity Quantity of products 
    * @param {Number} requiredQuantity required quantity to apply the promotion
    * @param {Number} freeQuantity Quantity of free products by required quantity

    * @return {Number} Return number of free products.
    */
    getFreeProductsByPromotion(productQuantity, requiredQuantity, freeQuantity) {
        const dividend = productQuantity
        const divider = requiredQuantity + freeQuantity
        let result = 0
        if (dividend >= divider) {
            result = Math.trunc(dividend / divider) * freeQuantity
        }
        return result
    }


}