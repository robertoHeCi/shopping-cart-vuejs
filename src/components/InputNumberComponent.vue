<template>
  <div class="col-quantity">
    <button
      class="count"
      @click="onCounterDecrements"
    >
      -
    </button>
    <input
      type="number"
      class="product-quantity"
      :value="value"
      disabled
    >
    <button
      class="count"
      @click="onCounterIncrements"
    >
      +
    </button>
  </div>
</template>
<script>
export default {
  name: "InputNumberComponent",
  components: {},
  mixins: [],
  props: {
    value: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    onCounterIncrements() {
      return this.$emit('onCounterIncrements')
    },
    onCounterDecrements() {
      if(this.value>0){
        return this.$emit('onCounterDecrements')
      }
    }
  }
}
</script>