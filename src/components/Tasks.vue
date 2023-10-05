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
            <button @click="toggleStatus(task)" class="btn btn-secondary">Cambiar estado</button>
          </div>
        </div>
      </div>
    </div>
    <button @click="logout" class="btn btn-danger logout-btn">Cerrar sesión</button>
    <button @click="createTask" class="btn btn-primary create-btn">Crear tarea</button>
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
    },
    createTask() {
      router.push('/create-task');
    },
    async toggleStatus(task) {
      try {
        const newStatus = task.status === 'pendiente' ? 'completada' : 'pendiente';
        const response = await axios.put(`http://localhost:8080/api/v1/task/${task.taskId}`, { status: newStatus });
        
        if (response.status === 200) {
          task.status = newStatus;
        } else {
          console.error('Error al cambiar el estado de la tarea');
        }
      } catch (error) {
        console.error(error);
      }
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

.logout-btn {
  position: fixed;
  bottom: 20px;
  left: 20px;
}

.create-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>
