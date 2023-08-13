<template>
    <transition-group name="book_list">
      <books-list-item
          v-for="book in books"
          :book="book"
          :key="book.id"
      />
    </transition-group>
</template>

<script>
import BooksListItem from "@/components/BooksListItem.vue";

export default {
  components: {
    BooksListItem
  },
  props: {
    books:{
      type:Array,
      required:true
    }
  }
}
</script>

<style lang="scss" scoped>
.book_list-item {
  display: inline-block;
  margin-right: 12px;
}
.book_list-enter-active,
.book_list-leave-active {
  transition: all 0.5s ease;
}
.book_list-enter-from,
.book_list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.book_list-move {
  transition: transform 0.5s ease;
}
</style>