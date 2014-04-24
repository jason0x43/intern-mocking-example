define([], function () {
	function Display() {
	}

	Display.prototype.update = function (newValue) {
		this.value = newValue;
	};

	return Display;
});
