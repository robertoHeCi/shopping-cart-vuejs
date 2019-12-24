import { Model } from '@vuex-orm/core'
import Product from './Product'

export default class Promotion extends Model {
    static entity = 'promotions'

    static fields() {
        return {
            id: this.increment(),
            description:this.string(''),
            product_code: this.string(''),
            product: this.belongsTo(Product, 'product_code','code'),
            required_quantity: this.number(0),
            free_quantity: this.number(0),
        }
    }
}