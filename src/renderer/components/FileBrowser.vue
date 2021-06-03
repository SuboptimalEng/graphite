<template>
  <div v-if="fileSystem.length === 0">Loading...</div>
  <div v-else>
    <FileBrowserTree
      :root="root"
      :name="fileSystem.name"
      :type="fileSystem.type"
      :path="fileSystem.path"
      :children="fileSystem.children"
      :depth="0"
    ></FileBrowserTree>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import FileBrowserTree from './FileBrowserTree.vue';

export default {
  name: 'FileBrowser',
  components: {
    FileBrowserTree,
  },
  mounted() {
    window.ipc.on('FILE_SYSTEM', (fileSystem) => {
      this.setFileSystem(fileSystem);
    });

    this.getFileSystem();
  },
  methods: {
    ...mapMutations(['setFileSystem']),

    getFileSystem() {
      window.ipc.send('FILE_SYSTEM', {
        root: this.root,
      });
    },
  },
  computed: {
    ...mapGetters(['root', 'fileSystem']),
  },
};
</script>
