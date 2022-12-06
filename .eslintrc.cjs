module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:import/recommended', 'standard', 'prettier'],
  plugins: ['react', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': ['warn'],
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'max-len': [1, { code: 80 }],
    'comma-dangle': ['warn'],
    'multiline-ternary': 0,
    camelcase: 0,
    semi: 0,
    'no-multi-str': 0
  }
};
