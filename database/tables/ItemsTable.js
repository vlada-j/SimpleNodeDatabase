const Table = require('../../shared/Table');

class ItemsTable extends Table {
	constructor() {
		super();
		this.name = 'items';
		this.createSQL = `CREATE TABLE IF NOT EXISTS ${this.name}(
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NULLABLE,
			type INTEGER NOT NULL,
			category INTEGER NULLABLE
		)`;
		this.run(this.createSQL);
	}


	insert(data) {
		const sql = `INSERT INTO ${this.name} 
		(name, type, category) 
		VALUES ('${data.name}', ${data.type}, ${data.category});`;
		return this.run(sql);
	}


	update(id, data) {
		if (typeof id !== 'number') return undefined;
		const sql = `UPDATE ${this.name} 
		SET name = '${data.name}', type = ${data.type}, category = ${data.category} 
		WHERE id = ${id};`;
		return this.run(sql);
	}
}

module.exports = new ItemsTable();