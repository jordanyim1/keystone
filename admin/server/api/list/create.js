var restrictAccess = require('../../middleware/restrictAccess');

module.exports = function (req, res) {
	var keystone = req.keystone;
	if (!keystone.security.csrf.validate(req)) {
		return res.apiError(403, 'invalid csrf');
	}
	if (!restrictAccess.canEditList(req.list, req.user)) return res.status(401).json({ error: 'You do not have permission to create new items.', id: req.params.id });

	var item = new req.list.model();
	req.list.updateItem(item, req.body, {
		files: req.files,
		ignoreNoEdit: true,
		user: req.user,
	}, function (err) {
		if (err) {
			var status = err.error === 'validation errors' ? 400 : 500;
			var error = err.error === 'database error' ? err.detail : err;
			return res.apiError(status, error);
		}
		res.json(req.list.getData(item));
	});
};
