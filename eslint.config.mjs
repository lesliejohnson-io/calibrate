import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

/*
 * Flat config, run through the ESLint CLI. `next lint` is deprecated and
 * goes away in Next 16, so `npm run lint` calls eslint directly.
 *
 * `eslint-config-next` is still published in the eslintrc format, which is
 * what FlatCompat is here to translate. Two presets:
 *
 *  - next/core-web-vitals -- the React and Next rules, with the Core Web
 *    Vitals ones raised from warning to error.
 *  - next/typescript -- the @typescript-eslint recommended set.
 *
 * The version is pinned to the project's own Next version. ESLint stays on
 * 9 because eslint-config-next 15 does not accept 10; moving to 10 means
 * moving to eslint-config-next 16, which belongs with a Next 16 upgrade.
 */
const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

const config = [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "next-env.d.ts", "tsconfig.tsbuildinfo"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default config;
