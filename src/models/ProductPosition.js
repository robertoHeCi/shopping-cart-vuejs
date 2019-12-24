import { Model } from '@vuex-orm/core'
import Product from './Product'

export default class ProductPosition extends Model {
    static entity = 'productsPosition'
    static fields() {
        return {
            id: this.increment(),
            product_code: this.attr(null),
            product: this.belongsTo(Product,'product_code','code'),
            quantity: this.number(0),
            price: this.number(0)
        }
    }
}
