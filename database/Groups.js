const { tables, run } = require('./index');
const { forceInt, forceString, forceArray } = require('../shared/util');

// Groups
module.exports = {
	get,
	create,
	update,
	remove,
	search,
};


const DEFAULT = {
	name: '',
	category: null,
	list: []
};

//--------------------------------------------------------------------------------------------------

function validation(data) {
	data = Object.assign({}, DEFAULT, data);

	data.name = forceString(data.name);
	data.category = forceInt(data.category, DEFAULT.category);
	data.list = forceArray(data.list, DEFAULT.list);

	return data;
}

//--------------------------------------------------------------------------------------------------

function create(data) {
	data = validation(data);
	const id = tables.groups.insert(data);
	tables.groupsItems.insert(id, data.list);
	return get(id);
}

//--------------------------------------------------------------------------------------------------

function update(id, data) {
	data = validation(data);
	tables.groups.update(id, data);
	tables.groupsItems.update(id, data.list);
	return get(id);
}

//--------------------------------------------------------------------------------------------------

function get(ids) {
	const asList = ids instanceof Array,
		result = tables.groups.get(asList ? ids : [ids]);

	result.forEach(group => {
		group.category = tables.categories.get(group.category);
		group.list = tables.groupsMedia.getByGroup(group.id);
	});

	return asList ? result : result[0];
}

//--------------------------------------------------------------------------------------------------

function remove(ids) {
	ids = ids instanceof Array ? ids : [ids];

	ids.forEach(id => {
		tables.groupsItems.removeByItem(id);
	});

	return tables.groups.remove(ids);
}

//--------------------------------------------------------------------------------------------------

function search(query) {
	if (typeof query !== 'object' || query === null) return [];

	let qname = typeof query.name === 'string' ? 'groups.name LIKE "%' + query.name + '%"' : '';
	let qcate = typeof query.category === 'number' ? 'groups.category = ' + query.category : '';
	let join = '';
	let qlist = '';

	if (query.list instanceof Array && query.list.length) {
		join = 'LEFT JOIN groups_items ON ' + query.list.map(tag => `(groups_items.item_id = ${tag} AND groups_items.group_id = groups.id)`).join(' OR ');
		qlist = 'groups_items.group_id = groups.id';
	}

	let where = [qlist, qcate, qname].filter(c=>!!c);
	where = where.length ? ' WHERE ' + where.join( ' AND ' ) : '';

	let result = run( 'SELECT groups.id FROM groups ' + join + where + ';' );
	return get( result.map(m => m.id) );
}