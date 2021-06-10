<template>
  <div
    :class="appTheme"
    class="min-h-screen bg-sidebar-bg text-text-normal font-mono relative"
  >
    <div
      class="
        border border-text-normal
        min-h-screen
        absolute
        top-0
        bottom-0
        left-0
        w-12
      "
    >
      <Navigation></Navigation>
      <div class="hidden">
        <HotKeys></HotKeys>
      </div>
    </div>
    <div
      class="
        border border-text-normal
        min-h-screen
        absolute
        top-0
        bottom-0
        left-12
        w-60
        overflow-x-hidden
        no-scrollbar
      "
      v-if="sidebarActive"
    >
      <input
        type="text"
        v-model="sidebarBgColor"
        placeholder="Set sidebar-bg color..."
        class="bg-sidebar-bg border focus:outline-none w-full"
      />
      <button @click="updateColor" class="border">Update</button>
      <Sidebar></Sidebar>
    </div>
    <div
      class="absolute border top-0 bottom-0 right-0 text-2xl"
      :class="sidebarActive ? 'left-72' : 'left-12'"
    >
      <div v-if="activeFilePath && !openFileSearch">
        <Editor></Editor>
      </div>
      <div v-else>
        <BlankPage></BlankPage>
      </div>
    </div>
    <div v-if="openFileSearch">
      <FileSearch></FileSearch>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Editor from './components/Editor.vue';
import HotKeys from './components/HotKeys.vue';
import Sidebar from './components/Sidebar.vue';
import BlankPage from './components/BlankPage.vue';
import Navigation from './components/Navigation.vue';
import FileSearch from './components/FileSearch.vue';

import themes from './utils/themes.ts';

export default {
  name: 'App',
  data() {
    return {
      sidebarBgColor: '',
      appTheme: '',
    };
  },
  components: {
    Editor,
    HotKeys,
    Sidebar,
    BlankPage,
    Navigation,
    FileSearch,
  },
  mounted() {
    this.setTheme();
  },
  methods: {
    setTheme() {
      this.appTheme = themes[this.theme].graphite;
    },
    updateColor() {
      console.log(this.sidebarBgColor);
    },
  },
  computed: {
    ...mapGetters([
      'theme',
      'sidebarActive',
      'activeFilePath',
      'openFileSearch',
    ]),
  },
  watch: {
    theme: 'setTheme',
  },
};
</script>

<style scoped >
/* INSIGHT: Custom CSS */
/* INSIGHT: This can be copied into chrome Styles section! */
.theme-monokai {
  --sidebar-bg: #272822;
  --sidebar-bg-hover: #f92672;
  --item-active: #ae81ff;
  --item-text-active: #272822;
  --text-normal: #f8f8f2;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
