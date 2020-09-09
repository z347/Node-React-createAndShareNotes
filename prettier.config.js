module.exports = {
    printWidth: 80,
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: true,
    useTabs: false,
    tabWidth: 4,
    semi: true,
    overrides: [
        {
            files: '*.js',
            options: {
                printWidth: 120,
                arrowParens: 'avoid',
            },
        },
        {
            files: '*.jsx',
            options: {
                printWidth: 120,
                jsxBracketSameLine: false,
                jsxSingleQuote: false,
                arrowParens: 'avoid',
            },
        },
    ],
};
