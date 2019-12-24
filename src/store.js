import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'

import Product from '@/models/Product'
import Discount from '@/models/Discount'
import ProductPosition from '@/models/ProductPosition'
import Promotion from '@/models/Promotion'

Vue.use(Vuex)

// Create a new instance of Database.
const database = new VuexORM.Database()

const models = [
 Product,
 Discount,
 ProductPosition,
 Promotion,
]

// Register Models to Database.
models.forEach( model => database.register(model))

// Create Vuex Store and register database through Vuex ORM.
const store = new Vuex.Store({
  plugins: [VuexORM.install(database)]
})

export default store