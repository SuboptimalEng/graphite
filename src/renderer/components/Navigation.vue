<template>
  <div class="flex flex-col place-items-center text-2xl">
    <button
      v-for="item in sidebarItems"
      :key="item.name"
      @click="
        showSidebar();
        setActiveSidebarItem(item.name);
      "
      class="w-full focus:outline-none"
    >
      <div
        class="p-2"
        :class="
          activeSidebarItem === item.name ? 'border-l bg-sidebar-bg-hover' : ''
        "
      >
        {{ item.icon }}
      </div>
    </button>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'Navigation',
  data() {
    return {
      sidebarItems: [
        {
          icon: '📁',
          name: 'fileBrowser',
        },
        {
          icon: '🛠',
          name: 'settings',
        },
      ],
    };
  },
  methods: {
    ...mapMutations(['setActiveSidebarItem', 'showSidebar']),
  },
  computed: {
    ...mapGetters(['activeSidebarItem']),
  },
};
</script>
