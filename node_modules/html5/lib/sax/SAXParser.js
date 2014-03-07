var SAXTreeBuilder = require('./SAXTreeBuilder').SAXTreeBuilder;
var Tokenizer = require('../Tokenizer').Tokenizer;
var TreeParser = require('./TreeParser').TreeParser;

function SAXParser() {
	this.contentHandler = null;
	this._errorHandler = null;
	this._treeBuilder = new SAXTreeBuilder();
	this._tokenizer = new Tokenizer(this._treeBuilder);
	this._scriptingEnabled = false;
}

SAXParser.prototype.parse = function(source) {
	this._tokenizer.tokenize(source);
	var document = this._treeBuilder.document;
	if (document) {
		new TreeParser(this.contentHandler).parse(document);
	}
};

SAXParser.prototype.parseFragment = function(source, context) {
	this._treeBuilder.setFragmentContext(context);
	this._tokenizer.tokenize(source);
	var fragment = this._treeBuilder.getFragment();
	if (fragment) {
		new TreeParser(this.contentHandler).parse(fragment);
	}
};

Object.defineProperty(SAXParser.prototype, 'scriptingEnabled', {
	get: function() {
		return this._scriptingEnabled;
	},
	set: function(value) {
		this._scriptingEnabled = value;
		this._treeBuilder.scriptingEnabled = value;
	}
});

Object.defineProperty(SAXParser.prototype, 'errorHandler', {
	get: function() {
		return this._errorHandler;
	},
	set: function(value) {
		this._errorHandler = value;
		this._treeBuilder.errorHandler = value;
	}
});

exports.SAXParser = SAXParser;
