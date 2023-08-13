<template>
  <v-app id="inspire">
    <v-system-bar>
      <v-spacer/>
    </v-system-bar>
    <v-app-bar>
      <v-toolbar-title
          style="margin-left: 34px;"
      >
          Книжный магазин
      </v-toolbar-title>
      <base-input
          :model-value="searchQuery"
          @update:model-value="setSearchQuery"
          placeholder="Поиск..."
      >
      </base-input>
      <base-button
          style="margin-left: 14px"
          :class="{ active: $route.path === '/' }"
          @click="$router.push('/')"
      >
          Главная
      </base-button>
      <base-button
          style="margin-left: 4px"
          @click="$router.push('/cart')"
      >
          Корзина
      </base-button>
      <base-button
          style="margin-left: 4px;
          margin-right: 24px;"
          @click="$router.push('/edit')"
      >
          Редактирование
      </base-button>
    </v-app-bar>
    <v-main class="bg-grey-lighten-2">
      <div class="options">
      <base-select
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
          :options="sortOptions"
      >
      </base-select>
        <v-radio-group
            inline
            class="radio"
            :model-value="selectedGenre"
            @update:model-value="setSelectedGenre"
        >
          <v-radio label="Все жанры" value=""></v-radio>
          <v-radio label="Русское фэнтези" value="Русское фэнтези"></v-radio>
          <v-radio label="Зарубежное фэнтези" value="Зарубежное фэнтези"></v-radio>
          <v-radio label="Русские боевики" value="Русские боевики"></v-radio>
        </v-radio-group>
      </div>
      <v-container>
        <v-row>
          <books-list
              :books="sortedAndSearchedBooks"
          />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import '@mdi/font/css/materialdesignicons.min.css';
import {mapState, mapGetters, mapActions, mapMutations} from "vuex";
import BaseInput from "@/components/UI/BaseInput.vue";
import BaseSelect from "@/components/UI/BaseSelect.vue";
import BaseButton from "@/components/UI/BaseButton.vue";
import BooksList from "@/components/BooksList.vue";
export default {
  components: {
    BooksList,
    BaseInput,
    BaseSelect,
    BaseButton
  },
  methods: {
    ...mapMutations({
      // setPage
      setSearchQuery:'book/setSearchQuery',
      setSelectedSort:'book/setSelectedSort',
      setSelectedGenre:'book/setSelectedGenre'
    }),
    ...mapActions({
      fetchBooks: 'book/fetchBooks'
    }),
  },
  mounted() {
    this.fetchBooks();
  },

  computed: {
    ...mapState({
      books: state => state.book.books,
      selectedSort: state => state.book.selectedSort,
      searchQuery: state => state.book.searchQuery,
      selectedGenre: state => state.book.selectedGenre,
      sortOptions: state => state.book.sortOptions,
    }),
    ...mapGetters({
      sortedBooks: 'book/sortedBooks',
      sortedAndSearchedBooks: 'book/sortedAndSearchedBooks',
    })
  }
}
</script>

<style scoped>
.active {
  background: #e0e0e0;
}
.options {
  display: flex;
  justify-content: left;
  align-items: center;
}
.radio {
  margin-top: 20px;
}
</style>