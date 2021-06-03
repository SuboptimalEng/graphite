import { createStore } from 'vuex';

export default createStore({
  state: {
    fileSystem: [],
    fileSystemGlob: [],
    openFileName: '',
    openFilePath: '',
    openFileType: '',
    openFolders: [],
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
    setFile(state, file) {
      state.openFileName = file.name;
      state.openFilePath = file.path;
      state.openFileType = file.type;
    },
    setFileSystem(state, { fileSystem, fileSystemGlob }) {
      state.fileSystem = fileSystem;
      state.fileSystemGlob = fileSystemGlob;
    },
  },
  getters: {
    root(state) {
      return state.root;
    },
    fileSystem(state) {
      return state.fileSystem;
    },
    fileSystemGlob(state) {
      return state.fileSystemGlob;
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
