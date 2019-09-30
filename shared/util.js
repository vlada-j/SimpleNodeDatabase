module.exports = {

	forceInt: (num, def) => {
		num = parseInt(num);
		return isNaN(num) ? def : num;
	},

	forceString: str => '' + str,

	forceArray: (arr, def) => arr instanceof Array ? arr : def,

	isArray: (arr) => arr instanceof Array,

	isObject: (obj) => (typeof obj === 'object' && !(obj instanceof Array) && obj !== null),
};