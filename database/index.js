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

	tables.users = require('./tables/UsersTable');
	tables.permissions = require('./tables/PermissionLevelTable');
	tables.tags = require('./tables/TagsTable');
	tables.items = require('./tables/ItemsTable');
	tables.itemsTags = require('./tables/ItemsTagsTable');
	tables.groups = require('./tables/GroupsTable');
	tables.groupsItems = require('./tables/GroupsItemsTable');
}

function resetAllTables() {
	Object.values(tables).forEach(table => table.reset())
}