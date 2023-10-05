<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-4" v-for="task in tasks" :key="task.taskId">
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">{{ task.nameTask }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ task.dueDate }}</h6>
            <p class="card-text">Estado: {{ task.status }}</p>
            <p class="card-text">Etiqueta: {{ getEtiqueta(task.etiquetaId) }}</p>
          </div>
        </div>
      </div>
    </div>
    <button @click="logout" class="btn btn-primary">Cerrar sesión</button>
  </div>
</template>

<script>
import axios from 'axios';
import router from '../router';

export default {
  name: 'TasksList',
  data() {
    return {
      tasks: [],
      etiquetas: []
    };
  },
  methods: {
    getEtiqueta(id) {
      const etiqueta = this.etiquetas.find(e => e.idEtiqueta === id);
      return etiqueta ? etiqueta.etiqueta : '';
    },
    logout() {
      localStorage.removeItem('userId');
      router.push('/');
    }
  },
  async created() {
    try {
      let userId = localStorage.getItem('userId');
      
      const responseTasks = await axios.get(`http://localhost:8080/api/v1/task/user/${userId}`);
      this.tasks = responseTasks.data;

      const responseEtiquetas = await axios.get('http://localhost:8080/api/v1/etiqueta');
      this.etiquetas = responseEtiquetas.data;
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<style scoped>
.table {
  margin-top: 20px;
}
</style>
