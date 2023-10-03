<template>
    <div>
      <h1>Lista de Tareas</h1>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Nombre</th>
            <th>Fecha de Vencimiento</th>
            <th>Estado</th>
            <th>Etiqueta</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.taskId">
            <td>{{ task.taskId }}</td>
            <td>{{ task.nameTask }}</td>
            <td>{{ formatDate(task.dueDate) }}</td>
            <td>{{ task.status }}</td>
            <td>{{ getEtiquetaName(task.etiquetas_id_etiqueta) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
import axios from 'axios';

export default {
  name: 'TaskList',
  data() {
    return {
      tasks: [],
      etiquetas: [],
      etiquetasLoaded: false // Agregamos una bandera para verificar si las etiquetas se cargaron
    };
  },
  mounted() {
    // Realiza una solicitud GET a tu API para recuperar las tareas
    axios.get('http://localhost:8080/api/v1/task')
      .then(response => {
        this.tasks = response.data;
        this.checkIfEtiquetasLoaded(); // Llama a la función para verificar si las etiquetas se cargaron
      })
      .catch(error => {
        console.error('Error al recuperar las tareas:', error);
      });
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    async loadEtiquetas() {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/etiqueta');
        this.etiquetas = response.data;
        this.etiquetasLoaded = true; // Marca las etiquetas como cargadas
        this.checkIfEtiquetasLoaded(); // Llama a la función para verificar si las etiquetas se cargaron
      } catch (error) {
        console.error(error);
      }
    },
    checkIfEtiquetasLoaded() {
      // Verifica si tanto las tareas como las etiquetas se han cargado antes de mostrar la información
      if (this.tasks.length > 0 && this.etiquetasLoaded) {
        // Ambas listas se han cargado, puedes mostrar la información aquí
      }
    },
    getEtiquetaName(etiquetaId) {
      // Buscar la etiqueta correspondiente por su ID
      const etiqueta = this.etiquetas.find(e => e.idEtiqueta === etiquetaId);
      if (etiqueta) {
        return etiqueta.etiquetaNombre;
      }
      return 'Etiqueta no encontrada'; // O maneja el caso si la etiqueta no se encuentra
    }
  },
  created() {
    this.loadEtiquetas();
  },
};
</script>

  <style>
  /* Puedes personalizar los estilos aquí según tus necesidades */
  </style>
  