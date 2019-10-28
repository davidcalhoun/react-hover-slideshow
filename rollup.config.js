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
  ]
};