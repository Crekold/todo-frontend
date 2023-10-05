<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="login">
                <div class="form-group">
                  <label for="username">Nombre de usuario</label>
                  <input type="text" class="form-control" id="username" v-model="username">
                </div>
                <div class="form-group">
                  <label for="password">Contraseña</label>
                  <input type="password" class="form-control" id="password" v-model="password">
                </div>
                <button type="submit" class="btn btn-primary">Iniciar sesión</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import router from '../router';
  import Swal from 'sweetalert2';
  
  export default {
    name:'LoginPage',
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://localhost:8080/api/v1/login', {
            username: this.username,
            password: this.password
          });
  
          const [status, userId] = response.data.split(', ');
  
          if (status === '1') {
            localStorage.setItem('userId', userId);
            router.push('/tasks');
            Swal.fire(
              '¡Inicio de sesión exitoso!',
              'Has iniciado sesión correctamente.',
              'success'
            );
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: '¡Inicio de sesión fallido!'
            });
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .container {
    margin-top: 50px;
  }
  </style>
  