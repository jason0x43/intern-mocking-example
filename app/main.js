define([
	'app/rotator',
	'app/fortunes',
	'dojo/dom-construct',
	'dojo/dom',
	'dojo/on'
], function (Rotator, fortunes, domConstruct, dom, on) {
	function Main(nodeOrId) {
		if (typeof nodeOrId === 'string') {
			nodeOrId = dom.byId(nodeOrId);
		}
		this.domNode = nodeOrId;

		var wrapper = domConstruct.create('div', { className: 'output-wrapper' }, nodeOrId);
		var displayNode = domConstruct.create('div', { className: 'output' }, wrapper);
		var rotator = this.rotator = new Rotator(displayNode);

		var buttons = domConstruct.create('div', { className: 'controls' }, nodeOrId);
		var handles = this.handles = [];

		var next = domConstruct.create('button', {
			type: 'button',
			innerHTML: 'Next'
		}, buttons);
		handles.push(on(next, 'click', function () {
			rotator.next();
		}));

		var start = domConstruct.create('button', {
			type: 'button',
			innerHTML: 'Start'
		}, buttons);
		handles.push(on(start, 'click', function () {
			if (start.innerHTML === 'Start') {
				rotator.start();
				start.innerHTML = 'Stop';
			}
			else {
				rotator.stop();
				start.innerHTML = 'Start';
			}
		}));

		rotator.refresh();
	}

	Main.prototype = {
		destroy: function () {
			var handle;
			while ((handle = this.handles.pop())) {
				handle.remove();
			}
		},
	};

	return Main;
});
