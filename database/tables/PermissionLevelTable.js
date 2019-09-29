const Table = require('./Table');

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


	get(id) {
		if (typeof id !== 'number') return undefined;
		return this.run(`SELECT * FROM ${this.name} WHERE id = ${id}`)[0];
	}


	insert(name) {
		return this.run(`INSERT INTO ${this.name} (name) VALUES( '${name}' );`);
	}


	update(id, name) {
		return this.run(`UPDATE ${this.name} SET name = '${name}' WHERE id = ${id}`);
	}


	delete(id) {
		return this.run(`DELETE FROM ${this.name} WHERE id = ${id}`);
	}
}

module.exports = new PermissionLevelTable();