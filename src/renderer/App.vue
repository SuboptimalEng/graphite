<template>
  <div
    :class="appTheme"
    class="min-h-screen bg-gray-300 bg-sidebar-bg text-text-normal font-mono"
  >
    <div
      class="
        border-r border-text-normal
        min-h-screen
        absolute
        top-0
        bottom-0
        left-0
        w-12
      "
    >
      <Navigation></Navigation>
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
    >
      <Sidebar></Sidebar>
    </div>
    <div
      class="
        absolute
        border border-text-normal
        top-0
        bottom-0
        left-72
        right-0
        text-2xl
      "
    >
      <Editor></Editor>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Navigation from './components/Navigation.vue';
import Editor from './components/Editor.vue';
import Sidebar from './components/Sidebar.vue';
import themes from './utils/themes.ts';

export default {
  name: 'App',
  data() {
    return {
      appTheme: '',
    };
  },
  mounted() {
    this.setTheme();
  },
  components: {
    Navigation,
    Sidebar,
    Editor,
  },
  methods: {
    setTheme() {
      this.appTheme = themes[this.theme].graphite;
    },
  },
  computed: {
    ...mapGetters(['theme']),
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
