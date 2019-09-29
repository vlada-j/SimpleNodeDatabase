const { tables, run } = require('./index');
const { forceInt, forceString, forceArray } = require('../shared/util');

// Items
module.exports = {
	get,
	create,
	update,
	remove,
	search,
};


const DEFAULT = {
	name: '',
	type: 1,
	category: null,
	tags: []
};

//--------------------------------------------------------------------------------------------------

function validation(data) {
	data = Object.assign({}, DEFAULT, data);

	data.name = forceString(data.name);
	data.type = forceInt(data.type, DEFAULT.type);
	data.category = forceInt(data.category, DEFAULT.category);
	data.tags = forceArray(data.tags, DEFAULT.tags);

	return data;
}

//--------------------------------------------------------------------------------------------------

function create(data) {
	data = validation(data);
	const id = tables.items.insert(data);
	tables.itemsTags.insert(id, data.tags);
	return get(id);
}

//--------------------------------------------------------------------------------------------------

function update(id, data) {
	data = validation(data);
	tables.items.update(id, data);
	tables.itemsTags.update(id, data.tags);
	return get(id);
}

//--------------------------------------------------------------------------------------------------

function get(ids) {
	const asList = ids instanceof Array,
		result = tables.items.get(asList ? ids : [ids]);

	result.forEach(item => {
		item.category = tables.categories.get(item.category);
		item.tags = tables.itemsTags.getByItem(item.id);
	});

	return asList ? result : result[0];
}

//--------------------------------------------------------------------------------------------------

function remove(ids) {
	ids = ids instanceof Array ? ids : [ids];

	ids.forEach(id => {
		tables.itemsTags.removeByItem(id);
		tables.groupsItems.removeByItem(id);
	});

	return tables.items.remove(ids);
}

//--------------------------------------------------------------------------------------------------

function search(query) {
	if (typeof query !== 'object' || query === null) return [];

	let qname = typeof query.name === 'string' ? 'items.name LIKE "%' + query.name + '%"' : '';
	let qtype = typeof query.type === 'number' ? 'items.type = ' + query.type : '';
	let qcate = typeof query.category === 'number' ? 'items.category = ' + query.category : '';
	let join = '';
	let qtags = '';

	if (query.tags instanceof Array && query.tags.length) {
		join = 'LEFT JOIN items_tags ON ' + query.tags.map(tag => `(items_tags.tag_id = ${tag} AND items_tags.item_id = items.id)`).join(' OR ');
		qtags = 'items_tags.item_id = items.id';
	}

	let where = [qtags, qtype, qcate, qname].filter(c=>!!c);
	where = where.length ? ' WHERE ' + where.join( ' AND ' ) : '';

	let result = run( 'SELECT items.id FROM items ' + join + where + ';' );
	return get( result.map(m => m.id) );
}