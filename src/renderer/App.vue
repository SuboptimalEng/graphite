<template>
  <div
    :class="appTheme"
    class="min-h-screen bg-gray-300 bg-sidebar-bg text-text-normal font-mono"
  >
    <!-- <div
      class="
        border border-text-normal
        min-h-screen
        absolute
        top-0
        bottom-0
        left-0
        w-60
        overflow-x-hidden
        no-scrollbar
      "
    >
      <FileBrowser></FileBrowser>
    </div> -->
    <div
      class="
        border border-text-normal
        min-h-screen
        absolute
        top-0
        bottom-0
        left-0
        w-60
        overflow-x-hidden
        no-scrollbar
      "
    >
      <FileBrowser></FileBrowser>
    </div>
    <div
      class="
        absolute
        border border-text-normal
        top-0
        bottom-0
        left-60
        right-0
        text-2xl
      "
    >
      <Settings></Settings>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Editor from './components/Editor.vue';
import Settings from './components/Settings.vue';
import FileBrowser from './components/FileBrowser.vue';
import themes from './utils/themes.ts';

export default {
  name: 'App',
  data() {
    return {
      appTheme: '',
      components: [Settings, FileBrowser],
    };
  },
  mounted() {
    this.setTheme();
  },
  components: {
    Editor,
    Settings,
    FileBrowser,
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
