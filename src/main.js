import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Importa tu archivo de configuración de Vue Router
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const app = createApp(App)

// Configura Vue Router
app.use(router)

app.mount('#app')
