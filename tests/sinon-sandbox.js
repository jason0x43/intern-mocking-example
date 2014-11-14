/**
 * Use sinon's sandboxing functionality with Intern.
 */
define([
	'intern!object',
	'intern/chai!assert',
	'intern/sinon!',
	'intern/sinon!sandbox',
	'app/rotator'
], function (
	registerSuite,
	assert,
	sinon,
	sandbox,
	Rotator
) {
	var rotator;

	registerSuite({
		name: 'sinon-assert',

		'default sandbox': {
			setup: function () {
				rotator = new Rotator({});
				rotator.fortunes = [ 'foo', 'bar' ];
			},

			'1. stub method': sinon.test(function () {
				// stub the update method on a rotator; this replaces the method on the object
				this.stub(rotator, 'next');
				rotator.next();

				// rotation shouldn't actually have happened
				assert.strictEqual(rotator.current, 0);
			}),

			// all stubs/mocks/etc. should have been removed after step 1.
			'2. call original': function () {
				rotator.next();

				// rotation should have happened
				assert.strictEqual(rotator.current, 1);
			}
		},

		'custom sandbox': {
			setup: function () {
				rotator = new Rotator({});
				rotator.fortunes = [ 'foo', 'bar' ];
			},

			'1. stub method': function () {
				var sandbox = sinon.sandbox.create();

				try {
					// stub the update method on a rotator; this replaces the method on the object
					sandbox.stub(rotator, 'next');
					rotator.next();

					// rotation shouldn't actually have happened
					assert.strictEqual(rotator.current, 0);
				}
				finally {
					sandbox.restore();
				}
			},

			'2. call original': function () {
				rotator.next();

				// rotation should have happened
				assert.strictEqual(rotator.current, 1);
			}
		}
	});
});
