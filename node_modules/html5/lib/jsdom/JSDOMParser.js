var JSDOMTreeBuilder = require('./JSDOMTreeBuilder').JSDOMTreeBuilder;
var Tokenizer = require('../Tokenizer').Tokenizer;

/**
 * @constructor
 * @param {Document} document
 */
function JSDOMParser(document, core) {
	this._treeBuilder = new JSDOMTreeBuilder(document, core);
	this._tokenizer = new Tokenizer(this._treeBuilder);
	this._scriptingEnabled = true;
}

/**
 * @param {String} source HTML source to parse
 */
JSDOMParser.prototype.parse = function(source) {
	this._tokenizer.tokenize(source);
};

JSDOMParser.prototype.parseFragment = function(source, fragment, contextElement) {
	this._treeBuilder.setFragmentContext(contextElement.nodeName.toLowerCase());
	this._tokenizer.tokenize(source);
	this._treeBuilder.reparentChildren(this._treeBuilder.openElements.rootNode, fragment);
};

Object.defineProperty(JSDOMParser.prototype, 'scriptingEnabled', {
	get: function() {
		return this._scriptingEnabled;
	},
	set: function(value) {
		this._scriptingEnabled = value;
		this._treeBuilder.scriptingEnabled = value;
	}
});

exports.JSDOMParser = JSDOMParser;
