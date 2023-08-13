import {createStore} from "vuex";
import {bookModule} from "@/store/bookModule";
import {cartModule} from "@/store/cartModule";

export default createStore({
    modules: {
        book: bookModule,
        cart: cartModule
    }
})