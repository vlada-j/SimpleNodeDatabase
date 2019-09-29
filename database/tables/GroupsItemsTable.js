const Table = require('../../shared/Table');

class GroupsItemsTable extends Table {
	constructor() {
		super();
		this.name = 'groups_items';
		this.createSQL = `CREATE TABLE IF NOT EXISTS ${this.name}(
			group_id INTEGER NOT NULL,
			item_id INTEGER NOT NULL,
			order_nb INTEGER NOT NULL
		)`;
		this.run(this.createSQL);
	}


	insert(groupId, items) {
		if (items.length === 0) return;
		const values = items.map((itemId, i) => `(${groupId}, ${itemId}, ${i})`).join(', ');
		const sql = `INSERT INTO ${this.name} (group_id, item_id, order_nb) VALUES ${values};`;
		return this.run(sql);
	}


	update(groupId, items) {
		if (items.length === 0) return;
		this.removeByGroup(groupId);
		this.insert(groupId, items);
	}


	get(groupId, itemId) {
		const sql = `SELECT * FROM ${this.name} WHERE group_id = ${groupId} AND item_id = ${itemId};`;
		return this.run(sql);
	}


	getByGroup(groupId) {
		const sql =
			`SELECT ${this.name}.item_id as id, items.type
			FROM ${this.name} 
			LEFT JOIN items ON items.id = ${this.name}.item_id 
			WHERE group_id = ${groupId} 
			ORDER BY order_nb ASC`;
		return this.run(sql);
	}


	getByItem(itemId) {
		const sql =
			`SELECT ${this.name}.group_id as id, groups.name, groups.category 
			FROM ${this.name} 
			LEFT JOIN groups ON groups.id = ${this.name}.group_id 
			WHERE item_id = ${itemId} 
			ORDER BY order_nb ASC`;
		return this.run(sql);
	}


	remove(groupId, itemId) {
		const sql = `DELETE FROM ${this.name} WHERE group_id = ${groupId} AND item_id = ${itemId};`;
		return this.run(sql);
	}


	removeByItem(id) {
		const sql = `DELETE FROM ${this.name} WHERE item_id = ${id}`;
		return this.run(sql);
	}


	removeByGroup(id) {
		const sql = `DELETE FROM ${this.name} WHERE group_id = ${id}`;
		return this.run(sql);
	}
}

module.exports = new GroupsItemsTable();