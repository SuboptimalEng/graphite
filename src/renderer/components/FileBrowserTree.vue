<template>
  <div v-if="depth === 0">
    <div
      class="font-black underline hover:bg-sidebar-bg-hover my-2 text-xl"
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
      <button
        :class="depthClass"
        class="
          border border-text-normal
          focus:outline-none
          hover:bg-sidebar-bg-hover
          w-full
          text-left
        "
        @click="updateOpenFolders(fileOrFolder.path)"
        @drop="dropFileIntoFolder($event, fileOrFolder)"
        @dragover.prevent
        @dragenter.prevent
      >
        <div class="flex space-x-1 place-items-center">
          <div v-if="openFolders.includes(fileOrFolder.path)">▼</div>
          <div v-else>▶</div>
          <div>
            {{ fileOrFolder.name }}
          </div>
        </div>
      </button>

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
    <div
      v-else
      :class="
        activeFilePath === fileOrFolder.path
          ? 'bg-item-active text-sidebar-bg'
          : 'hover:bg-sidebar-bg-hover'
      "
    >
      <div :class="depthClass">
        <div v-if="fileIsBeingRenamed(fileOrFolder)">
          <div class="flex bg-sidebar-bg">
            <input
              type="text"
              class="w-full focus:outline-none text-sidebar-bg bg-text-normal"
              v-model="newFileName"
            />
            <div>
              <button
                class="border border-text-normal text-text-normal bg-sidebar-bg"
                @click="renameFile"
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          <button
            class="focus:outline-none w-full text-left"
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
    ...mapMutations(['setFile', 'updateOpenFolders', 'resetActiveFilePath']),

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
      if (file.path === this.filePath) {
        if (file.path === this.activeFilePath) {
          this.resetActiveFilePath();
        }
        return true;
      }
      return false;
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
    ...mapGetters(['openFolders', 'fileSystemGlob', 'activeFilePath']),

    depthClass() {
      return `ml-${DEPTH_ENUM[this.depth]}`;
    },
  },
};
</script>
