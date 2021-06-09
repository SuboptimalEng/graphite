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
      <Sidebar></Sidebar>
    </div>
    <div
      class="absolute border top-0 bottom-0 right-0 text-2xl"
      :class="sidebarActive ? 'left-72' : 'left-12'"
    >
      <div v-if="openFilePath">
        <Editor></Editor>
      </div>
      <div v-else>
        <BlankPage></BlankPage>
      </div>
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

import themes from './utils/themes.ts';

export default {
  name: 'App',
  data() {
    return {
      appTheme: '',
    };
  },
  components: {
    Editor,
    HotKeys,
    Sidebar,
    BlankPage,
    Navigation,
  },
  mounted() {
    this.setTheme();
  },
  methods: {
    setTheme() {
      this.appTheme = themes[this.theme].graphite;
    },
  },
  computed: {
    ...mapGetters(['theme', 'sidebarActive', 'openFilePath']),
  },
  watch: {
    theme: 'setTheme',
  },
};
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
