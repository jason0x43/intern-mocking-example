define([ './display', './fortunes' ], function (Display, fortunes) {
	function Rotator() {
		this.fortunes = [];
		this.current = 0;
		this.display = new Display();
	}

	Rotator.prototype = {
		refresh: function () {
			var self = this;
			fortunes.load().then(function (data) {
				self.fortunes = data;
				self.next();
			});
		},

		next: function () {
			if (this.fortunes.length === 0) {
				return;
			}
			this.display.update(this.fortunes[this.current]);
			this.current = (this.current + 1) % this.fortunes.length;
		},

		reset: function () {
			this.current = 0;
			if (this.fortunes.length > 0) {
				this.display.update(0);
			}
		}
	};

	return Rotator;
});
