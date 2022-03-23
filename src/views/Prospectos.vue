<template>
  <div class="container">
      <b-button class="btn-danger btn-sm disabled">Enviar Correo Masivo</b-button>
      <table class="table">
      <thead>
        <tr>
          <th scope="col">Registro</th>
          <th scope="col">Nombre</th>
          <th scope="col">Telefono</th>
          <th scope="col">Correo</th>
          <th scope="col">Categoria</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in prospectos" :key="index">
          <td>{{ formatearFecha(item.date) }}</td>
          <td>{{ item.nombre }}</td>
          <td>{{ item.telefono }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.categoria }}</td>
          <td>
            <b-button class="btn-danger btn-sm disabled">Enviar Correo</b-button>
            
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
import moment from 'moment'
import {mapState} from 'vuex'
export default {
    data() {
        return {
            totalProspectos: 0,
            limite: 50,
            paginaActual: 1,

            prospectos: []
        }
    },
    computed:{
        ...mapState(['token']),
        cantidadPaginas(){
            return Math.ceil(this.totalProspectos / this.limite)
        }
    },
    methods: {
        paginacion(pagina) {
            let config = {
                headers:{
                    token: this.token
                }
            }
            let skip = (pagina - 1) * this.limite
            this.axios
                .get(`/rodselect/prospecto?limite=${this.limite}&skip=${skip}`, config)
                .then((res) => {
                    moment.locale('es-mx')
                    console.log(res.data)
                    this.prospectos = res.data.prospectoDB;
                    this.totalProspectos = res.data.totalProspectos;
                })
                .catch((err) => {console.log(err)})
            
        },
        async listarProspectos(){
            let config = {
                headers: {
                    token: this.token
                }
            };
            this.axios.get("/rodselect/prospecto", config)
            .then((res) => {
                console.log(res.data);
                this.prospectos = res.data.prospectoDB;
                
            })
            .catch((err) => {console.log(err)})
        },
        formatearFecha(fecha){
            return moment(fecha).format('L')
        }
    },
    watch:{
        "$route.query.pagina":{
            immediate: true,
            handler(pagina){
                pagina = parseInt(pagina) || 1;
                this.paginacion(pagina);
                this.paginaActual = pagina;
            }
        }
    }

}
</script>

<style>

</style>