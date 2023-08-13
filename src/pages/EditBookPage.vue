<template>
  <v-app id="inspire">
    <v-system-bar>
      <v-spacer />
    </v-system-bar>
    <v-app-bar>
      <v-toolbar-title style="margin-left: 34px">Книжный магазин</v-toolbar-title>
      <base-button style="margin-left: 4px" @click="$router.push('/')">Главная</base-button>
      <base-button style="margin-left: 4px" @click="$router.push('/cart')">Корзина</base-button>
      <base-button style="margin-left: 4px;margin-right: 24px;" :class="{ active: $route.path === '/edit' }" @click="$router.push('/edit')">Редактирование</base-button>
    </v-app-bar>
    <v-main class="bg-grey-lighten-2">
      <!-- Форма выбора книги -->
      <v-container v-if="books.length > 0">
        <v-card>
          <v-card-title>Выбор книги</v-card-title>
          <v-row align="center" justify="center">
            <v-col cols="12" md="12">
              <div class="select-wrapper">
                <select v-model="selectedBook" @change="handleSelectBook">
                  <option value="" disabled>Выберите книгу</option>
                  <option v-for="book in books" :value="book.id" :key="book.id">{{ book.name }}</option>
                </select>
              </div>
            </v-col>
            <v-col cols="12" md="12" class="d-flex justify-end">
              <v-card-actions>
                <v-btn color="error" @click="handleCancelEdit"><v-icon>mdi-close</v-icon>Отмена</v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
      <!-- Форма редактирования книги -->
      <v-container>
        <v-card>
          <v-card-title>Создание / Редактирование книги</v-card-title>

          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field v-model="bookData.name" label="Название"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="bookData.author" label="Автор"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="bookData.genre" label="Жанр"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="bookData.yearOfPublishing" label="Год издания"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="bookData.price" label="Цена"></v-text-field>
            </v-col>
          </v-row>

          <v-card-actions>
            <v-btn color="green" @click="handleAddBook" v-if="!selectedBook">Создать</v-btn>
            <v-btn color="primary" @click="handleAddBook" v-else><v-icon>mdi-book</v-icon>Сохранить</v-btn>
            <v-btn color="error" @click="handleDeleteBook" v-show="selectedBook"><v-icon>mdi-delete</v-icon>Удалить</v-btn>
            <v-btn color="error" @click="handleCancelEdit"><v-icon>mdi-close</v-icon>Сброс</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import BaseButton from "@/components/UI/BaseButton.vue";
import BaseInput from "@/components/UI/BaseInput.vue";
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  data() {
    return {
      bookData: {
        name: "",
        author: "",
        genre: "",
        yearOfPublishing: "",
        price: "",
        cover: "",
      },
      selectedBook: "",
    };
  },
  components: { BaseInput, BaseButton },
  methods: {
    ...mapActions({
      addBook: "book/addBook",
      fetchBooks: 'book/fetchBooks',
      deleteBook: 'book/deleteBook',
      updateBook: 'book/updateBook',
    }),
    ...mapMutations({
      setEditedBook: 'book/setEditedBook',
    }),
    async handleAddBook() {
      if (!this.editedBook?.id)  {
        await this.addBook(this.bookData);
      } else {
        await this.updateBook({
          id: this.editedBook.id,
          data: this.bookData,
        });
      }
    },
    async handleDeleteBook() {
      await this.deleteBook(this.selectedBook);
      this.selectedBook = "";
    },
    handleSelectBook(event) {
      const selectedId = event.target.value;
      if (selectedId) {
        const selectedBook = this.books.find((book) => book.id === selectedId);
        this.$store.commit("book/setEditedBook", {
          id: selectedBook.id,
          data: selectedBook,
        });
        this.bookData = selectedBook;
      } else {
        this.$store.commit("book/setEditedBook", { id: "", data: {} });
        this.bookData = {
          name: "",
          author: "",
          genre: "",
          yearOfPublishing: "",
          price: "",
          cover: "",
        };
      }
    },
    handleCancelEdit() {
      this.$store.commit("book/setEditedBook", { id: "", data: {} });
      this.selectedBook = "";
      this.bookData = {
        name: "",
        author: "",
        genre: "",
        yearOfPublishing: "",
        price: "",
        cover: "",
      };
    },
  },
  computed: {
    ...mapState({
      books: (state) => state.book.books,
      editedBook: (state) => state.book.editedBook,
    }),
  },
  created() {
    this.$store.dispatch('book/fetchBooks');
  },
};
</script>

<style lang="scss" scoped>
.active {
  background: #e0e0e0;
}
form {
  display: flex;
  flex-direction: column;
  margin-left: 24px;
}
form button {
  float: right;
  display: inline-block;
  height: 50px;
  width: 240px;
  margin: 20px 0 0 25px;
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
form button:hover {
  background-color: #084154;
}
.select-wrapper {
  position: relative;
}
.select-wrapper select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  appearance: none;
}
.select-wrapper select:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 3px #4CAF50;
}
.select-wrapper .v-select__selection {
  display: block;
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
}
.select-wrapper .v-select__selection:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 3px #4CAF50;
}
.select-wrapper .v-select__selection .v-select__selection__comma {
  display: none;
}
.select-wrapper .v-select__selection .v-select__selection__overflow {
  display: none;
}
.select-wrapper .v-select__selection-list {
  position: absolute;
  z-index: 9999;
  top: calc(100% + 5px);
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: scroll;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0,0,0,0.1);
}
.select-wrapper .v-select__selection-list .v-select__selection-list__tile.v-list-item--active {
  background-color: #4CAF50;
  color: #fff;
}
.select-wrapper .v-select__selection-list .v-select__selection-list__tile:hover {
  background-color: #f2f2f2;
  color: #333;
}
</style>