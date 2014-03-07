var DOMTreeBuilder = require('./DOMTreeBuilder').DOMTreeBuilder;
var Tokenizer = require('../Tokenizer').Tokenizer;

/**
 * @constructor
 * @param {DOMImplementation} implementation
 */
function DOMParser(implementation) {
	this._treeBuilder = new DOMTreeBuilder(implementation);
	this._tokenizer = new Tokenizer(this._treeBuilder);
	this._scriptingEnabled = false;
}

/**
 * @param {String} source HTML source to parse
 */
DOMParser.prototype.parse = function(source) {
	this._tokenizer.tokenize(source);
	return this._treeBuilder.document;
};

DOMParser.prototype.parseFragment = function(source, context) {
	this._treeBuilder.setFragmentContext(context);
	this._tokenizer.tokenize(source);
	return this._treeBuilder.getFragment();
};

Object.defineProperty(DOMParser.prototype, 'scriptingEnabled', {
	get: function() {
		return this._scriptingEnabled;
	},
	set: function(value) {
		this._scriptingEnabled = value;
		this._treeBuilder.scriptingEnabled = value;
	}
});

exports.DOMParser = DOMParser;
