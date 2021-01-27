import axios from 'axios';
import store from '@/store';

const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_ENDPOINT,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        store.commit('setMessage', {
            text: error.response.data.message,
            type: 'error',
        });
    }
);

export default {
    loginUser(user) {
        return apiClient.post('/auth/login', user);
    },
    createNewUser(newUser) {
        return apiClient.post('/users', newUser);
    },
    getUserById(userId) {
        return apiClient.get(`/user/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${store.state.token}`,
            },
        });
    },
    createProject(newProject) {
        return apiClient.post('/projects', newProject, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${store.state.token}`,
            },
        });
    },
    getProjectById(projectId) {
        return apiClient.get(`/project/${projectId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${store.state.token}`,
            },
        });
    },
    listProjects() {
        return apiClient.get('/projects', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${store.state.token}`,
            },
        });
    },
    updateProject(project) {
        return apiClient.put(`/project/${project.id}`, project, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${store.state.token}`,
            },
        });
    },
    deleteProject(project) {
        return apiClient.delete(`/project/${project.id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${store.state.token}`,
            },
        });
    },
    listSupportsByUser(userId) {
        return apiClient.get(`/supports/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${store.state.token}`,
            },
        });
    },
    listProjectSupports(projectId) {
        return apiClient.get(`/supports/project/${projectId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${store.state.token}`,
            },
        });
    },
    supportProject(userId, projectId) {
        return apiClient.post(
            `/support`, { project_id: projectId, user_id: userId }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${store.state.token}`,
                },
            }
        );
    },
};