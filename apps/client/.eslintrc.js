module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["next/core-web-vitals", "airbnb", "airbnb-typescript", "prettier"],
  plugins: ["prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  rules: {
    "import/extensions": ["error", "never", { svg: "always", css: "always" }],
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "import/prefer-default-export": "off",
    "no-underscore-dangle": "off",
    "no-param-reassign": ["error", { props: false }],
    "react/button-has-type": "off",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "@types"],
      },
      typescript: {},
    },
  },
};
