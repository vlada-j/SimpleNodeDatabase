const CONFIG = {
	database: {
		path: __dirname + '/storage/database.sqlite3',
		password: '123',
		algorithm: 'aes-256-cbc'
	}
};


const database = require('./database/');

database.connect(CONFIG.database);

const users = require('./database/Users');
const items = require('./database/Items');
const groups = require('./database/Groups');