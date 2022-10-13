import {
    terser
} from 'rollup-plugin-terser';
import terserOptions from './min';

export default [{
    input: './src/blue-moon.js',
    output: [{
        file: './dist/blue-moon-min.js',
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
