<template>
<!--  <div class="cart-item">-->
<!--    <div class="cart-item__image">-->
<!--      <img :src="book.cover" width="80" height="112">-->
<!--    </div>-->
<!--    <div class="cart-item__info">-->
<!--      <h2>{{ book.name }}</h2>-->
<!--      <p>{{ book.author }}</p>-->
<!--      <p>{{ book.genre }}</p>-->
<!--      <p>{{ book.yearOfPublishing }}</p>-->
<!--      <p>Количество: {{ book.quantity }}</p>-->
<!--      <p>Цена: {{ book.price }}₽</p>-->
<!--      <p>Общая стоимость: {{ total }}₽</p>-->
<!--      <base-button @click="removeFromCart(book)">Удалить</base-button>-->
<!--    </div>-->
<!--  </div>-->
  <div class="book">
    <div class="wrapper">
      <div class="product-img">
        <img :src="book.cover" width="150" height="210">
      </div>
      <div class="product-info">
        <div class="product-text">
          <h1>{{ book.name }}</h1>
          <div class="product-descr">
            <h2>Автор:&nbsp;{{ book.author }}</h2>
            <h2>Жанр:&nbsp;&nbsp;{{ book.genre }}</h2>
            <h2>Год:&nbsp;{{ book.yearOfPublishing }}</h2>
            <h2>&nbsp;</h2>
            <h3>Цена: <strong>{{ book.price }}₽</strong></h3>
            <h3>Кол-во: <strong>{{ book.quantity }}</strong></h3>
            <h3>Общая стоимость: <strong>{{ total }}₽</strong></h3>
          </div>
        </div>
        <div class="product-price-btn">
          <v-btn icon color="error" @click="removeFromCart(book)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/UI/BaseButton.vue";

export default {
  components: {BaseButton},
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  computed: {
    total() {
      return this.book.price * this.book.quantity;
    }
  },
  methods: {
    removeFromCart(book) {
      this.$store.dispatch('removeFromCart', book);
    }
  }
}
</script>

<style scoped>
.book {
  margin-top: 10px;
  padding: 10px 10px 10px 40px;
  display: flex;
  align-items: center;
  justify-content: left;
}

.wrapper {
  height: 210px;
  min-width: 800px;
  border-radius: 7px 7px 7px 7px;
  -webkit-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
}

.product-img {
  float: left;
}

.product-img img {
  border-radius: 7px 0 0 7px;
}

.product-info {
  float: left;
  height: 210px;
  min-width: 800px;
  border-radius: 0 7px 10px 7px;
  display: flex;
  flex-direction: row;
  background-color: white;
}

.product-text {
  height: 210px;
  min-width: 386px;
}

.product-descr {
  position: relative;

}

.product-text h1 {
  margin: 0 0 4px 38px;
  padding-top: 10px;
  font-size: 24px;
  color: #474747;
}

.product-text h1,
.product-price-btn p {
  font-family: 'Bentham', serif;
}

.product-text h2 {
  margin: 0 0 4px 38px;
  font-size: 11px;
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  color: lightslategrey;
  letter-spacing: 0.2em;
}
.product-text h3 {
  margin: 0 0 4px 38px;
  font-size: 11px;
  font-family: 'Raleway', sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  color: black;
  letter-spacing: 0.2em;
}


.product-text p {
  height: 125px;
  margin: 0 0 0 38px;
  font-family: 'Playfair Display', serif;
  color: #8d8d8d;
  line-height: 1.7em;
  font-size: 15px;
  font-weight: lighter;
  overflow: hidden;
}

.product-price-btn {
  width: 269px;
  margin-left: 130px;
  align-items: center;
  vertical-align:middle;
  display: flex;
  justify-content: flex-end;
}

span {
  display: inline-block;
  height: 50px;
  font-family: 'Suranna', serif;
  font-size: 34px;
  margin-right: 4px;
}

.product-price-btn button {
  float: right;
  display: inline-block;
  height: 50px;
  width: 50px;
  margin: 0 0 0 0;
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

.product-price-btn button:hover {
  background-color: #084154;
}
</style>