const sqlite = require('sqlite-cipher');
const tables = {};

module.exports = {
	connect,
	tables,
	resetAllTables,
	run: require('../shared/sqliteRun'),
};

function connect(DATABASE_CONFIG) {
	sqlite.connect(DATABASE_CONFIG.path, DATABASE_CONFIG.password, DATABASE_CONFIG.algorithm);

	tables.permissions = require('./tables/PermissionLevelTable');
	tables.categories = require('./tables/CategoriesTable');
	tables.tags = require('./tables/TagsTable');

	tables.users = require('./tables/UsersTable');
	tables.items = require('./tables/ItemsTable');
	tables.groups = require('./tables/GroupsTable');

	tables.itemsTags = require('./tables/ItemsTagsTable');
	tables.groupsItems = require('./tables/GroupsItemsTable');
}

function resetAllTables() {
	Object.values(tables).forEach(table => table.reset())
}