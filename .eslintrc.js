module.exports = {
  env: {
    es6: true,
    mocha: true,
  },
  // "plugins": [
  //   "security"
  // ],
  extends: [
    'standard',
    // "plugin:security/recommended"
  ],
  rules: {
    indent: ['warn', 2],
    'comma-dangle': [
      'warn',
      {
        arrays: 'always',
        objects: 'always',
        imports: 'never',
        exports: 'never',
        functions: 'never',
      },
    ],
    'array-bracket-spacing': 0,
  },
}
