const path = require('path');

module.exports = async ({ config, mode }) => {
  // Find and remove old CSS rule.
  const cssRuleIndex = config.module.rules.findIndex(rule => rule.test.toString().includes('.css'));
  if (cssRuleIndex !== -1) {
    config.module.rules.splice(cssRuleIndex, 1);
  }

  // Make whatever fine-grained changes you need
  config.module.rules.push({
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [require('autoprefixer')]
        }
      }
    ],
    include: path.resolve(__dirname, '../src'),
  });

  return config;
};