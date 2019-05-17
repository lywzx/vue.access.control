module.exports = {
  env: {
    es6: true,
    browser: false,
    node: true
  },
  parser: '@typescript-eslint/parser',  // Specifies the ESLint parser
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',  // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier',
    'prettier/@typescript-eslint',  // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended',  // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions: {
    'project': './tsconfig.json'
  },
  rules: {
    'semi': 2,
    'object-curly-newline': 1, // Incompatible with prettier
    'quotes': ['error', 'single'],
    '@typescript-eslint/interface-name-prefix': 1,
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    'indent': 'off',
    '@typescript-eslint/indent': 'off'
  }
};
