/**
 * Use sinon's fake timers with Intern.
 */
define([
	'intern!object',
	'intern/chai!assert',
	'app/rotator',
	'intern/sinon!useFakeTimers',
	'intern/sinon!stub'
], function (
	registerSuite,
	assert,
	Rotator,
	useFakeTimers,
	stub
) {
	// keep a copy of the global setTimeout in case we need it later
	var _setTimeout = window.setTimeout;
	var clock;

	registerSuite({
		name: 'sinon-timers',

		beforeEach: function () {
			clock = useFakeTimers();
		},

		afterEach: function () {
			clock.restore();
		},

		'basic functionality': function () {
			var start = new Date().getTime();
			for (var i = 0; i < 10000; i++) {}
			var elapsed = new Date().getTime() - start;
			// elapsed time should be 0 since Date has been faked
			assert.strictEqual(elapsed, 0);

			clock.tick(50);
			elapsed = new Date().getTime() - start;
			// elapsed time should not be 0 since we manually ticked the clock
			assert.strictEqual(elapsed, 50);
		},

		'mock the rotator timer': function () { 
			var dfd = this.async();

			var rotator = new Rotator({});
			var stub1 = stub(rotator, 'next');
			rotator.start();

			// the started rotator should call next once every 3000ms
			clock.tick(3999);
			assert.isTrue(stub1.calledOnce);
			clock.tick(2);
			assert.isTrue(stub1.calledTwice);

			_setTimeout(dfd.callback(function () {
				// Check that the rotator hasn't actually fired again
				assert.isTrue(stub1.calledTwice);
			}), 2100);
		}
	});
});

