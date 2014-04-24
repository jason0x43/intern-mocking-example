/**
 * This test shows how to mock dojo/request network requests using dojo/request/registry.
 */
define([
	'intern!object',
	'intern/chai!assert',
	'./support/requestMocker',
	'app/fortunes'
], function (registerSuite, assert, requestMocker, fortunes) {
	registerSuite({
		name: 'app/fortunes',

		// Start the data mocker when the test suite starts, and stop it after the suite suite has finished.
		setup: function () {
			requestMocker.start();
		},

		teardown: function () {
			requestMocker.stop();
		},

		'.load': function () { 
			var dfd = this.async();
			fortunes.load().always(dfd.callback(function (data) {
				assert.deepEqual(data, [ 'foo', 'bar' ]);
			}));
		}
	});
});
