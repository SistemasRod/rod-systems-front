import { mapState } from 'vuex';
<template>
  <div class="container">
    <h1>Cotizaciones</h1>
    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="mensaje.color"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      {{ mensaje.texto }}
    </b-alert>
      
      <table class="table">
      <thead>
        <tr>
          <th scope="col">Registro</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellidos</th>
          <th scope="col">Correo</th>
          <th scope="col">Telefono</th>
          <th scope="col">Empresa</th>

          <th scope="col">Presupuesto</th>
          <th scope="col">Personas</th>
          <th scope="col">Entrega</th>
          <th scope="col">Receptor</th>
          <th scope="col">regalo</th>
          <th scope="col">comentario</th>
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cotizaciones" :key="index">
          <td>{{ formatearFecha(item.date) }}</td>
          <td>{{ item.nombre }}</td>
          <td>{{ item.apellidos }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.telefono }}</td>
          <td>{{ item.empresa }}</td>

          <td>{{ item.presupuesto }}</td>
          <td>{{ item.personas }}</td>
          <td>{{ formatearFecha(item.entrega) }}</td>
          <td>{{ item.receptor }}</td>
          <td>{{ item.regalo }}</td>
          <td>{{ item.comentario }}</td>
          
          <td>
            <b-button class="btn-danger btn-sm" @click="eliminarCot(item._id)">Eliminar</b-button>
          </td>
        </tr>
      </tbody>
    </table>

    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: paginaActual === 1 }">
          <router-link class="page-link" :to="{ query: { pagina: paginaActual - 1 } }">
            Anterior
          </router-link>
        </li>
        <li class="page-item" :class="{active: paginaActual === index + 1 }" v-for="(item, index) in cantidadPaginas" :key="index">
          <router-link :to="{ query: { pagina: index + 1 } }" class="page-link" >{{ index + 1 }}</router-link>
        </li>
        <li class="page-item" :class="{ disabled: paginaActual === cantidadPaginas }">
          <router-link class="page-link" :to="{ query: { pagina: paginaActual + 1 } }">
            Siguiente
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import moment from 'moment';
import {mapState} from 'vuex';
export default {
  data() {
    return {
      //los siguientes tres atributos son para la paginacion
      totalCotizaciones: 0,
      limite: 50,
      paginaActual: 1,

      cotizaciones: [],

      dismissSecs: 5,
      dismissCountDown: 0,
      mensaje: { color: "", texto: "" }
      //nota: { nombre: "", descripcion: "" },
      //notaEditar: {},
      //editar: false,
    };
  },
  computed: {
    ...mapState(["token"]),
    //este metodo se hace en las propiedades computadas para que siempre calcule en numero de paginas de manera dinamica
    cantidadPaginas(){
      //la funcion matematica redondea hacia arriba para que no existan paginas decimales
      return Math.ceil(this.totalCotizaciones / this.limite)
    }
  },
  methods: {
    paginacion(pagina) {
      let config = {
        headers: {
          token: this.token,
        },
      };
      //esta formula calcula el salto de datos para hacer la paginacion
      let skip = (pagina - 1) * this.limite;
      //esta ruta la lee el back end, no aparece en el navegador ni en el cliente de alguna forma
      this.axios
        .get(`/rodselect/ver-cot?limite=${this.limite}&skip=${skip}`, config)
        .then((res) => {
          console.log(res.data);
          this.cotizaciones = res.data.cotizacionDB;
          this.totalCotizaciones = res.data.totalCotizaciones;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },

    eliminarCot(id) {
      let config = {
        headers: {
          token: this.token,
        },
      };
      this.axios
        .delete(`/rodselect/borrar-cot/${id}`,config)
        .then((res) => {
          const index = this.cotizaciones.findIndex(
            (item) => item._id === res.data._id
          );
          //splice borra la candidad de elementos indicados que coincidan con el este index
          this.cotizaciones.splice(index, 1);
          this.mensaje.color = "success";
          this.mensaje.texto = "Cotizacion eliminada";
          this.showAlert();
        })
        .catch((err) => {});
    },

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    formatearFecha(fecha){
      return moment(fecha).format('L')
    }
    
  },

  watch: {
    //esta lee una ruta url con el parametro 'pagina' y captura el valor el el handler
    "$route.query.pagina": {
      immediate: true,
      //handler es una palabra reservada, ejecuta el metodo dle observador
      handler(pagina) {
        pagina = parseInt(pagina) || 1;
        this.paginacion(pagina);
        this.paginaActual = pagina;
      },
    },
  },

}
</script>

<style>

</style>