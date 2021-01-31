module.exports = {
  presets: [
    [
      '@babel/preset-env', // tells Webpack to compile all syntax to ES5 (which browsers understand)
      {
        modules: false,
      },
    ],
    '@babel/preset-react', // adds support for jsx syntax
  ],
  plugins: [
    'styled-components',
    '@babel/plugin-proposal-class-properties', // transpile state and props properties that just sits right at the root level of the class.
    'transform-class-properties', // for backward compatibility
    'react-hot-loader/babel', // The library works together with Webpack to deliver HMR to our application
    '@babel/plugin-syntax-dynamic-import', // tells Babel to parse dynamic imports.
    '@babel/plugin-transform-runtime', // // Add support for async/await
  ],
  env: {
    test: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
        'transform-es2015-modules-commonjs',
        'dynamic-import-node',
      ],
    },
  },
};
