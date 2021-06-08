<template>
  <div class="flex flex-col space-y-4">
    <div>
      <button
        class="
          border
          w-full
          text-left
          focus:outline-none
          hover:bg-sidebar-bg-hover
        "
        @click="toggleTheme"
      >
        Toggle Theme
      </button>
    </div>
    <div>
      <button
        class="
          border
          w-full
          text-left
          focus:outline-none
          hover:bg-sidebar-bg-hover
        "
        @click="toggleLineNumbers"
      >
        Toggle Line Numbers
      </button>
    </div>
    <div class="relative" v-click-outside="hideThemeDropdownDiv">
      <button
        class="
          border
          w-full
          text-left
          focus:outline-none
          hover:bg-sidebar-bg-hover
        "
        @click="showThemesDropdown = !showThemesDropdown"
      >
        <div>Select Theme</div>
      </button>
      <div v-if="showThemesDropdown">
        <div class="absolute border bg-sidebar-bg">
          <div
            v-for="theme in themesDropdownOptions"
            :key="theme"
            class="justify-center hover:bg-sidebar-bg-hover"
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
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import themes from '../utils/themes.ts';

export default {
  name: 'Settings',
  data() {
    return {
      showThemesDropdown: false,
      themesDropdownOptions: Object.keys(themes),
    };
  },
  methods: {
    ...mapMutations(['toggleTheme', 'toggleLineNumbers', 'setTheme']),

    showDropdown() {
      return this.showThemesDropdown;
    },

    hideThemeDropdownDiv() {
      if (this.showThemesDropdown) {
        this.showThemesDropdown = false;
      }
    },
  },
  computed: {
    ...mapGetters(['theme']),
  },
};
</script>
