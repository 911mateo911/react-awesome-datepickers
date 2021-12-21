#!/usr/bin/env node
const rollup = require('rollup');
const resolve = require('@rollup/plugin-node-resolve').default;
const babel = require('@rollup/plugin-babel').default;
const postcss = require('rollup-plugin-postcss');
const url = require('@rollup/plugin-url');
const path = require('path');
const svgr = require('@svgr/rollup');
const typescript = require('rollup-plugin-typescript2');
const commonJS = require('@rollup/plugin-commonjs');
const { terser } = require('rollup-plugin-terser');

const currentWorkingPath = process.cwd();

// get repo name from package.json
const { name: fileName } = require(path.join(currentWorkingPath, 'package.json'));

const inputPath = path.join(currentWorkingPath, 'src/index.ts');

const inputOptions = {
    input: inputPath,
    external: ['react'],
    plugins: [
        resolve(),
        postcss({
            // css modules
            modules: true,
        }),
        babel({
            presets: [['@babel/preset-env', { "modules": false }], '@babel/preset-react'],
            babelHelpers: 'runtime',
            exclude: 'node_modules/**',
        }),
        url(),
        // export ReactComponents from svg files
        svgr(),
        typescript({ useTsconfigDeclarationDir: true }),
        commonJS({
            include: 'node_modules/**'
        }),
        terser()
    ],
};
const outputOptions = [
    {
        dir: `dist`,
        format: 'esm',
        preserveModules: true,
    },
];

async function build() {
    // create bundle
    const bundle = await rollup.rollup(inputOptions);
    // loop through the options and write individual bundles
    outputOptions.forEach(async (options) => {
        await bundle.write(options);
    });
}

build();
