import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // 如果参数或变量名以大写字母或下划线开头，则视为有意未使用（不会报错）
      "no-unused-vars": ["error", { argsIgnorePattern: "^[A-Z_]", varsIgnorePattern: "^[A-Z_]" }],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-param-reassign": [ // 防止参数被重新赋值
        "error", // warn, off
        {
          props: true,
          ignorePropertyModificationsFor: ["ref"],
        },
      ],
    },
    settings: {
      react: {
        version: "detect", // 自动检测 React 版本,更新对应的规则
      },
    },
  },
];
