const Table = require('../../shared/Table');

class UsersTable extends Table {
	constructor() {
		super();
		this.name = 'users';
		this.createSQL = `CREATE TABLE IF NOT EXISTS ${this.name}(
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			permission INTEGER NULLABLE
		)`;
		this.run(this.createSQL);
	}


	insert(data) {
		const sql = `INSERT INTO ${this.name} 
		(name, permission) 
		VALUES ('${data.name}', ${data.permission});`;
		return this.run(sql);
	}


	update(id, data) {
		if (typeof id !== 'number') return undefined;
		const sql = `UPDATE ${this.name} 
		SET name = '${data.name}', permission = ${data.permission} 
		WHERE id = ${id};`;
		return this.run(sql);
	}
}

module.exports = new UsersTable();