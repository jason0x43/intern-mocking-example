define({
	proxyPort: 9000,
	proxyUrl: 'http://localhost:9000/',
	capabilities: {
		'selenium-version': '2.39.0'
	},
	environments: [
		{ browserName: 'chrome' }
	],
	maxConcurrency: 3,
	useSauceConnect: false,
	webdriver: {
		host: 'localhost',
		port: 4444
	},
	useLoader: {
		'host-node': 'dojo/dojo',
		'host-browser': 'node_modules/dojo/dojo.js'
	},
	loader: {
		// Packages that should be registered with the loader in each testing environment
		packages: [
			{ name: 'app', location: 'app' },
			{ name: 'dojo', location: 'node_modules/dojo' }
		]
	},
	suites: [ 'tests/all' ],
	//functionalSuites: [ 'app/tests/all' ],
	excludeInstrumentation: /./
});
