<template>
  <div class="absolute top-0 bottom-0 left-0 right-0 bg-sidebar-bg">
    <div class="flex flex-col space-y-4 p-24">
      <div>
        <div class="text-xl font-black">File Search</div>
        <div class="text-xs">Press `Esc` to Exit</div>
      </div>
      <input
        type="text"
        v-model="query"
        ref="fileSearch"
        @keydown.esc="closeFileSearch"
        class="bg-sidebar-bg border focus:outline-none"
      />
      <div class="text-xl font-black">Files</div>
      <div
        class="border max-h-80 overflow-x-hidden overflow-y-scroll no-scrollbar"
      >
        <div v-for="filePath in fileGlob" :key="filePath">
          <button
            v-if="fileContainsQuery(filePath)"
            class="
              text-xs
              p-1
              w-full
              text-left
              focus:outline-none
              hover:bg-sidebar-bg-hover
            "
            @click="openFileFormFileSearch(filePath)"
          >
            {{ filePath }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'FileSearch',
  data() {
    return {
      query: '',
    };
  },
  mounted() {
    this.$refs.fileSearch.focus();
  },
  methods: {
    ...mapMutations(['openFileFormFileSearch', 'closeFileSearch']),

    fileContainsQuery(file) {
      if (this.query.length === 0) {
        return true;
      }
      if (file.includes(this.query)) {
        return true;
      }
      return false;
    },
  },
  computed: {
    ...mapGetters(['fileGlob', 'activeFilePath']),
  },
};
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
