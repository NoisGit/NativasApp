import js from '@eslint/js'
import tseslint from 'typescript-eslint'

export default [
  { ignores: ['dist', 'coverage', 'node_modules'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}', 'tests/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        HTMLElement: 'readonly',
        HTMLMetaElement: 'readonly',
        AbortSignal: 'readonly',
        AbortController: 'readonly',
        KeyboardEvent: 'readonly',
        React: 'readonly',
        fetch: 'readonly'
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': 'error'
    }
  }
]
