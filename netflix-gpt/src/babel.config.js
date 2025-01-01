module.exports = {
    presets: [
      '@babel/preset-env', // For compiling modern JavaScript down to older versions for compatibility
      '@babel/preset-react', // For compiling React JSX
    ],
    plugins: [
      '@babel/plugin-transform-private-property-in-object', // The new plugin for private properties in objects
      // You can add other Babel plugins here if necessary
    ],
  };
  