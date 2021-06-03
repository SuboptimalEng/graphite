<template>
  <div v-for="fileOrFolder in children" :key="fileOrFolder">
    <!-- Folder -->
    <template v-if="fileOrFolder.type === 'directory'">
      <div :class="depthClass">
        <button
          @click="updateOpenFolders(fileOrFolder.path)"
          class="border border-black"
        >
          {{ fileOrFolder.name }} /
        </button>
      </div>

      <div v-if="folderIsOpen(fileOrFolder)">
        <FileBrowserTree
          :name="fileOrFolder.name"
          :type="fileOrFolder.type"
          :children="fileOrFolder.children"
          :depth="depth + 1"
        ></FileBrowserTree>
      </div>
    </template>

    <!-- File -->
    <template v-else>
      <div :class="depthClass">
        <button
          @click="setFile(fileOrFolder)"
          @contextmenu="fileContextMenu(fileOrFolder)"
        >
          {{ fileOrFolder.name }}
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { DEPTH_ENUM } from '../shared/constants';

export default {
  name: 'FileBrowserTree',
  props: {
    root: String,
    name: String,
    path: String,
    type: String,
    children: Array,
    depth: Number,
  },
  methods: {
    ...mapMutations(['setFile', 'updateOpenFolders']),

    folderIsOpen(folder) {
      return this.openFolders.includes(folder.path);
    },

    fileContextMenu(file) {
      window.ipc.send('FILE_CONTEXT_MENU', {
        root: this.root,
        fileName: file.name,
        filePath: file.path,
        fileType: file.type,
      });
    },
  },
  computed: {
    ...mapGetters(['openFolders']),

    depthClass() {
      return `ml-${DEPTH_ENUM[this.depth]}`;
    },
  },
};
</script>
