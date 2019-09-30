module.exports = {
	baseTableTest: (table) => {
		table.reset();

		console.log(`:: Base table tests of ${table.name}::`);
		table.insert({ name: 'first' });
		assert( (table.get(1)[0].name === 'first'), "Insert test");

		table.update(1, { name: 'first edited' });
		assert(table.get(1)[0].name === 'first edited', 'Update test');

		table.remove(1);
		assert(table.get(1)[0] === undefined, 'Remove test');

		let res;
		table.reset();
		table.insert({ name: '1' });
		table.insert({ name: '2' });
		table.insert({ name: '3' });
		table.insert({ name: '4' });
		res = table.get([2,4]);
		assert((res[0].name === '2' && res[1].name === '4' && res[2] === undefined), 'Multi get test');

		table.remove([1,3]);
		res = table.getAll();
		assert((res[0].name === '2' && res[1].name === '4' && res.length === 2), 'Multi remove test');

		console.log('========================================');
		table.reset();
	},

	usersTest: (table, users) => {
		table.users.reset();
		table.permissions.reset();

		let permissions = table.permissions;
		let res;

		permissions.insert({ name: 'guest' });
		permissions.insert({ name: 'moderator' });
		permissions.insert({ name: 'admin' });
		permissions.insert({ name: 'god' });

		console.log(`:: Users tests ::`);
		let newUser = users.create({ name: 'g1', permission: 1 });
		assert((newUser.id === 1 && newUser.name === 'g1' && newUser.permission.name === 'guest'), 'Create guest user');
		res = users.get(1);
		assert((newUser.id === res.id && newUser.name === res.name && newUser.permission.name === res.permission.name), 'Get user');
		res = users.update(1, { name: 'First guest' });
		assert(res.name === 'First guest', 'Edit user name');
		res = users.update(1, { permission: 2, name: 'First is a moderator' });
		assert(res.permission.id === 2, 'Edit user permission');

		users.create({ name: 'g2', permission: 1 });
		users.create({ name: 'g3', permission: 1 });
		users.create({ name: 'g4', permission: 1 });
		users.create({ name: 'Admin', permission: 3 });
		users.create({ name: 'Another admin', permission: 3 });
		users.create({ name: 'Chuck Norris', permission: 4 });

		res = users.search({ permission: 1 }).map(u=>u.id);
		assert(res[0]===2&&res[1]===3&&res[2]===4, 'Search by permission');

		res = users.search({ name: 'admin' }).map(u=>u.id);
		assert(res[0]===5&&res[1]===6, 'Search by name');

		res = users.search({ name: '3', permission: 1 }).map(u=>u.id);
		assert(res[0]===3&&res.length===1, 'Search by name and permission');

		users.remove([1,3,5,7]);
		res = table.users.getAll().map(u=>u.id);
		assert((res[0]===2&&res[1]===4&&res[2]===6&&res.length===3), 'Multi remove test');

		console.log('========================================');
		table.users.reset();
		table.permissions.reset();
	}

};


function assert(expresion, msg) {
	console.log( expresion ? 'OK  ' + msg : ' X  ' + msg);
}