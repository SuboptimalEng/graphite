<template>
  <!-- INSIGHT: Value is bound to CodeMirror so this won't update markdown. -->
  <div
    class="
      h-10
      text-xl
      font-black
      border
      flex
      justify-between
      place-items-center
      items-center
    "
  >
    <div>{{ openFileName }}</div>
    <button
      @click="showEditor = !showEditor"
      class="px-4 text-2xl h-full hover:bg-sidebar-bg-hover focus:outline-none"
    >
      📝
    </button>
  </div>
  <div v-if="showEditor">
    <textarea id="editor" :value="markdown"></textarea>
  </div>
  <div v-else>
    <div v-html="compiledMarkdown" class="prose dark:prose-light"></div>
  </div>
</template>

<script>
import CodeMirror from 'codemirror';
import * as marked from 'marked';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/gruvbox-dark.css';
import 'codemirror/mode/gfm/gfm';
import { mapGetters } from 'vuex';
import themes from '../utils/themes.ts';

export default {
  data() {
    return {
      markdown: '',
      compiledMarkdown: '',
      showEditor: true,
      switchingFiles: false,
    };
  },
  mounted() {
    const firstRun = true;
    this.mountCodeMirror(firstRun);
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
    setOpenFile(path) {
      this.switchingFiles = true;
      this.readFile({ path });
    },
    setTheme(theme) {
      // INSIGHT: change theme in code mirror
      this.cm.setOption('theme', themes[theme].codeMirror);
    },
    setLineNumbers(lineNumbers) {
      this.cm.setOption('lineNumbers', lineNumbers);
    },
    async mountCodeMirror(firstRun = false) {
      setTimeout(() => {
        if (this.showEditor) {
          this.cm = CodeMirror.fromTextArea(document.getElementById('editor'), {
            mode: 'gfm',
            theme: themes[this.theme].codeMirror,
            // fullScreen: true,
            // lineNumbers: true,
            viewportMargin: Infinity,
          });
        }

        this.cm.setSize('full', '100%');

        this.cm.on('change', (cm) => {
          // INSIGHT: Don't update CodeMirror when switching files.
          // INSIGHT: ESPECIALLY DON'T WRITE FILE!!!
          if (!this.switchingFiles) {
            this.markdown = cm.getValue();
            this.compiledMarkdown = marked(this.markdown);
            this.writeFile({
              path: this.openFilePath,
              markdown: this.markdown,
            });
          }
        });

        if (firstRun) {
          // INSIGHT: handle reply from the backend
          window.ipc.on('READ_FILE', (markdown) => {
            this.cm.setValue(markdown);
            this.switchingFiles = false;
          });

          this.readFile({ path: this.openFilePath });
        }
      }, 10);
    },
  },
  computed: {
    ...mapGetters(['openFilePath', 'theme', 'lineNumbers', 'openFileName']),
  },
  watch: {
    // INSIGHT: this runs openFile if 'store.openFilePath' changes
    theme: 'setTheme',
    openFilePath: 'setOpenFile',
    lineNumbers: 'setLineNumbers',
    showEditor: 'mountCodeMirror',
  },
};
</script>
