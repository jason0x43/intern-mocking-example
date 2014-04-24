// Request mocker
define([
	'dojo/request/registry',
	'dojo/when'
], function (registry, when) {
	var mocking = false,
		handles = [];

	function start() {
		if (mocking) {
			return;
		}

		mocking = true;

		handles.push(
			// Register a handler for requests to '/motd' that mocks a response without actually requesting from the
			// server
			registry.register('/fortunes', function (/* url, options */) {
				// Wrap using `when` to return a promise; you could also delay the response
				return when({ fortunes: [ 'foo', 'bar' ] });
			})
		);
	}

	function stop() {
		if (!mocking) {
			return;
		}

		mocking = false;

		var handle;
		while ((handle = handles.pop())) {
			handle.remove();
		}
	}

	return { start: start, stop: stop };
});
