/**
 * Use sinon's fake timers with Intern.
 */
define([
	'intern!object',
	'intern/chai!assert',
	'app/fortunes',
	'intern/sinon!useFakeTimers'
], function (
	registerSuite,
	assert,
	fortunes,
	useFakeTimers
) {
	var clock;
	var _setTimeout = window.setTimeout;

	registerSuite({
		name: 'sinon-timers',

		beforeEach: function () {
			clock = useFakeTimers();
		},

		afterEach: function () {
			clock.restore();
		},

		'basic functionality': function () {
			var dfd = this.async(100);
			_setTimeout(dfd.callback(function () {
				console.log('called');
			}), 300);
		},

		'mock the rotator timer': function () { 
		}
	});
});

