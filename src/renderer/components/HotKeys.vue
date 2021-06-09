<template>
  <div>hi</div>
</template>

<script>
import hotkeys from 'hotkeys-js';
import { mapGetters, mapMutations } from 'vuex';
import { KEYBOARD_SHORTCUTS } from '../shared/constants';

export default {
  name: 'HotKeys',
  methods: {
    ...mapMutations([
      'toggleSidebar',
      'openFileSearch',
      'closeFileSearch',
      'setPlatformName',
    ]),
  },
  computed: {
    ...mapGetters(['platformName']),
  },
  mounted() {
    window.ipc.send('GET_OS');

    window.ipc.on('GET_OS', ({ platformName }) => {
      this.setPlatformName(platformName);
      KEYBOARD_SHORTCUTS.forEach((command) => {
        const keybinding = command[platformName];
        // INSIGHT: dynamically call vue methods => this[command.name]()
        hotkeys(keybinding, () => this[command.name]());
      });
    });
  },
  unmounted() {
    hotkeys.unbind();
  },
};
</script>
