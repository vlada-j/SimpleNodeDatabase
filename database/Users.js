const { tables, run } = require('./index');

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
	permission: null
};

//--------------------------------------------------------------------------------------------------

function validation(data) {
	data = Object.assign({}, DEFAULT, data);

	data.name = forceString(data.name);
	data.permission = forceInt(data.permission, DEFAULT.permission);

	return data;
}

//--------------------------------------------------------------------------------------------------

function create(data) {
	data = validation(data);
	const id = tables.users.insert(data);
	tables.groupsMedia.insert(id, data.list);
	return get(id);
}

//--------------------------------------------------------------------------------------------------

function update(id, data) {
	data = validation(data);
	tables.users.update(id, data);
	return get(id);
}

//--------------------------------------------------------------------------------------------------

function get(ids) {
	const asList = ids instanceof Array,
		result = tables.users.get(asList ? ids : [ids]);

	result.forEach(group => {
		users.permission = tables.categories.get(group.permission);
	});

	return asList ? result : result[0];
}

//--------------------------------------------------------------------------------------------------

function remove(ids) {
	ids = ids instanceof Array ? ids : [ids];

	ids.forEach(id => {
		tables.groupsMedia.removeByMedia(id);
	});

	return tables.users.remove(ids);
}

//--------------------------------------------------------------------------------------------------

function search(query) {
	if (typeof query !== 'object' || query === null) return [];

	let qname = typeof query.name === 'string' ? 'users.name LIKE "%' + query.name + '%"' : '';
	let qcate = typeof query.permission === 'number' ? 'users.permission = ' + query.permission : '';

	let where = [qcate, qname].filter(c=>!!c);
	where = where.length ? ' WHERE ' + where.join( ' AND ' ) : '';

	let result = run( 'SELECT users.id FROM users ' + where + ';' );
	return get( result.map(m => m.id) );
}