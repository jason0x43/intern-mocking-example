/**
 * This test suite illustrates how to sinon's XHR mocking Intern.
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
