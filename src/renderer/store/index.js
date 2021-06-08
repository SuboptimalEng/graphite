import { createStore } from 'vuex';

export default createStore({
  state: {
    theme: 'dracula',
    activeFilePath: '',

    fileSystem: [],
    fileSystemGlob: [],
    openFileName: '',
    openFilePath: '',
    openFileType: '',
    openFolders: [],
    root: '/Users/suboptimaleng/Desktop/graphite',
  },
  mutations: {
    toggleTheme(state) {
      if (state.theme === 'dracula') {
        state.theme = 'gruvbox';
      } else {
        state.theme = 'dracula';
      }
    },
    updateOpenFolders(state, folderPath) {
      const idx = state.openFolders.indexOf(folderPath);
      if (idx < 0) {
        state.openFolders.push(folderPath);
      } else {
        state.openFolders.splice(idx, 1);
      }
    },
    setFile(state, file) {
      state.activeFilePath = file.path;
      state.openFileName = file.name;
      state.openFilePath = file.path;
      state.openFileType = file.type;
    },
    setFileSystem(state, { fileSystem, fileSystemGlob }) {
      state.fileSystem = fileSystem;
      state.fileSystemGlob = fileSystemGlob;
    },
    resetActiveFilePath(state) {
      state.activeFilePath = '';
    },
  },
  getters: {
    theme(state) {
      return state.theme;
    },
    root(state) {
      return state.root;
    },
    activeFilePath(state) {
      return state.activeFilePath;
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
