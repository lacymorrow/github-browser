const Jarvis = require("webpack-jarvis");

module.exports = {
	link: [
	  {
	    rel: 'icon',
	    type: 'image/x-icon',
	    href: 'favicon.ico',
	  },
	],
	exportPathMap: () => {
		return {
			'/': { page: '/' },
			'/repo/init-next': { page: '/', query: { repo: 'init-next' }},
			'/repo/album-art': { page: '/'},
			'/repo/init-static': { page: '/', query: { repo: 'init-static' }}
		}
	},
	webpack: config => {
		// Fixes npm packages that depend on `fs` module
		config.node = {
			fs: 'empty'
		}
		config.plugins = [
		  new Jarvis({
		    port: 1337 // optional: set a port
		  })
		];

		return config
	}
}
