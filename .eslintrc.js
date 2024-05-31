module.exports = {
  parser: "@typescript-eslint/parser",

  plugins: [
    "react-hooks",
    "@typescript-eslint",
    "styled-components-a11y",
    "jest",
    "jest-dom",
    "testing-library",
    "no-relative-import-paths",
  ],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:styled-components-a11y/recommended",
    "plugin:jest/recommended",
    "plugin:jest-dom/recommended",
    "plugin:testing-library/react",
    "prettier", // prettier should always be last
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 6,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    es6: true,
    browser: true,
    jest: true,
    node: true,
  },
  rules: {
    "@typescript-eslint/ban-ts-ignore": 0,
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescript-eslint/indent": 0,
    "@typescript-eslint/member-delimiter-style": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-inferrable-types": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/no-var-requires": 0,
    // Looks like their logic fails to account for the original location of the
    // import; meaninig: any variable named `wrapper` or function called `render`
    // from libs such as `enzyme` will throw. Disabling until we have an approach.
    "testing-library/render-result-naming-convention": 0,
    "no-console": [
      "error",
      {
        allow: ["warn", "error", "info", "group", "groupEnd", "groupCollapsed"],
      },
    ],
    "react/display-name": 0,
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": 0,
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/no-unstable-nested-components": ["error", { allowAsProps: false }],

    // FIXME: Investigate / reenable these rules. Disabled to introduce eslint
    // into codebase.
    "no-async-promise-executor": 0,
    "no-case-declarations": 0,
    "no-console": 0,
    "no-constant-condition": 0,
    "no-empty-pattern": 0,
    "no-extra-boolean-cast": 0,
    "no-inner-declarations": 0,
    "no-irregular-whitespace": 0,
    "no-prototype-builtins": 0,
    "no-undef": 0,
    "no-unreachable": 0,
    "no-useless-escape": 0,
    "prefer-const": 0,
    "prefer-rest-params": 0,
    "react/jsx-no-target-blank": 0,
    "react/no-direct-mutation-state": 0,
    "react/no-find-dom-node": 0,
    "react/no-unescaped-entities": 0,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/no-non-null-assertion": "error",
    "no-restricted-imports": [
      "error",
      {
        name: "superagent",
        message: "Please use native fetch instead.",
      },
      {
        name: "sharify",
        message: "Please use getENV instead.",
      },
      {
        name: "unstated",
        message: "Please just use React state.",
      },
      {
        name: "react-waypoint",
        message: "Please use `useIntersectionObserver`",
      },
      {
        name: "relay-runtime",
        importNames: ["graphql"],
        message: "Please import `graphql` from `react-relay`.",
      },
    ],
    "no-relative-import-paths/no-relative-import-paths": [
      "warn",
      { allowSameFolder: true, rootDir: "src" },
    ],
    "jest/valid-title": ["error", { ignoreTypeOfDescribeName: true }],
  },
  overrides: [
    {
      files: ["*.cy.js", "*.cy.ts"],
      rules: {
        "jest/expect-expect": "off",
        "jest/valid-describe": "off",
        "jest/valid-expect": "off",
      },
    },
    {
      files: ["webpack/**/*"],
      rules: {
        "no-console": "off",
      },
    },
    {
      files: ["*.test.ts", "*.test.tsx", "*.jest.ts", "**/*.jest.tsx"],
      rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
      },
    },
  ],
}
