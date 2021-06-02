<template>
  <div v-for="item in children" :key="item">
    <template v-if="item.type === 'directory'">
      <div :class="depthClass">
        <button
          @click="updateOpenFolders(item.path)"
          class="border border-black"
        >
          {{ item.name }} /
        </button>
      </div>

      <div v-if="folderIsOpen(item.path)">
        <FileBrowserTree
          :name="item.name"
          :type="item.type"
          :children="item.children"
          :depth="depth + 1"
        ></FileBrowserTree>
      </div>
    </template>

    <template v-else>
      <div :class="depthClass">
        <button @click="setFile(item)">
          {{ item.name }}
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { DEPTH_ENUM } from '../shared/constants';

export default {
  props: {
    name: String,
    type: String,
    children: Array,
    depth: Number,
  },
  methods: {
    ...mapMutations(['setFile', 'updateOpenFolders']),

    folderIsOpen(path) {
      return this.openFolders.includes(path);
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