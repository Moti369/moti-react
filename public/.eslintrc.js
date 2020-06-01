/*
 * http://eslint.org/docs/rules/
 * https://github.com/yannickcr/eslint-plugin-react
 */
module.exports = {
    'parser': 'babel-eslint',
    'extends': [
        'eslint:recommended',
       'plugin:react/recommended',
        'plugin:jsx-control-statements/recommended'
    ],
    'plugins': [
        'react',
        'jsx-control-statements'
    ],
    'env': {
        'browser': true,
        'node': true,
        'es6': true,
    },
    'globals': {
        'InitData': true,
        '$': true,
    },
    'rules': {
        'indent': ['error', 4, {'VariableDeclarator':4, 'SwitchCase': 1}],
        'no-unused-vars': 0,
        'no-console': ['warn', {allow: ['warn', 'error']}],
        'eqeqeq': ['warn', 'always'],
        // React相关校验规则
        'react/jsx-indent': [2, 4],
        'react/display-name': 'off',
        'react/prop-types': 'off',
    },
}