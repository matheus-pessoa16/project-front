import router from '../router';
import projectApi from '@/services/projectApi.js';
import Vue from 'vue';

const actions = {
    setCurrentProject({ commit }, project) {
        commit('setCurrentProject', project);
    },
    getTokenAndSetUser({ commit, dispatch }, user) {
        projectApi.loginUser(user).then((response) => {
            commit('login', response.data);
            dispatch('getAllUserSupports', response.data.user);
            router.push({ path: '/' });
        });
    },
    logout({ commit }) {
        commit('logout');
        window.location =
            process.env.NODE_ENV === 'production' ? '/project-front/' : '/login';
    },
    createNewUser({ dispatch }, user) {
        projectApi.createNewUser(user).then(() => {
            dispatch('getTokenAndSetUser', {
                login: user.login,
                password: user.password,
            });
        });
    },
    addProject({ commit }, project) {
        projectApi.createProject(project).then(() => {
            commit('setMessage', { text: 'Project created!', type: 'success' });
        });
    },
    getAllProjects({ commit }) {
        projectApi.listProjects().then((response) => {
            commit('setProjects', response.data);
        });
    },
    updateProject({ dispatch }, project) {
        projectApi.updateProject(project).then(() => {
            dispatch('getAllProjects');
        });
    },
    deleteProject({ commit }, project) {
        projectApi.deleteProject(project).then(() => {
            commit('setMessage', { text: 'Project removed!', type: 'success' });
        });
    },
    getAllUserSupports({ commit }, user) {
        projectApi.listSupportsByUser(user.id).then(async(response) => {
            for (let support of response.data) {
                let result = await projectApi.getProjectById(support.project_id);
                if (result.data !== undefined) {
                    let userResult = await projectApi.getUserById(result.data.user_id);
                    Vue.set(support, 'project', result.data);
                    Vue.set(support, 'user', userResult.data);
                }
            }

            commit('setSupports', response.data);
        });
    },
};

export default actions;