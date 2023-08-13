import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import {getRandomImage} from "@/directives/getRandomImage";

export const bookModule = {
    state: () => ({
        books: [],
        isPostsLoading:false,
        selectedSort: '',
        searchQuery: '',
        selectedGenre: '',
        selectedBook: null,
        sortOptions: [
            { value:'price', name: 'По цене' },
            { value:'yearOfPublishing', name: 'По году' }
        ],
        editedBook: { id: "", data: {} },
    }),
    getters: {
        sortedBooks(state) {
            return [...state.books].sort((book1,book2)=> {
                return book1[state.selectedSort]?.localeCompare(book2[state.selectedSort])
            })
        },
        sortedAndSearchedBooks(state, getters) {
            return getters.sortedBooks.filter(book =>
                book.name.toLowerCase().includes(state.searchQuery.toLowerCase())
                && (state.selectedGenre === '' || book.genre === state.selectedGenre)
            )
        },
    },
    mutations: {
        setBooks(state,books) {
            state.books = books;
        },
        setLoading(state,bool) {
            state.isBooksLoading = bool;
        },
        setSelectedSort(state,selectedSort) {
            state.selectedSort = selectedSort
        },
        setSearchQuery(state,searchQuery) {
            state.searchQuery = searchQuery
        },
        setSelectedGenre(state,selectedGenre) {
            state.selectedGenre = selectedGenre
        },
        addBook(state, book) {
            state.books.push(book);
        },
        removeBook(state, bookId) {
            state.books = state.books.filter(book => book.id !== bookId);
        },
        updateBooks(state, books) {
            state.books = books
        },
        setEditedBook(state, { id, data }) {
            state.editedBook = { id, data };
        },
    },
    actions: {
        async fetchBooks({state,commit}) {
            try {
                commit('setLoading',true) //Вызываем мутацию "setLoading"
                const response = await axios.get('http://localhost:3004/books');
                commit('setBooks',response.data)
            } catch (e) {
                alert('Ошибка')
            } finally {
                commit('setLoading',false);
            }
        },
        async addBook({ commit }, payload) {
            const newBook = {
                id: uuidv4(),
                name: payload.name,
                author: payload.author,
                genre: payload.genre,
                yearOfPublishing: payload.yearOfPublishing,
                price: payload.price,
                cover: getRandomImage(),
            };
            await axios.post("http://localhost:3004/books", newBook);
            commit("addBook", newBook);
        },
        async deleteBook({ commit }, bookId) {
            await axios.delete(`http://localhost:3004/books/${bookId}`);
            commit('removeBook', bookId);
        },
        async updateBook({ commit }, { id, data }) {
            await axios.put(`http://localhost:3004/books/${id}`, data);
            const response = await axios.get("http://localhost:3004/books");
            commit("updateBooks", response.data);
            commit("setEditedBook", { id: "", data: {} });
        },
    },
    namespaced: true
}