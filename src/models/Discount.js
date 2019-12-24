import { Model } from '@vuex-orm/core'
import Product from './Product'

export default class Discount extends Model {
    static entity = 'discounts'

    static fields() {
        return {
            id: this.increment(),
            description: this.string(''),
            product_code: this.string(''),
            product: this.belongsTo(Product, 'product_code','code'),
            percentage: this.number(0),
            required_quantity: this.number(0)
        }
    }
}