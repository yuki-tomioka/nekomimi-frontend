module.exports = ({ env }) => ({
  plugins: {
    'autoprefixer': {},
    'postcss-custom-properties': {},
    'postcss-nesting': {},
    'csswring': env === 'production' ? {} : false
  }
});
