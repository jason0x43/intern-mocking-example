/**
 * This test shows how to use Intern's amdMocker module to mock AMD dependencies.
 */
define([
	'intern!object',
	'intern/chai!assert',
	'intern/amdMocker'
], function (registerSuite, assert, amdMocker) {
	var Rotator;

	registerSuite({
		name: 'amd',

		setup: function () {
			// Instead of requiring app/fib in this test suite's dependencies, we require it through the amdMocker,
			// which will return a fib module that depends on tests/mocks/display rather than app/display.
			return amdMocker.mock('app/rotator', {
				'app/display': 'tests/mocks/display',
				'app/fortunes': 'tests/mocks/fortunes'
			}).then(function (mocked) {
				Rotator = mocked;
			});
		},

		'basic tests': function () {
			var r = new Rotator();

			r.next();
			assert.isUndefined(r.display.value);

			r.refresh();

			assert.equal(r.display.value, 'foo');
			r.next();
			assert.equal(r.display.value, 'bar');
			r.next();
			assert.equal(r.display.value, 'foo');
		}
	});
});
