import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Importa tu archivo de configuración de Vue Router
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const app = createApp(App)

// Configura Vue Router
app.use(router).use(VueSweetalert2)

app.mount('#app')
