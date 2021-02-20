<template>
  <v-sheet class="">
    <h1>Projects</h1>
    <v-sheet>
      <v-text-field placeholder="Project" @input="search"> </v-text-field>
    </v-sheet>
    <v-row>
      <v-col cols="4" v-for="project in filteredProjects" :key="project.id">
        <v-card
          class="mx-auto"
          dark
          max-width="400"
          style="border: 1px solid black; background-color: white"
          @click="showProjectDetail(project)"
        >
          <v-card-title>
            <v-icon left color="black">
              mdi-wrench-outline
            </v-icon>
            <span class="title font-weight-light black--text">{{
              project.title
            }}</span>
          </v-card-title>

          <v-card-text class="headline font-weight-bold black--text">
            {{ project.description }}
          </v-card-text>

          <v-card-actions>
            <v-list-item class="grow">
              <v-list-item-avatar color="grey darken-3">
                <v-img
                  class="elevation-6"
                  alt=""
                  src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="black--text">{{
                  project.user ? project.user.login : ''
                }}</v-list-item-title>
              </v-list-item-content>

              <v-row align="center" justify="end">
                <v-btn
                  icon
                  @click.stop="addSupportProject(project)"
                  v-if="project.user_id !== user.id"
                >
                  <v-icon class="mr-1" color="red">
                    mdi-heart
                  </v-icon>
                </v-btn>
                <span class="subheading mr-2 black--text">{{
                  project.supports
                }}</span>
                <span class="mr-1 black--text">·</span>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="projectDetailDialog" max-width="374">
      <ProjectDetail />
    </v-dialog>
  </v-sheet>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import projectApi from '@/services/projectApi.js';
import ProjectDetail from '@/components/ProjectDetail.vue';
export default {
  components: { ProjectDetail },
  computed: {
    ...mapState(['user']),
  },
  data() {
    return {
      projectName: null,
      filteredProjects: [],
      projects: [],
      projectDetailDialog: false,
    };
  },
  created() {
    this.listProjects();
  },
  methods: {
    ...mapActions(['updateProject', 'supportProject', 'setCurrentProject']),
    listProjects() {
      projectApi.listProjects().then(async (res) => {
        this.projects = res.data;
        this.filteredProjects = this.projects;
        for (let project of this.filteredProjects) {
          await this.getUser(project);
        }
      });
    },
    search(text) {
      if (text) {
        this.filteredProjects = this.projects.filter((project) =>
          project.title.toLowerCase().includes(text.toLowerCase())
        );
      } else {
        this.filteredProjects = this.projects;
      }
    },
    addSupportProject(project) {
      projectApi.supportProject(this.user.id, project.id).then(() => {
        this.listProjects();
      });
    },
    getUser(project) {
      projectApi.getUserById(project.user_id).then((res) => {
        this.$set(project, 'user', res.data);
      });
    },
    showProjectDetail(project) {
      this.setCurrentProject(project);
      this.projectDetailDialog = true;
    },
    closeDetailsDialog() {
      this.setCurrentProject(null);
      this.projectDetailDialog = false;
    },
  },
};
</script>
