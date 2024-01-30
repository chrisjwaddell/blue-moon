export default {
	// prevent any compression
	compress: true,
	mangle: true,
	format: {
		comments: /^\**!|@preserve|@license|@cc_on/i,
	},
}
