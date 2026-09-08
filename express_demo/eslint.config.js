import js from '@eslint/js';
import tseslint from 'typescript-eslint';

// Nuevo
import prettierConfig from 'eslint-config-prettier';

export default [
  { ignores: ['dist/', 'node_modules/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig, // Nuevo
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      globals: {
        node: true,
        es2021: true,
      },
    },
    rules: {
      // Tus reglas configuradas previamente
      'no-underscore-dangle': ['error', { allow: ['_id'] }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  {
    files: ['tests/**/*.js'],
    languageOptions: {
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
      },
    },
  },
];
