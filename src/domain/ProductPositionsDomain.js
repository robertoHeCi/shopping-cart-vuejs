// Ports
import StorePort from "@/ports/StorePort";

// Repository
import Repository from "@/repositories/Repository";

// Models
import ProductPosition from "@/models/ProductPosition";

import _isNull from 'lodash/isNull'
import _isEmpty from 'lodash/isEmpty'


export default class ProductPositionsDomain {

    constructor(mockAdapter) {
        this.storeRepository = _isNull(mockAdapter)
            ? Repository.createInstance(StorePort.createInstance(ProductPosition))
            : mockAdapter
    }

    /**
    * Create a ProductPositionsDomain instance
    * 
    * @param {Class} mockAdapter Adapter to mocks Vuex
    *
    * @return {ProductPositionsDomain} Returns ProductPositionsDomain class
    */
    static createInstance(mockAdapter = null) {
        return new ProductPositionsDomain(mockAdapter)
    }

    /**
    * Returns all product positions stored in Vuex
    
    * @return {Promise} .
    */
    getAll() {
        return this.storeRepository.getAllRecursive()
    }

    /**
    * Returns productPosition by product code
    * 
    * @param {String} productCode product code
    *        
    * @return {Promise} ProductPosition
    */
    getProductPositionByProductCode(productCode) {
        return this.storeRepository.getByData([{ product_code: productCode }])
    }

    /**
    * Returns product positions counter
    * 
    * @return {Number}
    */
    getCounter() {
        const productPositions = this.getAll();
        let counter = 0
        if (!_isEmpty(productPositions)) {
            counter = productPositions
                .map(productPosition => productPosition.quantity)
                .reduce((accumulator, price) => accumulator + price)
        }
        return counter
    }

    /**
    * Returns product positions quantity by produc code
    * @param {String} productCode product code
    * 
    * @return {Number}
    */
    getProductPositionQuantity(productCode) {
        const prodPosition = this.getProductPositionByProductCode(productCode)
        return _isEmpty(prodPosition) ? 0 : prodPosition.quantity
    }

    /**
    * Returns all product positions price
    * 
    * @return {Number}
    */
    getProductPositionsPrice() {
        const productPositions = this.storeRepository.getAllRecursive()
        const pricesArray = productPositions
            .map(productPosition => productPosition.quantity * productPosition.product.price)
        return !_isEmpty(pricesArray)
            ? pricesArray.reduce((prevPrice, nextPrice) => prevPrice + nextPrice)
            : 0
    }

    /**
    * Returns product position final price
    * 
    * @param {Object} productPosition product position
    * @param {Number} required_quantity  required prices to apply promotions and discounts
    * @param {Number} percentage discount percentaje to apply
    * 
    * @return {Number}
    */
    getProductPositionFinalPrice(productPosition, required_quantity, percentage) {
        let priceWithDiscount = productPosition.price

        if (productPosition.quantity >= required_quantity && productPosition.product.price == productPosition.price) {
            priceWithDiscount = priceWithDiscount - (priceWithDiscount * (percentage / 100))
        }

        if (productPosition.quantity < required_quantity) {
            priceWithDiscount = productPosition.product.price
        }

        return priceWithDiscount
    }

    /**
    * Insert or increments a product position by product
    * 
    * @param {Object} product product 
    * 
    * @return {Promise}
    */
    increaseProductPosition(product) {
        const productPosition = this.getProductPositionByProductCode(product.code)
        if (_isEmpty(productPosition)) {
            return this.storeRepository.insert({ product_code: product.code, quantity: 1, price: product.price })
        } else {
            return this.storeRepository.update(productPosition, { quantity: productPosition.quantity + 1 })
        }
    }

    /**
    * Delete or decrements a product position by product
    * 
    * @param {Object} product product 
    *
    * @return {Promise}
    */
    decreaseProductPosition(product) {
        const productPosition = this.getProductPositionByProductCode(product.code)
        if (productPosition.quantity == 1) {
            return this.storeRepository.deleteById(productPosition.id)
        } else {
            return this.storeRepository.update(productPosition, { quantity: productPosition.quantity - 1 })
        }
    }

    /**
    * Update a product position price
    * 
    * @param {Object} productPosition product position
    * @param {Number} required_quantity  required prices to apply promotions and discounts
    * @param {Number} percentage discount percentaje to apply
    * 
    * @return {Promise}
    * 
    */
    updateProductPosition(productPosition, required_quantity, percentage) {
        const priceWithDiscount = this.getProductPositionFinalPrice(productPosition, required_quantity, percentage)
        if (priceWithDiscount != productPosition.price) {
            return this.storeRepository.update(productPosition, { price: priceWithDiscount })
        }
        return Promise.resolve()
    }

}