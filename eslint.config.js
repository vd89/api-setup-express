const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
  eslint: require('eslint'),
  recommendedConfig: {
    plugins: ['@typescript-eslint'],
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'error',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  pluginMap: {
    '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    prettier: require('eslint-plugin-prettier'),
  },
});

const typescriptConfig = {
  files: ['src/**/*.{ts,tsx}', 'tests/**/*.{ts,tsx}'],
  languageOptions: {
    parser: require('@typescript-eslint/parser'),
    parserOptions: {
      project: './tsconfig.json',
      ecmaVersion: 2022,
      sourceType: 'module',
      ecmaFeatures: {
        modules: true,
      },
      tsconfigRootDir: __dirname,
    },
  },
  plugins: {
    '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    prettier: require('eslint-plugin-prettier'),
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    'prettier/prettier': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
  ignores: ['.*.js', 'node_modules/', 'dist/', 'coverage/', '.eslintrc.js', '**/*.d.ts'],
};

module.exports = [
  typescriptConfig,
  ...compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'),
];