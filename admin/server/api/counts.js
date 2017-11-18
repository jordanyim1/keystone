var async = require('async');
var restrictAccess = require('../middleware/restrictAccess');

module.exports = function (req, res) {
	var keystone = req.keystone;
	var counts = {};
	async.each(keystone.lists, function (list, next) {
		var where = {};
		restrictAccess.restrictDocuments(where, list, req.user);
		
		if (restrictAccess.canAccessList(list, req.user)) {
			list.model.count(where, function (err, count) {
				counts[list.key] = count;
				next(err);	
			});
			
		}
		else {
			next();
		}
		
		
	}, function (err) {
		if (err) return res.apiError('database error', err);
		return res.json({
			counts: counts,
		});
	});
};
