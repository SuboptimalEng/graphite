<template>
  <div class="min-h-screen bg-gray-300">
    <FileBrowser></FileBrowser>
    <Editor></Editor>
  </div>
</template>

<script>
import Editor from './components/Editor.vue';
import FileBrowser from './components/FileBrowser.vue';

export default {
  name: 'App',
  components: { Editor, FileBrowser },
};
</script>
