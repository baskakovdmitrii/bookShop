<template>
  <div class="book">
      <div class="wrapper">
        <div class="product-img">
          <img :src="book.cover" width="300" height="420">
        </div>
        <div class="product-info">
          <div class="product-text">
            <h1>{{ book.name }}</h1>
            <div class="product-descr">
            <h2>Автор:&nbsp;{{ book.author }}</h2>
            <h2>Жанр:&nbsp;&nbsp;{{ book.genre }}</h2>
            <h2>Год:&nbsp;{{ book.yearOfPublishing }}</h2>
            </div>
          </div>
          <div class="product-price-btn">
            <p><span>{{ book.price }}</span>₽&nbsp;</p>
            <button type="button" @click="addToCart(book)">В корзину</button>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import BaseButton from "@/components/UI/BaseButton.vue";
import { mapActions } from "vuex";


export default {
  components: {
    BaseButton
  },
  methods: {
    ...mapActions(['addToCart'])
  },
  props: {
    book: {
      type:Object,
      required:true,
    }
  }
}
</script>

<style lang="scss" scoped>
.book {
  margin-top: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.book_btns {
  display: flex;
}
body {
  background-color: #fdf1ec;
}

.wrapper {
  height: 420px;
  width: 570px;
  border-radius: 7px 7px 7px 7px;
  -webkit-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 14px 32px 0px rgba(0, 0, 0, 0.15);
}

.product-img {
  float: left;
  height: 420px;
  width: 300px;
}

.product-img img {
  border-radius: 7px 0 0 7px;
}

.product-info {
  float: left;
  height: 420px;
  width: 269px;
  border-radius: 0 7px 10px 7px;
  background-color: #ffffff;
}

.product-text {
  height: 300px;
  width: 269px;
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
  height: 103px;
  width: 269px;
  margin-top: 17px;
  position: relative;
  align-items: center;
  vertical-align:middle;
  display: flex;
  justify-content: center;
}

.product-price-btn p {
  display: inline-block;
  position: absolute;
  top: -30px;
  height: 50px;
  font-family: 'Trocchi', serif;
  margin: 0 0 0 14px;
  font-size: 28px;
  font-weight: lighter;
  color: #474747;
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
  width: 176px;
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