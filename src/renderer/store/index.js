import { createStore } from 'vuex';

export default createStore({
  state: {
    openFolders: [],
    openFileName: '',
    openFilePath: '',
    root: '/Users/suboptimaleng/Desktop/graphite',
  },
  mutations: {
    updateOpenFolders(state, folderPath) {
      const idx = state.openFolders.indexOf(folderPath);
      if (idx < 0) {
        state.openFolders.push(folderPath);
      } else {
        state.openFolders.splice(idx, 1);
      }
    },
    setFile(state, { name, path }) {
      state.openFileName = name;
      state.openFilePath = path;
    },
  },
  getters: {
    root(state) {
      return state.root;
    },
    openFolders(state) {
      return state.openFolders;
    },
    openFileName(state) {
      return state.openFileName;
    },
    openFilePath(state) {
      return state.openFilePath;
    },
  },
  actions: {},
  modules: {},
});
