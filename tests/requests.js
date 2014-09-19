/**
 * This test shows how to mock dojo/request network requests using dojo/request/registry and sinon's fake XHR server.
 */
define([
	'intern!object',
	'intern/chai!assert',
	'dojo/request/registry',
	'intern/sinon!createFakeServer',
	'app/fortunes',
	'dojo/when',
	'dojo/has'
], function (registerSuite, assert, registry, createFakeServer, fortunes, when, has) {
	registerSuite({
		name: 'app/fortunes',

		'.load': function () { 
			var dfd = this.async();
			fortunes.load().always(dfd.callback(function (data) {
				assert.deepEqual(data, [
					'An apple a day keeps the doctor away',
					'A rolling stone gathers no moss'
				]);
			}));
		},

		'.load with mock dojo request': function () { 
			var dfd = this.async();

			var mocker = registry.register('/fortunes', function (/* url, options */) {
				// Wrap using `when` to return a promise; you could also delay the response
				return when({ fortunes: [ 'foo', 'bar' ] });
			});

			fortunes.load().always(dfd.callback(function (data) {
				mocker.remove();
				assert.deepEqual(data, [ 'foo', 'bar' ]);
			}));
		},

		'.load with mock XHR server': function () { 
			if (!has('host-browser')) {
				this.skip();
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
		},
	});
});
