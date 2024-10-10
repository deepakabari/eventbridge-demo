const prettier = require('eslint-plugin-prettier')

module.exports = {
  plugins: { prettier: prettier },
  rules: {
    semi: [2, 'never'],
    indent: ['error', 2, { SwitchCase: 1 }],
    quotes: [2, 'single', { avoidEscape: true }],
    'object-curly-spacing': [2, 'always'],
    'eol-last': [2, 'always'],
    'arrow-parens': [2, 'always'],
    'prettier/prettier': 'error'
  }
}
