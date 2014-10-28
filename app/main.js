define([
	'app/rotator',
	'app/fortunes',
	'dojo/dom',
	'dojo/on'
], function (Rotator, fortunes, dom, on) {
	function Main() {
		this.rotator = new Rotator();
	}

	Main.prototype = {
		start: function () {
			var rotator = this.rotator;
			this.handle = on(dom.byId('next'), 'click', function () {
				rotator.next();
			});
			rotator.refresh();
		},

		stop: function () {
			this.handle && this.handle.remove();
			this.handle = null;
		}
	};

	return Main;
});
