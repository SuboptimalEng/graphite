const DEPTH_ENUM = {
  0: '0',
  1: '4',
  2: '8',
  3: '12',
  4: '16',
  5: '20',
  6: '24',
  7: '28',
  8: '32',
  9: '36',
  10: '40',
};

const RANDOM = {
  1: 1,
};

const KEYBOARD_SHORTCUTS = [
  {
    name: 'toggleSidebar',
    mac: 'command+b',
    windows: 'ctrl+b',
    linux: 'ctrl+b',
  },
  {
    name: 'openFileSearch',
    mac: 'command+o',
    windows: 'ctrl+o',
    linux: 'ctrl+o',
  },
  {
    name: 'closeFileSearch',
    mac: 'esc',
    windows: 'esc',
    linux: 'esc',
  },
];

export { DEPTH_ENUM, RANDOM, KEYBOARD_SHORTCUTS };
