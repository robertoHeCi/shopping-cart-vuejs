<template>
  <div class="col-product">
    <figure class="product-image">
      <img :src="productImage" :alt="productDescriptionAlt" @click="onProductDetailsClick" />
      <div class="product-description">
        <h1>{{product.description}}</h1>
        <p class="product-code">Product code {{product.code}}</p>
      </div>
    </figure>
  </div>
</template>
<script>
export default {
  name: "ProductComponent",
  components: {},
  mixins: [],
  props: {
    product: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data() {
    return {};
  },
  computed: {
    productImage() {
      return require(`@/assets/img/${this.product.image}`);
    },
    productDescriptionAlt() {
      return `${this.product.description
        .charAt(0)
        .toUpperCase()}${this.product.description.slice(1)}`;
    }
  },
  watch: {},
  methods: {
    onProductDetailsClick() {
      this.$emit("onProductDetailsClick", this.product.id);
    }
  }
}
</script>