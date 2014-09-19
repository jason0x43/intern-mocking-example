define([ 'intern' ], function (intern) {
	var args = intern.args;

	var proxyHost = args.proxyHost || 'localhost';
	var proxyPort = args.proxyPort || '9000';

	var environments = [];
	switch (args.env) {
		case 'ff':
			environments = [ { browserName: 'firefox' } ];
			break;
		case 'chrome':
			/* falls through */
		default:
			environments = [ { browserName: 'chrome', chromeOptions: { args: [ '--test-type' ] } } ];
	}

	return {
		proxyPort: 9000,
		proxyUrl: 'http://' + proxyHost + ':' + proxyPort + '/',
		capabilities: {
			'selenium-version': '2.42.0'
		},
		environments: environments,
		maxConcurrency: 3,
		tunnel: args.tunnel || 'NullTunnel',
		tunnelOptions: {
			hostname: args.tunnelHost || 'localhost',
			port: args.tunnelPort || '4444',
			auth: 'jcheatham_intern:79d5b4d4-f7e2-4f56-b82e-31a87a8560a8'
		},
		loader: {
			// Packages that should be registered with the loader in each testing environment
			packages: [
				{ name: 'app', location: 'app' },
				{ name: 'dojo', location: 'node_modules/dojo' }
			]
		},
		suites: [ 'tests/all' ],
		excludeInstrumentation: /(?:node_modules|tests)(?:\/|\\)/
	};
});
