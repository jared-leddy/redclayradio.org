// Shared Modules
import { config as baseConfig } from '@redclayradio/eslint-config/base';

export default [
  {
    ignores: ['apps/**', 'packages/**', 'dist/**', 'node_modules/**']
  },
  ...baseConfig
];
