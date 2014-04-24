/**
 * This test shows how to mock dojo/request network requests using dojo/request/registry.
 */
define([
	'intern!object',
	'intern/chai!assert',
	'intern/sinon',
	'app/fortunes'
], function (registerSuite, assert, sinon, fortunes) {
	var xhr, requests;

	registerSuite({
		name: 'app/fortunes',

		// Start the data mocker when the test suite starts, and stop it after the suite suite has finished.
		setup: function () {
			xhr = sinon.useFakeXMLHttpRequest();
			requests = [];

			xhr.onCreate = function (xhr) {
				requests.push(xhr);
			};
		},

		teardown: function () {
			xhr.restore();
		},

		'.load': function () { 
			var dfd = this.async();

			fortunes.load().always(dfd.callback(function (data) {
				assert.deepEqual(data, [ 'foo', 'bar' ]);
			}));

			assert.equals(requests.length, 1);
			requests[0].respond(200,  { 'Content-Type': 'application/json' },
				'{ "fortunes": [ "foo", "bar" ] }');
		}
	});
});
