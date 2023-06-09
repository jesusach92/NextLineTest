module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['standard', 'eslint-config-prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {},
  rules: {
    'space-before-function-paren': 0,
    'no-use-before-define': ['error', { functions: false }],
  },
}
