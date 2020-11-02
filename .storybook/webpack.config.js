const path = require('path');

module.exports = async ({ config, mode }) => {
  // Find and remove old CSS rule.
  const cssRuleIndex = config.module.rules.findIndex(rule => rule.test.toString().includes('.css'));
  if (cssRuleIndex !== -1) {
    config.module.rules.splice(cssRuleIndex, 1);
  }

  // Tweaks needed for PostCSS and CSS modules.
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
      'postcss-loader'
    ],
    include: [
      path.resolve(__dirname, '../src'),
      path.resolve(__dirname, '../node_modules/@storybook/addon-info'),
    ]
  });

  return config;
};