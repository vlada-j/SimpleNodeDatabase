const Table = require('./Table');

class GroupsTable extends Table {
	constructor() {
		super();
		this.name = 'groups';
		this.createSQL = `CREATE TABLE IF NOT EXISTS ${this.name}(
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			category INTEGER NULLABLE
		)`;
		this.run(this.createSQL);
	}


	get(ids) {
		if (ids.length === 0) return [];
		const query = ids
			.map(id => `id = ${id}`)
			.join(' OR ');
		const sql = `SELECT * FROM ${this.name} WHERE ${query};`;
		return this.run(sql);
	}


	remove(ids) {
		if (ids.length === 0) return [];
		const query = ids
			.map(id => `id = ${id}`)
			.join(' OR ');
		return this.run(`DELETE FROM ${this.name} WHERE ${query};`)
	}


	insert(data) {
		const sql = `INSERT INTO ${this.name} 
		(name, category) 
		VALUES ('${data.name}', ${data.category});`;
		return this.run(sql);
	}


	update(id, data) {
		if (typeof id !== 'number') return undefined;
		const sql = `UPDATE ${this.name} 
		SET name = '${data.name}', category = ${data.category} 
		WHERE id = ${id};`;
		return this.run(sql);
	}
}

module.exports = new GroupsTable();