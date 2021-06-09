<template>
  <div>hi</div>
</template>

<script>
import hotkeys from 'hotkeys-js';
import { mapMutations } from 'vuex';
import { KEYBOARD_SHORTCUTS } from '../shared/constants';

export default {
  name: 'HotKeys',
  methods: {
    ...mapMutations(['toggleSidebar']),
  },
  mounted() {
    KEYBOARD_SHORTCUTS.forEach((command) => {
      const keybindings = [command.mac, command.windows].join(',');
      // INSIGHT: dynamically call vue methods => this[command.name]()
      hotkeys(keybindings, () => this[command.name]());
    });
  },
  unmounted() {
    hotkeys.unbind();
  },
};
</script>
