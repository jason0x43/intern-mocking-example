/**
 * This test shows how to mock dojo/request network requests using dojo/request/registry.
 */
define([
	'intern!object',
	'intern/chai!assert',
	'dojo/request/registry',
	'app/fortunes',
	'dojo/when',
	'dojo/has',
], function (registerSuite, assert, registry, fortunes, when, has) {
	registerSuite({
		name: 'requests',

		'.load': function () { 
			if (!has('host-browser')) {
				this.skip('requires a browser');
			}

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
	});
});
