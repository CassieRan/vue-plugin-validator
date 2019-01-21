import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'

const env = process.env.NODE_ENV || 'cjs'

export default {
    input: 'src/index.js',
    output: {
        file: 'lib/index.js',
        sourcemap: true,
        format: env
    },
    plugins: [
        postcss({extensions: ['.css']}),
        resolve(),
        commonjs(),
        babel({
            exclude: 'node_modules/**'
        })
    ]
}
