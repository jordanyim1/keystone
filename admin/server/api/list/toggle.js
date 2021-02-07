var restrictAccess = require('../../middleware/restrictAccess');

module.exports = function (req, res) {
	req.list.model.findById(req.params.id, function (err, item) {
		if (err) return res.status(500).json({ error: 'database error', detail: err });
		if (!item) return res.status(404).json({ error: 'not found', id: req.params.id });
		if (!restrictAccess.canEditList(req.list, req.user)) return res.status(401).json({ error: 'You do not have permission to update this item.', id: req.params.id });

		const value = req.params.value === 'true';
		req.list.toggle(item, req.params.field, value, function (err) {
			if (err) {
				var status = err.error === 'validation errors' ? 400 : 500;
				var error = err.error === 'database error' ? err.detail : err;
				return res.apiError(status, error);
			}

			return res.json({
				success: true,
				value: req.value,
			});
		});
	});
};
