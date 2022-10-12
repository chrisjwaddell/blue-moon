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
    }]
}]
