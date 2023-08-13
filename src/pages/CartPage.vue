<template>
  <v-app id="inspire">
    <v-system-bar>
      <v-spacer></v-spacer>
    </v-system-bar>
    <v-app-bar>
      <v-toolbar-title style="margin-left: 34px">Книжный магазин</v-toolbar-title>
      <base-button style="margin-left: 4px" @click="$router.push('/')">Главная</base-button>
      <base-button style="margin-left: 4px" :class="{ active: $route.path === '/cart' }" @click="$router.push('/cart')">Корзина </base-button>
      <base-button style="margin-left: 4px;margin-right: 24px;" @click="$router.push('/edit')">Редактирование</base-button>
    </v-app-bar>
    <v-main class="bg-grey-lighten-2">
      <div class="cart-container">
        <div v-if="cartItems.length" class="cart-total">
          <div v-for="book in cartItems" :key="book.id">
            <cart-item :book="book"></cart-item>
          </div>
          <div class="cart-total-text">
            <h3>Общая стоимость: {{ cartTotal }}&nbsp;₽</h3>
            <button @click="clearCart">Очистить корзину</button>
          </div>
        </div>
        <div v-else>
          <h3>Корзина пуста</h3>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import BaseButton from "@/components/UI/BaseButton.vue";
import CartItem from '@/components/CartItem.vue';
import { mapActions,mapGetters } from 'vuex';
export default {
  components: {BaseButton,CartItem},
  computed: {
    ...mapGetters(['cartItems', 'cartTotal'])
  },
  methods: {
    ...mapActions(['addToCart']),
    ...mapActions(['clearCart'])
  }
}
</script>

<style lang="scss" scoped>
.active {
  background: #e0e0e0;
}
.cart-container h2 {
  margin-left: 14px;
}
.cart-container {
  display: flex;
  flex-direction: row;

}
.cart-total {
  display: flex;
  flex-direction: column;
}
.cart-total-text{
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 66%;
  top: 128px;
  width: 400px;
  height: 210px;
  background: white;
  border-radius: 10px 7px 10px 7px;
  -webkit-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
}
.cart-total-text h3 {
  margin: 90px 0 0 0;
  font-size: 24px;
  color: #474747;
  font-family: 'Bentham', serif;
}
.cart-total-text button {
  float: right;
  display: inline-block;
  height: 50px;
  width: 240px;
  margin: 20px 0 0 0;
  box-sizing: border-box;
  border: transparent;
  border-radius: 60px;
  font-family: 'Raleway', sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #ffffff;
  background-color: #039EA3;
  cursor: pointer;
  outline: none;
}
.cart-total button:hover {
  background-color: #084154;
}

</style>