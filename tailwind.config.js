module.exports = {
  purge: {
    content: ['./public/**/*.html', './src/**/*.vue'],
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      // INSIGHT: Displaying transparent screens.
      // 'sidebar-bg': ({ opacityValue }) => {
      //   if (opacityValue !== undefined) {
      //     return `rgba(var(--sidebar-bg), ${opacityValue})`;
      //   }
      //   return `rgb(var(--sidebar-bg))`;
      // },
      'sidebar-bg': 'var(--sidebar-bg)',
      'sidebar-bg-hover': 'var(--sidebar-bg-hover)',
      'item-active': 'var(--item-active)',
      'item-text-active': 'var(--item-text-active)',
      'text-normal': 'var(--text-normal)',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
