/**
 * Use the sinon.mock module with Intern.
 */
define([
	'intern!object',
	'intern/sinon!mock',
	'app/rotator',
	'dojo/dom',
	'intern/chai!assert'
], function (
	registerSuite,
	sinonMock,
	Rotator,
	dom,
	assert
) {
	var rotator;
	var mock;

	registerSuite({
		name: 'sinon-mock',

		beforeEach: function () {
			rotator = new Rotator({});
			rotator.fortunes = [ 'foo' ];
			mock = rotator.dispay = sinonMock(rotator.display);
		},

		'simple mock': function() {
			mock.expects('update')
				.once()
				.withArgs('foo');
			rotator.next();
			mock.verify();
		},

		'failing mock': {
			'not called enough times': function() {
				mock.expects('update')
					.twice();
				rotator.next();
				assert.throws(function () {
					// Will fail because 'update' is only called once.
					mock.verify();
				});
			},

			'wrong arguments': function () {
				mock.expects('update')
					.withArgs('bar');
				assert.throws(function () {
					// Will fail because 'update' is called with an unexpected argument.
					rotator.next();
				});
			}
		}
	});
});
