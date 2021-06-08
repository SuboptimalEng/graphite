<template>
  <div>
    <div v-if="showSection('settings')">
      <Settings></Settings>
    </div>
    <div v-else-if="showSection('fileBrowser')">
      <FileBrowser></FileBrowser>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Settings from './Settings.vue';
import FileBrowser from './FileBrowser.vue';

export default {
  name: 'Sidebar',
  components: {
    Settings,
    FileBrowser,
  },
  methods: {
    showSection(sectionName) {
      return this.activeSidebarItem === sectionName;
    },
  },
  computed: {
    ...mapGetters(['activeSidebarItem']),
  },
};
</script>
