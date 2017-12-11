let UserRoles = null;

var userHasRole = function (list, field, user) {
	var userRole = UserRoles.find(x => x.value === user.role);

	if (!list.options.restrict || !list.options.restrict[field] || userRole.isAdmin) {
		return true;
	}

	if (list.options.restrict[field].includes(userRole.label)) {
		return true;
	}

	return false;
};

module.exports = {
	setUserRoles: function (userRoles) {
		UserRoles = userRoles;
	},
	/**
	 * Adds queries to a 'where' clause based on user role and restriction
	 * @param where - where query object
	 * @param list - keystone list
	 * @param user - user object
	 */
	restrictDocuments: function (where, list, user) {
		var role = UserRoles.find(x => x.value === user.role);
		if (list.options.restrict && role.isAdmin !== true) {
			if (list.options.restrict.match) {
				var path = list.options.restrict.match.path;
				var from = list.options.restrict.match.from;
				if (!path || !from) {
					throw new Error('list ' + list + ' must have "path" and "from"');
				}
				where[path] = user[from];
			}
		}
	},

	canAccessList: function (list, user) {
		return userHasRole(list, 'rolesCanView', user);
	},

	canEditList: function (list, user) {
		return userHasRole(list, 'rolesCanEdit', user);
	},
};
