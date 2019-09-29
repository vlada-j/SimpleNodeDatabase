const run = require('../../shared/sqliteRun');

module.exports = class Table {

	constructor() {
		this.name = '';
		this.createSQL = '';
		// if (this.createSQL) this.run(this.createSQL);
	}


	run(sql) { return run(sql) }


	reset() {
		this.run(`DROP TABLE ${this.name}`);
		this.run(this.createSQL);
	}


	getAll() {
		return this.run(`SELECT * FROM ${this.name}`);
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
};