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


	insert(data) {
		const sql = `INSERT INTO ${this.name} 
		(name, type) 
		VALUES ('${data.name}', ${data.type});`;
		return this.run(sql);
	}


	update(id, data) {
		if (typeof id !== 'number') return undefined;
		const sql = `UPDATE ${this.name} 
		SET name = '${data.name}', type = ${data.type} 
		WHERE id = ${id};`;
		return this.run(sql);
	}
}

module.exports = new TagsTable();