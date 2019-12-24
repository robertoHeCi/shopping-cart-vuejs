<template>
  <main class="main-container">
    <ShoppingCartContainer />
    <OrderSummaryContainer />
  </main>
</template>

<script>
import OrderSummaryContainer from "@/containers/OrderSummaryContainer";
import ShoppingCartContainer from "@/containers/ShoppingCartContainer";

export default {
  name: "Home",
  components: { ShoppingCartContainer, OrderSummaryContainer }
};
</script>