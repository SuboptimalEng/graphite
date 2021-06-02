<template>
  <div>
    <FileBrowserTree
      :name="fileSystem.name"
      :type="fileSystem.type"
      :children="fileSystem.children"
      :depth="0"
    ></FileBrowserTree>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import FileBrowserTree from './FileBrowserTree.vue';

export default {
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

    this.getFileSystem({ path: this.root });
  },
  methods: {
    getFileSystem({ path }) {
      window.ipc.send('FILE_SYSTEM', { path });
    },
  },
  computed: {
    ...mapGetters(['root']),
  },
};
</script>
