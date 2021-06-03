<template>
  <div v-if="fileSystem.length === 0">Loading...</div>
  <div v-else>
    <button class="border border-black" @click="createFile">New File</button>
    <FileBrowserTree
      :root="root"
      :name="fileSystem.name"
      :type="fileSystem.type"
      :path="fileSystem.path"
      :extension="fileSystem.extension"
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
    window.ipc.on('FILE_SYSTEM', ({ fileSystem, fileSystemGlob }) => {
      this.setFileSystem({ fileSystem, fileSystemGlob });
    });

    this.getFileSystem();
  },
  methods: {
    ...mapMutations(['setFileSystem']),

    createFile() {
      window.ipc.send('CREATE_FILE', {
        root: this.root,
      });
    },

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
