export default {
	// prevent any compression
	compress: false,
	compress: {defaults: false},
	mangle: false,
	format: {
		comments: /^\**!|@preserve|@license|@cc_on/i,
		beautify: true,
		semicolons: false,
	},
}
