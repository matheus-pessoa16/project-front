<template>
  <v-card class="pa-4">
    <v-card-title>
      <h2>New Project</h2>
    </v-card-title>
    <v-card-text>
      <v-form class="py-6">
        <v-row>
          <v-col cols="12" class="py-0">
            Title
            <v-text-field v-model="newProject.title" placeholder="Title" solo>
            </v-text-field>
          </v-col>

          <v-col cols="12" class="py-0">
            Description
            <v-textarea
              v-model="newProject.description"
              placeholder="Description"
              solo
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-end mr-2">
      <v-btn
        color="red darken-3"
        class="white--text px-8"
        @click="closeAndRefresh"
      >
        Cancel
      </v-btn>

      <v-btn
        color="primary"
        class="px-10"
        @click="newProject.id ? editSelectedProject() : createNewProject()"
      >
        {{ newProject.id ? 'Edit' : 'Save' }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  props: ['project'],
  computed: {
    ...mapState(['user', 'currentProject']),
    isEdit() {
      return this.project !== null || this.project !== undefined;
    },
  },
  data() {
    return {
      newProject: {
        title: null,
        description: null,
        user_id: null,
        supports: 0,
      },
    };
  },
  created() {},
  methods: {
    ...mapActions(['addProject', 'updateProject', 'setCurrentProject']),
    closeAndRefresh() {
      this.newProject = {
        title: null,
        description: null,
        user_id: null,
        supports: 0,
      };

      this.$emit('close');
    },
    createNewProject() {
      this.newProject.user_id = this.user.id;
      this.addProject(this.newProject).then(() => {
        this.closeAndRefresh();
      });
    },
    editSelectedProject() {
      this.updateProject(this.newProject);
      this.closeAndRefresh();
    },
  },
  watch: {
    project: {
      immediate: true,
      handler(val) {
        if (val) {
          this.newProject = val;
        }
      },
    },
  },
};
</script>
