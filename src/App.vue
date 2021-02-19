<template>
  <v-app id="inspire">
    <v-system-bar app color="primary" class="py-4">
      <v-app-bar-title style="color: white">
        Project Management System
      </v-app-bar-title>
      <v-btn
        class="ml-auto font-font-weight-bold"
        text
        color="white"
        v-if="authenticated"
        @click="logout"
        >Logout</v-btn
      >
    </v-system-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState(['authenticated']),
  },
  data: () => ({
    cards: ['Today', 'Yesterday'],
    drawer: null,
    links: [
      ['mdi-inbox-arrow-down', 'Inbox'],
      ['mdi-send', 'Send'],
      ['mdi-delete', 'Trash'],
      ['mdi-alert-octagon', 'Spam'],
    ],
  }),
  methods: {
    ...mapActions(['logout']),
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
