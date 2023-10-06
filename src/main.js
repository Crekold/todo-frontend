import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Importa tu archivo de configuración de Vue Router
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
  })

const app = createApp(App)

// Configura Vue Router
app.use(router).use(VueSweetalert2).use(vuetify)

app.mount('#app')
