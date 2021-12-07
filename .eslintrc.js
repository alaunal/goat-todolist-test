module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
    amd: true,
    node: true,
  },
  globals: {
    window: true,
    global: true,
    process: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "jest", "prettier"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": [
      "error",
      {
        bracketSpacing: true,
        printWidth: 120,
        jsxBracketSameLine: false,
        trailingComma: "all",
        endOfLine: "lf",
        semi: true,
        singleQuote: false,
        tabWidth: 2,
      },
    ],
  },
};
