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
};