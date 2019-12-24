import _isNull from 'lodash/isNull'

export default class Checkout {

    constructor(productsDomain, productPositionsDomain, discountsDomain, promotionsDomain) {
        this.productsDomain = productsDomain
        this.productPositionsDomain = productPositionsDomain
        this.promotionsDomain = promotionsDomain
        this.discountsDomain = discountsDomain
    }

    static createInstance(productsDomain, productPositionsDomain, discountsDomain, promotionsDomain) {
        return new Checkout(productsDomain, productPositionsDomain, discountsDomain, promotionsDomain)
    }

    /**
    * Add product from shopping cart
    * 
    * @param {Object} productCode product position
    * 
    * @return {Promise}
    */
    scan(productCode) {
        const product = this.productsDomain.getProductByProductCode(productCode)
        return this.productPositionsDomain.increaseProductPosition(product)
    }

    /**
    * Delete product from shopping cart
    * 
    * @param {Object} productCode product position
    * 
    * @return {Promise}
    */
    unscan(productCode) {
        const product = this.productsDomain.getProductByProductCode(productCode)
        return this.productPositionsDomain.decreaseProductPosition(product)
    }

    /**
    * Returns product positions quantity by product code
    * @param {String} productCode product code
    * 
    * @return {Number}
    */
    getProductQuantity(productCode) {
        return this.productPositionsDomain.getProductPositionQuantity(productCode)
    }

    /**
    * Returns productPosition by product code
    * 
    * @param {String} productCode product code
    *        
    * @return {Promise} ProductPosition
    */
    getProductPositionByProductCode(productCode) {
        return this.productPositionsDomain.getProductPositionByProductCode(productCode)
    }


    /**
    * Returns product positions counter
    * 
    * @return {Number}
    */
    getProductCounter() {
        return this.productPositionsDomain.getCounter()
    }


    /**
    * Returns subtotal
    * 
    * @return {Number}
    */
    getSubTotal() {
        return this.productPositionsDomain.getProductPositionsPrice()
    }

    /**
    * Calculates total price by promotions and discounts
    * 
    * @return {Number}
    */
    total() {
        const promotionPrices = this.getPromotionPricesList().map(promotionObject => promotionObject.value)
        const discountPrices = this.getDiscountPricesList().map(promotionObject => promotionObject.value)
        return [this.getSubTotal(), ...promotionPrices, ...discountPrices].reduce((accumulator, price) => accumulator - price)
    }

    /**
    * Returns an array of applied promotions
    * 
    * @return {Array}
    */
    getPromotionPricesList() {
        const promotionPrices = this.promotionsDomain.getAll()
        return promotionPrices.map(promotion => {
            const productPosition = this.getProductPositionByProductCode(promotion.product.code)
            const productPositionQuantity = _isNull(productPosition) ? 0 : productPosition.quantity
            return { description: promotion.description, value: this.promotionsDomain.getPromotionPrice(productPositionQuantity, promotion) }
        })
    }

    /**
    * Returns an array of applied discounts
    * 
    * @return {Array}
    */
    getDiscountPricesList() {
        const discounts = this.discountsDomain.getAll()
        return discounts.map(discount => {
            const productPosition = this.getProductPositionByProductCode(discount.product.code)
            const productPositionQuantity = _isNull(productPosition) ? 0 : productPosition.quantity
            this.productPositionsDomain.updateProductPosition(productPosition, discount)
            return { description: discount.description, value: this.discountsDomain.getDiscountPrice(discount, productPositionQuantity) }
        })
    }

}
