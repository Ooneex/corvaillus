module.exports = {
  env: {
    "browser": true,
    "es2021": true,
    "jest": true,
    "node": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
  ],
  overrides: [
    {
      "files": ["*.json"],
      "rules": {
        "@typescript-eslint/comma-dangle": "off",
        "semi": "off",
      },
    },
    {
      "files": ["package.json"],
      "rules": {
        "jsonc/sort-keys": "off",
        "max-len": "off",
        "sort-keys-fix/sort-keys-fix": "off",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "ecmaVersion": "latest",
    "sourceType": "module",
  },
  plugins: [
    "prettier",
    "@typescript-eslint",
    "import",
    "jsonc",
    "sort-keys-fix",
  ],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/comma-dangle": ["error", {
      "arrays": "always-multiline",
      "exports": "never",
      "functions": "never",
      "imports": "never",
      "objects": "always-multiline",
    }],
    "@typescript-eslint/explicit-function-return-type": ["error", {
      "allowExpressions": true,
    }],
    "@typescript-eslint/no-shadow": ["error"],
    "@typescript-eslint/no-use-before-define": "error",
    "@typescript-eslint/no-var-requires": "off",
    "camelcase": "error",
    "comma-dangle": "off",
    "eol-last": ["error", "always"],
    "eqeqeq": ["error", "always"],
    "import/extensions": ["error", "ignorePackages", {
      "ts": "always",
      "tsx": "always",
    }],
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "indent": ["error", 2],
    "jsonc/sort-keys": ["error", "asc", {
      "caseSensitive": true,
      "minKeys": 2,
      "natural": false,
    }],
    "max-len": ["warn", { "code": 120 }],
    "no-duplicate-imports": "error",
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
    "no-shadow": "off",
    "no-use-before-define": "off",
    "quotes": ["error", "double", {
      "allowTemplateLiterals": true,
      "avoidEscape": true,
    }],
    "semi": ["error", "always"],
    "sort-imports": ["error", {
      "allowSeparatedGroups": false,
      "ignoreCase": false,
      "ignoreDeclarationSort": true,
      "ignoreMemberSort": false,
      "memberSyntaxSortOrder": ["none", "all", "single", "multiple"],
    }],
    "sort-keys-fix/sort-keys-fix": ["error", "asc", { natural: true }],
    "spaced-comment": "error",
  },
  settings: {
    "import/resolver": {
      "typescript": {},
    },
  },
};
