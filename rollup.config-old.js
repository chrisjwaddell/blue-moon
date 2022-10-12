export default [{
    input: './src/blue-moon.js',
    output: [{
        file: './src/blue-moon-built2.js',
        // format: 'es'
        format: 'iife',
        name: "blueMoon"
        // format: 'esm'
        // exports: "named",
        // sourcemap: true
    }]
}]
