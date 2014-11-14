/**
 * Use the sinon.stub module with Intern.
 */
define([
	'intern!object',
	'intern/sinon!stub',
	'intern/chai!assert',
	'app/rotator',
], function (
	registerSuite,
	stub,
	assert,
	Rotator
) {
	registerSuite({
		name: 'sinon-stub',

		'simple stub': function () {
			var callback = stub().returns(42);
			var retVal = callback();
			assert.strictEqual(retVal, 42);
			assert.strictEqual(callback.callCount, 1);
		},

		'stub an existing method': function () {
			var rotator = new Rotator({});
			rotator.fortunes = [ 'foo' ];

			// stub the update method on a rotator; this replaces the method on the object
			var stub1 = stub(rotator.display, 'update');

			rotator.next();
			assert.isTrue(stub1.calledOnce);

			// restore the original method to the rotator; the stub shouldn't be called a second time
			stub1.restore();
			rotator.next();
			assert.isFalse(stub1.calledTwice);
		}
	});
});
