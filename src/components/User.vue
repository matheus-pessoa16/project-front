<template>
  <v-sheet>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h3>My Projects</h3>
            <v-btn
              color="primary"
              class="ml-auto"
              @click="createProjectDialog = true"
              >New Project</v-btn
            >
          </v-card-title>
          <v-card-text>
            <v-list three-line>
              <template v-for="project in allProjects">
                <v-list-item :key="project.title">
                  <v-list-item-avatar color="grey darken-1">
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{ project.title }}</v-list-item-title>

                    <v-list-item-subtitle>
                      {{ project.description }}
                    </v-list-item-subtitle>

                    <v-list-item-content>
                      <span
                        ><v-icon color="red">mdi-heart</v-icon>
                        {{ project.supports }}</span
                      >
                    </v-list-item-content>
                  </v-list-item-content>
                  <v-btn icon @click="editProject(project)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon @click="deleteSelectedProject(project)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item>
              </template>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h3>Supported Projects</h3>
          </v-card-title>
          <v-card-text>
            <v-list three-line>
              <template v-for="item in supports">
                <v-list-item :key="item.project.title">
                  <v-list-item-avatar color="grey darken-1">
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{
                      item.project.title
                    }}</v-list-item-title>

                    <v-list-item-subtitle>
                      {{ item.project.description }}
                    </v-list-item-subtitle>

                    <v-list-item-content>
                      {{ item.user.login }}
                    </v-list-item-content>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="createProjectDialog" width="800">
      <CreateProject @close="closeAndUpdate" :project="selectedProject" />
    </v-dialog>
  </v-sheet>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import CreateProject from '@/components/CreateProject.vue';
import projectApi from '@/services/projectApi.js';
export default {
  components: { CreateProject },
  computed: {
    ...mapState(['user', 'supports', 'projects']),
    isAdmin() {
      return this.user.admin;
    },
    allProjects() {
      if (this.isAdmin) {
        return this.projects;
      }
      return this.user.projects;
    },
  },
  data: () => ({
    cards: ['Today', 'Yesterday'],
    createProjectDialog: false,
    selectedProject: null,
  }),
  created() {
    if (this.isAdmin) {
      this.getAllProjects();
    }
    this.getUserById();
  },
  methods: {
    ...mapMutations(['setUser']),
    ...mapActions([
      'deleteProject',
      'setCurrentProject',
      'getAllUserSupports',
      'getAllProjects',
    ]),
    getUserById() {
      projectApi.getUserById(this.user.id).then((res) => {
        this.setUser(res.data);
        this.getAllUserSupports(this.user);
      });
    },
    closeAndUpdate() {
      this.getUserById();
      this.createProjectDialog = false;
      this.selectedProject = null;
    },
    deleteSelectedProject(project) {
      if (confirm('Do you want to delete this project?')) {
        this.deleteProject(project);
        this.getUserById();
      }
    },
    editProject(project) {
      this.selectedProject = project;
      this.createProjectDialog = true;
    },
  },
};
</script>

<style></style>
