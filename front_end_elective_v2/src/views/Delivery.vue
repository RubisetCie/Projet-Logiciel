<template>
  <div class='delivery'>
    <Map />
    <v-alert dense type='info'>
      Statu de la commande <strong>En cuisine</strong>
    </v-alert>
  </div>
</template>

<script>
import Options from 'vue-class-component';
import Vue from 'vue';
import Map from '../components/UI/Map/Map.vue';

@Options({
  components: {
    Map,
  },
  beforeMount() {
    if (this.getUserId.loginStatus === false || this.usertype === 4) {
      this.$router.push('/');
    }
  },
  computed: {
    getUserId() {
      return this.$store.getters.getUser;
    },
  },
})
export default class Delivery extends Vue {}
</script>
