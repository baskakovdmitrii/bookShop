export const cartModule = {
    state: {
        cartItems: []
    },
    getters: {
        cartItems: state => {
            return state.cartItems.map(item => ({ ...item, total: item.price * item.quantity }));
        },
        cartTotal: state => {
            const total = state.cartItems.reduce((total, item) => total + parseFloat(item.total), 0);
            return `${total.toLocaleString()}`;
        },

    },
    mutations: {
        addToCart(state, book) {
            const index = state.cartItems.findIndex(item => item.id === book.id);
            if (index === -1) {
                state.cartItems.push({...book, quantity: 1});
            } else {
                state.cartItems[index].quantity++;
            }
        },
        removeFromCart(state, book) {
            const index = state.cartItems.findIndex(item => item.id === book.id);
            if (index !== -1) {
                if (state.cartItems[index].quantity === 1) {
                    state.cartItems.splice(index, 1);
                } else {
                    state.cartItems[index].quantity--;
                }
            }
        },
        clearCart(state) {
            state.cartItems = [];
        },
        incrementCartItemQuantity(state, index) {
            state.cartItems[index].quantity++;
        },
        updateCartItemTotal(state, index) {
            const item = state.cartItems[index];
            item.total = item.price * item.quantity;
        }
    },
    actions: {
        addToCart({ commit, state }, book) {
            const index = state.cartItems.findIndex(item => item.id === book.id);
            if (index !== -1) {
                commit('incrementCartItemQuantity', index);
                commit('updateCartItemTotal', index);
            } else {
                commit('addToCart', {...book, quantity: 1, total: book.price});
            }
        },
        removeFromCart({ commit }, book) {
            commit('removeFromCart', book);
        },
        clearCart({ commit }) {
            commit('clearCart');
        }

    }
};