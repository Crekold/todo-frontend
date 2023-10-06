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
        <button type="button" class="btn btn-secondary mb-4 ml-2" @click="showTagModal">Gestionar Etiquetas</button>
        <select class="form-control" id="etiquetaId" v-model.number="etiquetaId">
          <option v-for="(etiqueta, index) in etiquetas" :key="index" :value="etiqueta.idEtiqueta">{{ etiqueta.etiqueta }}</option>
        </select>
      </div>
      <div class="d-flex justify-content-center mt-4">
        <button type="submit" class="btn btn-primary mr-2">Crear tarea</button>
        <button type="button" class="btn btn-secondary" @click="goToTasks">Volver</button>
      </div>
    </form>
  </div>
 
<!-- Manage Tags Modal -->
<div class="modal fade" id="manageTagsModal" tabindex="-1" aria-labelledby="manageTagsModalLabel" aria-hidden="true">
  <div class="modal-dialog">
      <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title" id="manageTagsModalLabel">Gestionar Etiquetas</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">

              <!-- Lista de etiquetas con botones de edición -->
              <ul class="list-group mb-4">
                <li v-for="(etiqueta, index) in etiquetas" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
                  {{ etiqueta.etiqueta }}
                  <button class="btn btn-sm btn-warning" @click="startEditTag(etiqueta)">Editar</button>
                  <button class="btn btn-sm btn-danger" @click="deleteTag(etiqueta)">Borrar</button>
                </li>
              </ul>

              <!-- Formulario para agregar o editar etiquetas -->
              <form @submit.prevent="handleFormSubmit">

                  <div class="mb-3">
                      <label for="tagName" class="form-label">Nombre de la Etiqueta</label>
                      <input type="text" class="form-control" id="tagName" v-model="newTag.name" required>
                  </div>
                  <!-- Botones condicionales: "Guardar Cambios" para editar y "Agregar Etiqueta" para añadir -->
                  <button v-if="editingTag" type="submit" class="btn btn-warning">Guardar Cambios</button>
                  <button v-else type="submit" class="btn btn-primary">Agregar Etiqueta</button>


              </form>
          </div>
      </div>
  </div>
</div>


</template>

<script>
import axios from 'axios';
import router from '../router';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';

export default {
  name: 'CreateTask',
  data() {
    return {
      nameTask: '',
      dueDate: '',
      status: 'pendiente',
      etiquetaId: null,
      etiquetas: [],
      newTag: {
          name: ''
      },
      editingTag: null,
    };
  },
  methods: {
    showTagModal() {
      var myModal = new Modal(document.getElementById('manageTagsModal'), {focus: true});
      myModal.show();
  },
  goToTasks() {
      router.push('/tasks');
    },
  handleFormSubmit() {
        if (this.editingTag) {
            this.saveEditTag();
        } else {
            this.addTag();
        }
    },
  startEditTag(tag) {
this.editingTag = tag;
this.newTag.name = tag.etiqueta;
},
async deleteTag(tag) {
  try {
      const response = await axios.delete(`http://localhost:8080/api/v1/etiqueta/${tag.idEtiqueta}`);
      if (response.status === 200) {
          const index = this.etiquetas.findIndex(etiqueta => etiqueta.idEtiqueta === tag.idEtiqueta);
          this.etiquetas.splice(index, 1);
          Swal.fire('¡Eliminado!', 'La etiqueta ha sido eliminada con éxito.', 'success');
      } else {
          Swal.fire('Error', 'No se pudo eliminar la etiqueta.', 'error');
      }
  } catch (error) {
      Swal.fire('Error', 'No se pudo eliminar la etiqueta.', 'error');
      console.error(error);
  }
},

async saveEditTag() {
try {
  const response = await axios.put(`http://localhost:8080/api/v1/etiqueta/${this.editingTag.idEtiqueta}`, {
    etiqueta: this.newTag.name
  });
  if (response.status === 200) {
    const index = this.etiquetas.findIndex(etiqueta => etiqueta.idEtiqueta === this.editingTag.idEtiqueta);
    this.etiquetas[index].etiqueta = this.newTag.name;
    this.editingTag = null;
    Swal.fire('¡Actualizado!', 'La etiqueta ha sido actualizada con éxito.', 'success');
  } else {
    Swal.fire('Error', 'No se pudo actualizar la etiqueta.', 'error');
  }
} catch (error) {
  Swal.fire('Error', 'No se pudo actualizar la etiqueta.', 'error');
  console.error(error);
}
},
  async addTag() {
    console.log("Intentando agregar etiqueta...");
  try {
      const response = await axios.post('http://localhost:8080/api/v1/etiqueta', {etiqueta: this.newTag.name, idUsuario: localStorage.getItem('userId')});
      console.log("ola")
      if (response.status === 201) {
          this.etiquetas.push(response.data);
          Swal.fire('¡Agregado!', 'La etiqueta ha sido agregada con éxito.', 'success');
          // Opcional: Cierra el modal después de agregar la etiqueta
          const modalInstance = Modal.getInstance(document.getElementById('manageTagsModal'));
          if (modalInstance) modalInstance.hide();
      } else {
          Swal.fire('Error', 'No se pudo agregar la etiqueta.', 'error');
      }
  } catch (error) {
      Swal.fire('Error', 'No se pudo agregar la etiqueta.', 'error');
      console.error(error);
  }
},
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

select.form-control {
  border-radius: 0.25rem;
  border: 1px solid #ced4da;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

select.form-control:focus {
  border-color: #86b7fe;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
</style>
