import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const pkg = require('./package.json');

const rootEntry = pkg.exports['.'];

export default [
    {
        input: 'src/index.js',
        output: [
            {
                file: rootEntry.require.default,
                format: 'cjs',
            },
            {
                file: rootEntry.import.default,
                format: 'es',
            },
        ],
        external: ['@fortawesome/fontawesome-svg-core'],
    },
];
