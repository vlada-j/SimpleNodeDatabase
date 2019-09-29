const CONFIG = {
	database: {
		path: __dirname + '/storage/database.sqlite3',
		password: '123',
		algorithm: 'aes-256-cbc'
	}
};


const database = require('./database/');

database.connect(CONFIG.database);


const permissions = require('./database/tables/PermissionLevelTable');
const categories = require('./database/tables/CategoriesTable');
const tags = require('./database/tables/TagsTable');

const users = require('./database/Users');
const items = require('./database/Items');
const groups = require('./database/Groups');