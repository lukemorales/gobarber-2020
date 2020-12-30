const dark = {
  colors: {
    background: '#2b2735',
    black: '#27242e',
    shape: '#3c3847',
    grayHard: '#6e6359',
    gray: '#9e948a',
    white: '#F4EDE8',
    orange: '#FF9000',
    inputs: '#211e29',
    error: '#c53030',
    toasts: {
      info: {
        color: '#3172b7',
        background: '#ebf8ff',
      },
      success: {
        color: '#2e656a',
        background: '#e6fffa',
      },
      error: {
        color: '#c53030',
        background: '#fddede',
      },
      warning: {
        color: '#FF9000',
        background: '#fcf4e4',
      },
    },
  },
  radii: {
    default: '0.8rem',
  },
} as const;

export default dark;
