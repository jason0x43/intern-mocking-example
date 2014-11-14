/**
 * Use sinon's XHR mocking with Intern.
 */
define([
	'intern!object',
	'intern/chai!assert',
	'dojo/has',
	'app/fortunes',
	'intern/sinon!createFakeServer'
], function (
	registerSuite,
	assert,
	has,
	fortunes,
	createFakeServer
) {
	registerSuite({
		name: 'sinon-xhr',

		'.load data with mock XHR server': function () { 
			if (!has('host-browser')) {
				this.skip('requires a browser');
			}

			var dfd = this.async();
			
			// createFakeServer creates a mock XHR server that auto-responds to requests. By default a mock XHR server
			// won't respond until you call server.respond().
			var server = createFakeServer();

			server.respondWith(function (request) {
				request.respond(200, { 'Content-Type': 'application/json' },
					JSON.stringify({ fortunes: [ 'foo', 'bar' ] }));
			});

			fortunes.load().always(dfd.callback(function (data) {
				server.restore();
				assert.deepEqual(data, [ 'foo', 'bar' ]);
			}));
		}
	});
});
