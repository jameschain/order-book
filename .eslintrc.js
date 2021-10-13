module.exports = {
  extends: ["react-app", "prettier", "plugin:react/recommended"],
  plugins: ["simple-import-sort", "sort-destructure-keys", "sort-keys-fix"],
  rules: {
    quotes: ["error", "single"],
    "react/display-name": "off",
    "react/jsx-closing-bracket-location": [2, "tag-aligned"],
    "react/jsx-first-prop-new-line": [2, "multiline"],
    "react/jsx-indent-props": [2, 2],
    "react/jsx-max-props-per-line": [2, { maximum: 1, when: "multiline" }],
    "react/jsx-sort-props": [
      1,
      {
        callbacksLast: true,
        ignoreCase: true,
        noSortAlphabetically: false,
        reservedFirst: ["key", "ref"],
        shorthandFirst: true,
      },
    ],
    "react/no-unescaped-entities": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": "error",
    "sort-destructure-keys/sort-destructure-keys": 2,
    "sort-keys-fix/sort-keys-fix": "warn",
  },
};
