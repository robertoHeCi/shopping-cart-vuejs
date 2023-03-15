<template>
  <section class="products">
    <h1 class="main">
      Shopping cart
    </h1>
    <ul class="products-list tableHead">
      <li class="products-list-title row">
        <div class="col-product">
          Product details
        </div>
        <div class="col-quantity">
          Quantity
        </div>
        <div class="col-price">
          Price
        </div>
        <div class="col-total">
          Total
        </div>
      </li>
    </ul>
    <ul
      v-if="products"
      class="products-list"
    >
      <li
        v-for="(product,index) in products"
        :key="index"
        class="product row"
      >
        <ProductComponent
          :product="product"
          @onProductDetailsClick="onProductDetailsClick"
        />
        <InputNumberComponent
          :value="getProductQuantity(product.code)"
          @onCounterIncrements="onCounterIncrements($event,product.code)"
          @onCounterDecrements="onCounterDecrements($event,product.code)"
        />
        <div class="col-price">
          <span class="product-price">{{ getFormattedDecimal(product.price) }}</span>
        </div>
        <div class="col-total">
          <span class="product-price">{{ getFormattedDecimal(product.price * getProductQuantity(product.code)) }}</span>
        </div>
      </li>
    </ul>
  </section>
</template>
<script>
// Components
import ProductComponent from "@/components/ProductComponent";
import InputNumberComponent from "@/components/InputNumberComponent";
import NumbersUtilsMixin from '@/components/_mixins/NumbersUtilsMixin'

// Domain
import ProductsDomain from "@/domain/ProductsDomain";
import PromotionsDomain from "@/domain/PromotionsDomain";
import ProductPositionsDomain from "@/domain/ProductPositionsDomain";
import DiscountsDomain from "@/domain/DiscountsDomain";
import Checkout from "@/domain/Checkout";

export default {
  name: "ShoppingCartContainer",
  components: { ProductComponent, InputNumberComponent },
  mixins: [NumbersUtilsMixin],
  props: {},
  data() {
    return {
      productsDomain: this.createProductsDomain(),
      promotionsDomain: this.createPromotionsDomain(),
      discountsDomain: this.createDiscountsDomain(),
      productPositionsDomain: this.createProductPositionsDomain()
    };
  },
  computed: {
    products() {
      return this.productsDomain.storeRepository.getAll();
    },
    checkOutClass() {
      return Checkout.createInstance(
        this.productsDomain,
        this.productPositionsDomain,
        this.discountsDomain,
        this.promotionsDomain
      );
    }
  },
  watch: {},
  //Lifecycle Events (in the order they are called)
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.loadProducts();
    this.loadPromotions();
    this.loadDiscounts();
  },
  methods: {
    createProductsDomain() {
      return ProductsDomain.createInstance();
    },
    createProductPositionsDomain() {
      return ProductPositionsDomain.createInstance();
    },
    createDiscountsDomain() {
      return DiscountsDomain.createInstance();
    },
    createPromotionsDomain() {
      return PromotionsDomain.createInstance();
    },
    onProductDetailsClick($event) {
      this.$router.push({ name: "product", params: { id: $event } });
    },
    getProductQuantity(productCode) {
      return this.checkOutClass.getProductQuantity(productCode);
    },
    loadProducts() {
      return this.productsDomain.loadData();
    },
    loadPromotions() {
      return this.promotionsDomain.loadData();
    },
    loadDiscounts() {
      return this.discountsDomain.loadData();
    },
    onCounterIncrements($event, productCode) {
      this.checkOutClass.scan(productCode);
    },
    onCounterDecrements($event, productCode) {
      this.checkOutClass.unscan(productCode);
    }
  }
};
</script>