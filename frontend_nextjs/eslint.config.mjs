import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  ...tseslint.configs.recommended,
  prettier,
  {
    ignores: ['node_modules', '.next', 'out', 'dist', 'build', 'coverage', 'next-env.d.ts'],
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      // ✅ Prettier integration
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],

      // ✅ Code quality
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'react/jsx-key': 'off',

      // ✅ TypeScript tuning
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  // Optional — keep Next.js defaults clean
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'dist/**']),
]);
