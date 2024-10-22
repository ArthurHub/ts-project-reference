// rollup.config.js
import alias from '@rollup/plugin-alias';

export default {
  input: 'dist/main.js',
  output: {
    dir: 'bundle',
    output: 'bundle.js',
    format: 'es',
  },
  plugins: [
    alias({
      entries: [
        { find: '@deep', replacement: 'dist/local/deep/path' },
        { find: '@libs', replacement: '../libs/dist' },
      ],
    }),
  ],
};
