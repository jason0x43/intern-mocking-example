/**
 * Use sinon's assertions with Intern.
 *
 * Intern is flexible about assertions -- anything that throws exceptions, including Sinon's assertions, will work.
 */
define([
	'intern!object',
	'intern/sinon!assert',
	'intern/sinon!stub',
	'app/rotator'
], function (
	registerSuite,
	assert,
	stub,
	Rotator
) {
	registerSuite({
		name: 'sinon-assert',

		'basic test': function () {
			var rotator = new Rotator({});
			rotator.fortunes = [ 'foo' ];

			// stub the update method on a rotator; this replaces the method on the object
			var stub1 = stub(rotator.display, 'update');

			rotator.next();
			assert.calledOnce(stub1);
			assert.calledOn(stub1, rotator.display);
		}
	});
});
