var _ = require('lodash');


/**
 * Toggles a boolean field 'fieldName' in list item 'item'
 *
 */
function toggle (item, fieldName, value, callback) {
	try {
		item[fieldName] = value;
		item.save(callback);
	} catch (e) {
		return callback(e);
	}
}


module.exports = toggle;
