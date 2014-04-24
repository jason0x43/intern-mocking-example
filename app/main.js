define([ 'app/rotator', 'dojo/dom', 'dojo/on' ], function (Rotator, dom, on) {
	return {
		start: function () {
			var next = dom.byId('next'),
				rotator = new Rotator();

			rotator.refresh();

			this.handle = on(next, 'click', function () {
				rotator.next();
			});
		},

		stop: function () {
			this.handle && this.handle.remove();
			this.handle = null;
		}
	};
});
