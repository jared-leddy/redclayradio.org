/** @type {import("eslint").Linter.Config[]} */

// Shared Modules
import { nextJSConfig } from '@redclayradio/eslint-config/next-js';

export default [
  /** Next.js writes generated type helpers into src/utils/types — don't lint them. */
  {
    ignores: ['src/utils/types/**', 'next-env.d.ts']
  },
  ...nextJSConfig,
  {
    rules: {
      /**
       * We size images with Tailwind classes rather than next/image's required
       * width/height, so the plain <img> element is intentional here.
       */
      '@next/next/no-img-element': 'off'
    }
  }
];
