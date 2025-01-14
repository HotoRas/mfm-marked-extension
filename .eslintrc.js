module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
    },
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        'indent': ['error', 'tab', {
            'SwitchCase': 1,
            'MemberExpression': 'off',
            'flatTernaryExpressions': true,
            'ArrayExpression': 'first',
            'ObjectExpression': 'first',
        }],
        'eol-last': ['error', 'always'],
        'semi': ['error', 'always'],
        'quotes': ['error', 'single'],
        'comma-dangle': ['error', 'always-multiline'],
        'keyword-spacing': ['error', {
            'before': true,
            'after': true,
        }],
        'key-spacing': ['error', {
            'beforeColon': false,
            'afterColon': true,
        }],
        'space-infix-ops': ['error'],
        'space-before-blocks': ['error', 'always'],
        'object-curly-spacing': ['error', 'always'],
        'nonblock-statement-body-position': ['error', 'beside'],
        'eqeqeq': ['error', 'always', { 'null': 'ignore' }],
        'no-multiple-empty-lines': ['error', { 'max': 1 }],
        'no-multi-spaces': ['error'],
        'no-var': ['error'],
        'prefer-arrow-callback': ['error'],
        'no-throw-literal': ['error'],
        'no-param-reassign': ['warn'],
        'no-constant-condition': ['warn', {
            checkLoops: false,
        }],
        'no-empty-pattern': ['warn'],
        '@typescript-eslint/no-unnecessary-condition': ['warn', {
            allowConstantLoopConditions: true,
        }],
        '@typescript-eslint/no-inferrable-types': ['warn'],
        '@typescript-eslint/no-non-null-assertion': ['warn'],
        '@typescript-eslint/explicit-function-return-type': ['warn'],
        '@typescript-eslint/no-misused-promises': ['error', {
            'checksVoidReturn': false,
        }],
        '@typescript-eslint/no-unused-vars': ['error', {
            "argsIgnorePattern": "^_",
        }]
    },
};