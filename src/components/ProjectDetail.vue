<template>
  <v-card class="mx-auto" max-width="374">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="https://letsview.com/wp-content/uploads/2020/03/collaboration-tools.jpg"
    ></v-img>

    <v-card-title>{{ currentProject.title }}</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="currentProject.supports"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">
          Supports ({{ currentProject.supports }})
        </div>
        <v-col cols="12">
          <v-sheet class="">
            {{ currentProject.description }}
          </v-sheet>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-text class="pl-2">
      <v-btn color="orange lighten-2" text>
        Supporters
      </v-btn>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-text>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          <v-chip-group active-class="deep-purple accent-4 white--text" column>
            <v-chip v-for="item in projectSupporters" :key="item.id">{{
              item ? getUsername(item) : ''
            }}</v-chip>
          </v-chip-group>
        </v-card-text>
      </div>
    </v-expand-transition>

    <v-card-actions class="justify-end">
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="addSupport"
        v-if="user.id !== currentProject.user_id"
      >
        Support
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import projectApi from '@/services/projectApi.js';
export default {
  computed: {
    ...mapState(['currentProject', 'user']),
  },
  data() {
    return {
      projectSupporters: [],
      show: false,
    };
  },
  created() {
    this.listProjectSupporters();
  },
  methods: {
    listProjectSupporters() {
      projectApi
        .listProjectSupports(this.currentProject.id)
        .then(async (res) => {
          this.projectSupporters = res.data;
          for (let project of this.projectSupporters) {
            await this.getUser(project);
          }
        });
    },
    addSupport() {
      projectApi
        .supportProject(this.user.id, this.currentProject.id)
        .then(() => {
          this.listProjectSupporters();
        });
    },
    getUser(project) {
      projectApi.getUserById(project.user_id).then((res) => {
        this.$set(project, 'supporter', res.data);
      });
    },
    getUsername(project) {
      if (project.supporter) {
        return project.supporter.login;
      }
    },
  },
  watch: {
    currentProject: {
      immediate: true,
      handler(val) {
        if (val) {
          this.listProjectSupporters();
        }
      },
    },
  },
};
</script>
