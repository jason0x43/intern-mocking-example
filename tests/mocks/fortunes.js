define([ 'dojo/Deferred' ], function (Deferred) {
	return {
		load: function () {
			var dfd = new Deferred();
			dfd.resolve([ 'foo', 'bar' ]);
			return dfd.promise;
		}
	};
});
