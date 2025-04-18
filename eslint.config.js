import antfu from '@antfu/eslint-config';

export default antfu({
    ignores: [
        '**/*.{yaml,yml,php}',
    ],
    stylistic: {
        indent: 4,
        semi: true,
    },
    typescript: {
        tsconfigPath: 'tsconfig.json',
    },
    vue: true,
}, {
    files: ['**/*.vue'],
    rules: {
        'vue/block-order': ['error', {
            order: [
                'template',
                'script',
                'style',
            ],
        }],
    },
}, {
    rules: {
        'perfectionist/sort-imports': ['error', {
            groups: [
                'type',
                [
                    'parent-type',
                    'sibling-type',
                    'index-type',
                    'internal-type',
                ],
                'builtin',
                'external',
                'internal',
                [
                    'parent',
                    'sibling',
                    'index',
                ],
                'side-effect',
                'object',
                'unknown',
            ],
            internalPattern: [
                '^@/',
                '^~/',
            ],
            newlinesBetween: 'never',
            type: 'natural',
            order: 'asc',
        }],
    },
});
