/**
 * Initialises Keystone's internal nav config
 *
 * @param {Object} nav
 * @api private
 */

var _ = require('lodash');
var utils = require('keystone-utils');
var restrictAccess = require('../../admin/server/middleware/restrictAccess');

module.exports = function initNav (sections, user) {
	var keystone = this;

	var nav = {
		sections: [],
		by: {
			list: {},
			section: {},
		},
	};

	if (!sections) {
		sections = {};
		nav.flat = true;
		_.forEach(this.lists, function (list) {
			if (list.get('hidden')) return;
			sections[list.path] = [list.path];
		});
	}

	_.forEach(sections, function (section, key) {
		if (typeof section === 'string') {
			section = [section];
		}
		section = {
			lists: section,
			label: nav.flat ? keystone.list(section[0]).label : utils.keyToLabel(key),
		};
		section.key = key;
		
		
		section.lists = _.map(section.lists, function (i) {
			if (typeof i === 'string') {
				var list = keystone.list(i);
				
				if (!list) {
					throw new Error('Invalid Keystone Option (nav): list ' + i + ' has not been defined.\n');
				}
				if (list.get('hidden')) {
					throw new Error('Invalid Keystone Option (nav): list ' + i + ' is hidden.\n');
				}
				nav.by.list[list.key] = section;
				
				if (!restrictAccess.canAccessList(list, user)) {
					return null;
				}
				
				return {
					key: list.key,
					label: list.label,
					path: list.path,
				};
			} else if (_.isObject(i)) {
				if (!_.has(i, 'key')) {
					throw new Error('Invalid Keystone Option (nav): object ' + i + ' requires a "key" property.\n');
				}
				console.log(i);
				if (!restrictAccess.canAccessList(i, user)) {
					return null;
				}
				i.label = i.label || utils.keyToLabel(key);
				i.path = i.path || utils.keyToPath(key);
				i.external = true;
				nav.by.list[i.key] = section;
				return i;
			}
			throw new Error('Invalid Keystone Option (nav): ' + i + ' is in an unrecognized format.\n');
		});
		section.lists = section.lists.filter(i => i !== null);
		if (section.lists.length) {
			nav.sections.push(section);
			nav.by.section[section.key] = section;
		}
	});

	return nav;
};
