<template>
  <div v-if="fileSystem.length === 0">Loading...</div>
  <div v-else>
    <!-- <div class="flex"> -->
    <div class="flex justify-center space-x-2">
      <div>
        <button class="border" @click="createFile">New File</button>
      </div>
      <div>
        <button class="border" @click="toggleTheme">TT</button>
      </div>
      <div class="relative" v-click-outside="hideThemeDropdownDiv">
        <button
          class="border"
          @click="showThemesDropdown = !showThemesDropdown"
        >
          Select Theme
        </button>
        <div v-if="showThemesDropdown">
          <div class="absolute border bg-sidebar-bg w-full" id="dropdownDiv">
            <div
              v-for="theme in themesDropdownOptions"
              :key="theme"
              class="hover:bg-sidebar-bg-hover"
              @click="
                setTheme(theme);
                hideThemeDropdownDiv();
              "
            >
              {{ theme }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
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
import themes from '../utils/themes.ts';

export default {
  name: 'FileBrowser',
  components: {
    FileBrowserTree,
  },
  data() {
    return {
      showThemesDropdown: false,
      themesDropdownOptions: Object.keys(themes),
    };
  },
  mounted() {
    window.ipc.on('FILE_SYSTEM', ({ fileSystem, fileSystemGlob }) => {
      this.setFileSystem({ fileSystem, fileSystemGlob });
    });

    this.getFileSystem();
  },
  methods: {
    ...mapMutations(['setFileSystem', 'toggleTheme', 'setTheme']),

    hideThemeDropdownDiv() {
      if (this.showThemesDropdown) {
        this.showThemesDropdown = false;
      }
    },

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
