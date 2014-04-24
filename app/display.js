define([ 'dojo/dom' ], function (dom) {
	function Display() {
		this.value = dom.byId('output');
	}

	Display.prototype.update = function (newValue) {
		this.value.innerHTML = newValue;
	};

	return Display;
});
