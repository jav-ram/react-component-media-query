import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
       "@typescript-eslint/no-unused-vars": [
          "warn", // or "error" if you prefer
          { 
            "argsIgnorePattern": "^_",  // Ignore unused function arguments starting with _
            "varsIgnorePattern": "^_",  // Ignore unused variables starting with _
            "caughtErrorsIgnorePattern": "^_"  // Ignore unused catch params starting with _
          }
        ]
    },
  },
)
