module.exports = {
  root: true,
  extends: [
    'plugin:import/recommended',
    'plugin:import/typescript',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  settings: {
    'import/resolver': {
      typescript: true,
    }
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        'max-len': [
          'error',
          {
            code: 160,
            ignoreComments: true,
          },
        ],
        '@typescript-eslint/no-non-null-assertion': 'off',
        'react/require-default-props': 'off',
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'no-param-reassign': 'off',

        // mui stuff: @see https://mui.com/material-ui/guides/minimizing-bundle-size/
        'no-restricted-imports': [
          'error',
          {
            patterns: ['@mui/*/*/*'],
          },
        ],
      },
    },
  ],
}
