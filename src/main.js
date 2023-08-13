import App from './App'
import components from '@/components/UI'
import router from "@/router/router";
import directives from "@/directives";
import store from "@/store";
import 'vuetify/dist/vuetify.min.css'
import { createVuetify} from 'vuetify'
import {createApp} from "vue";

const app = createApp(App)
components.forEach(component => {
    app.component(component.name, component)
})

directives.forEach(directive => {
    app.directive(directive.name, directive)
})

const vuetify = createVuetify()

app
    .use(vuetify)
    .use(router)
    .use(store)

app.mount('#app')