import { Model } from '@vuex-orm/core'

export default class Product extends Model {
    static entity = 'products'

    static fields() {
        return {
            id: this.increment(),
            description: this.string(''),
            code: this.string(''),
            image: this.string(''),
            image_xl: this.string(''),
            price: this.number(0),
        }
    }
}