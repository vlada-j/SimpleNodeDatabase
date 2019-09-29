const Table = require('./Table');

class TagsTable extends Table {
	constructor() {
		super();
		this.name = 'tags';
		this.createSQL = `CREATE TABLE IF NOT EXISTS ${this.name}(
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			type INTEGER NOT NULL
		)`;
		this.run(this.createSQL);
	}


	getAll() {
		return this.run(`SELECT * FROM ${this.name} ORDER BY type ASC`);
	}


	delete(id) {
		if (typeof id !== 'number') return undefined;
		return this.run(`DELETE FROM ${this.name} WHERE id = ${id}`);
	}
}

module.exports = new TagsTable();