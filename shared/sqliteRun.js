const sqlite = require('sqlite-cipher');

module.exports = function run(sql) {
	let res = sqlite.run(sql);
	if (res.error instanceof Error) {
		console.log('ERROR:', sql);
		console.log(res.error);
		console.log('----------------------------------------');
		return [];
	}
	return res;
}