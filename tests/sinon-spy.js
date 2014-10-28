/**
 * This test suite illustrates how to use the sinon.spy module with Intern.
 */
define([
	'intern!object',
	'intern/sinon!spy',
	'intern/chai!assert'
], function (
	registerSuite,
	spy,
	assert
) {
	registerSuite({
		name: 'sinon-spy',

		'simple spy': function () {
			var callback = spy();
			callback();
			assert.isTrue(callback.called);
		},

		'proxy caller': function () {
			var callback = spy();

			function once(cb) {
				return function () {
					if (this.called) {
						return;
					}
					this.called = true;
					cb();
				};
			}

			var proxy = once(callback);

			proxy();
			proxy();
			assert.isTrue(callback.calledOnce);
		},

		'with arguments': function () {
			var callback = spy(),
				obj = {};

			callback.call(obj, 1, 2, 3);
			assert(callback.calledOn(obj));
			assert(callback.calledWith(1, 2, 3));
		}
	});
});
