<template>
    <div class="container">
      <h2 class="text-center text-primary mb-4">Crear tarea</h2>
      <form @submit.prevent="createTask">
        <div class="form-group">
          <label for="nameTask">Nombre de la tarea</label>
          <input type="text" class="form-control" id="nameTask" v-model="nameTask">
        </div>
        <div class="form-group">
          <label for="dueDate">Fecha de vencimiento</label>
          <input type="date" class="form-control" id="dueDate" v-model="dueDate">
        </div>
        <div class="form-group">
          <label for="status">Estado</label>
          <select class="form-control" id="status" v-model="status">
            <option value="pendiente">Pendiente</option>
            <option value="completada">Completada</option>
          </select>
        </div>
        <div class="form-group">
          <label for="etiquetaId">Etiqueta</label>
          <select class="form-control" id="etiquetaId" v-model.number="etiquetaId">
            <option v-for="(etiqueta, index) in etiquetas" :key="index" :value="etiqueta.idEtiqueta">{{ etiqueta.etiqueta }}</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Crear tarea</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import router from '../router';
  import Swal from 'sweetalert2';
  
  export default {
    name: 'CreateTask',
    data() {
      return {
        nameTask: '',
        dueDate: '',
        status: 'pendiente',
        etiquetaId: null,
        etiquetas: []
      };
    },
    methods: {
      async createTask() {
        try {
          const userId = localStorage.getItem('userId');
          
          const response = await axios.post('http://localhost:8080/api/v1/task', {
            nameTask: this.nameTask,
            dueDate: this.dueDate,
            status: this.status,
            userId: userId,
            etiquetaId: this.etiquetaId
          });
    
          if (response.status === 200) {
          Swal.fire(
            '¡Tarea creada!',
            'La tarea se ha creado exitosamente.',
            'success'
          );
          router.push('/tasks');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Hubo un error al crear la tarea!'
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Hubo un error al crear la tarea!'
        });
        console.error(error);
      }
    }
    },
    async created() {
      try {
        const userId = localStorage.getItem('userId');
        
        const response = await axios.get(`http://localhost:8080/api/v1/etiqueta/user/${userId}`);
        this.etiquetas = response.data;
      } catch (error) {
        console.error(error);
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    margin-top: 50px;
  }
  </style>
  