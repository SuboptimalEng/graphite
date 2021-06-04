<template>
  <div v-if="depth === 0">
    <div
      @drop="dropFileIntoFolder($event, { path: root })"
      @dragover.prevent
      @dragenter.prevent
    >
      Graphite
    </div>
  </div>

  <div v-for="fileOrFolder in children" :key="fileOrFolder">
    <!-- Folder -->
    <div v-if="fileOrFolder.type === 'directory'">
      <div :class="depthClass">
        <button
          @click="updateOpenFolders(fileOrFolder.path)"
          class="border border-black"
          @drop="dropFileIntoFolder($event, fileOrFolder)"
          @dragover.prevent
          @dragenter.prevent
        >
          {{ fileOrFolder.name }} /
        </button>
      </div>

      <div v-if="folderIsOpen(fileOrFolder)">
        <FileBrowserTree
          :root="root"
          :name="fileOrFolder.name"
          :path="fileOrFolder.path"
          :type="fileOrFolder.type"
          :extension="fileOrFolder.extension"
          :children="fileOrFolder.children"
          :depth="depth + 1"
        ></FileBrowserTree>
      </div>
    </div>

    <!-- File -->
    <div v-else>
      <div :class="depthClass">
        <div v-if="fileIsBeingRenamed(fileOrFolder)">
          <input type="text" v-model="newFileName" />
          <button class="border border-black" @click="renameFile">Save</button>
        </div>
        <div v-else>
          <button
            @click="setFile(fileOrFolder)"
            @contextmenu="fileContextMenu(fileOrFolder)"
            draggable="true"
            @dragstart="startFileDrag($event, fileOrFolder)"
          >
            {{ this.fileNameWithoutExtenstion(fileOrFolder) }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { DEPTH_ENUM } from '../shared/constants';

export default {
  name: 'FileBrowserTree',
  props: {
    root: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    depth: {
      type: Number,
      required: true,
    },
    extension: {
      type: String,
    },
    children: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      renamingFile: false,
      filePath: '',
      oldFileName: '',
      newFileName: '',
    };
  },
  methods: {
    ...mapMutations(['setFile', 'updateOpenFolders']),

    dropFileIntoFolder(event, folder) {
      const file = JSON.parse(event.dataTransfer.getData('file'));
      if (this.fileSystemGlob.includes(`${folder.path}/${file.name}`)) {
        console.log('file already exists!');
      } else {
        window.ipc.send('MOVE_FILE', {
          file,
          root: this.root,
          folderPath: folder.path,
        });
      }
    },

    startFileDrag(event, file) {
      event.dataTransfer.setData('file', JSON.stringify(file));
    },

    fileNameWithoutExtenstion(file) {
      if (file.extension === '.md') {
        return file.name.slice(0, -3);
      }

      return file.name;
    },

    folderIsOpen(folder) {
      return this.openFolders.includes(folder.path);
    },

    fileIsBeingRenamed(file) {
      return this.renamingFile && file.path === this.filePath;
    },

    fileContextMenu(file) {
      window.ipc.send('FILE_CONTEXT_MENU', {
        root: this.root,
        fileName: file.name,
        filePath: file.path,
        fileType: file.type,
        fileExtension: file.extension,
      });
    },

    getParentDirectory(filePath) {
      return filePath.split('/').slice(0, -1).join('/');
    },

    resetComponentData() {
      this.renamingFile = false;
      this.filePath = '';
      this.oldFileName = '';
      this.newFileName = '';
    },

    renameFile() {
      const parentDirectory = this.getParentDirectory(this.filePath);
      const oldFilePath = `${parentDirectory}/${this.oldFileName}.md`;
      const newFilePath = `${parentDirectory}/${this.newFileName}.md`;
      if (this.fileSystemGlob.includes(newFilePath)) {
        console.log('file already exists');
      } else {
        window.ipc.send('RENAME_FILE', {
          root: this.root,
          oldFilePath,
          newFilePath,
        });
      }
      this.resetComponentData();
    },
  },
  mounted() {
    window.ipc.on('RENAME_FILE', (payload) => {
      let fileNameWithoutExtenstion = payload.fileName;
      if (payload.fileExtension === '.md') {
        fileNameWithoutExtenstion = fileNameWithoutExtenstion.slice(0, -3);
      }

      this.renamingFile = true;
      this.filePath = payload.filePath;
      this.oldFileName = fileNameWithoutExtenstion;
      this.newFileName = fileNameWithoutExtenstion;
    });
  },
  computed: {
    ...mapGetters(['openFolders', 'fileSystemGlob']),

    depthClass() {
      return `ml-${DEPTH_ENUM[this.depth]}`;
    },
  },
};
</script>
