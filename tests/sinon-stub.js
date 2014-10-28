/**
 * This test suite illustrates how to use the sinon.stub module with Intern.
 */
define([
	'intern!object',
	'intern/sinon!stub',
	'intern/chai!assert',
	'intern/amdMocker'
], function (
	registerSuite,
	stub,
	assert,
	amdMocker
) {
	registerSuite({
		name: 'sinon-stub',

		'simple stub': function () {
			// var callback = stub().returns(42);
			var callback = stub();
			callback = callback.returns(42);
			var retVal = callback();
			assert.strictEqual(retVal, 42);
			assert.strictEqual(callback.callCount, 1);
		},

		'mock a function': function () {
			return amdMocker.mock('app/main', {
				'dojo/dom': 'tests/mocks/dom',
				'dojo/on': 'tests/mocks/on',
				'app/rotator': 'tests/mocks/rotator'
			}).then(function (Main) {
				var m = new Main();
				stub(m, 'start');
				m.start();
			});
		}
	});
});

