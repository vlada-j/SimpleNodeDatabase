const Table = require('../../shared/Table');

class ItemsTagsTable extends Table {
	constructor() {
		super();
		this.name = 'items_tags';
		this.createSQL = `CREATE TABLE IF NOT EXISTS ${this.name}(
			item_id INTEGER NOT NULL,
			tag_id INTEGER NOT NULL
		)`;
		this.run(this.createSQL);
	}


	insert(itemId, tags) {
		if (tags.length === 0) return;
		const values = tags.map(tagId => `(${itemId}, ${tagId})`).join(', ');
		const sql = `INSERT INTO ${this.name} (item_id, tag_id) VALUES ${values};`;
		return this.run(sql);
	}


	update(itemId, tags) {
		if (tags.length === 0) return;
		this.removeByItem(itemId);
		this.insert(itemId, tags);
	}


	get(itemId, tagId) {
		const sql = `SELECT * FROM ${this.name} WHERE item_id = ${itemId} AND tag_id = ${tagId};`;
		return this.run(sql);
	}


	getByItem(itemId) {
		const sql =
			`SELECT ${this.name}.tag_id as id, tags.name, tags.type 
			FROM ${this.name} 
			LEFT JOIN tags ON tags.id = ${this.name}.tag_id 
			WHERE item_id = ${itemId} 
			ORDER BY tags.type ASC`;
		return this.run(sql);
	}


	remove(itemId, tagId) {
		const sql = `DELETE FROM ${this.name} WHERE item_id = ${itemId} AND tag_id = ${tagId};`;
		return this.run(sql);
	}


	removeByItem(id) {
		const sql = `DELETE FROM ${this.name} WHERE item_id = ${id}`;
		return this.run(sql);
	}


	removeByTag(id) {
		const sql = `DELETE FROM ${this.name} WHERE tag_id = ${id}`;
		return this.run(sql);
	}
}

module.exports = new ItemsTagsTable();