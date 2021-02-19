<template>
  <v-sheet class="home mt-4" width="100%">
    <v-alert
      v-if="message.text"
      :type="message.type"
      width="350"
      class="ml-auto mt-2 mb-0"
      style="z-index:2"
    >
      {{ message.text }}</v-alert
    >
    <v-container fluid class="mw-100">
      <v-navigation-drawer v-model="drawer" app class="mt-4">
        <v-sheet color="grey lighten-4" class="text-center pa-4">
          <v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>

          <v-sheet>{{ user.email }}</v-sheet>
        </v-sheet>

        <v-list>
          <v-list-item v-for="item in links" :key="item.icon" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content @click="handleAction(item)">
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-container>

    <v-container fluid class="py-0">
      <component :is="currentComponent" />
    </v-container>
  </v-sheet>
</template>

<script>
import User from '@/components/User.vue';
import Projects from '@/components/Projects.vue';
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: { User, Projects },
  computed: {
    ...mapState(['user', 'message']),
  },
  data: () => ({
    drawer: null,
    links: [
      { icon: 'mdi-account', text: 'Profile', component: User },
      { icon: 'mdi-wrench', text: 'Projects', component: Projects },
    ],
    currentComponent: User,
  }),

  methods: {
    handleAction(item) {
      this.currentComponent = item.component;
    },
  },
};
</script>
