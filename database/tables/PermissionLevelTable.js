const Table = require('../../shared/Table');

class PermissionLevelTable extends Table {
	constructor() {
		super();
		this.name = 'permission_level';
		this.createSQL = `CREATE TABLE IF NOT EXISTS ${this.name}(
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL
		)`;
		this.run(this.createSQL);
	}


	insert(data) {
		const sql = `INSERT INTO ${this.name} 
		(name) 
		VALUES ('${data.name}');`;
		return this.run(sql);
	}


	update(id, data) {
		if (typeof id !== 'number') return undefined;
		const sql = `UPDATE ${this.name} 
		SET name = '${data.name}' s
		WHERE id = ${id};`;
		return this.run(sql);
	}
}

module.exports = new PermissionLevelTable();