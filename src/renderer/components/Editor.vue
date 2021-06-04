<template>
  <!-- INSIGHT: Value is bound to CodeMirror so this won't update markdown. -->
  <textarea id="editor" :value="markdown"></textarea>
</template>

<script>
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/gruvbox-dark.css';
import 'codemirror/mode/gfm/gfm';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      markdown: '',
    };
  },
  mounted() {
    this.cm = CodeMirror.fromTextArea(document.getElementById('editor'), {
      mode: 'gfm',
      theme: 'gruvbox-dark',
      // fullScreen: true,
      // lineNumbers: true,
      viewportMargin: Infinity,
    });
    this.cm.setSize('full', '100%');

    this.cm.on('change', (cm) => {
      this.markdown = cm.getValue();
      this.writeFile({
        path: this.openFilePath,
        markdown: this.markdown,
      });
    });

    // INSIGHT: handle reply from the backend
    window.ipc.on('READ_FILE', (markdown) => {
      this.cm.setValue(markdown);
    });

    this.readFile({ path: this.openFilePath });
  },
  methods: {
    writeFile({ path, markdown }) {
      window.ipc.send('WRITE_FILE', {
        path,
        markdown,
      });
    },
    readFile({ path }) {
      // INSIGHT: ask backend to read file
      window.ipc.send('READ_FILE', { path });
    },
    openFile(path) {
      this.readFile({ path });
    },
  },
  computed: {
    ...mapGetters(['openFileName', 'openFilePath']),
  },
  watch: {
    // INSIGHT: this runs openFile if 'store.openFilePath' changes
    openFilePath: 'openFile',
  },
};
</script>
