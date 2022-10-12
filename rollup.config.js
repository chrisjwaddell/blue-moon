import {
    terser
} from 'rollup-plugin-terser';
import terserOptions from './compress';

export default [{
    input: './src/blue-moon.js',
    output: [{
        file: './dist/blue-moon.js',
        // format: 'es'
        format: 'iife',
        name: "BlueMoon"
        // format: 'esm'
        // exports: "named",
        // sourcemap: true
    }],
    plugins: [
        terser(terserOptions)
    ]
}]
