<template>
  <aside class="summary">
    <h1 class="main">Order Summary</h1>
    <ul class="summary-items wrapper border">
      <li>
        <span class="summary-items-number">{{productCounter}} Items</span>
        <span class="summary-items-price">
          {{getFormattedDecimal(subTotal)}}
        </span>
      </li>
    </ul>
    <div class="summary-discounts wrapper-half border">
      <h2>Discounts</h2>
      <ul>
        <li v-for="(promotion,index) in promotions" :key="`prom_${index}`">
          <span v-if="promotion.value > 0">{{promotion.description}}</span>
          <span v-if="promotion.value > 0">-{{getFormattedDecimal(promotion.value)}}</span>
        </li>
        <li v-for="(discount,index) in discounts" :key="`disc${index}`">
          <span v-if="discount.value > 0">{{discount.description}}</span>
          <span v-if="discount.value > 0">-{{getFormattedDecimal(discount.value)}}</span>
        </li>
      </ul>
    </div>
    <div class="summary-total wrapper">
      <ul>
        <li>
          <span class="summary-total-cost">Total cost</span>
          <span class="summary-total-price">{{getFormattedDecimal(total)}}</span>
        </li>
      </ul>
      <button type="submit">Checkout</button>
    </div>
  </aside>
</template>
<script>
// Domain
import ProductsDomain from "@/domain/ProductsDomain";
import PromotionsDomain from "@/domain/PromotionsDomain";
import DiscountsDomain from "@/domain/DiscountsDomain";
import ProductPositionsDomain from "@/domain/ProductPositionsDomain";

import NumbersUtilsMixin from '@/components/_mixins/NumbersUtilsMixin'
import Checkout from "@/domain/Checkout";

export default {
  name: "OrderSummaryContainer",
  components: {},
  mixins: [NumbersUtilsMixin],
  props: {
  },
  data() {
    return {
      productsDomain: this.createProductsDomain(),
      productPositionsDomain: this.createProductPositionsDomain(),
      promotionsDomain: this.createPromotionsDomain(),
      discountsDomain: this.createDiscountsDomain()
    };
  },
  computed: {
    checkOutClass() {
      return Checkout.createInstance(
        this.productsDomain,
        this.productPositionsDomain,
        this.discountsDomain,
        this.promotionsDomain
      );
    },
    productCounter() {
      return this.checkOutClass.getProductCounter()
    },
    subTotal() {
      return this.checkOutClass.getSubTotal();
    },
    total() {
      return this.checkOutClass.total();
    },
    promotions() {
      return this.checkOutClass.getPromotionPricesList();
    },
    discounts() {
      return this.checkOutClass.getDiscountPricesList();
    }
  },
  watch: {},
  //Lifecycle Events (in the order they are called)
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},

  methods: {
    createProductsDomain() {
      return ProductsDomain.createInstance();
    },
    createDiscountsDomain() {
      return DiscountsDomain.createInstance();
    },
    createPromotionsDomain() {
      return PromotionsDomain.createInstance();
    },
    createProductPositionsDomain() {
      return ProductPositionsDomain.createInstance();
    }
  }
};
</script>