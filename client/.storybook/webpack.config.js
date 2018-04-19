// load the default config generator.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);
  // Extend it as you need.
  // For example, add typescript loader:
  config.module.rules.push({
    test: /\.tsx$/,
    loader: 'ts-loader'
  })
  config.module.rules.push({
      test: /\.ts$/,
      loader: 'ts-loader'
  })
  config.resolve.extensions.push(".tsx");
  config.resolve.extensions.push(".ts");
  return config;
};
