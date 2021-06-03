<template>
  <div>
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
import { mapGetters } from 'vuex';
import FileBrowserTree from './FileBrowserTree.vue';

export default {
  name: 'FileBrowser',
  components: {
    FileBrowserTree,
  },
  data() {
    return {
      fileSystem: [],
    };
  },
  mounted() {
    window.ipc.on('FILE_SYSTEM', (fileSystem) => {
      this.fileSystem = fileSystem;
    });

    this.getFileSystem();
  },
  methods: {
    getFileSystem(root = this.root) {
      window.ipc.send('FILE_SYSTEM', { root });
    },
  },
  computed: {
    ...mapGetters(['root']),
  },
};
</script>
