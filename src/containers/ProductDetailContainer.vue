<template>
  <main class="main-container" v-if="product!=null">
    <section class="product-details-image">
      <img :src="productImage" :alt="productDescriptionAlt" />
    </section>
    <aside class="product-details">
      <ul>
        <li class="product-details-close" @click="returnToHomePage">
          <img :src="productDetailCloseIcon" alt="close-product" />
        </li>
        <li class="wrapper-half border">
          <span>{{product.description}}</span>
          <span>
            {{product.price}}
            <span class="currency">€</span>
          </span>
        </li>
      </ul>
      <div class="wrapper border">
        <p class="product-details-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sodales semper elit sit amet interdum.
          Praesent volutpat sed elit vel consectetur. Nulla tempus tincidunt ex, sit amet semper ipsum imperdiet varius.
          In rutrum aliquam nisl, sagittis faucibus felis bibendum id.
        </p>
      </div>
      <ul>
        <li class="border-top product-details-code">
          <span>Product code {{product.code}}</span>
        </li>
      </ul>
      <button type="submit" @click="onCounterIncrements">Add to cart</button>
    </aside>
  </main>
</template>
<script>
// Domain
import ProductsDomain from "@/domain/ProductsDomain";
import PromotionsDomain from "@/domain/PromotionsDomain";
import ProductPositionsDomain from "@/domain/ProductPositionsDomain";
import DiscountsDomain from "@/domain/DiscountsDomain";
import Checkout from "@/domain/Checkout";

import _isNull from "lodash/isNull";
export default {
  name: "ProductDetailContainer",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      product: null,
      productsDomain: this.createProductsDomain(),
      promotionsDomain: this.createPromotionsDomain(),
      discountsDomain: this.createDiscountsDomain(),
      productPositionsDomain: this.createProductPositionsDomain()
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
    productDetailCloseIcon() {
      return require(`@/assets/img/close.svg`);
    },
    productImage() {
      return !_isNull(this.product)
        ? require(`@/assets/img/${this.product.image_xl}`)
        : "";
    },
    productDescriptionAlt() {
      return !_isNull(this.product)
        ? `${this.product.description
            .charAt(0)
            .toUpperCase()}${this.product.description.slice(1)}`
        : "";
    }
  },
  watch: {},
  //Lifecycle Events (in the order they are called)
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    const productId = this.$route.params.id;
    this.product = this.productsDomain.storeRepository.getByData([
      { id: productId }
    ]);
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
    returnToHomePage() {
      this.$router.push({ name: "home" });
    },
    onCounterIncrements() {
      this.checkOutClass.scan(this.product.code);
      this.returnToHomePage();
    }
  }
};
</script>