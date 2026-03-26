module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@pages': './src/pages',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@store': './src/store',
          '@services': './src/services',
          '@config': './src/config',
          '@types': './src/types',
        },
      },
    ],
  ],
};
