define([], function () {
	function Display(node) {
		this.domNode = node;
	}

	Display.prototype.update = function (newValue) {
		this.domNode.innerHTML = newValue;
	};

	return Display;
});
