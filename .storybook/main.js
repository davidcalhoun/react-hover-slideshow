module.exports = {
  stories: ['../src/**/*.stories.mdx'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-postcss',
      options: {
        styleLoaderOptions: {},
        cssLoaderOptions: {
          modules: true,
          sourceMap: true,
          importLoaders: 1,
        },
        postcssLoaderOptions: {
          implementation: require('postcss')
        },
      },
    }
  ],
  webpackFinal: async (config) => {
    // Finds and removes the old CSS rule.
    const cssRuleIndex = config.module.rules.findIndex(rule => rule.test.toString().includes('.css'));
    if (cssRuleIndex !== -1) {
      //config.module.rules.splice(cssRuleIndex, 1);
    }

    //console.log(11, config.module.rules[cssRuleIndex])

    // Tweaks needed for PostCSS and CSS modules.
    // config.module.rules.push({
    //   test: /\.css$/,
    //   use: [
    //     'style-loader',
    //     {
    //       loader: 'css-loader',
    //       options: {
    //         modules: true,
    //         importLoaders: 1
    //       }
    //     },
    //     'postcss-loader'
    //   ]
    // });

    // Returns the modified config.
    return config;
  }
};