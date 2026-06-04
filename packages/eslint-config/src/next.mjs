// NPM Modules
import js from '@eslint/js';
import pluginNext from '@next/eslint-plugin-next';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// Custom Modules
import { config as baseConfig } from './base.mjs';

/**
 * A custom ESLint configuration for libraries that use Next.js with React.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const nextJSConfig = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended?.languageOptions,
      globals: {
        ...globals.browser,
        ...globals.es2021
      }
    }
  },
  {
    plugins: {
      '@next/next': pluginNext
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules
    }
  },
  {
    settings: {
      react: { version: 'detect' }
    },
    rules: {
      // React scope no longer necessary with new JSX transform
      'react/react-in-jsx-scope': 'off'
    }
  }
];
