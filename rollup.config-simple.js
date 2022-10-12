export default [{
    input: './src/test-simple.js',
    output: [{
        file: './dist/test-simple.js',
        // format: 'es'
        format: 'iife',
        name: "blueMoon"
        // format: 'esm'
        // exports: "named",
        // sourcemap: true
    }]
}]
