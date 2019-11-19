module.exports = {
  "env": {
    "browser": true
  },
  "extends": [
    "airbnb",
    "plugin:prettier/recommended"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "rules": {
    "arrow-body-style": [
      2,
      "as-needed"
    ],
    "arrow-parens": [
      "error",
      "always"
    ],
    "class-methods-use-this": 0,
    "comma-dangle": [
      2,
      "always-multiline"
    ],
    "consistent-return": 0,
    "import/imports-first": 0,
    "import/newline-after-import": 0,
    "import/no-dynamic-require": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-named-as-default": 0,
    "import/no-unresolved": 0,
    "import/no-webpack-loader-syntax": 0,
    "import/prefer-default-export": 0,
    "indent": [
      2,
      2,
      {
        "SwitchCase": 1
      }
    ],
    "lines-between-class-members": ["error", "always", { "exceptAfterSingleLine": true }],
    "max-len": 0,
    "newline-per-chained-call": 0,
    "no-await-in-loop": 0,
    "no-confusing-arrow": 0,
    "no-console": 1,
    "no-param-reassign": 0,
    "no-restricted-syntax": 0,
    "no-return-await": 0,
    "no-shadow": 0,
    "no-underscore-dangle": 0,
    "no-unneeded-ternary": 0,
    "no-use-before-define": 0,
    "prefer-template": 2,
    "prettier/prettier": 0,
    "radix": ["error", "as-needed"],
    "require-yield": 0,
    "semi": [
      "error",
      "never"
    ]
  }
}
