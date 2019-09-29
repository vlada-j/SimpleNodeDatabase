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

	
}

function resetAllTables() {
	Object.values(tables).forEach(table => table.reset())
}