// Ports
import StorePort from "@/ports/StorePort";

// Repository
import Repository from "@/repositories/Repository";

// Models
import Discount from "@/models/Discount";

// Lodash
import _isNull from 'lodash/isNull'

export default class PromotionsDomain {

    DISCOUNTS = [
        {
            description: "x3 Pillow offer",
            product_code: "PILLOW",
            percentage: 5,
            required_quantity: 3,
        }
    ];

    constructor(mockAdapter = null) {
        this.storeRepository = _isNull(mockAdapter)
            ? Repository.createInstance(StorePort.createInstance(Discount))
            : mockAdapter
    }

    static createInstance(mockAdapter) {
        return new PromotionsDomain(mockAdapter)
    }

    /**
    * Returns all discounts stored in Vuex
    *
    * @return {Promise} .
    */
    getAll() {
        return this.storeRepository.getAllRecursive()
    }

    /**
    * Store discounts in Vuex
    *    
    * @return {Promise}
    */
    loadData() {
        return this.storeRepository.create(this.DISCOUNTS)
    }

    /**
    * Calculates the discount by product quantity
    *
    * @param {Object} discount discount object
    * @param {Number} productQuantity Product quantity 
    *
    * @return {Promise}
    */
    getDiscountPrice(discount, productQuantity) {
        const discountPerItem = discount.product.price * (discount.percentage / 100)
        return productQuantity >= discount.required_quantity ? discountPerItem * productQuantity: 0
    }

}