<template>
  <div v-if="fileSystem.length === 0">Loading...</div>
  <div v-else>
    <div class="flex">
      <div class="mx-auto space-x-2">
        <button class="border border-black" @click="createFile">
          New File
        </button>
        <button class="border border-black" @click="toggleTheme">
          Toggle Theme
        </button>
      </div>
    </div>
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
    ...mapMutations(['setFileSystem', 'toggleTheme']),

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
    ...mapGetters(['root', 'fileSystem', 'theme']),
  },
};
</script>
