var timeout = null;

const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    setAuthenticated(state, authenticated) {
        state.authenticated = authenticated;
    },
    setToken(state, token) {
        state.token = token;
    },
    login(state, response) {
        state.user = response.user;
        state.token = response.token;
        state.authenticated = true;
    },
    logout(state) {
        state.user = null;
        state.token = null;
        state.authenticated = false;
    },
    setMessage(state, message) {
        state.message = message;
        if (timeout != null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            state.message = { text: null, type: null };
            timeout = null;
        }, 2000);
    },
    setProjects(state, projects) {
        state.projects = projects;
    },
    setCurrentProject(state, project) {
        state.currentProject = project;
    },
    setSupports(state, supports) {
        state.supports = supports;
    },
};
export default mutations;