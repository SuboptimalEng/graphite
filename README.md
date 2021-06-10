### ⚠️ This repo is for demo purposes only ⚠️

### ⚠️ Don't use Graphite to edit local files ⚠️

---

# Graphite

### ✍️ A local-first Markdown note-taking app built with Vue.js and Electron.

- In 2020, I quit my tech job to focus on creating web development tutorials on [YouTube channel](youtube.com/SuboptimalEng).
- After spending a few months playing around with different technologies, I decided to "get good" at Vue.js + Tailwind CSS.
- In order to test how far I've come the tech stack, I decided to build Graphite, a simple markdown note-taking app.
- As you can see from the commit history, I built it in about <10 days so the code quality is pretty bad.
- Please do not try to build this app locally as it won't work -- the demo should give you an idea of what I made.

### 📝 Feature Set

- Basic
  - Add/remove/rename/move files
  - Markdown preview
  - CodeMirror editor
- Keybindings
  - Open file search -> `command + o`
  - Close file search -> `esc`
  - Toggle sidebar -> `command + b`
- Configurable Themes with CSS Variables
  - Dracula
  - Gruvbox
  - Monokai
- Maybe Someday
  - WYSIWYG
  - Translucent window
  - Add/remove/rename/move folders
  - Watch for file changes in Electron and persist changes automatically
  - Actually release a desktop app for Mac/Windows/Linux

### 💻 Tech Stack

- Stack
  - Vue.js
  - Vuex (state management)
  - Electron (desktop app)
  - Tailwind CSS (UI framework)
- JS Libraries
  - Marked (convert markdown to html)
  - CodeMirror (builing your own editor is hard)
  - Hotkeys.js (makes keyboard shortcuts easy)
