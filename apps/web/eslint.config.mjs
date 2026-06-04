// Shared Modules
import { nextJSConfig } from '@redclayradio/eslint-config/next-js';

/** @type {import("eslint").Linter.Config[]} */
export default [
  // Next.js writes generated type helpers into src/utils/types — don't lint them.
  {
    ignores: ['src/utils/types/**', 'next-env.d.ts']
  },
  ...nextJSConfig
];
