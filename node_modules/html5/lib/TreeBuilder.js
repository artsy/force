var assert = require('assert');

var messages = require('./messages.json');
var constants = require('./constants');

var EventEmitter = require('events').EventEmitter;

var Tokenizer = require('./Tokenizer').Tokenizer;
var ElementStack = require('./ElementStack').ElementStack;
var StackItem = require('./StackItem').StackItem;

var Marker = {};

function isWhitespace(ch) {
	return ch === " " || ch === "\n" || ch === "\t" || ch === "\r" || ch === "\f";
}

function isWhitespaceOrReplacementCharacter(ch) {
	return isWhitespace(ch) || ch === '\uFFFD';
}

function isAllWhitespace(characters) {
	for (var i = 0; i < characters.length; i++) {
		var ch = characters[i];
		if (!isWhitespace(ch))
			return false;
	}
	return true;
}

function isAllWhitespaceOrReplacementCharacters(characters) {
	for (var i = 0; i < characters.length; i++) {
		var ch = characters[i];
		if (!isWhitespaceOrReplacementCharacter(ch))
			return false;
	}
	return true;
}

function getAttribute(node, name) {
	for (var i = 0; i < node.attributes.length; i++) {
		var attribute = node.attributes[i];
		if (attribute.nodeName === name) {
			return attribute;
		}
	}
	return null;
}

function CharacterBuffer(characters) {
	this.characters = characters;
	this.current = 0;
	this.end = this.characters.length;
}

CharacterBuffer.prototype.skipAtMostOneLeadingNewline = function() {
	if (this.characters[this.current] === '\n')
		this.current++;
};

CharacterBuffer.prototype.skipLeadingWhitespace = function() {
	while (isWhitespace(this.characters[this.current])) {
		if (++this.current == this.end)
			return;
	}
};

CharacterBuffer.prototype.skipLeadingNonWhitespace = function() {
	while (!isWhitespace(this.characters[this.current])) {
		if (++this.current == this.end)
			return;
	}
};

CharacterBuffer.prototype.takeRemaining = function() {
	return this.characters.substring(this.current);
};

CharacterBuffer.prototype.takeLeadingWhitespace = function() {
	var start = this.current;
	this.skipLeadingWhitespace();
	if (start === this.current)
		return "";
	return this.characters.substring(start, this.current - start);
};

Object.defineProperty(CharacterBuffer.prototype, 'length', {
	get: function(){
		return this.end - this.current;
	}
});

/**
 *
 * @constructor
 */
function TreeBuilder() {
	this.tokenizer = null;
	this.errorHandler = null;
	this.scriptingEnabled = false;
	this.document = null;
	this.head = null;
	this.form = null;
	this.openElements = new ElementStack();
	this.activeFormattingElements = [];
	this.insertionMode = null;
	this.insertionModeName = "";
	this.originalInsertionMode = "";
	this.inQuirksMode = false; // TODO quirks mode
	this.compatMode = "no quirks";
	this.framesetOk = true;
	this.redirectAttachToFosterParent = false;
	this.selfClosingFlagAcknowledged = false;
	this.context = "";
	this.pendingTableCharacters = [];
	this.shouldSkipLeadingNewline = false;

	var tree = this;
	var modes = this.insertionModes = {};
	modes.base = {
		end_tag_handlers: {"-default": 'endTagOther'},
		start_tag_handlers: {"-default": 'startTagOther'},
		processEOF: function() {
			tree.generateImpliedEndTags();
			if (tree.openElements.length > 2) {
				tree.parseError('expected-closing-tag-but-got-eof');
			} else if (tree.openElements.length == 2 &&
				tree.openElements.item(1).localName != 'body') {
				// This happens for framesets or something?
				tree.parseError('expected-closing-tag-but-got-eof');
			} else if (tree.context && tree.openElements.length > 1) {
				// XXX This is not what the specification says. Not sure what to do here.
				//tree.parseError('eof-in-innerhtml');
			}
		},
		processComment: function(data) {
			// For most phases the following is forceQuirks. Where it's not it will be
			// overridden.
			tree.insertComment(data, tree.currentStackItem().node);
		},
		processDoctype: function(name, publicId, systemId, forceQuirks) {
			tree.parseError('unexpected-doctype');
		},
		processStartTag: function(name, attributes, selfClosing) {
			if (this[this.start_tag_handlers[name]]) {
				this[this.start_tag_handlers[name]](name, attributes, selfClosing);
			} else if (this[this.start_tag_handlers["-default"]]) {
				this[this.start_tag_handlers["-default"]](name, attributes, selfClosing);
			} else {
				throw(new Error("No handler found for "+name));
			}
		},
		processEndTag: function(name) {
			if (this[this.end_tag_handlers[name]]) {
				this[this.end_tag_handlers[name]](name);
			} else if (this[this.end_tag_handlers["-default"]]) {
				this[this.end_tag_handlers["-default"]](name);
			} else {
				throw(new Error("No handler found for "+name));
			}
		},
		startTagHtml: function(name, attributes) {
			modes.inBody.startTagHtml(name, attributes);
		}
	};

	modes.initial = Object.create(modes.base);

	modes.initial.processEOF = function() {
		tree.parseError("expected-doctype-but-got-eof");
		this.anythingElse();
		tree.insertionMode.processEOF();
	};

	modes.initial.processComment = function(data) {
		tree.insertComment(data, tree.document);
	};

	modes.initial.processDoctype = function(name, publicId, systemId, forceQuirks) {
		tree.insertDoctype(name || '', publicId || '', systemId || '');

		if (forceQuirks || name != 'html' || (publicId != null && ([
					"+//silmaril//dtd html pro v0r11 19970101//",
					"-//advasoft ltd//dtd html 3.0 aswedit + extensions//",
					"-//as//dtd html 3.0 aswedit + extensions//",
					"-//ietf//dtd html 2.0 level 1//",
					"-//ietf//dtd html 2.0 level 2//",
					"-//ietf//dtd html 2.0 strict level 1//",
					"-//ietf//dtd html 2.0 strict level 2//",
					"-//ietf//dtd html 2.0 strict//",
					"-//ietf//dtd html 2.0//",
					"-//ietf//dtd html 2.1e//",
					"-//ietf//dtd html 3.0//",
					"-//ietf//dtd html 3.0//",
					"-//ietf//dtd html 3.2 final//",
					"-//ietf//dtd html 3.2//",
					"-//ietf//dtd html 3//",
					"-//ietf//dtd html level 0//",
					"-//ietf//dtd html level 0//",
					"-//ietf//dtd html level 1//",
					"-//ietf//dtd html level 1//",
					"-//ietf//dtd html level 2//",
					"-//ietf//dtd html level 2//",
					"-//ietf//dtd html level 3//",
					"-//ietf//dtd html level 3//",
					"-//ietf//dtd html strict level 0//",
					"-//ietf//dtd html strict level 0//",
					"-//ietf//dtd html strict level 1//",
					"-//ietf//dtd html strict level 1//",
					"-//ietf//dtd html strict level 2//",
					"-//ietf//dtd html strict level 2//",
					"-//ietf//dtd html strict level 3//",
					"-//ietf//dtd html strict level 3//",
					"-//ietf//dtd html strict//",
					"-//ietf//dtd html strict//",
					"-//ietf//dtd html strict//",
					"-//ietf//dtd html//",
					"-//ietf//dtd html//",
					"-//ietf//dtd html//",
					"-//metrius//dtd metrius presentational//",
					"-//microsoft//dtd internet explorer 2.0 html strict//",
					"-//microsoft//dtd internet explorer 2.0 html//",
					"-//microsoft//dtd internet explorer 2.0 tables//",
					"-//microsoft//dtd internet explorer 3.0 html strict//",
					"-//microsoft//dtd internet explorer 3.0 html//",
					"-//microsoft//dtd internet explorer 3.0 tables//",
					"-//netscape comm. corp.//dtd html//",
					"-//netscape comm. corp.//dtd strict html//",
					"-//o'reilly and associates//dtd html 2.0//",
					"-//o'reilly and associates//dtd html extended 1.0//",
					"-//spyglass//dtd html 2.0 extended//",
					"-//sq//dtd html 2.0 hotmetal + extensions//",
					"-//sun microsystems corp.//dtd hotjava html//",
					"-//sun microsystems corp.//dtd hotjava strict html//",
					"-//w3c//dtd html 3 1995-03-24//",
					"-//w3c//dtd html 3.2 draft//",
					"-//w3c//dtd html 3.2 final//",
					"-//w3c//dtd html 3.2//",
					"-//w3c//dtd html 3.2s draft//",
					"-//w3c//dtd html 4.0 frameset//",
					"-//w3c//dtd html 4.0 transitional//",
					"-//w3c//dtd html experimental 19960712//",
					"-//w3c//dtd html experimental 970421//",
					"-//w3c//dtd w3 html//",
					"-//w3o//dtd w3 html 3.0//",
					"-//webtechs//dtd mozilla html 2.0//",
					"-//webtechs//dtd mozilla html//",
					"html"
				].some(publicIdStartsWith)
				|| [
					"-//w3o//dtd w3 html strict 3.0//en//",
					"-/w3c/dtd html 4.0 transitional/en",
					"html"
				].indexOf(publicId.toLowerCase()) > -1
				|| (systemId == null && [
					"-//w3c//dtd html 4.01 transitional//",
					"-//w3c//dtd html 4.01 frameset//"
				].some(publicIdStartsWith)))
			)
			|| (systemId != null && (systemId.toLowerCase() == "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd"))
		) {
			tree.compatMode = "quirks";
			tree.parseError("quirky-doctype");
		} else if (publicId != null && ([
				"-//w3c//dtd xhtml 1.0 transitional//",
				"-//w3c//dtd xhtml 1.0 frameset//"
			].some(publicIdStartsWith)
			|| (systemId != null && [
				"-//w3c//dtd html 4.01 transitional//",
				"-//w3c//dtd html 4.01 frameset//"
			].indexOf(publicId.toLowerCase()) > -1))
		) {
			tree.compatMode = "limited quirks";
			tree.parseError("almost-standards-doctype");
		} else {
			if ((publicId == "-//W3C//DTD HTML 4.0//EN" && (systemId == null || systemId == "http://www.w3.org/TR/REC-html40/strict.dtd"))
				|| (publicId == "-//W3C//DTD HTML 4.01//EN" && (systemId == null || systemId == "http://www.w3.org/TR/html4/strict.dtd"))
				|| (publicId == "-//W3C//DTD XHTML 1.0 Strict//EN" && (systemId == "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"))
				|| (publicId == "-//W3C//DTD XHTML 1.1//EN" && (systemId == "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd"))
			) {
				// warning
				//tree.warn("obsolete-doctype");
			} else if (!((systemId == null || systemId == "about:legacy-compat") && publicId == null)) {
				tree.parseError("unknown-doctype");
			}
		}
		tree.setInsertionMode('beforeHTML');
		function publicIdStartsWith(string) {
			return publicId.toLowerCase().indexOf(string) === 0;
		}
	};

	modes.initial.processCharacters = function(buffer) {
		buffer.skipLeadingWhitespace();
		if (!buffer.length)
			return;
		tree.parseError('expected-doctype-but-got-chars');
		this.anythingElse();
		tree.insertionMode.processCharacters(buffer);
	};

	modes.initial.processStartTag = function(name, attributes, selfClosing) {
		tree.parseError('expected-doctype-but-got-start-tag', {name: name});
		this.anythingElse();
		tree.insertionMode.processStartTag(name, attributes, selfClosing);
	};

	modes.initial.processEndTag = function(name) {
		tree.parseError('expected-doctype-but-got-end-tag', {name: name});
		this.anythingElse();
		tree.insertionMode.processEndTag(name);
	};

	modes.initial.anythingElse = function() {
		tree.compatMode = 'quirks';
		tree.setInsertionMode('beforeHTML');
	};

	modes.beforeHTML = Object.create(modes.base);

	modes.beforeHTML.start_tag_handlers = {
		html: 'startTagHtml',
		'-default': 'startTagOther'
	};

	modes.beforeHTML.processEOF = function() {
		this.anythingElse();
		tree.insertionMode.processEOF();
	};

	modes.beforeHTML.processComment = function(data) {
		tree.insertComment(data, tree.document);
	};

	modes.beforeHTML.processCharacters = function(buffer) {
		buffer.skipLeadingWhitespace();
		if (!buffer.length)
			return;
		this.anythingElse();
		tree.insertionMode.processCharacters(buffer);
	};

	modes.beforeHTML.startTagHtml = function(name, attributes, selfClosing) {
		tree.insertHtmlElement(attributes);
		tree.setInsertionMode('beforeHead');
	};

	modes.beforeHTML.startTagOther = function(name, attributes, selfClosing) {
		this.anythingElse();
		tree.insertionMode.processStartTag(name, attributes, selfClosing);
	};

	modes.beforeHTML.processEndTag = function(name) {
		this.anythingElse();
		tree.insertionMode.processEndTag(name);
	};

	modes.beforeHTML.anythingElse = function() {
		tree.insertHtmlElement();
		tree.setInsertionMode('beforeHead');
	};

	modes.afterAfterBody = Object.create(modes.base);

	modes.afterAfterBody.start_tag_handlers = {
		html: 'startTagHtml',
		'-default': 'startTagOther'
	};

	modes.afterAfterBody.processComment = function(data) {
		tree.insertComment(data, tree.document);
	};

	modes.afterAfterBody.processDoctype = function(data) {
		modes.inBody.processDoctype(data);
	};

	modes.afterAfterBody.startTagHtml = function(data, attributes) {
		modes.inBody.startTagHtml(data, attributes);
	};

	modes.afterAfterBody.startTagOther = function(name, attributes, selfClosing) {
		tree.parseError('unexpected-start-tag', {name: name});
		tree.setInsertionMode('inBody');
		tree.insertionMode.processStartTag(name, attributes, selfClosing);
	};

	modes.afterAfterBody.endTagOther = function(name) {
		tree.parseError('unexpected-end-tag', {name: name});
		tree.setInsertionMode('inBody');
		tree.insertionMode.processEndTag(name);
	};

	modes.afterAfterBody.processCharacters = function(data) {
		if (!isAllWhitespace(data.characters)) {
			tree.parseError('unexpected-char-after-body');
			tree.setInsertionMode('inBody');
			return tree.insertionMode.processCharacters(data);
		}
		modes.inBody.processCharacters(data);
	};

	modes.afterBody = Object.create(modes.base);

	modes.afterBody.end_tag_handlers = {
		html: 'endTagHtml',
		'-default': 'endTagOther'
	};

	modes.afterBody.processComment = function(data) {
		// This is needed because data is to be appended to the html element here
		// and not to whatever is currently open.
		tree.insertComment(data, tree.openElements.rootNode);
	};

	modes.afterBody.processCharacters = function(data) {
		if (!isAllWhitespace(data.characters)) {
			tree.parseError('unexpected-char-after-body');
			tree.setInsertionMode('inBody');
			return tree.insertionMode.processCharacters(data);
		}
		modes.inBody.processCharacters(data);
	};

	modes.afterBody.processStartTag = function(name, attributes, selfClosing) {
		tree.parseError('unexpected-start-tag-after-body', {name: name});
		tree.setInsertionMode('inBody');
		tree.insertionMode.processStartTag(name, attributes, selfClosing);
	};

	modes.afterBody.endTagHtml = function(name) {
		if (tree.context) {
			tree.parseError('end-html-in-innerhtml');
		} else {
			// XXX This may need to be done, not sure
			// Don't set last_phase to the current phase but to the inBody phase
			// instead. No need for extra parseErrors if there's something after
			// </html>.
			// Try <!doctype html>X</html>X for instance
			tree.setInsertionMode('afterAfterBody');
		}
	};

	modes.afterBody.endTagOther = function(name) {
		tree.parseError('unexpected-end-tag-after-body', {name: name});
		tree.setInsertionMode('inBody');
		tree.insertionMode.processEndTag(name);
	};

	modes.afterFrameset = Object.create(modes.base);

	modes.afterFrameset.start_tag_handlers = {
		html: 'startTagHtml',
		noframes: 'startTagNoframes',
		'-default': 'startTagOther'
	};

	modes.afterFrameset.end_tag_handlers = {
		html: 'endTagHtml',
		'-default': 'endTagOther'
	};

	modes.afterFrameset.processCharacters = function(buffer) {
		var characters = buffer.takeRemaining();
		var whitespace = "";
		for (var i = 0; i < characters.length; i++) {
			var ch = characters[i];
			if (isWhitespace(ch))
				whitespace += ch;
		}
		if (whitespace) {
			tree.insertText(whitespace);
		}
		if (whitespace.length < characters.length)
			tree.parseError('expected-eof-but-got-char');
	};

	modes.afterFrameset.startTagNoframes = function(name, attributes) {
		modes.inHead.processStartTag(name, attributes);
	};

	modes.afterFrameset.startTagOther = function(name, attributes) {
		tree.parseError("unexpected-start-tag-after-frameset", {name: name});
	};

	modes.afterFrameset.endTagHtml = function(name) {
		tree.setInsertionMode('afterAfterFrameset');
	};

	modes.afterFrameset.endTagOther = function(name) {
		tree.parseError("unexpected-end-tag-after-frameset", {name: name});
	};

	modes.beforeHead = Object.create(modes.base);

	modes.beforeHead.start_tag_handlers = {
		html: 'startTagHtml',
		head: 'startTagHead',
		'-default': 'startTagOther'
	};

	modes.beforeHead.end_tag_handlers = {
		html: 'endTagImplyHead',
		head: 'endTagImplyHead',
		body: 'endTagImplyHead',
		br: 'endTagImplyHead',
		'-default': 'endTagOther'
	};

	modes.beforeHead.processEOF = function() {
		this.startTagHead('head', []);
		tree.insertionMode.processEOF();
	};

	modes.beforeHead.processCharacters = function(buffer) {
		buffer.skipLeadingWhitespace();
		if (!buffer.length)
			return;
		this.startTagHead('head', []);
		tree.insertionMode.processCharacters(buffer);
	};

	modes.beforeHead.startTagHead = function(name, attributes) {
		tree.insertHeadElement(attributes);
		tree.setInsertionMode('inHead');
	};

	modes.beforeHead.startTagOther = function(name, attributes, selfClosing) {
		this.startTagHead('head', []);
		tree.insertionMode.processStartTag(name, attributes, selfClosing);
	};

	modes.beforeHead.endTagImplyHead = function(name) {
		this.startTagHead('head', []);
		tree.insertionMode.processEndTag(name);
	};

	modes.beforeHead.endTagOther = function(name) {
		tree.parseError('end-tag-after-implied-root', {name: name});
	};

	modes.inHead = Object.create(modes.base);

	modes.inHead.start_tag_handlers = {
		html: 'startTagHtml',
		head: 'startTagHead',
		title: 'startTagTitle',
		script: 'startTagScript',
		style: 'startTagNoFramesStyle',
		noscript: 'startTagNoScript',
		noframes: 'startTagNoFramesStyle',
		base: 'startTagBaseBasefontBgsoundLink',
		basefont: 'startTagBaseBasefontBgsoundLink',
		bgsound: 'startTagBaseBasefontBgsoundLink',
		link: 'startTagBaseBasefontBgsoundLink',
		meta: 'startTagMeta',
		"-default": 'startTagOther'
	};

	modes.inHead.end_tag_handlers = {
		head: 'endTagHead',
		html: 'endTagHtmlBodyBr',
		body: 'endTagHtmlBodyBr',
		br: 'endTagHtmlBodyBr',
		"-default": 'endTagOther'
	};

	modes.inHead.processEOF = function() {
		var name = tree.currentStackItem().localName;
		if (['title', 'style', 'script'].indexOf(name) != -1) {
			tree.parseError("expected-named-closing-tag-but-got-eof", {name: name});
			tree.popElement();
		}

		this.anythingElse();

		tree.insertionMode.processEOF();
	};

	modes.inHead.processCharacters = function(buffer) {
		var leadingWhitespace = buffer.takeLeadingWhitespace();
		if (leadingWhitespace)
			tree.insertText(leadingWhitespace);
		if (!buffer.length)
			return;
		this.anythingElse();
		tree.insertionMode.processCharacters(buffer);
	};

	modes.inHead.startTagHtml = function(name, attributes) {
		modes.inBody.processStartTag(name, attributes);
	};

	modes.inHead.startTagHead = function(name, attributes) {
		tree.parseError('two-heads-are-not-better-than-one');
	};

	modes.inHead.startTagTitle = function(name, attributes) {
		tree.processGenericRCDATAStartTag(name, attributes);
	};

	modes.inHead.startTagNoScript = function(name, attributes) {
		if (tree.scriptingEnabled)
			return tree.processGenericRawTextStartTag(name, attributes);
		tree.insertElement(name, attributes);
		tree.setInsertionMode('inHeadNoscript');
	};

	modes.inHead.startTagNoFramesStyle = function(name, attributes) {
		// XXX Need to decide whether to implement the scripting disabled case
		tree.processGenericRawTextStartTag(name, attributes);
	};

	modes.inHead.startTagScript = function(name, attributes) {
		tree.insertElement(name, attributes);
		tree.tokenizer.setState(Tokenizer.SCRIPT_DATA);
		tree.originalInsertionMode = tree.insertionModeName;
		tree.setInsertionMode('text');
	};

	modes.inHead.startTagBaseBasefontBgsoundLink = function(name, attributes) {
		tree.insertSelfClosingElement(name, attributes);
	};

	modes.inHead.startTagMeta = function(name, attributes) {
		tree.insertSelfClosingElement(name, attributes);
		// @todo process charset attributes
	};

	modes.inHead.startTagOther = function(name, attributes, selfClosing) {
		this.anythingElse();
		tree.insertionMode.processStartTag(name, attributes, selfClosing);
	};

	modes.inHead.endTagHead = function(name) {
		if (tree.openElements.item(tree.openElements.length - 1).localName == 'head') {
			tree.openElements.pop();
		} else {
			tree.parseError('unexpected-end-tag', {name: 'head'});
		}
		tree.setInsertionMode('afterHead');
	};

	modes.inHead.endTagHtmlBodyBr = function(name) {
		this.anythingElse();
		tree.insertionMode.processEndTag(name);
	};

	modes.inHead.endTagOther = function(name) {
		tree.parseError('unexpected-end-tag', {name: name});
	};

	modes.inHead.anythingElse = function() {
		this.endTagHead('head');
	};

	modes.afterHead = Object.create(modes.base);

	modes.afterHead.start_tag_handlers = {
		html: 'startTagHtml',
		head: 'startTagHead',
		body: 'startTagBody',
		frameset: 'startTagFrameset',
		base: 'startTagFromHead',
		link: 'startTagFromHead',
		meta: 'startTagFromHead',
		script: 'startTagFromHead',
		// XXX noframes: 'startTagFromHead' ?
		style: 'startTagFromHead',
		title: 'startTagFromHead',
		"-default": 'startTagOther'
	};

	modes.afterHead.end_tag_handlers = {
		body: 'endTagBodyHtmlBr',
		html: 'endTagBodyHtmlBr',
		br: 'endTagBodyHtmlBr',
		"-default": 'endTagOther'
	};

	modes.afterHead.processEOF = function() {
		this.anythingElse();
		tree.insertionMode.processEOF();
	};

	modes.afterHead.processCharacters = function(buffer) {
		var leadingWhitespace = buffer.takeLeadingWhitespace();
		if (leadingWhitespace)
			tree.insertText(leadingWhitespace);
		if (!buffer.length)
			return;
		this.anythingElse();
		tree.insertionMode.processCharacters(buffer);
	};

	modes.afterHead.startTagHtml = function(name, attributes) {
		modes.inBody.processStartTag(name, attributes);
	};

	modes.afterHead.startTagBody = function(name, attributes) {
		tree.framesetOk = false;
		tree.insertBodyElement(attributes);
		tree.setInsertionMode('inBody');
	};

	modes.afterHead.startTagFrameset = function(name, attributes) {
		tree.insertElement(name, attributes);
		tree.setInsertionMode('inFrameset');
	};

	modes.afterHead.startTagFromHead = function(name, attributes, selfClosing) {
		tree.parseError("unexpected-start-tag-out-of-my-head", {name: name});
		// FIXME head pointer
		tree.openElements.push(tree.head);
		modes.inHead.processStartTag(name, attributes, selfClosing);
		tree.openElements.remove(tree.head);
	};

	modes.afterHead.startTagHead = function(name, attributes, selfClosing) {
		tree.parseError('unexpected-start-tag', {name: name});
	};

	modes.afterHead.startTagOther = function(name, attributes, selfClosing) {
		this.anythingElse();
		tree.insertionMode.processStartTag(name, attributes, selfClosing);
	};

	modes.afterHead.endTagBodyHtmlBr = function(name) {
		this.anythingElse();
		tree.insertionMode.processEndTag(name);
	};

	modes.afterHead.endTagOther = function(name) {
		tree.parseError('unexpected-end-tag', {name: name});
	};

	modes.afterHead.anythingElse = function() {
		tree.insertBodyElement([]);
		tree.setInsertionMode('inBody');
		tree.framesetOk = true;
	}

	modes.inBody = Object.create(modes.base);

	modes.inBody.start_tag_handlers = {
		html: 'startTagHtml',
		head: 'startTagMisplaced',
		base: 'startTagProcessInHead',
		basefont: 'startTagProcessInHead',
		bgsound: 'startTagProcessInHead',
		link: 'startTagProcessInHead',
		meta: 'startTagProcessInHead',
		noframes: 'startTagProcessInHead',
		script: 'startTagProcessInHead',
		style: 'startTagProcessInHead',
		title: 'startTagProcessInHead',
		body: 'startTagBody',
		form: 'startTagForm',
		plaintext: 'startTagPlaintext',
		a: 'startTagA',
		button: 'startTagButton',
		xmp: 'startTagXmp',
		table: 'startTagTable',
		hr: 'startTagHr',
		image: 'startTagImage',
		input: 'startTagInput',
		textarea: 'startTagTextarea',
		select: 'startTagSelect',
		isindex: 'startTagIsindex',
		applet:	'startTagAppletMarqueeObject',
		marquee:	'startTagAppletMarqueeObject',
		object:	'startTagAppletMarqueeObject',
		li: 'startTagListItem',
		dd: 'startTagListItem',
		dt: 'startTagListItem',
		address: 'startTagCloseP',
		article: 'startTagCloseP',
		aside: 'startTagCloseP',
		blockquote: 'startTagCloseP',
		center: 'startTagCloseP',
		details: 'startTagCloseP',
		dir: 'startTagCloseP',
		div: 'startTagCloseP',
		dl: 'startTagCloseP',
		fieldset: 'startTagCloseP',
		figcaption: 'startTagCloseP',
		figure: 'startTagCloseP',
		footer: 'startTagCloseP',
		header: 'startTagCloseP',
		hgroup: 'startTagCloseP',
		main: 'startTagCloseP',
		menu: 'startTagCloseP',
		nav: 'startTagCloseP',
		ol: 'startTagCloseP',
		p: 'startTagCloseP',
		section: 'startTagCloseP',
		summary: 'startTagCloseP',
		ul: 'startTagCloseP',
		listing: 'startTagPreListing',
		pre: 'startTagPreListing',
		b: 'startTagFormatting',
		big: 'startTagFormatting',
		code: 'startTagFormatting',
		em: 'startTagFormatting',
		font: 'startTagFormatting',
		i: 'startTagFormatting',
		s: 'startTagFormatting',
		small: 'startTagFormatting',
		strike: 'startTagFormatting',
		strong: 'startTagFormatting',
		tt: 'startTagFormatting',
		u: 'startTagFormatting',
		nobr: 'startTagNobr',
		area: 'startTagVoidFormatting',
		br: 'startTagVoidFormatting',
		embed: 'startTagVoidFormatting',
		img: 'startTagVoidFormatting',
		keygen: 'startTagVoidFormatting',
		wbr: 'startTagVoidFormatting',
		param: 'startTagParamSourceTrack',
		source: 'startTagParamSourceTrack',
		track: 'startTagParamSourceTrack',
		iframe: 'startTagIFrame',
		noembed: 'startTagRawText',
		noscript: 'startTagRawText',
		h1: 'startTagHeading',
		h2: 'startTagHeading',
		h3: 'startTagHeading',
		h4: 'startTagHeading',
		h5: 'startTagHeading',
		h6: 'startTagHeading',
		caption: 'startTagMisplaced',
		col: 'startTagMisplaced',
		colgroup: 'startTagMisplaced',
		frame: 'startTagMisplaced',
		frameset: 'startTagFrameset',
		tbody: 'startTagMisplaced',
		td: 'startTagMisplaced',
		tfoot: 'startTagMisplaced',
		th: 'startTagMisplaced',
		thead: 'startTagMisplaced',
		tr: 'startTagMisplaced',
		option: 'startTagOptionOptgroup',
		optgroup: 'startTagOptionOptgroup',
		math: 'startTagMath',
		svg: 'startTagSVG',
		rt: 'startTagRpRt',
		rp: 'startTagRpRt',
		"-default": 'startTagOther'
	};

	modes.inBody.end_tag_handlers = {
		p: 'endTagP',
		body: 'endTagBody',
		html: 'endTagHtml',
		address: 'endTagBlock',
		article: 'endTagBlock',
		aside: 'endTagBlock',
		blockquote: 'endTagBlock',
		button: 'endTagBlock',
		center: 'endTagBlock',
		details: 'endTagBlock',
		dir: 'endTagBlock',
		div: 'endTagBlock',
		dl: 'endTagBlock',
		fieldset: 'endTagBlock',
		figcaption: 'endTagBlock',
		figure: 'endTagBlock',
		footer: 'endTagBlock',
		header: 'endTagBlock',
		hgroup: 'endTagBlock',
		listing: 'endTagBlock',
		main: 'endTagBlock',
		menu: 'endTagBlock',
		nav: 'endTagBlock',
		ol: 'endTagBlock',
		pre: 'endTagBlock',
		section: 'endTagBlock',
		summary: 'endTagBlock',
		ul: 'endTagBlock',
		form: 'endTagForm',
		applet: 'endTagAppletMarqueeObject',
		marquee: 'endTagAppletMarqueeObject',
		object: 'endTagAppletMarqueeObject',
		dd: 'endTagListItem',
		dt: 'endTagListItem',
		li: 'endTagListItem',
		h1: 'endTagHeading',
		h2: 'endTagHeading',
		h3: 'endTagHeading',
		h4: 'endTagHeading',
		h5: 'endTagHeading',
		h6: 'endTagHeading',
		a: 'endTagFormatting',
		b: 'endTagFormatting',
		big: 'endTagFormatting',
		code: 'endTagFormatting',
		em: 'endTagFormatting',
		font: 'endTagFormatting',
		i: 'endTagFormatting',
		nobr: 'endTagFormatting',
		s: 'endTagFormatting',
		small: 'endTagFormatting',
		strike: 'endTagFormatting',
		strong: 'endTagFormatting',
		tt: 'endTagFormatting',
		u: 'endTagFormatting',
		br: 'endTagBr',
		"-default": 'endTagOther'
	};

	modes.inBody.processCharacters = function(buffer) {
		if (tree.shouldSkipLeadingNewline) {
			tree.shouldSkipLeadingNewline = false;
			buffer.skipAtMostOneLeadingNewline();
		}
		tree.reconstructActiveFormattingElements();
		var characters = buffer.takeRemaining();
		characters = characters.replace(/\u0000/g, function(match, index){
			// @todo position
			tree.parseError("invalid-codepoint");
			return '';
		});
		if (!characters)
			return;
		tree.insertText(characters);
		if (tree.framesetOk && !isAllWhitespaceOrReplacementCharacters(characters))
			tree.framesetOk = false;
	};

	modes.inBody.startTagHtml = function(name, attributes) {
		tree.parseError('non-html-root');
		tree.addAttributesToElement(tree.openElements.rootNode, attributes);
	};

	modes.inBody.startTagProcessInHead = function(name, attributes) {
		modes.inHead.processStartTag(name, attributes);
	};

	modes.inBody.startTagBody = function(name, attributes) {
		tree.parseError('unexpected-start-tag', {name: 'body'});
		if (tree.openElements.length == 1 ||
			tree.openElements.item(1).localName != 'body') {
			assert.ok(tree.context);
		} else {
			tree.framesetOk = false;
			tree.addAttributesToElement(tree.openElements.bodyElement, attributes);
		}
	};

	modes.inBody.startTagFrameset = function(name, attributes) {
		tree.parseError('unexpected-start-tag', {name: 'frameset'});
		if (tree.openElements.length == 1 ||
			tree.openElements.item(1).localName != 'body') {
			assert.ok(tree.context);
		} else if (tree.framesetOk) {
			tree.detachFromParent(tree.openElements.bodyElement);
			while (tree.openElements.length > 1)
				tree.openElements.pop();
			tree.insertElement(name, attributes);
			tree.setInsertionMode('inFrameset');
		}
	};

	modes.inBody.startTagCloseP = function(name, attributes) {
		if (tree.openElements.inButtonScope('p'))
			this.endTagP('p');
		tree.insertElement(name, attributes);
	};

	modes.inBody.startTagPreListing = function(name, attributes) {
		if (tree.openElements.inButtonScope('p'))
			this.endTagP('p');
		tree.insertElement(name, attributes);
		tree.framesetOk = false;
		tree.shouldSkipLeadingNewline = true;
	};

	modes.inBody.startTagForm = function(name, attributes) {
		if (tree.form) {
			tree.parseError('unexpected-start-tag', {name: name});
		} else {
			if (tree.openElements.inButtonScope('p'))
				this.endTagP('p');
			tree.insertElement(name, attributes);
			tree.form = tree.currentStackItem();
		}
	};

	modes.inBody.startTagRpRt = function(name, attributes) {
		if (tree.openElements.inScope('ruby')) {
			tree.generateImpliedEndTags();
			if (tree.currentStackItem().localName != 'ruby') {
				tree.parseError('unexpected-start-tag', {name: name});
			}
		}
		tree.insertElement(name, attributes);
	};

	modes.inBody.startTagListItem = function(name, attributes) {
		/// @todo: Fix according to current spec. http://www.w3.org/TR/html5/tree-construction.html#parsing-main-inbody
		var stopNames = {li: ['li'], dd: ['dd', 'dt'], dt: ['dd', 'dt']};
		var stopName = stopNames[name];

		var els = tree.openElements;
		for (var i = els.length - 1; i >= 0; i--) {
			var node = els.item(i);
			if (stopName.indexOf(node.localName) != -1) {
				tree.insertionMode.processEndTag(node.localName);
				break;
			}

			// todo isScoping()
			if (node.isSpecial() && node.localName !== 'p' && node.localName !== 'address' && node.localName !== 'div')
				break;
		}
		if (tree.openElements.inButtonScope('p'))
			this.endTagP('p');

		// Always insert an <li> element
		tree.insertElement(name, attributes);
		tree.framesetOk = false;
	};

	modes.inBody.startTagPlaintext = function(name, attributes) {
		if (tree.openElements.inButtonScope('p'))
			this.endTagP('p');
		tree.insertElement(name, attributes);
		tree.tokenizer.setState(Tokenizer.PLAINTEXT);
	};

	modes.inBody.startTagHeading = function(name, attributes) {
		if (tree.openElements.inButtonScope('p'))
			this.endTagP('p');
		if (tree.currentStackItem().isNumberedHeader()) {
			tree.parseError('unexpected-start-tag', {name: name});
			tree.popElement();
		}
		tree.insertElement(name, attributes);
	};

	modes.inBody.startTagA = function(name, attributes) {
		var activeA = tree.elementInActiveFormattingElements('a');
		if (activeA) {
			tree.parseError("unexpected-start-tag-implies-end-tag", {startName: "a", endName: "a"});
			tree.adoptionAgencyEndTag('a');
			if (tree.openElements.contains(activeA))
				tree.openElements.remove(activeA);
			tree.removeElementFromActiveFormattingElements(activeA);
		}
		tree.reconstructActiveFormattingElements();
		tree.insertFormattingElement(name, attributes);
	};

	modes.inBody.startTagFormatting = function(name, attributes) {
		tree.reconstructActiveFormattingElements();
		tree.insertFormattingElement(name, attributes);
	};

	modes.inBody.startTagNobr = function(name, attributes) {
		tree.reconstructActiveFormattingElements();
		if (tree.openElements.inScope('nobr')) {
			tree.parseError("unexpected-start-tag-implies-end-tag", {startName: 'nobr', endName: 'nobr'});
			this.processEndTag('nobr');
				// XXX Need tests that trigger the following
				tree.reconstructActiveFormattingElements();
		}
		tree.insertFormattingElement(name, attributes);
	};

	modes.inBody.startTagButton = function(name, attributes) {
		if (tree.openElements.inScope('button')) {
			tree.parseError('unexpected-start-tag-implies-end-tag', {startName: 'button', endName: 'button'});
			this.processEndTag('button');
			tree.insertionMode.processStartTag(name, attributes);
		} else {
			tree.framesetOk = false;
			tree.reconstructActiveFormattingElements();
			tree.insertElement(name, attributes);
		}
	};

	modes.inBody.startTagAppletMarqueeObject = function(name, attributes) {
		tree.reconstructActiveFormattingElements();
		tree.insertElement(name, attributes);
		tree.activeFormattingElements.push(Marker);
		tree.framesetOk = false;
	};

	modes.inBody.endTagAppletMarqueeObject = function(name) {
		if (!tree.openElements.inScope(name)) {
			tree.parseError("unexpected-end-tag", {name: name});
		} else {
			tree.generateImpliedEndTags();
			if (tree.currentStackItem().localName != name) {
				tree.parseError('end-tag-too-early', {name: name});
			}
			tree.openElements.popUntilPopped(name);
			tree.clearActiveFormattingElements();
		}
	};

	modes.inBody.startTagXmp = function(name, attributes) {
		if (tree.openElements.inButtonScope('p'))
			this.processEndTag('p');
		tree.reconstructActiveFormattingElements();
		tree.processGenericRawTextStartTag(name, attributes);
		tree.framesetOk = false;
	};

	modes.inBody.startTagTable = function(name, attributes) {
		if (tree.compatMode !== "quirks")
			if (tree.openElements.inButtonScope('p'))
				this.processEndTag('p');
		tree.insertElement(name, attributes);
		tree.setInsertionMode('inTable');
		tree.framesetOk = false;
	};

	modes.inBody.startTagVoidFormatting = function(name, attributes) {
		tree.reconstructActiveFormattingElements();
		tree.insertSelfClosingElement(name, attributes);
		tree.framesetOk = false;
	};

	modes.inBody.startTagParamSourceTrack = function(name, attributes) {
		tree.insertSelfClosingElement(name, attributes);
	};

	modes.inBody.startTagHr = function(name, attributes) {
		if (tree.openElements.inButtonScope('p'))
			this.endTagP('p');
		tree.insertSelfClosingElement(name, attributes);
		tree.framesetOk = false;
	};

	modes.inBody.startTagImage = function(name, attributes) {
		// No, really...
		tree.parseError('unexpected-start-tag-treated-as', {originalName: 'image', newName: 'img'});
		this.processStartTag('img', attributes);
	};

	modes.inBody.startTagInput = function(name, attributes) {
		var currentFramesetOk = tree.framesetOk;
		this.startTagVoidFormatting(name, attributes);
		for (var key in attributes) {
			// input type=hidden doesn't change framesetOk
			if (attributes[key].nodeName == 'type') {
				if (attributes[key].nodeValue.toLowerCase() == 'hidden')
					tree.framesetOk = currentFramesetOk;
				break;
			}
		}
	};

	modes.inBody.startTagIsindex = function(name, attributes) {
		tree.parseError('deprecated-tag', {name: 'isindex'});
		tree.selfClosingFlagAcknowledged = true;
		if (tree.form)
			return;
		var formAttributes = [];
		var inputAttributes = [];
		var prompt = "This is a searchable index. Enter search keywords: ";
		for (var key in attributes) {
			switch (attributes[key].nodeName) {
				case 'action':
					formAttributes.push({nodeName: 'action',
						nodeValue: attributes[key].nodeValue});
					break;
				case 'prompt':
					prompt = attributes[key].nodeValue;
					break;
				case 'name':
					break;
				default:
					inputAttributes.push({nodeName: attributes[key].nodeName,
						nodeValue: attributes[key].nodeValue});
			}
		}
		inputAttributes.push({nodeName: 'name', nodeValue: 'isindex'});
		this.processStartTag('form', formAttributes);
		this.processStartTag('hr');
		this.processStartTag('label');
		this.processCharacters(new CharacterBuffer(prompt));
		this.processStartTag('input', inputAttributes);
		this.processEndTag('label');
		this.processStartTag('hr');
		this.processEndTag('form');
	};

	modes.inBody.startTagTextarea = function(name, attributes) {
		// XXX Form element pointer checking here as well...
		tree.insertElement(name, attributes);
		tree.tokenizer.setState(Tokenizer.RCDATA);
		tree.originalInsertionMode = tree.insertionModeName;
		tree.shouldSkipLeadingNewline = true;
		tree.framesetOk = false;
		tree.setInsertionMode('text');
	};

	modes.inBody.startTagIFrame = function(name, attributes) {
		tree.framesetOk = false;
		this.startTagRawText(name, attributes);
	};

	modes.inBody.startTagRawText = function(name, attributes) {
		tree.processGenericRawTextStartTag(name, attributes);
	};

	modes.inBody.startTagSelect = function(name, attributes) {
		tree.reconstructActiveFormattingElements();
		tree.insertElement(name, attributes);
		tree.framesetOk = false;
		var insertionModeName = tree.insertionModeName;
		if (insertionModeName == 'inTable' ||
			insertionModeName == 'inCaption' ||
			insertionModeName == 'inColumnGroup' ||
			insertionModeName == 'inTableBody' ||
			insertionModeName == 'inRow' ||
			insertionModeName == 'inCell') {
			tree.setInsertionMode('inSelectInTable');
		} else {
			tree.setInsertionMode('inSelect');
		}
	};

	modes.inBody.startTagMisplaced = function(name, attributes) {
		tree.parseError('unexpected-start-tag-ignored', {name: name});
	};

	modes.inBody.endTagMisplaced = function(name) {
		// This handles elements with end tags in other insertion modes.
		tree.parseError("unexpected-end-tag", {name: name});
	};

	modes.inBody.endTagBr = function(name) {
		tree.parseError("unexpected-end-tag-treated-as", {originalName: "br", newName: "br element"});
		tree.reconstructActiveFormattingElements();
		tree.insertElement(name, []);
		tree.popElement();
	};

	modes.inBody.startTagOptionOptgroup = function(name, attributes) {
		if (tree.currentStackItem().localName == 'option')
			tree.popElement();
		tree.reconstructActiveFormattingElements();
		tree.insertElement(name, attributes);
	};

	modes.inBody.startTagOther = function(name, attributes) {
		tree.reconstructActiveFormattingElements();
		tree.insertElement(name, attributes);
	};

	modes.inBody.endTagOther = function(name) {
		var node;
		for (var i = tree.openElements.length - 1; i > 0; i--) {
			node = tree.openElements.item(i);
			if (node.localName == name) {
				tree.generateImpliedEndTags(name);
				if (tree.currentStackItem().localName != name)
					tree.parseError('unexpected-end-tag', {name: name});
				// todo optimize
				tree.openElements.remove_openElements_until(function(x) {return x === node;});
				break;
			}
			if (node.isSpecial()) {
				tree.parseError('unexpected-end-tag', {name: name});
				break;
			}
		}
	};

	modes.inBody.startTagMath = function(name, attributes, selfClosing) {
		tree.reconstructActiveFormattingElements();
		attributes = tree.adjustMathMLAttributes(attributes);
		attributes = tree.adjustForeignAttributes(attributes);
		tree.insertForeignElement(name, attributes, "http://www.w3.org/1998/Math/MathML", selfClosing);
		// Need to get the parse error right for the case where the token
		// has a namespace not equal to the xmlns attribute
	};

	modes.inBody.startTagSVG = function(name, attributes, selfClosing) {
		tree.reconstructActiveFormattingElements();
		attributes = tree.adjustSVGAttributes(attributes);
		attributes = tree.adjustForeignAttributes(attributes);
		tree.insertForeignElement(name, attributes, "http://www.w3.org/2000/svg", selfClosing);
		// Need to get the parse error right for the case where the token
		// has a namespace not equal to the xmlns attribute
	};

	modes.inBody.endTagP = function(name) {
		if (!tree.openElements.inButtonScope('p')) {
			tree.parseError('unexpected-end-tag', {name: 'p'});
			this.startTagCloseP('p', []);
			this.endTagP('p');
		} else {
			tree.generateImpliedEndTags('p');
			if (tree.currentStackItem().localName != 'p')
				tree.parseError('unexpected-implied-end-tag', {name: 'p'});
			tree.openElements.popUntilPopped(name);
		}
	};

	modes.inBody.endTagBody = function(name) {
		if (!tree.openElements.inScope('body')) {
			tree.parseError('unexpected-end-tag', {name: name});
			return;
		}

		/// @todo Emit parse error on end tags other than the ones listed in http://www.w3.org/TR/html5/tree-construction.html#parsing-main-inbody
		// ['dd', 'dt', 'li', 'optgroup', 'option', 'p', 'rp', 'rt', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'body', 'html']
		if (tree.currentStackItem().localName != 'body') {
			tree.parseError('expected-one-end-tag-but-got-another', {
				expectedName: tree.currentStackItem().localName,
				gotName: name
			});
		}
		tree.setInsertionMode('afterBody');
	};

	modes.inBody.endTagHtml = function(name) {
		if (!tree.openElements.inScope('body')) {
			tree.parseError('unexpected-end-tag', {name: name});
			return;
		}

		/// @todo Emit parse error on end tags other than the ones listed in http://www.w3.org/TR/html5/tree-construction.html#parsing-main-inbody
		// ['dd', 'dt', 'li', 'optgroup', 'option', 'p', 'rp', 'rt', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'body', 'html']
		if (tree.currentStackItem().localName != 'body') {
			tree.parseError('expected-one-end-tag-but-got-another', {
				expectedName: tree.currentStackItem().localName,
				gotName: name
			});
		}
		tree.setInsertionMode('afterBody');
		tree.insertionMode.processEndTag(name);
	};

	modes.inBody.endTagBlock = function(name) {
		if (!tree.openElements.inScope(name)) {
			tree.parseError('unexpected-end-tag', {name: name});
		} else {
			tree.generateImpliedEndTags();
			if (tree.currentStackItem().localName != name) {
				tree.parseError('end-tag-too-early', {name: name});
			}
			tree.openElements.popUntilPopped(name);
		}
	};

	modes.inBody.endTagForm = function(name)  {
		var node = tree.form;
		tree.form = null;
		if (!node || !tree.openElements.inScope(name)) {
			tree.parseError('unexpected-end-tag', {name: name});
		} else {
			tree.generateImpliedEndTags();
			if (tree.currentStackItem() != node) {
				tree.parseError('end-tag-too-early-ignored', {name: 'form'});
			}
			tree.openElements.remove(node);
		}
	};

	modes.inBody.endTagListItem = function(name) {
		if (!tree.openElements.inListItemScope(name)) {
			tree.parseError('unexpected-end-tag', {name: name});
		} else {
			tree.generateImpliedEndTags(name);
			if (tree.currentStackItem().localName != name)
				tree.parseError('end-tag-too-early', {name: name});
			tree.openElements.popUntilPopped(name);
		}
	};

	modes.inBody.endTagHeading = function(name) {
		if (!tree.openElements.hasNumberedHeaderElementInScope()) {
			tree.parseError('unexpected-end-tag', {name: name});
			return;
		}
		tree.generateImpliedEndTags();
		if (tree.currentStackItem().localName != name)
			tree.parseError('end-tag-too-early', {name: name});

		tree.openElements.remove_openElements_until(function(e) {
			return e.isNumberedHeader();
		});
	};

	modes.inBody.endTagFormatting = function(name, attributes) {
		if (!tree.adoptionAgencyEndTag(name))
			this.endTagOther(name, attributes);
	};

	modes.inCaption = Object.create(modes.base);

	modes.inCaption.start_tag_handlers = {
		html: 'startTagHtml',
		caption: 'startTagTableElement',
		col: 'startTagTableElement',
		colgroup: 'startTagTableElement',
		tbody: 'startTagTableElement',
		td: 'startTagTableElement',
		tfoot: 'startTagTableElement',
		thead: 'startTagTableElement',
		tr: 'startTagTableElement',
		'-default': 'startTagOther'
	};

	modes.inCaption.end_tag_handlers = {
		caption: 'endTagCaption',
		table: 'endTagTable',
		body: 'endTagIgnore',
		col: 'endTagIgnore',
		colgroup: 'endTagIgnore',
		html: 'endTagIgnore',
		tbody: 'endTagIgnore',
		td: 'endTagIgnore',
		tfood: 'endTagIgnore',
		thead: 'endTagIgnore',
		tr: 'endTagIgnore',
		'-default': 'endTagOther'
	};

	modes.inCaption.processCharacters = function(data) {
		modes.inBody.processCharacters(data);
	};

	modes.inCaption.startTagTableElement = function(name, attributes) {
		tree.parseError('unexpected-end-tag', {name: name});
		var ignoreEndTag = !tree.openElements.inTableScope('caption');
		tree.insertionMode.processEndTag('caption');
		if (!ignoreEndTag) tree.insertionMode.processStartTag(name, attributes);
	};

	modes.inCaption.startTagOther = function(name, attributes, selfClosing) {
		modes.inBody.processStartTag(name, attributes, selfClosing);
	};

	modes.inCaption.endTagCaption = function(name) {
		if (!tree.openElements.inTableScope('caption')) {
			// context case
			assert.ok(tree.context);
			tree.parseError('unexpected-end-tag', {name: name});
		} else {
			// AT this code is quite similar to endTagTable in inTable
			tree.generateImpliedEndTags();
			if (tree.currentStackItem().localName != 'caption') {
				// @todo this is confusing for implied end tag
				tree.parseError('expected-one-end-tag-but-got-another', {
					gotName: "caption",
					expectedName: tree.currentStackItem().localName
				});
			}
			tree.openElements.popUntilPopped('caption');
			tree.clearActiveFormattingElements();
			tree.setInsertionMode('inTable');
		}
	};

	modes.inCaption.endTagTable = function(name) {
		tree.parseError("unexpected-end-table-in-caption");
		var ignoreEndTag = !tree.openElements.inTableScope('caption');
		tree.insertionMode.processEndTag('caption');
		if (!ignoreEndTag) tree.insertionMode.processEndTag(name);
	};

	modes.inCaption.endTagIgnore = function(name) {
		tree.parseError('unexpected-end-tag', {name: name});
	};

	modes.inCaption.endTagOther = function(name) {
		modes.inBody.processEndTag(name);
	};

	modes.inCell = Object.create(modes.base);

	modes.inCell.start_tag_handlers = {
		html: 'startTagHtml',
		caption: 'startTagTableOther',
		col: 'startTagTableOther',
		colgroup: 'startTagTableOther',
		tbody: 'startTagTableOther',
		td: 'startTagTableOther',
		tfoot: 'startTagTableOther',
		th: 'startTagTableOther',
		thead: 'startTagTableOther',
		tr: 'startTagTableOther',
		'-default': 'startTagOther'
	};

	modes.inCell.end_tag_handlers = {
		td: 'endTagTableCell',
		th: 'endTagTableCell',
		body: 'endTagIgnore',
		caption: 'endTagIgnore',
		col: 'endTagIgnore',
		colgroup: 'endTagIgnore',
		html: 'endTagIgnore',
		table: 'endTagImply',
		tbody: 'endTagImply',
		tfoot: 'endTagImply',
		thead: 'endTagImply',
		tr: 'endTagImply',
		'-default': 'endTagOther'
	};

	modes.inCell.processCharacters = function(data) {
		modes.inBody.processCharacters(data);
	};

	modes.inCell.startTagTableOther = function(name, attributes, selfClosing) {
		if (tree.openElements.inTableScope('td') || tree.openElements.inTableScope('th')) {
			this.closeCell();
			tree.insertionMode.processStartTag(name, attributes, selfClosing);
		} else {
			// context case
			tree.parseError('unexpected-start-tag', {name: name});
		}
	};

	modes.inCell.startTagOther = function(name, attributes, selfClosing) {
		modes.inBody.processStartTag(name, attributes, selfClosing);
	};

	modes.inCell.endTagTableCell = function(name) {
		if (tree.openElements.inTableScope(name)) {
			tree.generateImpliedEndTags(name);
			if (tree.currentStackItem().localName != name.toLowerCase()) {
				tree.parseError('unexpected-cell-end-tag', {name: name});
				tree.openElements.popUntilPopped(name);
			} else {
				tree.popElement();
			}
			tree.clearActiveFormattingElements();
			tree.setInsertionMode('inRow');
		} else {
			tree.parseError('unexpected-end-tag', {name: name});
		}
	};

	modes.inCell.endTagIgnore = function(name) {
		tree.parseError('unexpected-end-tag', {name: name});
	};

	modes.inCell.endTagImply = function(name) {
		if (tree.openElements.inTableScope(name)) {
			this.closeCell();
			tree.insertionMode.processEndTag(name);
		} else {
			// sometimes context case
			tree.parseError('unexpected-end-tag', {name: name});
		}
	};

	modes.inCell.endTagOther = function(name) {
		modes.inBody.processEndTag(name);
	};

	modes.inCell.closeCell = function() {
		if (tree.openElements.inTableScope('td')) {
			this.endTagTableCell('td');
		} else if (tree.openElements.inTableScope('th')) {
			this.endTagTableCell('th');
		}
	};


	modes.inColumnGroup = Object.create(modes.base);

	modes.inColumnGroup.start_tag_handlers = {
		html: 'startTagHtml',
		col: 'startTagCol',
		'-default': 'startTagOther'
	};

	modes.inColumnGroup.end_tag_handlers = {
		colgroup: 'endTagColgroup',
		col: 'endTagCol',
		'-default': 'endTagOther'
	};

	modes.inColumnGroup.ignoreEndTagColgroup = function() {
		return tree.currentStackItem().localName == 'html';
	};

	modes.inColumnGroup.processCharacters = function(buffer) {
		var leadingWhitespace = buffer.takeLeadingWhitespace();
		if (leadingWhitespace)
			tree.insertText(leadingWhitespace);
		if (!buffer.length)
			return;
		var ignoreEndTag = this.ignoreEndTagColgroup();
		this.endTagColgroup('colgroup');
		if (!ignoreEndTag) tree.insertionMode.processCharacters(buffer);
	};

	modes.inColumnGroup.startTagCol = function(name, attributes) {
		tree.insertSelfClosingElement(name, attributes);
	};

	modes.inColumnGroup.startTagOther = function(name, attributes, selfClosing) {
		var ignoreEndTag = this.ignoreEndTagColgroup();
		this.endTagColgroup('colgroup');
		if (!ignoreEndTag) tree.insertionMode.processStartTag(name, attributes, selfClosing);
	};

	modes.inColumnGroup.endTagColgroup = function(name) {
		if (this.ignoreEndTagColgroup()) {
			// context case
			assert.ok(tree.context);
			tree.parseError('unexpected-end-tag', {name: name});
		} else {
			tree.popElement();
			tree.setInsertionMode('inTable');
		}
	};

	modes.inColumnGroup.endTagCol = function(name) {
		tree.parseError("no-end-tag", {name: 'col'});
	};

	modes.inColumnGroup.endTagOther = function(name) {
		var ignoreEndTag = this.ignoreEndTagColgroup();
		this.endTagColgroup('colgroup');
		if (!ignoreEndTag) tree.insertionMode.processEndTag(name) ;
	};

	modes.inForeignContent = Object.create(modes.base);

	modes.inForeignContent.processStartTag = function(name, attributes, selfClosing) {
		if (['b', 'big', 'blockquote', 'body', 'br', 'center', 'code', 'dd', 'div', 'dl', 'dt', 'em', 'embed', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'hr', 'i', 'img', 'li', 'listing', 'menu', 'meta', 'nobr', 'ol', 'p', 'pre', 'ruby', 's', 'small', 'span', 'strong', 'strike', 'sub', 'sup', 'table', 'tt', 'u', 'ul', 'var'].indexOf(name) != -1
				|| (name == 'font' && attributes.some(function(attr){ return ['color', 'face', 'size'].indexOf(attr.nodeName) >= 0 }))) {
			tree.parseError('unexpected-html-element-in-foreign-content', {name: name});
			while (tree.currentStackItem().isForeign()
				&& !tree.currentStackItem().isHtmlIntegrationPoint()
				&& !tree.currentStackItem().isMathMLTextIntegrationPoint()) {
				tree.openElements.pop();
			}
			tree.insertionMode.processStartTag(name, attributes, selfClosing);
			return;
		}
		if (tree.currentStackItem().namespaceURI == "http://www.w3.org/1998/Math/MathML") {
			attributes = tree.adjustMathMLAttributes(attributes);
		}
		if (tree.currentStackItem().namespaceURI == "http://www.w3.org/2000/svg") {
			name = tree.adjustSVGTagNameCase(name);
			attributes = tree.adjustSVGAttributes(attributes);
		}
		attributes = tree.adjustForeignAttributes(attributes);
		tree.insertForeignElement(name, attributes, tree.currentStackItem().namespaceURI, selfClosing);
	};

	modes.inForeignContent.processEndTag = function(name) {
		var node = tree.currentStackItem();
		var index = tree.openElements.length - 1;
		if (node.localName.toLowerCase() != name)
			tree.parseError("unexpected-end-tag", {name: name});

		while (true) {
			if (index === 0)
				break;
			if (node.localName.toLowerCase() == name) {
				while (tree.openElements.pop() != node);
				break;
			}
			index -= 1;
			node = tree.openElements.item(index);
			if (node.isForeign()) {
				continue;
			} else {
				tree.insertionMode.processEndTag(name);
				break;
			}
		}
	};

	modes.inForeignContent.processCharacters = function(buffer) {
		var characters = buffer.takeRemaining();
		characters = characters.replace(/\u0000/g, function(match, index){
			// @todo position
			tree.parseError('invalid-codepoint');
			return '\uFFFD';
		});
		if (tree.framesetOk && !isAllWhitespaceOrReplacementCharacters(characters))
			tree.framesetOk = false;
		tree.insertText(characters);
	};

	modes.inHeadNoscript = Object.create(modes.base);

	modes.inHeadNoscript.start_tag_handlers = {
		html: 'startTagHtml',
		basefont: 'startTagBasefontBgsoundLinkMetaNoframesStyle',
		bgsound: 'startTagBasefontBgsoundLinkMetaNoframesStyle',
		link: 'startTagBasefontBgsoundLinkMetaNoframesStyle',
		meta: 'startTagBasefontBgsoundLinkMetaNoframesStyle',
		noframes: 'startTagBasefontBgsoundLinkMetaNoframesStyle',
		style: 'startTagBasefontBgsoundLinkMetaNoframesStyle',
		head: 'startTagHeadNoscript',
		noscript: 'startTagHeadNoscript',
		"-default": 'startTagOther'
	};

	modes.inHeadNoscript.end_tag_handlers = {
		noscript: 'endTagNoscript',
		br: 'endTagBr',
		'-default': 'endTagOther'
	};

	modes.inHeadNoscript.processCharacters = function(buffer) {
		var leadingWhitespace = buffer.takeLeadingWhitespace();
		if (leadingWhitespace)
			tree.insertText(leadingWhitespace);
		if (!buffer.length)
			return;
		// FIXME error message
		tree.parseError("unexpected-char-in-frameset");
		this.anythingElse();
		tree.insertionMode.processCharacters(buffer);
	};

	modes.inHeadNoscript.processComment = function(data) {
		modes.inHead.processComment(data);
	};

	modes.inHeadNoscript.startTagBasefontBgsoundLinkMetaNoframesStyle = function(name, attributes) {
		modes.inHead.processStartTag(name, attributes);
	};

	modes.inHeadNoscript.startTagHeadNoscript = function(name, attributes) {
		// FIXME error message
		tree.parseError("unexpected-start-tag-in-frameset", {name: name});
	};

	modes.inHeadNoscript.startTagOther = function(name, attributes) {
		// FIXME error message
		tree.parseError("unexpected-start-tag-in-frameset", {name: name});
		this.anythingElse();
		tree.insertionMode.processStartTag(name, attributes);
	};

	modes.inHeadNoscript.endTagBr = function(name, attributes) {
		// FIXME error message
		tree.parseError("unexpected-end-tag-in-frameset", {name: name});
		this.anythingElse();
		tree.insertionMode.processEndTag(name, attributes);
	};

	modes.inHeadNoscript.endTagNoscript = function(name, attributes) {
		tree.popElement();
		tree.setInsertionMode('inHead');
	};

	modes.inHeadNoscript.endTagOther = function(name, attributes) {
		// FIXME error message
		tree.parseError("unexpected-end-tag-in-frameset", {name: name});
	};

	modes.inHeadNoscript.anythingElse = function() {
		tree.popElement();
		tree.setInsertionMode('inHead');
	};


	modes.inFrameset = Object.create(modes.base);

	modes.inFrameset.start_tag_handlers = {
		html: 'startTagHtml',
		frameset: 'startTagFrameset',
		frame: 'startTagFrame',
		noframes: 'startTagNoframes',
		"-default": 'startTagOther'
	};

	modes.inFrameset.end_tag_handlers = {
		frameset: 'endTagFrameset',
		noframes: 'endTagNoframes',
		'-default': 'endTagOther'
	};

	modes.inFrameset.processCharacters = function(data) {
		tree.parseError("unexpected-char-in-frameset");
	};

	modes.inFrameset.startTagFrameset = function(name, attributes) {
		tree.insertElement(name, attributes);
	};

	modes.inFrameset.startTagFrame = function(name, attributes) {
		tree.insertSelfClosingElement(name, attributes);
	};

	modes.inFrameset.startTagNoframes = function(name, attributes) {
		modes.inBody.processStartTag(name, attributes);
	};

	modes.inFrameset.startTagOther = function(name, attributes) {
		tree.parseError("unexpected-start-tag-in-frameset", {name: name});
	};

	modes.inFrameset.endTagFrameset = function(name, attributes) {
		if (tree.currentStackItem().localName == 'html') {
			// context case
			tree.parseError("unexpected-frameset-in-frameset-innerhtml");
		} else {
			tree.popElement();
		}

		if (!tree.context && tree.currentStackItem().localName != 'frameset') {
			// If we're not in context mode an the current node is not a "frameset" element (anymore) then switch
			tree.setInsertionMode('afterFrameset');
		}
	};

	modes.inFrameset.endTagNoframes = function(name) {
		modes.inBody.processEndTag(name);
	};

	modes.inFrameset.endTagOther = function(name) {
		tree.parseError("unexpected-end-tag-in-frameset", {name: name});
	};

	modes.inTable = Object.create(modes.base);

	modes.inTable.start_tag_handlers = {
		html: 'startTagHtml',
		caption: 'startTagCaption',
		colgroup: 'startTagColgroup',
		col: 'startTagCol',
		table: 'startTagTable',
		tbody: 'startTagRowGroup',
		tfoot: 'startTagRowGroup',
		thead: 'startTagRowGroup',
		td: 'startTagImplyTbody',
		th: 'startTagImplyTbody',
		tr: 'startTagImplyTbody',
		style: 'startTagStyleScript',
		script: 'startTagStyleScript',
		input: 'startTagInput',
		form: 'startTagForm',
		'-default': 'startTagOther'
	};

	modes.inTable.end_tag_handlers = {
		table: 'endTagTable',
		body: 'endTagIgnore',
		caption: 'endTagIgnore',
		col: 'endTagIgnore',
		colgroup: 'endTagIgnore',
		html: 'endTagIgnore',
		tbody: 'endTagIgnore',
		td: 'endTagIgnore',
		tfoot: 'endTagIgnore',
		th: 'endTagIgnore',
		thead: 'endTagIgnore',
		tr: 'endTagIgnore',
		'-default': 'endTagOther'
	};

	modes.inTable.processCharacters =  function(data) {
		if (tree.currentStackItem().isFosterParenting()) {
			var originalInsertionMode = tree.insertionModeName;
			tree.setInsertionMode('inTableText');
			tree.originalInsertionMode = originalInsertionMode;
			tree.insertionMode.processCharacters(data);
		} else {
			tree.redirectAttachToFosterParent = true;
			modes.inBody.processCharacters(data);
			tree.redirectAttachToFosterParent = false;
		}
	};

	modes.inTable.startTagCaption = function(name, attributes) {
		tree.openElements.popUntilTableScopeMarker();
		tree.activeFormattingElements.push(Marker);
		tree.insertElement(name, attributes);
		tree.setInsertionMode('inCaption');
	};

	modes.inTable.startTagColgroup = function(name, attributes) {
		tree.openElements.popUntilTableScopeMarker();
		tree.insertElement(name, attributes);
		tree.setInsertionMode('inColumnGroup');
	};

	modes.inTable.startTagCol = function(name, attributes) {
		this.startTagColgroup('colgroup', []);
		tree.insertionMode.processStartTag(name, attributes);
	};

	modes.inTable.startTagRowGroup = function(name, attributes) {
		tree.openElements.popUntilTableScopeMarker();
		tree.insertElement(name, attributes);
		tree.setInsertionMode('inTableBody');
	};

	modes.inTable.startTagImplyTbody = function(name, attributes) {
		this.startTagRowGroup('tbody', []);
		tree.insertionMode.processStartTag(name, attributes);
	};

	modes.inTable.startTagTable = function(name, attributes) {
		tree.parseError("unexpected-start-tag-implies-end-tag",
				{startName: "table", endName: "table"});
		tree.insertionMode.processEndTag('table');
		if (!tree.context) tree.insertionMode.processStartTag(name, attributes);
	};

	modes.inTable.startTagStyleScript = function(name, attributes) {
		modes.inHead.processStartTag(name, attributes);
	};

	modes.inTable.startTagInput = function(name, attributes) {
		for (var key in attributes) {
			if (attributes[key].nodeName.toLowerCase() == 'type') {
				if (attributes[key].nodeValue.toLowerCase() == 'hidden') {
					tree.parseError("unexpected-hidden-input-in-table");
					tree.insertElement(name, attributes);
					// XXX associate with form
					tree.openElements.pop();
					return;
				}
				break;
			}
		}
		this.startTagOther(name, attributes);
	};

	modes.inTable.startTagForm = function(name, attributes) {
		tree.parseError("unexpected-form-in-table");
		if (!tree.form) {
			tree.insertElement(name, attributes);
			tree.form = tree.currentStackItem();
			tree.openElements.pop();
		}
	};

	modes.inTable.startTagOther = function(name, attributes, selfClosing) {
		tree.parseError("unexpected-start-tag-implies-table-voodoo", {name: name});
		tree.redirectAttachToFosterParent = true;
		modes.inBody.processStartTag(name, attributes, selfClosing);
		tree.redirectAttachToFosterParent = false;
	};

	modes.inTable.endTagTable = function(name) {
		if (tree.openElements.inTableScope(name)) {
			tree.generateImpliedEndTags();
			if (tree.currentStackItem().localName != name) {
				tree.parseError("end-tag-too-early-named", {gotName: 'table', expectedName: tree.currentStackItem().localName});
			}

			tree.openElements.popUntilPopped('table');
			tree.resetInsertionMode();
		} else {
			assert.ok(tree.context);
			tree.parseError('unexpected-end-tag', {name: name});
		}
	};

	modes.inTable.endTagIgnore = function(name) {
		tree.parseError("unexpected-end-tag", {name: name});
	};

	modes.inTable.endTagOther = function(name) {
		tree.parseError("unexpected-end-tag-implies-table-voodoo", {name: name});
		// Make all the special element rearranging voodoo kick in
		tree.redirectAttachToFosterParent = true;
		// Process the end tag in the "in body" mode
		modes.inBody.processEndTag(name);
		tree.redirectAttachToFosterParent = false;
	};

	modes.inTableText = Object.create(modes.base);

	modes.inTableText.flushCharacters = function() {
		var characters = tree.pendingTableCharacters.join('');
		if (!isAllWhitespace(characters)) {
			tree.redirectAttachToFosterParent = true;
			tree.reconstructActiveFormattingElements();
			tree.insertText(characters);
			tree.framesetOk = false;
			tree.redirectAttachToFosterParent = false;
		} else {
			tree.insertText(characters);
		}
		tree.pendingTableCharacters = [];
	};

	modes.inTableText.processComment = function(data) {
		this.flushCharacters();
		tree.setInsertionMode(tree.originalInsertionMode);
		tree.insertionMode.processComment(data);
	};

	modes.inTableText.processEOF = function(data) {
		this.flushCharacters();
		tree.setInsertionMode(tree.originalInsertionMode);
		tree.insertionMode.processEOF();
	};

	modes.inTableText.processCharacters = function(buffer) {
		var characters = buffer.takeRemaining();
		characters = characters.replace(/\u0000/g, function(match, index){
			// @todo position
			tree.parseError("invalid-codepoint");
			return '';
		});
		if (!characters)
			return;
		tree.pendingTableCharacters.push(characters);
	};

	modes.inTableText.processStartTag = function(name, attributes, selfClosing) {
		this.flushCharacters();
		tree.setInsertionMode(tree.originalInsertionMode);
		tree.insertionMode.processStartTag(name, attributes, selfClosing);
	};

	modes.inTableText.processEndTag = function(name, attributes) {
		this.flushCharacters();
		tree.setInsertionMode(tree.originalInsertionMode);
		tree.insertionMode.processEndTag(name, attributes);
	};

	modes.inTableBody = Object.create(modes.base);

	modes.inTableBody.start_tag_handlers = {
		html: 'startTagHtml',
		tr: 'startTagTr',
		td: 'startTagTableCell',
		th: 'startTagTableCell',
		caption: 'startTagTableOther',
		col: 'startTagTableOther',
		colgroup: 'startTagTableOther',
		tbody: 'startTagTableOther',
		tfoot: 'startTagTableOther',
		thead: 'startTagTableOther',
		'-default': 'startTagOther'
	};

	modes.inTableBody.end_tag_handlers = {
		table: 'endTagTable',
		tbody: 'endTagTableRowGroup',
		tfoot: 'endTagTableRowGroup',
		thead: 'endTagTableRowGroup',
		body: 'endTagIgnore',
		caption: 'endTagIgnore',
		col: 'endTagIgnore',
		colgroup: 'endTagIgnore',
		html: 'endTagIgnore',
		td: 'endTagIgnore',
		th: 'endTagIgnore',
		tr: 'endTagIgnore',
		'-default': 'endTagOther'
	};

	modes.inTableBody.processCharacters = function(data) {
		modes.inTable.processCharacters(data);
	};

	modes.inTableBody.startTagTr = function(name, attributes) {
		tree.openElements.popUntilTableBodyScopeMarker();
		tree.insertElement(name, attributes);
		tree.setInsertionMode('inRow');
	};

	modes.inTableBody.startTagTableCell = function(name, attributes) {
		tree.parseError("unexpected-cell-in-table-body", {name: name});
		this.startTagTr('tr', []);
		tree.insertionMode.processStartTag(name, attributes);
	};

	modes.inTableBody.startTagTableOther = function(name, attributes) {
		// XXX any ideas on how to share this with endTagTable
		if (tree.openElements.inTableScope('tbody') ||  tree.openElements.inTableScope('thead') || tree.openElements.inTableScope('tfoot')) {
			tree.openElements.popUntilTableBodyScopeMarker();
			this.endTagTableRowGroup(tree.currentStackItem().localName);
			tree.insertionMode.processStartTag(name, attributes);
		} else {
			// context case
			tree.parseError('unexpected-start-tag', {name: name});
		}
	};

	modes.inTableBody.startTagOther = function(name, attributes) {
		modes.inTable.processStartTag(name, attributes);
	};

	modes.inTableBody.endTagTableRowGroup = function(name) {
		if (tree.openElements.inTableScope(name)) {
			tree.openElements.popUntilTableBodyScopeMarker();
			tree.popElement();
			tree.setInsertionMode('inTable');
		} else {
			tree.parseError('unexpected-end-tag-in-table-body', {name: name});
		}
	};

	modes.inTableBody.endTagTable = function(name) {
		if (tree.openElements.inTableScope('tbody') ||  tree.openElements.inTableScope('thead') || tree.openElements.inTableScope('tfoot')) {
			tree.openElements.popUntilTableBodyScopeMarker();
			this.endTagTableRowGroup(tree.currentStackItem().localName);
			tree.insertionMode.processEndTag(name);
		} else {
			// context case
			tree.parseError('unexpected-end-tag', {name: name});
		}
	};

	modes.inTableBody.endTagIgnore = function(name) {
		tree.parseError("unexpected-end-tag-in-table-body", {name: name});
	};

	modes.inTableBody.endTagOther = function(name) {
		modes.inTable.processEndTag(name);
	};

	modes.inSelect = Object.create(modes.base);

	modes.inSelect.start_tag_handlers = {
		html: 'startTagHtml',
		option: 'startTagOption',
		optgroup: 'startTagOptgroup',
		select: 'startTagSelect',
		input: 'startTagInput',
		keygen: 'startTagInput',
		textarea: 'startTagInput',
		script: 'startTagScript',
		'-default': 'startTagOther'
	};

	modes.inSelect.end_tag_handlers = {
		option: 'endTagOption',
		optgroup: 'endTagOptgroup',
		select: 'endTagSelect',
		caption: 'endTagTableElements',
		table: 'endTagTableElements',
		tbody: 'endTagTableElements',
		tfoot: 'endTagTableElements',
		thead: 'endTagTableElements',
		tr: 'endTagTableElements',
		td: 'endTagTableElements',
		th: 'endTagTableElements',
		'-default': 'endTagOther'
	};

	modes.inSelect.processCharacters = function(buffer) {
		var data = buffer.takeRemaining();
		data = data.replace(/\u0000/g, function(match, index){
			// @todo position
			tree.parseError("invalid-codepoint");
			return '';
		});
		if (!data)
			return;
		tree.insertText(data);
	};

	modes.inSelect.startTagOption = function(name, attributes) {
		// we need to imply </option> if <option> is the current node
		if (tree.currentStackItem().localName == 'option')
			tree.popElement();
		tree.insertElement(name, attributes);
	};

	modes.inSelect.startTagOptgroup = function(name, attributes) {
		if (tree.currentStackItem().localName == 'option')
			tree.popElement();
		if (tree.currentStackItem().localName == 'optgroup')
			tree.popElement();
		tree.insertElement(name, attributes);
	};

	modes.inSelect.endTagOption = function(name) {
		if (tree.currentStackItem().localName !== 'option') {
			tree.parseError('unexpected-end-tag-in-select', {name: name});
			return;
		}
		tree.popElement();
	};

	modes.inSelect.endTagOptgroup = function(name) {
		// </optgroup> implicitly closes <option>
		if (tree.currentStackItem().localName == 'option' && tree.openElements.item(tree.openElements.length - 2).localName == 'optgroup') {
			tree.popElement();
		}

		// it also closes </optgroup>
		if (tree.currentStackItem().localName == 'optgroup') {
			tree.popElement();
		} else {
			// But nothing else
			tree.parseError('unexpected-end-tag-in-select', {name: 'optgroup'});
		}
	};

	modes.inSelect.startTagSelect = function(name) {
		tree.parseError("unexpected-select-in-select");
		this.endTagSelect('select');
	};

	modes.inSelect.endTagSelect = function(name) {
		if (tree.openElements.inTableScope('select')) {
			tree.openElements.popUntilPopped('select');
			tree.resetInsertionMode();
		} else {
			// context case
			tree.parseError('unexpected-end-tag', {name: name});
		}
	};

	modes.inSelect.startTagInput = function(name, attributes) {
		tree.parseError("unexpected-input-in-select");
		if (tree.openElements.inSelectScope('select')) {
			this.endTagSelect('select');
			tree.insertionMode.processStartTag(name, attributes);
		}
	};

	modes.inSelect.startTagScript = function(name, attributes) {
		modes.inHead.processStartTag(name, attributes);
	};

	modes.inSelect.endTagTableElements = function(name) {
		tree.parseError('unexpected-end-tag-in-select', {name: name});
		if (tree.openElements.inTableScope(name)) {
			this.endTagSelect('select');
			tree.insertionMode.processEndTag(name);
		}
	};

	modes.inSelect.startTagOther = function(name, attributes) {
		tree.parseError("unexpected-start-tag-in-select", {name: name});
	};

	modes.inSelect.endTagOther = function(name) {
		tree.parseError('unexpected-end-tag-in-select', {name: name});
	};

	modes.inSelectInTable = Object.create(modes.base);

	modes.inSelectInTable.start_tag_handlers = {
		caption: 'startTagTable',
		table: 'startTagTable',
		tbody: 'startTagTable',
		tfoot: 'startTagTable',
		thead: 'startTagTable',
		tr: 'startTagTable',
		td: 'startTagTable',
		th: 'startTagTable',
		'-default': 'startTagOther'
	};

	modes.inSelectInTable.end_tag_handlers = {
		caption: 'endTagTable',
		table: 'endTagTable',
		tbody: 'endTagTable',
		tfoot: 'endTagTable',
		thead: 'endTagTable',
		tr: 'endTagTable',
		td: 'endTagTable',
		th: 'endTagTable',
		'-default': 'endTagOther'
	};

	modes.inSelectInTable.processCharacters = function(data) {
		modes.inSelect.processCharacters(data);
	};

	modes.inSelectInTable.startTagTable = function(name, attributes) {
		tree.parseError("unexpected-table-element-start-tag-in-select-in-table", {name: name});
		this.endTagOther("select");
		tree.insertionMode.processStartTag(name, attributes);
	};

	modes.inSelectInTable.startTagOther = function(name, attributes, selfClosing) {
		modes.inSelect.processStartTag(name, attributes, selfClosing);
	};

	modes.inSelectInTable.endTagTable = function(name) {
		tree.parseError("unexpected-table-element-end-tag-in-select-in-table", {name: name});
		if (tree.openElements.inTableScope(name)) {
			this.endTagOther("select");
			tree.insertionMode.processEndTag(name);
		}
	};

	modes.inSelectInTable.endTagOther = function(name) {
		modes.inSelect.processEndTag(name);
	};

	modes.inRow = Object.create(modes.base);

	modes.inRow.start_tag_handlers = {
		html: 'startTagHtml',
		td: 'startTagTableCell',
		th: 'startTagTableCell',
		caption: 'startTagTableOther',
		col: 'startTagTableOther',
		colgroup: 'startTagTableOther',
		tbody: 'startTagTableOther',
		tfoot: 'startTagTableOther',
		thead: 'startTagTableOther',
		tr: 'startTagTableOther',
		'-default': 'startTagOther'
	};

	modes.inRow.end_tag_handlers = {
		tr: 'endTagTr',
		table: 'endTagTable',
		tbody: 'endTagTableRowGroup',
		tfoot: 'endTagTableRowGroup',
		thead: 'endTagTableRowGroup',
		body: 'endTagIgnore',
		caption: 'endTagIgnore',
		col: 'endTagIgnore',
		colgroup: 'endTagIgnore',
		html: 'endTagIgnore',
		td: 'endTagIgnore',
		th: 'endTagIgnore',
		'-default': 'endTagOther'
	};

	modes.inRow.processCharacters = function(data) {
		modes.inTable.processCharacters(data);
	};

	modes.inRow.startTagTableCell = function(name, attributes) {
		tree.openElements.popUntilTableRowScopeMarker();
		tree.insertElement(name, attributes);
		tree.setInsertionMode('inCell');
		tree.activeFormattingElements.push(Marker);
	};

	modes.inRow.startTagTableOther = function(name, attributes) {
		var ignoreEndTag = this.ignoreEndTagTr();
		this.endTagTr('tr');
		// XXX how are we sure it's always ignored in the context case?
		if (!ignoreEndTag) tree.insertionMode.processStartTag(name, attributes);
	};

	modes.inRow.startTagOther = function(name, attributes, selfClosing) {
		modes.inTable.processStartTag(name, attributes, selfClosing);
	};

	modes.inRow.endTagTr = function(name) {
		if (this.ignoreEndTagTr()) {
			assert.ok(tree.context);
			tree.parseError('unexpected-end-tag', {name: name});
		} else {
			tree.openElements.popUntilTableRowScopeMarker();
			tree.popElement();
			tree.setInsertionMode('inTableBody');
		}
	};

	modes.inRow.endTagTable = function(name) {
		var ignoreEndTag = this.ignoreEndTagTr();
		this.endTagTr('tr');
		// Reprocess the current tag if the tr end tag was not ignored
		// XXX how are we sure it's always ignored in the context case?
		if (!ignoreEndTag) tree.insertionMode.processEndTag(name);
	};

	modes.inRow.endTagTableRowGroup = function(name) {
		if (tree.openElements.inTableScope(name)) {
			this.endTagTr('tr');
			tree.insertionMode.processEndTag(name);
		} else {
			// context case
			tree.parseError('unexpected-end-tag', {name: name});
		}
	};

	modes.inRow.endTagIgnore = function(name) {
		tree.parseError("unexpected-end-tag-in-table-row", {name: name});
	};

	modes.inRow.endTagOther = function(name) {
		modes.inTable.processEndTag(name);
	};

	modes.inRow.ignoreEndTagTr = function() {
		return !tree.openElements.inTableScope('tr');
	};

	modes.afterAfterFrameset = Object.create(modes.base);

	modes.afterAfterFrameset.start_tag_handlers = {
		html: 'startTagHtml',
		noframes: 'startTagNoFrames',
		'-default': 'startTagOther'
	};

	modes.afterAfterFrameset.processEOF = function() {};

	modes.afterAfterFrameset.processComment = function(data) {
		tree.insertComment(data, tree.document);
	};

	modes.afterAfterFrameset.processCharacters = function(buffer) {
		var characters = buffer.takeRemaining();
		var whitespace = "";
		for (var i = 0; i < characters.length; i++) {
			var ch = characters[i];
			if (isWhitespace(ch))
				whitespace += ch;
		}
		if (whitespace) {
			tree.reconstructActiveFormattingElements();
			tree.insertText(whitespace);
		}
		if (whitespace.length < characters.length)
			tree.parseError('expected-eof-but-got-char');
	};

	modes.afterAfterFrameset.startTagNoFrames = function(name, attributes) {
		modes.inHead.processStartTag(name, attributes);
	};

	modes.afterAfterFrameset.startTagOther = function(name, attributes, selfClosing) {
		tree.parseError('expected-eof-but-got-start-tag', {name: name});
	};

	modes.afterAfterFrameset.processEndTag = function(name, attributes) {
		tree.parseError('expected-eof-but-got-end-tag', {name: name});
	};

	modes.text = Object.create(modes.base);

	modes.text.start_tag_handlers = {
		'-default': 'startTagOther'
	};

	modes.text.end_tag_handlers = {
		script: 'endTagScript',
		'-default': 'endTagOther'
	};

	modes.text.processCharacters = function(buffer) {
		if (tree.shouldSkipLeadingNewline) {
			tree.shouldSkipLeadingNewline = false;
			buffer.skipAtMostOneLeadingNewline();
		}
		var data = buffer.takeRemaining();
		if (!data)
			return;
		tree.insertText(data);
	};

	modes.text.processEOF = function() {
		tree.parseError("expected-named-closing-tag-but-got-eof",
			{name: tree.currentStackItem().localName});
		tree.openElements.pop();
		tree.setInsertionMode(tree.originalInsertionMode);
		tree.insertionMode.processEOF();
	};

	modes.text.startTagOther = function(name) {
		throw "Tried to process start tag " + name + " in RCDATA/RAWTEXT mode";
	};

	modes.text.endTagScript = function(name) {
		var node = tree.openElements.pop();
		assert.ok(node.localName == 'script');
		tree.setInsertionMode(tree.originalInsertionMode);
	};

	modes.text.endTagOther = function(name) {
		tree.openElements.pop();
		tree.setInsertionMode(tree.originalInsertionMode);
	};
}

TreeBuilder.prototype.setInsertionMode = function(name) {
	this.insertionMode = this.insertionModes[name];
	this.insertionModeName = name;
};

/**
 * Adoption agency algorithm (http://www.whatwg.org/specs/web-apps/current-work/multipage/tree-construction.html#adoption-agency-algorithm)
 * @param {String} name A tag name subject for which the algorithm is being run
 * @return {Boolean} Returns false if the algorithm was aborted
 */
TreeBuilder.prototype.adoptionAgencyEndTag = function(name) {
	var outerIterationLimit = 8;
	var innerIterationLimit = 3;
	var formattingElement;

	function isActiveFormattingElement(el) {
		return el === formattingElement;
	}

	var outerLoopCounter = 0;

	while (outerLoopCounter++ < outerIterationLimit) {
		// 4.
		formattingElement = this.elementInActiveFormattingElements(name);

		if (!formattingElement || (this.openElements.contains(formattingElement) && !this.openElements.inScope(formattingElement.localName))) {
			this.parseError('adoption-agency-1.1', {name: name});
			return false;
		}
		if (!this.openElements.contains(formattingElement)) {
			this.parseError('adoption-agency-1.2', {name: name});
			this.removeElementFromActiveFormattingElements(formattingElement);
			return true;
		}
		if (!this.openElements.inScope(formattingElement.localName)) {
			this.parseError('adoption-agency-4.4', {name: name});
		}

		if (formattingElement != this.currentStackItem()) {
			this.parseError('adoption-agency-1.3', {name: name});
		}

		// Start of the adoption agency algorithm proper
		// todo ElementStack
		var furthestBlock = this.openElements.furthestBlockForFormattingElement(formattingElement.node);

		if (!furthestBlock) {
			this.openElements.remove_openElements_until(isActiveFormattingElement);
			this.removeElementFromActiveFormattingElements(formattingElement);
			return true;
		}

		var afeIndex = this.openElements.elements.indexOf(formattingElement);
		var commonAncestor = this.openElements.item(afeIndex - 1);

		var bookmark = this.activeFormattingElements.indexOf(formattingElement);

		var node = furthestBlock;
		var lastNode = furthestBlock;
		var index = this.openElements.elements.indexOf(node);

		var innerLoopCounter = 0;
		while (innerLoopCounter++ < innerIterationLimit) {
			index -= 1;
			node = this.openElements.item(index);
			if (this.activeFormattingElements.indexOf(node) < 0) {
				this.openElements.elements.splice(index, 1);
				continue;
			}
			if (node == formattingElement)
				break;

			if (lastNode == furthestBlock)
				bookmark = this.activeFormattingElements.indexOf(node) + 1;

			var clone = this.createElement(node.namespaceURI, node.localName, node.attributes);
			var newNode = new StackItem(node.namespaceURI, node.localName, node.attributes, clone);

			this.activeFormattingElements[this.activeFormattingElements.indexOf(node)] = newNode;
			this.openElements.elements[this.openElements.elements.indexOf(node)] = newNode;

			node = newNode;
			this.detachFromParent(lastNode.node);
			this.attachNode(lastNode.node, node.node);
			lastNode = node;
		}

		this.detachFromParent(lastNode.node);
		if (commonAncestor.isFosterParenting()) {
			this.insertIntoFosterParent(lastNode.node);
		} else {
			this.attachNode(lastNode.node, commonAncestor.node);
		}

		var clone = this.createElement("http://www.w3.org/1999/xhtml", formattingElement.localName, formattingElement.attributes);
		var formattingClone = new StackItem(formattingElement.namespaceURI, formattingElement.localName, formattingElement.attributes, clone);

		this.reparentChildren(furthestBlock.node, clone);
		this.attachNode(clone, furthestBlock.node);

		this.removeElementFromActiveFormattingElements(formattingElement);
		this.activeFormattingElements.splice(Math.min(bookmark, this.activeFormattingElements.length), 0, formattingClone);

		this.openElements.remove(formattingElement);
		this.openElements.elements.splice(this.openElements.elements.indexOf(furthestBlock) + 1, 0, formattingClone);
	}

	return true;
};

TreeBuilder.prototype.start = function() {
	throw "Not mplemented";
};

TreeBuilder.prototype.startTokenization = function(tokenizer) {
	this.tokenizer = tokenizer;
	this.compatMode = "no quirks";
	this.originalInsertionMode = "initial";
	this.framesetOk = true;
	this.openElements = new ElementStack();
	this.activeFormattingElements = [];
	this.start();
	if (this.context) {
		switch(this.context) {
		case 'title':
		case 'textarea':
			this.tokenizer.setState(Tokenizer.RCDATA);
			break;
		case 'style':
		case 'xmp':
		case 'iframe':
		case 'noembed':
		case 'noframes':
			this.tokenizer.setState(Tokenizer.RAWTEXT);
			break;
		case 'script':
			this.tokenizer.setState(Tokenizer.SCRIPT_DATA);
			break;
		case 'noscript':
			if (this.scriptingEnabled)
				this.tokenizer.setState(Tokenizer.RAWTEXT);
			break;
		case 'plaintext':
			this.tokenizer.setState(Tokenizer.PLAINTEXT);
			break;
		}
		this.insertHtmlElement();
		this.resetInsertionMode();
		// todo form pointer
	} else {
		this.setInsertionMode('initial');
	}
};

TreeBuilder.prototype.processToken = function(token) {
	this.selfClosingFlagAcknowledged = false;

	var currentNode = this.openElements.top || null;
	var insertionMode;
	if (!currentNode || !currentNode.isForeign() ||
		(currentNode.isMathMLTextIntegrationPoint() &&
			((token.type == 'StartTag' &&
					!(token.name in {mglyph:0, malignmark:0})) ||
				(token.type === 'Characters'))
		) ||
		(currentNode.namespaceURI == "http://www.w3.org/1998/Math/MathML" &&
			currentNode.localName == 'annotation-xml' &&
			token.type == 'StartTag' && token.name == 'svg'
		) ||
		(currentNode.isHtmlIntegrationPoint() &&
			token.type in {StartTag:0, Characters:0}
		) ||
		token.type == 'EOF'
	) {
		insertionMode = this.insertionMode;
	} else {
		insertionMode = this.insertionModes.inForeignContent;
	}
	switch(token.type) {
	case 'Characters':
		var buffer = new CharacterBuffer(token.data);
		insertionMode.processCharacters(buffer);
		break;
	case 'Comment':
		insertionMode.processComment(token.data);
		break;
	case 'StartTag':
		insertionMode.processStartTag(token.name, token.data, token.selfClosing);
		break;
	case 'EndTag':
		insertionMode.processEndTag(token.name);
		break;
	case 'Doctype':
		insertionMode.processDoctype(token.name, token.publicId, token.systemId, token.forceQuirks);
		break;
	case 'EOF':
		insertionMode.processEOF();
		break;
	}
};

/**
 *
 * @return {Boolean}
 */
TreeBuilder.prototype.isCdataSectionAllowed = function() {
	return this.openElements.length > 0 && this.currentStackItem().isForeign();
};

/**
 *
 * @return {Boolean}
 */
TreeBuilder.prototype.isSelfClosingFlagAcknowledged = function() {
	return this.selfClosingFlagAcknowledged;
};

TreeBuilder.prototype.createElement = function(namespaceURI, localName, attributes) {
	throw new Error("Not implemented");
};

TreeBuilder.prototype.attachNode = function(child, parent) {
	throw new Error("Not implemented");
};

TreeBuilder.prototype.attachNodeToFosterParent = function(child, table, stackParent) {
	throw new Error("Not implemented");
};

TreeBuilder.prototype.detachFromParent = function(node) {
	throw new Error("Not implemented");
};

TreeBuilder.prototype.addAttributesToElement = function(element, attributes) {
	throw new Error("Not implemented");
};

TreeBuilder.prototype.insertHtmlElement = function(attributes) {
	var root = this.createElement("http://www.w3.org/1999/xhtml", 'html', attributes);
	this.attachNode(root, this.document);
	this.openElements.pushHtmlElement(new StackItem("http://www.w3.org/1999/xhtml", 'html', attributes, root));
	return root;
};

TreeBuilder.prototype.insertHeadElement = function(attributes) {
	var element = this.createElement("http://www.w3.org/1999/xhtml", "head", attributes);
	this.head = new StackItem("http://www.w3.org/1999/xhtml", "head", attributes, element);
	this.attachNode(element, this.openElements.top.node);
	this.openElements.pushHeadElement(this.head);
	return element;
};

TreeBuilder.prototype.insertBodyElement = function(attributes) {
	var element = this.createElement("http://www.w3.org/1999/xhtml", "body", attributes);
	this.attachNode(element, this.openElements.top.node);
	this.openElements.pushBodyElement(new StackItem("http://www.w3.org/1999/xhtml", "body", attributes, element));
	return element;
};

TreeBuilder.prototype.insertIntoFosterParent = function(node) {
	var tableIndex = this.openElements.findIndex('table');
	var tableElement = this.openElements.item(tableIndex).node;
	if (tableIndex === 0)
		return this.attachNode(node, tableElement);
	this.attachNodeToFosterParent(node, tableElement, this.openElements.item(tableIndex - 1).node);
};

TreeBuilder.prototype.insertElement = function(name, attributes, namespaceURI, selfClosing) {
	if (!namespaceURI)
		namespaceURI = "http://www.w3.org/1999/xhtml";
	var element = this.createElement(namespaceURI, name, attributes);
	if (this.shouldFosterParent())
		this.insertIntoFosterParent(element);
	else
		this.attachNode(element, this.openElements.top.node);
	if (!selfClosing)
		this.openElements.push(new StackItem(namespaceURI, name, attributes, element));
};

TreeBuilder.prototype.insertFormattingElement = function(name, attributes) {
	this.insertElement(name, attributes, "http://www.w3.org/1999/xhtml");
	this.appendElementToActiveFormattingElements(this.currentStackItem());
};

TreeBuilder.prototype.insertSelfClosingElement = function(name, attributes) {
	this.selfClosingFlagAcknowledged = true;
	this.insertElement(name, attributes, "http://www.w3.org/1999/xhtml", true);
};

TreeBuilder.prototype.insertForeignElement = function(name, attributes, namespaceURI, selfClosing) {
	if (selfClosing)
		this.selfClosingFlagAcknowledged = true;
	this.insertElement(name, attributes, namespaceURI, selfClosing);
};

TreeBuilder.prototype.insertComment = function(data, parent) {
	throw new Error("Not implemented");
};

TreeBuilder.prototype.insertDoctype = function(name, publicId, systemId) {
	throw new Error("Not implemented");
};

TreeBuilder.prototype.insertText = function(data) {
	throw new Error("Not implemented");
};

/**
 * Returns topmost open element
 * @return {StackItem}
 */
TreeBuilder.prototype.currentStackItem = function() {
	return this.openElements.top;
};

/**
 * Populates current open element
 * @return {StackItem}
 */
TreeBuilder.prototype.popElement = function() {
	return this.openElements.pop();
};

/**
 * Returns true if redirect is required and current open element causes foster parenting
 * @return {Boolean}
 */
TreeBuilder.prototype.shouldFosterParent = function() {
	return this.redirectAttachToFosterParent && this.currentStackItem().isFosterParenting();
};

/**
 * Implements http://www.whatwg.org/specs/web-apps/current-work/multipage/tree-construction.html#closing-elements-that-have-implied-end-tags
 * @param {String} [exclude] Ignore specific tag name
 */
TreeBuilder.prototype.generateImpliedEndTags = function(exclude) {
	// FIXME get rid of the recursion
	var name = this.openElements.top.localName;
	if (['dd', 'dt', 'li', 'option', 'optgroup', 'p', 'rp', 'rt'].indexOf(name) != -1 && name != exclude) {
		this.popElement();
		this.generateImpliedEndTags(exclude);
	}
};

/**
 * Performs http://www.whatwg.org/specs/web-apps/current-work/multipage/parsing.html#reconstruct-the-active-formatting-elements
 */
TreeBuilder.prototype.reconstructActiveFormattingElements = function() {
	// Within this algorithm the order of steps decribed in the specification
	// is not quite the same as the order of steps in the code. It should still
	// do the same though.

	// Step 1: stop if there's nothing to do
	if (this.activeFormattingElements.length === 0)
		return;

	// Step 2 and 3: start with the last element
	var i = this.activeFormattingElements.length - 1;
	var entry = this.activeFormattingElements[i];
	if (entry == Marker || this.openElements.contains(entry))
		return;

	while (entry != Marker && !this.openElements.contains(entry)) {
		i -= 1;
		entry = this.activeFormattingElements[i];
		if (!entry)
			break;
	}

	while (true) {
		i += 1;
		entry = this.activeFormattingElements[i];
		this.insertElement(entry.localName, entry.attributes);
		var element = this.currentStackItem();
		this.activeFormattingElements[i] = element;
		if (element == this.activeFormattingElements[this.activeFormattingElements.length -1])
			break;
	}

};

/**
 *
 * @param {StackItem} item
 */
TreeBuilder.prototype.ensureNoahsArkCondition = function(item) {
	var kNoahsArkCapacity = 3;
	if (this.activeFormattingElements.length < kNoahsArkCapacity)
		return;
	var candidates = [];
	var newItemAttributeCount = item.attributes.length;
	for (var i = this.activeFormattingElements.length - 1; i >= 0; i--) {
		var candidate = this.activeFormattingElements[i];
		if (candidate === Marker)
			break;
		if (item.localName !== candidate.localName || item.namespaceURI !== candidate.namespaceURI)
			continue;
		if (candidate.attributes.length != newItemAttributeCount)
			continue;
		candidates.push(candidate);
	}
	if (candidates.length < kNoahsArkCapacity)
		return;

	var remainingCandidates = [];
	var attributes = item.attributes;
	for (var i = 0; i < attributes.length; i++) {
		var attribute = attributes[i];

		for (var j = 0; j < candidates.length; j++) {
			var candidate = candidates[j];
			var candidateAttribute = getAttribute(candidate, attribute.nodeName);
			if (candidateAttribute && candidateAttribute.nodeValue === attribute.nodeValue)
				remainingCandidates.push(candidate);
		}
		if (remainingCandidates.length < kNoahsArkCapacity)
			return;
		candidates = remainingCandidates;
		remainingCandidates = [];
	}
	// Inductively, we shouldn't spin this loop very many times. It's possible,
	// however, that we wil spin the loop more than once because of how the
	// formatting element list gets permuted.
	for (var i = kNoahsArkCapacity - 1; i < candidates.length; i++)
		this.removeElementFromActiveFormattingElements(candidates[i]);
};

/**
 *
 * @param {StackItem} item
 */
TreeBuilder.prototype.appendElementToActiveFormattingElements = function(item) {
	this.ensureNoahsArkCondition(item);
	this.activeFormattingElements.push(item);
};

/**
 *
 * @param {StackItem} item
 */
TreeBuilder.prototype.removeElementFromActiveFormattingElements = function(item) {
	var index = this.activeFormattingElements.indexOf(item);
	if (index >= 0)
		this.activeFormattingElements.splice(index, 1);
};

TreeBuilder.prototype.elementInActiveFormattingElements = function(name) {
	var els = this.activeFormattingElements;
	for (var i = els.length - 1; i >= 0; i--) {
		if (els[i] == Marker) break;
		if (els[i].localName == name) return els[i];
	}
	return false;
};

TreeBuilder.prototype.clearActiveFormattingElements = function() {
    while (!(this.activeFormattingElements.length === 0 || this.activeFormattingElements.pop() == Marker));
};

TreeBuilder.prototype.reparentChildren = function(oldParent, newParent) {
	throw new Error("Not implemented");
};

/**
 *
 * @param {String} context A context element name for fragment parsing
 */
TreeBuilder.prototype.setFragmentContext = function(context) {
	// Steps 4.2-4.6 of the HTML5 Fragment Case parsing algorithm:
	// http://www.whatwg.org/specs/web-apps/current-work/multipage/the-end.html#fragment-case
	// For efficiency, we skip step 4.2 ("Let root be a new html element with no attributes")
	// and instead use the DocumentFragment as a root node.
	//m_tree.openElements()->pushRootNode(HTMLStackItem::create(fragment, HTMLStackItem::ItemForDocumentFragmentNode));
	this.context = context;
};

/**
 *
 * @param {String} code
 * @param {Object} [args]
 */
TreeBuilder.prototype.parseError = function(code, args) {
	// FIXME: this.errors.push([this.tokenizer.position, code, data]);
	if (!this.errorHandler)
		return;
	var message = formatMessage(messages[code], args);
	this.errorHandler.error(message, this.tokenizer._inputStream.location());
};

/**
 * Resets the insertion mode (http://www.whatwg.org/specs/web-apps/current-work/multipage/parsing.html#reset-the-insertion-mode-appropriately)
 */
TreeBuilder.prototype.resetInsertionMode = function() {
	var last = false;
	var node = null;
	for (var i = this.openElements.length - 1; i >= 0; i--) {
		node = this.openElements.item(i);
		if (i === 0) {
			assert.ok(this.context);
			last = true;
			node = new StackItem("http://www.w3.org/1999/xhtml", this.context, [], null);
		}

		if (node.namespaceURI === "http://www.w3.org/1999/xhtml") {
			// TODO template tag
			if (node.localName === 'select')
				// FIXME handle inSelectInTable
				return this.setInsertionMode('inSelect');
			if (node.localName === 'td' || node.localName === 'th')
				return this.setInsertionMode('inCell');
			if (node.localName === 'tr')
				return this.setInsertionMode('inRow');
			if (node.localName === 'tbody' || node.localName === 'thead' || node.localName === 'tfoot')
				return this.setInsertionMode('inTableBody');
			if (node.localName === 'caption')
				return this.setInsertionMode('inCaption');
			if (node.localName === 'colgroup')
				return this.setInsertionMode('inColumnGroup');
			if (node.localName === 'table')
				return this.setInsertionMode('inTable');
			if (node.localName === 'head' && !last)
				return this.setInsertionMode('inHead');
			if (node.localName === 'body')
				return this.setInsertionMode('inBody');
			if (node.localName === 'frameset')
				return this.setInsertionMode('inFrameset');
			if (node.localName === 'html')
				if (!this.openElements.headElement)
					return this.setInsertionMode('beforeHead');
				else
					return this.setInsertionMode('afterHead');
		}

		if (last)
			return this.setInsertionMode('inBody');
	}
};

TreeBuilder.prototype.processGenericRCDATAStartTag = function(name, attributes) {
	this.insertElement(name, attributes);
	this.tokenizer.setState(Tokenizer.RCDATA);
	this.originalInsertionMode = this.insertionModeName;
	this.setInsertionMode('text');
};

TreeBuilder.prototype.processGenericRawTextStartTag = function(name, attributes) {
	this.insertElement(name, attributes);
	this.tokenizer.setState(Tokenizer.RAWTEXT);
	this.originalInsertionMode = this.insertionModeName;
	this.setInsertionMode('text');
};

TreeBuilder.prototype.adjustMathMLAttributes = function(attributes) {
	attributes.forEach(function(a) {
		a.namespaceURI = "http://www.w3.org/1998/Math/MathML";
		if (constants.MATHMLAttributeMap[a.nodeName])
			a.nodeName = constants.MATHMLAttributeMap[a.nodeName];
	});
	return attributes;
};

TreeBuilder.prototype.adjustSVGTagNameCase = function(name) {
	return constants.SVGTagMap[name] || name;
};

TreeBuilder.prototype.adjustSVGAttributes = function(attributes) {
	attributes.forEach(function(a) {
		a.namespaceURI = "http://www.w3.org/2000/svg";
		if (constants.SVGAttributeMap[a.nodeName])
			a.nodeName = constants.SVGAttributeMap[a.nodeName];
	});
	return attributes;
};

TreeBuilder.prototype.adjustForeignAttributes = function(attributes) {
	for (var i = 0; i < attributes.length; i++) {
		var attribute = attributes[i];
		var adjusted = constants.ForeignAttributeMap[attribute.nodeName];
		if (adjusted) {
			attribute.nodeName = adjusted.localName;
			attribute.prefix = adjusted.prefix;
			attribute.namespaceURI = adjusted.namespaceURI;
		}
	}
	return attributes;
};

function formatMessage(format, args) {
	return format.replace(new RegExp('{[0-9a-z-]+}', 'gi'), function(match) {
		return args[match.slice(1, -1)] || match;
	});
}

exports.TreeBuilder = TreeBuilder;
