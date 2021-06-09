import { createStore } from 'vuex';
import themes from '../utils/themes.ts';

export default createStore({
  state: {
    platformName: '',

    theme: Object.keys(themes)[0],
    activeFilePath: '',
    // TODO: refactor 'fileBrowser' and 'settings' and avoid magic values.
    activeSidebarItem: 'fileBrowser',

    sidebarActive: true,

    lineNumbers: false,
    fileSystem: [],
    fileSystemGlob: [],
    openFileName: '',
    openFilePath: '',
    openFileType: '',
    openFolders: [],
    root: '/Users/suboptimaleng/Desktop/graphite',
  },
  mutations: {
    showSidebar(state) {
      state.sidebarActive = true;
    },
    toggleSidebar(state) {
      state.sidebarActive = !state.sidebarActive;
    },
    setPlatformName(state, name) {
      state.platformName = name;
    },
    setActiveSidebarItem(state, item) {
      state.activeSidebarItem = item;
    },
    setTheme(state, theme) {
      state.theme = theme;
    },
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
    toggleLineNumbers(state) {
      state.lineNumbers = !state.lineNumbers;
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
    platformName(state) {
      return state.platformName;
    },
    sidebarActive(state) {
      return state.sidebarActive;
    },
    lineNumbers(state) {
      return state.lineNumbers;
    },
    activeSidebarItem(state) {
      return state.activeSidebarItem;
    },
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
