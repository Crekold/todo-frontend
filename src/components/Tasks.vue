<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" v-for="task in tasks" :key="task.taskId">
        <v-card>
          <v-card-title>{{ task.nameTask }}</v-card-title>
          <v-card-subtitle>{{ task.dueDate }}</v-card-subtitle>
          <v-card-text>
            Estado: {{ task.status }}
            <br>
            Etiqueta: {{ getEtiqueta(task.etiquetaId) }}
          </v-card-text>
          <v-card-actions>
            <v-btn @click="toggleStatus(task)" color="secondary">Cambiar estado</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-speed-dial
      v-model="fab"
      absolute
      bottom
      right
      direction="top"
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="primary"
          dark
          fab
        >
          <v-icon>mdi-dots-vertical</v-icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
    
      </template>

      <v-btn 
        fab 
        dark 
        small 
        color="red" 
        @click="logout"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>

      <v-btn 
        fab 
        dark 
        small 
        color="blue" 
        @click="createTask"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-speed-dial>
    </v-row>
  </v-container>
</template>


<script>
import axios from 'axios';
import router from '../router';

export default {
  name: 'TasksList',
  data() {
    return {
      tasks: [],
      etiquetas: [],
      fab: false
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
