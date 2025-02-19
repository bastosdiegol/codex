import js from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        // Browser Globals
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        URL: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        confirm: "readonly",
        // Service Worker Globals
        self: "readonly",
        caches: "readonly",
        fetch: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
    ignores: ["dist/", "docs/", ".parcel-cache/", "node_modules/"],
    files: ["assets/**/*.js"],
  },
];
