import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/react-hover-slideshow.cjs.js',
      format: 'cjs'
    },
    {
      file: 'dist/react-hover-slideshow.esm.js',
      format: 'esm'
    }
  ],
  external: [
    'prop-types',
    'react',
    'react-dom',
    'react-transition-group'
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    postcss({
      modules: true,
      extensions: ['.css'],
    })
  ]
};