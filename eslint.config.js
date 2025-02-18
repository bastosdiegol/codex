import js from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        URL: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        confirm: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
    ignores: ["dist/", "docs/", ".parcel-cache/", "node_modules/"],
    files: ["scripts/*.js"],
  },
];
