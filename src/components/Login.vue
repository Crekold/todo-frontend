<template>
  <div class="background">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h2 class="text-center text-primary mb-4">Iniciar sesión</h2>
              <form @submit.prevent="login">
                <div class="form-group">
                  <label for="username"><i class="fas fa-user"></i> Nombre de usuario</label>
                  <input type="text" class="form-control" id="username" v-model="username">
                </div>
                <div class="form-group">
                  <label for="password"><i class="fas fa-lock"></i> Contraseña</label>
                  <input type="password" class="form-control" id="password" v-model="password">
                </div>
                <button type="submit" class="btn btn-primary">Iniciar sesión</button>
              </form>
            </div>
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

        // If the status code is in the 200 range, it was successful
        if (response.status >= 200 && response.status < 300) {
          const [status, userId] = response.data.split(', ');

          if (status === '1') {
            localStorage.setItem('userId', userId);
            router.push('/tasks');
            Swal.fire(
              '¡Inicio de sesión exitoso!',
              'Has iniciado sesión correctamente.',
              'success'
            );
          }
        }
      } catch (error) {
        const errorMessage = error.response && error.response.data && error.response.data.message 
          ? error.response.data.message 
          : '¡Inicio de sesión fallido!';
          
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage
        });
        console.error(error);
      }
    }
  }
}
</script>
  
  <style scoped>
  .background {
    background-image: url('https://vtbroot.s3.amazonaws.com/ROCCAT_AIMO-3DLighting_Wallpaper_All-Resolutions/ROCCAT_AIMO-3DLighting_Wallpaper_3440x1440_UW.png');
    background-size: cover;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }


  
  
  .fas {
    margin-right: 5px;
  }
  </style>