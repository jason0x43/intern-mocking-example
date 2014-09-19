// Using dojo/request/registry enables easy mocking of the request system.
define([ 'dojo/request/registry', 'dojo/Deferred' ], function (request, Deferred) {
	return {
		load: function () {
			var dfd = new Deferred();
			console.log('requesting /fortunes...');
			request.get('/fortunes', {
				handleAs: 'json'
			}).then(function (data) {
				console.log('fortunes got data:', data);
				dfd.resolve(data.fortunes);
			}, function (error) {
				dfd.reject(error);
			});
			return dfd.promise;
		}
	};
});
