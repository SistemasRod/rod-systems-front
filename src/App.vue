
<template>
  <div id="app">
    
    <div id="nav" class="container mb-5">
      <b-nav pills>
        <b-nav-item><router-link to="/">Inicio</router-link></b-nav-item>
        <b-nav-item><router-link to="/login" v-if="!estaActivo">Login</router-link></b-nav-item>
        <b-nav-item><router-link to="/notas" v-if="estaActivo">Mis Notas</router-link></b-nav-item>
        <b-nav-item-dropdown v-if="estaActivo" id="my-nav-dropdown" text="Rod Select" toggle-class="nav-link-custom" right>
          <b-dropdown-item><router-link to="/select/prospectos" v-if="estaActivo">Prospectos</router-link></b-dropdown-item>
          <b-dropdown-item><router-link to="/select/cotizaciones" v-if="estaActivo">Cotizaciones</router-link></b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item><a @click="cerrarSesion()" v-if="estaActivo">Cerrar Sesion</a></b-nav-item>
        
      </b-nav>
    </div>
    
    <router-view></router-view>
    
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  methods: {
    ...mapActions(["cerrarSesion", "leerToken"]),
  },
  computed: {
    ...mapGetters(["estaActivo"]),
  },
  created() {
    this.leerToken();
  },
};
</script>