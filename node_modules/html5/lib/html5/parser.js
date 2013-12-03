var HTML5 = exports.HTML5 = require('../html5');

var assert = require('assert');
var events = require('events');
var util = require('util');

require('./treebuilder');
require('./tokenizer');

var Parser = HTML5.Parser = function HTML5Parser(options) {
	var parser = this;
	events.EventEmitter.apply(this);
	this.strict = false;
	this.errors = [];
	this.framesetOk = true;
	var phase;
	var phases = this.phases = {};

	Object.defineProperty(this, 'phase', {
		set: function(p) {
			phase = p;
			if (!p) throw( new Error("Can't leave phase undefined"));
			if (!p instanceof Function) throw( new Error("Not a function"));
		},
		get: function() {
			return phase;
		}
	});

	this.newPhase = function(name) {
		this.phase = phases[name];
		HTML5.debug('parser.newPhase', name);
		this.phaseName = name;
	};

	phases.base = {
		end_tag_handlers: {"-default": 'endTagOther'},
		start_tag_handlers: {"-default": 'startTagOther'},
		parse_error: function(code, options) {
			parser.parse_error(code, options);
		},
		processEOF: function() {
			tree.generateImpliedEndTags();
			if (tree.open_elements.length > 2) {
				parser.parse_error('expected-closing-tag-but-got-eof');
			} else if (tree.open_elements.length == 2 &&
				tree.open_elements[1].tagName.toLowerCase() != 'body') {
				// This happens for framesets or something?
				parser.parse_error('expected-closing-tag-but-got-eof');
			} else if (parser.inner_html && tree.open_elements.length > 1) {
				// XXX This is not what the specification says. Not sure what to do here.
				parser.parse_error('eof-in-innerhtml');
			}
		},
		processComment: function(data) {
			// For most phases the following is correct. Where it's not it will be
			// overridden.
			tree.insert_comment(data, tree.open_elements.last());
		},
		processDoctype: function(name, publicId, systemId, correct) {
			parser.parse_error('unexpected-doctype');
		},
		processSpaceCharacters: function(data) {
			tree.insert_text(data);
		},
		processStartTag: function(name, attributes, self_closing) {
			if (this[this.start_tag_handlers[name]]) {
				this[this.start_tag_handlers[name]](name, attributes, self_closing);
			} else if (this[this.start_tag_handlers["-default"]]) {
				this[this.start_tag_handlers["-default"]](name, attributes, self_closing);
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
		inScope: function(name, scopingElements) {
			if (!scopingElements) scopingElements = HTML5.SCOPING_ELEMENTS;
			if (!tree.open_elements.length) return false;
			for(var i = tree.open_elements.length - 1; i >= 0; i--) {
				var node = tree.open_elements[i];
				if (!node.tagName) return false;
				if (node.tagName.toLowerCase() == name) return true;
				if ((node.namespace || 'html') in scopingElements &&
					scopingElements[node.namespace || 'html'].indexOf(node.tagName.toLowerCase()) >= 0) return false;
			}
			return false;
		},
		startTagHtml: function(name, attributes) {
			if (!parser.first_start_tag && name == 'html') {
				parser.parse_error('non-html-root');
			}
			// XXX Need a check here to see if the first start tag token emitted is this token. . . if it's not, invoke parse_error.
			for(var i = 0; i < attributes.length; i++) {
				if (!tree.open_elements[0].getAttribute(attributes[i].nodeName)) {
					tree.open_elements[0].setAttribute(attributes[i].nodeName, attributes[i].nodeValue);
				}
			}
			parser.first_start_tag = false;
		},
		adjust_mathml_attributes: function(attributes) {
			attributes.forEach(function(a) {
				if (HTML5.MATHMLAttributeMap[a.nodeName])
					a.nodeName = HTML5.MATHMLAttributeMap[a.nodeName];
			});
			return attributes;
		},
		adjust_svg_tag_names: function(name) {
			return HTML5.SVGTagMap[name] || name;
		},
		adjust_svg_attributes: function(attributes) {
			attributes.forEach(function(a) {
				if (HTML5.SVGAttributeMap[a.nodeName])
					a.nodeName = HTML5.SVGAttributeMap[a.nodeName];
			});
			return attributes;
		},
		adjust_foreign_attributes: function (attributes) {
			for(var i = 0; i < attributes.length; i++) {
				if (attributes[i].nodeName.indexOf(':') != -1) {
					var t = attributes[i].nodeName.split(':');
					attributes[i].namespace = t[0];
					attributes[i].nodeName = t[1];
				}
			}
			return attributes;
		}
	};

	phases.initial = Object.create(phases.base);

	phases.initial.processEOF = function() {
		parser.parse_error("expected-doctype-but-got-eof");
		this.anythingElse();
		phase.processEOF();
	};

	phases.initial.processComment = function(data) {
		tree.insert_comment(data, tree.document);
	};

	phases.initial.processDoctype = function(name, publicId, systemId, correct) {
		tree.insert_doctype(name || '', publicId || '', systemId || '');

		if (!correct || name != 'html' || (publicId != null && ([
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
			parser.compatMode = "quirks";
			parser.parse_error("quirky-doctype");
		} else if (publicId != null && ([
				"-//w3c//dtd xhtml 1.0 transitional//",
				"-//w3c//dtd xhtml 1.0 frameset//"
			].some(publicIdStartsWith)
			|| (systemId != null && [
				"-//w3c//dtd html 4.01 transitional//",
				"-//w3c//dtd html 4.01 frameset//"
			].indexOf(publicId.toLowerCase()) > -1))
		) {
			parser.compatMode = "limited quirks";
			parser.parse_error("almost-standards-doctype");
		} else {
			if ((publicId == "-//W3C//DTD HTML 4.0//EN" && (systemId == null || systemId == "http://www.w3.org/TR/REC-html40/strict.dtd"))
				|| (publicId == "-//W3C//DTD HTML 4.01//EN" && (systemId == null || systemId == "http://www.w3.org/TR/html4/strict.dtd"))
				|| (publicId == "-//W3C//DTD XHTML 1.0 Strict//EN" && (systemId == "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"))
				|| (publicId == "-//W3C//DTD XHTML 1.1//EN" && (systemId == "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd"))
			) {
				// warning
				parser.parse_error("obsolete-doctype", null, true);
			} else if (!((systemId == null || systemId == "about:legacy-compat") && publicId == null)) {
				parser.parse_error("unknown-doctype");
			}
		}
		parser.newPhase('beforeHTML');
		function publicIdStartsWith(string) {
			return publicId.toLowerCase().indexOf(string) == 0;
		}
	};

	phases.initial.processSpaceCharacters = function(data) {
	};

	phases.initial.processCharacters = function(data) {
		parser.parse_error('expected-doctype-but-got-chars');
		this.anythingElse();
		phase.processCharacters(data);
	};

	phases.initial.processStartTag = function(name, attributes, self_closing) {
		parser.parse_error('expected-doctype-but-got-start-tag', {name: name});
		this.anythingElse();
		phase.processStartTag(name, attributes, self_closing);
	};

	phases.initial.processEndTag = function(name) {
		parser.parse_error('expected-doctype-but-got-end-tag', {name: name});
		this.anythingElse();
		phase.processEndTag(name);
	};

	phases.initial.anythingElse = function() {
		parser.compatMode = 'quirks';
		parser.newPhase('beforeHTML');
	};

	phases.afterAfterBody = Object.create(phases.base);

	phases.afterAfterBody.start_tag_handlers = {
		html: 'startTagHtml',
		'-default': 'startTagOther'
	};

	phases.afterAfterBody.processComment = function(data) {
		tree.insert_comment(data, tree.document);
	};

	phases.afterAfterBody.processDoctype = function(data) {
		phases.inBody.processDoctype(data);
	};

	phases.afterAfterBody.processSpaceCharacters = function(data) {
		phases.inBody.processSpaceCharacters(data);
	};

	phases.afterAfterBody.startTagHtml = function(data, attributes) {
		phases.inBody.startTagHtml(data, attributes);
	};

	phases.afterAfterBody.startTagOther = function(name, attributes, self_closing) {
		parser.parse_error('unexpected-start-tag', {name: name});
		parser.newPhase('inBody');
		phase.processStartTag(name, attributes, self_closing);
	};

	phases.afterAfterBody.endTagOther = function(name) {
		parser.parse_error('unexpected-end-tag', {name: name});
		parser.newPhase('inBody');
		phase.processEndTag(name);
	};

	phases.afterAfterBody.processCharacters = function(data) {
		parser.parse_error('unexpected-char-after-body');
		parser.newPhase('inBody');
		phase.processCharacters(data);
	};

	phases.afterBody = Object.create(phases.base);
	
	phases.afterBody.end_tag_handlers = {
		html: 'endTagHtml',
		'-default': 'endTagOther'
	};

	phases.afterBody.processComment = function(data) {
		// This is needed because data is to be appended to the html element here
		// and not to whatever is currently open.
		tree.insert_comment(data, tree.open_elements[0]);
	};

	phases.afterBody.processCharacters = function(data) {
		parser.parse_error('unexpected-char-after-body');
		parser.newPhase('inBody');
		phase.processCharacters(data);
	};

	phases.afterBody.processStartTag = function(name, attributes, self_closing) {
		parser.parse_error('unexpected-start-tag-after-body', {name: name});
		parser.newPhase('inBody');
		phase.processStartTag(name, attributes, self_closing);
	};

	phases.afterBody.endTagHtml = function(name) {
		if (parser.inner_html) {
			parser.parse_error('end-html-in-innerhtml');
		} else {
			// XXX This may need to be done, not sure
			// Don't set last_phase to the current phase but to the inBody phase
			// instead. No need for extra parse_errors if there's something after
			// </html>.
			// Try <!doctype html>X</html>X for instance
			parser.last_phase = parser.phase;
			parser.newPhase('afterAfterBody');
		}
	};

	phases.afterBody.endTagOther = function(name) {
		parser.parse_error('unexpected-end-tag-after-body', {name: name});
		parser.newPhase('inBody');
		phase.processEndTag(name);
	};

	phases.afterFrameset = Object.create(phases.base);

	phases.afterFrameset.start_tag_handlers = {
		html: 'startTagHtml',
		noframes: 'startTagNoframes',
		'-default': 'startTagOther'
	};

	phases.afterFrameset.end_tag_handlers = {
		html: 'endTagHtml',
		'-default': 'endTagOther'
	};

	phases.afterFrameset.processCharacters = function(data) {
		parser.parse_error("unexpected-char-after-frameset");
	};

	phases.afterFrameset.startTagNoframes = function(name, attributes) {
		phases.inHead.processStartTag(name, attributes);
	};

	phases.afterFrameset.startTagOther = function(name, attributes) {
		parser.parse_error("unexpected-start-tag-after-frameset", {name: name});
	};

	phases.afterFrameset.endTagHtml = function(name) {
		parser.newPhase('afterAfterFrameset');
	};

	phases.afterFrameset.endTagOther = function(name) {
		parser.parse_error("unexpected-end-tag-after-frameset", {name: name});
	};

	phases.afterHead = Object.create(phases.base);

	phases.afterHead.start_tag_handlers = {
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

	phases.afterHead.end_tag_handlers = {
		body: 'endTagBodyHtmlBr',
		html: 'endTagBodyHtmlBr',
		br: 'endTagBodyHtmlBr',
		"-default": 'endTagOther'
	};

	phases.afterHead.processEOF = function() {
		this.anything_else();
		phase.processEOF();
	};

	phases.afterHead.processCharacters = function(data) {
		this.anything_else();
		phase.processCharacters(data);
	};

	phases.afterHead.startTagHtml = function(name, attributes) {
		phases.inBody.processStartTag(name, attributes);
	}

	phases.afterHead.startTagBody = function(name, attributes) {
		parser.framesetOk = false;
		tree.insert_element(name, attributes);
		parser.newPhase('inBody');
	};

	phases.afterHead.startTagFrameset = function(name, attributes) {
		tree.insert_element(name, attributes);
		parser.newPhase('inFrameset');
	};

	phases.afterHead.startTagFromHead = function(name, attributes, self_closing) {
		parser.parse_error("unexpected-start-tag-out-of-my-head", {name: name});
		tree.open_elements.push(tree.head_pointer);
		phases.inHead.processStartTag(name, attributes, self_closing);
		tree.open_elements.splice(tree.open_elements.indexOf(tree.head_pointer), 1);
	};

	phases.afterHead.startTagHead = function(name, attributes, self_closing) {
		parser.parse_error('unexpected-start-tag', {name: name});
	};

	phases.afterHead.startTagOther = function(name, attributes, self_closing) {
		this.anything_else();
		phase.processStartTag(name, attributes, self_closing);
	};

	phases.afterHead.endTagBodyHtmlBr = function(name) {
		this.anything_else();
		phase.processEndTag(name);
	};

	phases.afterHead.endTagOther = function(name) {
		parser.parse_error('unexpected-end-tag', {name: name});
	};

	phases.afterHead.anything_else = function() {
		tree.insert_element('body', {});
		parser.newPhase('inBody');
		parser.framesetOk = true;
	};

	phases.beforeHead = Object.create(phases.base);

	phases.beforeHead.start_tag_handlers = {
		html: 'startTagHtml',
		head: 'startTagHead',
		'-default': 'startTagOther'
	};

	phases.beforeHead.end_tag_handlers = {
		html: 'endTagImplyHead',
		head: 'endTagImplyHead',
		body: 'endTagImplyHead',
		br: 'endTagImplyHead',
		'-default': 'endTagOther'
	};

	phases.beforeHead.processEOF = function() {
		this.startTagHead('head', {});
		phase.processEOF();
	};

	phases.beforeHead.processCharacters = function(data) {
		this.startTagHead('head', {});
		phase.processCharacters(data);
	};

	phases.beforeHead.processSpaceCharacters = function(data) {
	};

	phases.beforeHead.startTagHead = function(name, attributes) {
		tree.insert_element(name, attributes);
		tree.head_pointer = tree.open_elements.last();
		parser.newPhase('inHead');
	};

	phases.beforeHead.startTagOther = function(name, attributes, self_closing) {
		this.startTagHead('head', {});
		phase.processStartTag(name, attributes, self_closing);
	};

	phases.beforeHead.endTagImplyHead = function(name) {
		this.startTagHead('head', {});
		phase.processEndTag(name);
	};

	phases.beforeHead.endTagOther = function(name) {
		parser.parse_error('end-tag-after-implied-root', {name: name});
	};

	phases.beforeHTML = Object.create(phases.base);

	phases.beforeHTML.processEOF = function() {
		this.insert_html_element();
		phase.processEOF();
	};

	phases.beforeHTML.processComment = function(data) {
		tree.insert_comment(data, tree.document);
	};

	phases.beforeHTML.processSpaceCharacters = function(data) {
	};

	phases.beforeHTML.processCharacters = function(data) {
		this.insert_html_element();
		phase.processCharacters(data);
	};

	phases.beforeHTML.processStartTag = function(name, attributes, self_closing) {
		if (name == 'html') parser.first_start_tag = true;
		this.insert_html_element();
		phase.processStartTag(name, attributes, self_closing);
	};

	phases.beforeHTML.processEndTag = function(name) {
		this.insert_html_element();
		phase.processEndTag(name);
	};

	phases.beforeHTML.insert_html_element = function() {
		tree.insert_root('html');
		parser.newPhase('beforeHead');
	};


	phases.inCaption = Object.create(phases.base);

	phases.inCaption.start_tag_handlers = {
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

	phases.inCaption.end_tag_handlers = {
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

	phases.inCaption.ignoreEndTagCaption = function() {
		return !this.inScope('caption', HTML5.TABLE_SCOPING_ELEMENTS);
	};

	phases.inCaption.processCharacters = function(data) {
		phases.inBody.processCharacters(data);
	};

	phases.inCaption.startTagTableElement = function(name, attributes) {
		parser.parse_error('unexpected-end-tag', {name: name});
		var ignoreEndTag = this.ignoreEndTagCaption();
		phase.processEndTag('caption');
		if (!ignoreEndTag) phase.processStartTag(name, attributes);
	};

	phases.inCaption.startTagOther = function(name, attributes, self_closing) {
		phases.inBody.processStartTag(name, attributes, self_closing);
	};

	phases.inCaption.endTagCaption = function(name) {
		if (this.ignoreEndTagCaption()) {
			// inner_html case
			assert.ok(parser.inner_html);
			parser.parse_error('unexpected-end-tag', {name: name});
		} else {
			// AT this code is quite similar to endTagTable in inTable
			tree.generateImpliedEndTags();
			if (tree.open_elements.last().tagName.toLowerCase() != 'caption') {
				// @todo this is confusing for implied end tag
				parser.parse_error('expected-one-end-tag-but-got-another', {
					gotName: "caption",
					expectedName: tree.open_elements.last().tagName.toLowerCase()
				});
			}

			tree.remove_open_elements_until('caption');
		
			tree.clearActiveFormattingElements();

			parser.newPhase('inTable');
		}
	};

	phases.inCaption.endTagTable = function(name) {
		parser.parse_error("unexpected-end-table-in-caption");
		var ignoreEndTag = this.ignoreEndTagCaption();
		phase.processEndTag('caption');
		if (!ignoreEndTag) phase.processEndTag(name);
	};

	phases.inCaption.endTagIgnore = function(name) {
		parser.parse_error('unexpected-end-tag', {name: name});
	};

	phases.inCaption.endTagOther = function(name) {
		phases.inBody.processEndTag(name);
	};


	phases.inCell = Object.create(phases.base);

	phases.inCell.start_tag_handlers = {
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

	phases.inCell.end_tag_handlers = {
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

	phases.inCell.processCharacters = function(data) {
		phases.inBody.processCharacters(data);
	};

	phases.inCell.startTagTableOther = function(name, attributes, self_closing) {
		if (this.inScope('td', HTML5.TABLE_SCOPING_ELEMENTS) || this.inScope('th', HTML5.TABLE_SCOPING_ELEMENTS)) {
			this.closeCell();
			phase.processStartTag(name, attributes, self_closing);
		} else {
			// inner_html case
			parser.parse_error();
		}
	};

	phases.inCell.startTagOther = function(name, attributes, self_closing) {
		phases.inBody.processStartTag(name, attributes, self_closing);
	};

	phases.inCell.endTagTableCell = function(name) {
		if (this.inScope(name, HTML5.TABLE_SCOPING_ELEMENTS)) {
			tree.generateImpliedEndTags(name);
			if (tree.open_elements.last().tagName.toLowerCase() != name.toLowerCase()) {
				parser.parse_error('unexpected-cell-end-tag', {name: name});
				tree.remove_open_elements_until(name);
			} else {
				tree.pop_element();
			}
			tree.clearActiveFormattingElements();
			parser.newPhase('inRow');
		} else {
			parser.parse_error('unexpected-end-tag', {name: name});
		}
	};

	phases.inCell.endTagIgnore = function(name) {
		parser.parse_error('unexpected-end-tag', {name: name});
	};

	phases.inCell.endTagImply = function(name) {
		if (this.inScope(name, HTML5.TABLE_SCOPING_ELEMENTS)) {
			this.closeCell();
			phase.processEndTag(name);
		} else {
			// sometimes inner_html case
			parser.parse_error();
		}
	};

	phases.inCell.endTagOther = function(name) {
		phases.inBody.processEndTag(name);
	};

	phases.inCell.closeCell = function() {
		if (this.inScope('td', HTML5.TABLE_SCOPING_ELEMENTS)) {
			this.endTagTableCell('td');
		} else if (this.inScope('th', HTML5.TABLE_SCOPING_ELEMENTS)) {
			this.endTagTableCell('th');
		}
	};


	phases.inColumnGroup = Object.create(phases.base);

	phases.inColumnGroup.start_tag_handlers = {
		html: 'startTagHtml',
		col: 'startTagCol',
		'-default': 'startTagOther'
	};

	phases.inColumnGroup.end_tag_handlers = {
		colgroup: 'endTagColgroup',
		col: 'endTagCol',
		'-default': 'endTagOther'
	};

	phases.inColumnGroup.ignoreEndTagColgroup = function() {
		return tree.open_elements.last().tagName.toLowerCase() == 'html';
	};

	phases.inColumnGroup.processCharacters = function(data) {
		var ignoreEndTag = this.ignoreEndTagColgroup();
		this.endTagColgroup('colgroup');
		if (!ignoreEndTag) phase.processCharacters(data);
	};

	phases.inColumnGroup.startTagCol = function(name, attributes) {
		tree.insert_element(name, attributes);
		tree.pop_element();
	};

	phases.inColumnGroup.startTagOther = function(name, attributes, self_closing) {
		var ignoreEndTag = this.ignoreEndTagColgroup();
		this.endTagColgroup('colgroup');
		if (!ignoreEndTag) phase.processStartTag(name, attributes, self_closing);
	};

	phases.inColumnGroup.endTagColgroup = function(name) {
		if (this.ignoreEndTagColgroup()) {
			// inner_html case
			assert.ok(parser.inner_html);
			parser.parse_error();
		} else {
			tree.pop_element();
			parser.newPhase('inTable');
		}
	};

	phases.inColumnGroup.endTagCol = function(name) {
		parser.parse_error("no-end-tag", {name: 'col'});
	};

	phases.inColumnGroup.endTagOther = function(name) {
		var ignoreEndTag = this.ignoreEndTagColgroup();
		this.endTagColgroup('colgroup');
		if (!ignoreEndTag) phase.processEndTag(name) ;
	};

	phases.inForeignContent = Object.create(phases.base);

	phases.inForeignContent.processStartTag = function(name, attributes, self_closing) {
		var currentNode = tree.open_elements.last();
		if (['b', 'big', 'blockquote', 'body', 'br', 'center', 'code', 'dd', 'div', 'dl', 'dt', 'em', 'embed', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'hr', 'i', 'img', 'li', 'listing', 'menu', 'meta', 'nobr', 'ol', 'p', 'pre', 'ruby', 's', 'small', 'span', 'strong', 'strike', 'sub', 'sup', 'table', 'tt', 'u', 'ul', 'var'].indexOf(name) != -1
				|| (name == 'font' && attributes.some(function(attr){ return ['color', 'face', 'size'].indexOf(attr.nodeName) >= 0 }))) {
			parser.parse_error('unexpected-html-element-in-foreign-content', {name: name});
			while (tree.open_elements.last().namespace
					&& !parser.is_html_integration_point(tree.open_elements.last())
					&& !parser.is_mathml_text_integration_point(tree.open_elements.last())) {
				tree.open_elements.pop();
			}
			parser.phase.processStartTag(name, attributes, self_closing);
		} else {
			if (tree.open_elements.last().namespace == 'math') {
				attributes = this.adjust_mathml_attributes(attributes);
			}
			if (tree.open_elements.last().namespace == 'svg') {
				name = this.adjust_svg_tag_names(name);
				attributes = this.adjust_svg_attributes(attributes);
			}
			attributes = this.adjust_foreign_attributes(attributes);
			tree.insert_foreign_element(name, attributes, tree.open_elements.last().namespace);
			if (self_closing) tree.open_elements.pop();
		}
	};

	phases.inForeignContent.processEndTag = function(name) {
		var node = tree.open_elements.last();
		var index = tree.open_elements.length - 1;
		if (node.tagName.toLowerCase() != name)
			parser.parse_error("unexpected-end-tag", {name: name});

		while (true) {
			if (index == 0)
				break;
			if (node.tagName.toLowerCase() == name) {
				while (tree.open_elements.pop() != node);
				break;
			}
			index -= 1;
			node = tree.open_elements[index];
			if (node.namespace) {
				continue;
			} else {
				parser.phase.processEndTag(name);
				break;
			}
		}
	};

	phases.inForeignContent.processCharacters = function(characters) {
		characters = characters.replace(/\u0000/g, function(match, index){
			// @todo position
			parser.parse_error('invalid-codepoint');
			return '\uFFFD';
		});
		if (parser.framesetOk && new RegExp('[^' + '\uFFFD' + HTML5.SPACE_CHARACTERS_IN + ']').test(characters))
			parser.framesetOk = false;
		tree.insert_text(characters);
	};

	phases.inFrameset = Object.create(phases.base);

	phases.inFrameset.start_tag_handlers = {
		html: 'startTagHtml',
		frameset: 'startTagFrameset',
		frame: 'startTagFrame',
		noframes: 'startTagNoframes',
		"-default": 'startTagOther'
	};

	phases.inFrameset.end_tag_handlers = {
		frameset: 'endTagFrameset',
		noframes: 'endTagNoframes',
		'-default': 'endTagOther'
	};

	phases.inFrameset.processCharacters = function(data) {
		parser.parse_error("unexpected-char-in-frameset");
	};

	phases.inFrameset.startTagFrameset = function(name, attributes) {
		tree.insert_element(name, attributes);
	};

	phases.inFrameset.startTagFrame = function(name, attributes) {
		tree.insert_element(name, attributes);
		tree.pop_element();
	};

	phases.inFrameset.startTagNoframes = function(name, attributes) {
		phases.inBody.processStartTag(name, attributes);
	};

	phases.inFrameset.startTagOther = function(name, attributes) {
		parser.parse_error("unexpected-start-tag-in-frameset", {name: name});
	};

	phases.inFrameset.endTagFrameset = function(name, attributes) {
		if (tree.open_elements.last().tagName.toLowerCase() == 'html') {
			// inner_html case
			parser.parse_error("unexpected-frameset-in-frameset-innerhtml");
		} else {
			tree.pop_element();
		}

		if (!parser.inner_html && tree.open_elements.last().tagName.toLowerCase() != 'frameset') {
			// If we're not in inner_html mode an the current node is not a "frameset" element (anymore) then switch
			parser.newPhase('afterFrameset');
		}
	};

	phases.inFrameset.endTagNoframes = function(name) {
		phases.inBody.processEndTag(name);
	};

	phases.inFrameset.endTagOther = function(name) {
		parser.parse_error("unexpected-end-tag-in-frameset", {name: name});
	};


	phases.inHead = Object.create(phases.base);

	phases.inHead.start_tag_handlers = {
		html: 'startTagHtml',
		head: 'startTagHead',
		title: 'startTagTitle',
		script: 'startTagScript',
		style: 'startTagNoScriptNoFramesStyle',
		noscript: 'startTagNoScriptNoFramesStyle',
		noframes: 'startTagNoScriptNoFramesStyle',
		base: 'startTagBaseLinkCommand',
		basefont: 'startTagBaseLinkCommand',
		bgsound: 'startTagBaseLinkCommand',
		command: 'startTagBaseLinkCommand',
		link: 'startTagBaseLinkCommand',
		meta: 'startTagMeta',
		"-default": 'startTagOther'
	};

	phases.inHead.end_tag_handlers = {
		head: 'endTagHead',
		html: 'endTagHtmlBodyBr',
		body: 'endTagHtmlBodyBr',
		br: 'endTagHtmlBodyBr',
		"-default": 'endTagOther'
	};

	phases.inHead.processEOF = function() {
		var name = tree.open_elements.last().tagName.toLowerCase();
		if (['title', 'style', 'script'].indexOf(name) != -1) {
			parser.parse_error("expected-named-closing-tag-but-got-eof", {name: name});
			tree.pop_element();
		}

		this.anything_else();

		phase.processEOF();
	};

	phases.inHead.processCharacters = function(data) {
		var name = tree.open_elements.last().tagName.toLowerCase();
		HTML5.debug('parser.inHead.processCharacters', data);
		if (['title', 'style', 'script', 'noscript'].indexOf(name) != -1) {
			tree.insert_text(data);
		} else {
			this.anything_else();
			phase.processCharacters(data);
		}
	};

	phases.inHead.startTagHtml = function(name, attributes) {
		phases.inBody.processStartTag(name, attributes);
	};

	phases.inHead.startTagHead = function(name, attributes) {
		parser.parse_error('two-heads-are-not-better-than-one');
	};

	phases.inHead.startTagTitle = function(name, attributes) {
		parser.parseRCDataRawText("RCDATA", name, attributes);
	};

	phases.inHead.startTagNoScriptNoFramesStyle = function(name, attributes) {
		// XXX Need to decide whether to implement the scripting disabled case
		parser.parseRCDataRawText("RAWTEXT", name, attributes);
	};

	phases.inHead.startTagScript = function(name, attributes) {
		tree.insert_element(name, attributes);
		parser.tokenizer.state = parser.tokenizer.script_data_state;
		parser.original_phase = parser.phaseName;
		parser.newPhase('text');
	};

	phases.inHead.startTagBaseLinkCommand = function(name, attributes) {
		tree.insert_element(name, attributes);
		tree.open_elements.pop();
	};

	phases.inHead.startTagMeta = function(name, attributes) {
		tree.insert_element(name, attributes);
		tree.open_elements.pop();
		// @todo process charset attributes
	};

	phases.inHead.startTagOther = function(name, attributes, self_closing) {
		this.anything_else();
		phase.processStartTag(name, attributes, self_closing);
	};

	phases.inHead.endTagHead = function(name) {
		if (tree.open_elements[tree.open_elements.length - 1].tagName.toLowerCase() == 'head') {
			tree.pop_element();
		} else {
			parser.parse_error('unexpected-end-tag', {name: 'head'});
		}
		parser.newPhase('afterHead');
	};

	phases.inHead.endTagHtmlBodyBr = function(name) {
		this.anything_else();
		phase.processEndTag(name);
	};

	phases.inHead.endTagOther = function(name) {
		parser.parse_error('unexpected-end-tag', {name: name});
	};

	phases.inHead.anything_else = function() {
		this.endTagHead('head');
	};

	phases.inTable = Object.create(phases.base);

	phases.inTable.start_tag_handlers = {
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

	phases.inTable.end_tag_handlers = {
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

	phases.inTable.processSpaceCharacters =  function(data) {
		var currentNode = tree.open_elements.last();
		if (['table', 'tbody', 'tfoot', 'thead', 'tr'].indexOf(currentNode.tagName.toLowerCase()) > -1) {
			var original_phase = parser.phaseName;
			parser.newPhase('inTableText');
			phase.original_phase = original_phase;
			phase.processSpaceCharacters(data);
		} else {
			tree.insert_from_table = true;
			phases.inBody.processSpaceCharacters(data);
			tree.insert_from_table = false;
		}
	};

	phases.inTable.processCharacters =  function(data) {
		var currentNode = tree.open_elements.last();
		if (['table', 'tbody', 'tfoot', 'thead', 'tr'].indexOf(currentNode.tagName.toLowerCase()) > -1) {
			var original_phase = parser.phaseName;
			parser.newPhase('inTableText');
			phase.original_phase = original_phase;
			phase.processCharacters(data);
		} else {
			tree.insert_from_table = true;
			phases.inBody.processCharacters(data);
			tree.insert_from_table = false;
		}
	};

	phases.inTable.startTagCaption = function(name, attributes) {
		this.clearStackToTableContext();
		tree.activeFormattingElements.push(HTML5.Marker);
		tree.insert_element(name, attributes);
		parser.newPhase('inCaption');
	};

	phases.inTable.startTagColgroup = function(name, attributes) {
		this.clearStackToTableContext();
		tree.insert_element(name, attributes);
		parser.newPhase('inColumnGroup');
	};

	phases.inTable.startTagCol = function(name, attributes) {
		this.startTagColgroup('colgroup', {});
		phase.processStartTag(name, attributes);
	};

	phases.inTable.startTagRowGroup = function(name, attributes) {
		this.clearStackToTableContext();
		tree.insert_element(name, attributes);
		parser.newPhase('inTableBody');
	};

	phases.inTable.startTagImplyTbody = function(name, attributes) {
		this.startTagRowGroup('tbody', {});
		phase.processStartTag(name, attributes);
	};

	phases.inTable.startTagTable = function(name, attributes) {
		parser.parse_error("unexpected-start-tag-implies-end-tag",
				{startName: "table", endName: "table"});
		phase.processEndTag('table');
		if (!parser.inner_html) phase.processStartTag(name, attributes);
	};

	phases.inTable.startTagStyleScript = function(name, attributes) {
		phases.inHead.processStartTag(name, attributes);
	};

	phases.inTable.startTagInput = function(name, attributes) {
		for (var key in attributes) {
			if (attributes[key].nodeName.toLowerCase() == 'type') {
				if (attributes[key].nodeValue.toLowerCase() == 'hidden') {
					parser.parse_error("unexpected-hidden-input-in-table");
					tree.insert_element(name, attributes);
					// XXX associate with form
					tree.open_elements.pop();
					return;
				}
				break;
			}
		}
		this.startTagOther(name, attributes);
	};

	phases.inTable.startTagForm = function(name, attributes) {
		parser.parse_error("unexpected-form-in-table");
		if (!tree.formPointer) {
			tree.insert_element(name, attributes);
			tree.formPointer = tree.open_elements.last();
			tree.open_elements.pop();
		}
	};

	phases.inTable.startTagOther = function(name, attributes, self_closing) {
		this.parse_error("unexpected-start-tag-implies-table-voodoo", {name: name});
		tree.insert_from_table = true;
		phases.inBody.processStartTag(name, attributes, self_closing);
		tree.insert_from_table = false;
	};

	phases.inTable.endTagTable = function(name) {
		if (this.inScope(name, HTML5.TABLE_SCOPING_ELEMENTS)) {
			tree.generateImpliedEndTags();
			if (tree.open_elements.last().tagName.toLowerCase() != name) {
				parser.parse_error("end-tag-too-early-named", {gotName: 'table', expectedName: tree.open_elements.last().tagName.toLowerCase()});
			}

			tree.remove_open_elements_until('table');
			parser.reset_insertion_mode();
		} else {
			assert.ok(parser.inner_html);
			parser.parse_error();
		}
	};

	phases.inTable.endTagIgnore = function(name) {
		parser.parse_error("unexpected-end-tag", {name: name});
	};

	phases.inTable.endTagOther = function(name) {
		parser.parse_error("unexpected-end-tag-implies-table-voodoo", {name: name});
		// Make all the special element rearranging voodoo kick in
		tree.insert_from_table = true;
		// Process the end tag in the "in body" mode
		phases.inBody.processEndTag(name);
		tree.insert_from_table = false;
	};

	phases.inTable.clearStackToTableContext = function() {
		var name = tree.open_elements.last().tagName.toLowerCase();
		while (name != 'table' && name != 'html') {
			parser.parse_error("unexpected-implied-end-tag-in-table", {name: name});
			tree.pop_element();
			name = tree.open_elements.last().tagName.toLowerCase();
		}
		// When the current node is <html> it's an inner_html case
	};

	phases.inTable.inserText = function(data) {
		tree.insert_from_table = true;
		phases.inBody.processCharacters(data);
		tree.insert_from_table = false;
	}

	phases.inTableText = Object.create(phases.base);
	phases.inTableText.original_phase = null;
	phases.inTableText.character_tokens = [];

	phases.inTableText.flushCharacters = function() {
		var data = this.character_tokens.join('');
		if (new RegExp('[^' + HTML5.SPACE_CHARACTERS_IN + ']').test(data))
			phases.inTable.inserText(data);
		else if (data)
			tree.insert_text(data);
		this.character_tokens = [];
	};

	phases.inTableText.processComment = function(data) {
		this.flushCharacters();
		parser.newPhase(this.original_phase);
		phase.processComment(data);
	};

	phases.inTableText.processEOF = function(data) {
		this.flushCharacters();
		parser.newPhase(this.original_phase);
		phase.processEOF();
	};

	phases.inTableText.processCharacters = function(data) {
		data = data.replace(/\u0000/g, function(match, index){
			// @todo position
			parser.parse_error("invalid-codepoint");
			return '';
		});
		if (!data)
			return;
		this.character_tokens.push(data);
	}

	phases.inTableText.processSpaceCharacters = function(data) {
		// pretty sure we should never reach here
		this.character_tokens.push(data);
	};

	phases.inTableText.processStartTag = function(name, attributes, self_closing) {
		this.flushCharacters();
		parser.newPhase(this.original_phase);
		phase.processStartTag(name, attributes, self_closing);
	};

	phases.inTableText.processEndTag = function(name, attributes) {
		this.flushCharacters();
		parser.newPhase(this.original_phase);
		phase.processEndTag(name, attributes);
	};

	phases.inTableBody = Object.create(phases.base);

	phases.inTableBody.start_tag_handlers = {
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

	phases.inTableBody.end_tag_handlers = {
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

	phases.inTableBody.processSpaceCharacters = function(data) {
		phases.inTable.processSpaceCharacters(data);
	};

	phases.inTableBody.processCharacters = function(data) {
		phases.inTable.processCharacters(data);
	};

	phases.inTableBody.startTagTr = function(name, attributes) {
		this.clearStackToTableBodyContext();
		tree.insert_element(name, attributes);
		parser.newPhase('inRow');
	};

	phases.inTableBody.startTagTableCell = function(name, attributes) {
		parser.parse_error("unexpected-cell-in-table-body", {name: name});
		this.startTagTr('tr', {});
		phase.processStartTag(name, attributes);
	};

	phases.inTableBody.startTagTableOther = function(name, attributes) {
		// XXX any ideas on how to share this with endTagTable
		if (this.inScope('tbody', HTML5.TABLE_SCOPING_ELEMENTS) ||  this.inScope('thead', HTML5.TABLE_SCOPING_ELEMENTS) || this.inScope('tfoot', HTML5.TABLE_SCOPING_ELEMENTS)) {
			this.clearStackToTableBodyContext();
			this.endTagTableRowGroup(tree.open_elements.last().tagName.toLowerCase());
			phase.processStartTag(name, attributes);
		} else {
			// inner_html case
			parser.parse_error();
		}
	};
	
	phases.inTableBody.startTagOther = function(name, attributes) {
		phases.inTable.processStartTag(name, attributes);
	};

	phases.inTableBody.endTagTableRowGroup = function(name) {
		if (this.inScope(name, HTML5.TABLE_SCOPING_ELEMENTS)) {
			this.clearStackToTableBodyContext();
			tree.pop_element();
			parser.newPhase('inTable');
		} else {
			parser.parse_error('unexpected-end-tag-in-table-body', {name: name});
		}
	};

	phases.inTableBody.endTagTable = function(name) {
		if (this.inScope('tbody', HTML5.TABLE_SCOPING_ELEMENTS) || this.inScope('thead', HTML5.TABLE_SCOPING_ELEMENTS) || this.inScope('tfoot', HTML5.TABLE_SCOPING_ELEMENTS)) {
			this.clearStackToTableBodyContext();
			this.endTagTableRowGroup(tree.open_elements.last().tagName.toLowerCase());
			phase.processEndTag(name);
		} else {
			// inner_html case
			this.parse_error();
		}
	};

	phases.inTableBody.endTagIgnore = function(name) {
		parser.parse_error("unexpected-end-tag-in-table-body", {name: name});
	};

	phases.inTableBody.endTagOther = function(name) {
		phases.inTable.processEndTag(name);
	};

	phases.inTableBody.clearStackToTableBodyContext = function() {
		var name = tree.open_elements.last().tagName.toLowerCase();
		while(name != 'tbody' && name != 'tfoot' && name != 'thead' && name != 'html') {
			parser.parse_error("unexpected-implied-end-tag-in-table", {name: name});
			tree.pop_element();
			name = tree.open_elements.last().tagName.toLowerCase();
		}
	};

	phases.inSelect = Object.create(phases.base);

	phases.inSelect.start_tag_handlers = {
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

	phases.inSelect.end_tag_handlers = {
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
	
	phases.inSelect.processCharacters = function(data) {
		data = data.replace(/\u0000/g, function(match, index){
			// @todo position
			parser.parse_error("illegal-codepoint");
			return '';
		});
		if (!data)
			return;
		tree.insert_text(data);
	};

	phases.inSelect.startTagOption = function(name, attributes) {
		// we need to imply </option> if <option> is the current node
		if (tree.open_elements.last().tagName.toLowerCase() == 'option') tree.pop_element();
		tree.insert_element(name, attributes);
	};

	phases.inSelect.startTagOptgroup = function(name, attributes) {
		if (tree.open_elements.last().tagName.toLowerCase() == 'option') tree.pop_element();
		if (tree.open_elements.last().tagName.toLowerCase() == 'optgroup') tree.pop_element();
		tree.insert_element(name, attributes);
	};
	
	phases.inSelect.endTagOption = function(name) {
		if (tree.open_elements.last().tagName.toLowerCase() == 'option') {
			tree.pop_element();
		} else {
			parser.parse_error('unexpected-end-tag-in-select', {name: 'option'});
		}
	};

	phases.inSelect.endTagOptgroup = function(name) {
		// </optgroup> implicitly closes <option>
		if (tree.open_elements.last().tagName.toLowerCase() == 'option' && tree.open_elements[tree.open_elements.length - 2].tagName.toLowerCase() == 'optgroup') {
			tree.pop_element();
		}

		// it also closes </optgroup>
		if (tree.open_elements.last().tagName.toLowerCase() == 'optgroup') {
			tree.pop_element();
		} else {
			// But nothing else
			parser.parse_error('unexpected-end-tag-in-select', {name: 'optgroup'});
		}
	};

	phases.inSelect.startTagSelect = function(name) {
		parser.parse_error("unexpected-select-in-select");
		this.endTagSelect('select');
	};

	phases.inSelect.endTagSelect = function(name) {
		if (this.inScope('select', HTML5.TABLE_SCOPING_ELEMENTS)) {
			tree.remove_open_elements_until('select');
			parser.reset_insertion_mode();
		} else {
			// inner_html case
			parser.parse_error();
		}
	};

	phases.inSelect.startTagInput = function(name, attributes) {
		parser.parse_error("unexpected-input-in-select");
		if (this.inScope('select', HTML5.SELECT_SCOPING_ELEMENTS)) {
			this.endTagSelect('select');
			phase.processStartTag(name, attributes);
		}
	};

	phases.inSelect.startTagScript = function(name, attributes) {
		phases.inHead.processStartTag(name, attributes);
	}

	phases.inSelect.endTagTableElements = function(name) {
		parser.parse_error('unexpected-end-tag-in-select', {name: name});
		
		if (this.inScope(name, HTML5.TABLE_SCOPING_ELEMENTS)) {
			this.endTagSelect('select');
			phase.processEndTag(name);
		}
	};

	phases.inSelect.startTagOther = function(name, attributes) {
		parser.parse_error("unexpected-start-tag-in-select", {name: name});
	};

	phases.inSelect.endTagOther = function(name) {
		parser.parse_error('unexpected-end-tag-in-select', {name: name});
	};

	phases.inSelectInTable = Object.create(phases.base);

	phases.inSelectInTable.start_tag_handlers = {
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

	phases.inSelectInTable.end_tag_handlers = {
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

	phases.inSelectInTable.processCharacters = function(data) {
		phases.inSelect.processCharacters(data);
	};

	phases.inSelectInTable.startTagTable = function(name, attributes) {
		parser.parse_error("unexpected-table-element-start-tag-in-select-in-table", {name: name});
		this.endTagOther("select");
		phase.processStartTag(name, attributes);
	};

	phases.inSelectInTable.startTagOther = function(name, attributes, self_closing) {
		phases.inSelect.processStartTag(name, attributes, self_closing);
	};

	phases.inSelectInTable.endTagTable = function(name) {
		parser.parse_error("unexpected-table-element-end-tag-in-select-in-table", {name: name});
		if (this.inScope(name, HTML5.TABLE_SCOPING_ELEMENTS)) {
			this.endTagOther("select");
			phase.processEndTag(name);
		}
	};

	phases.inSelectInTable.endTagOther = function(name) {
		phases.inSelect.processEndTag(name);
	};

	phases.inRow = Object.create(phases.base);

	phases.inRow.start_tag_handlers = {
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

	phases.inRow.end_tag_handlers = {
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

	phases.inRow.processSpaceCharacters = function(data) {
		phases.inTable.processSpaceCharacters(data);
	};

	phases.inRow.processCharacters = function(data) {
		phases.inTable.processCharacters(data);
	};

	phases.inRow.startTagTableCell = function(name, attributes) {
		this.clearStackToTableRowContext();
		tree.insert_element(name, attributes);
		parser.newPhase('inCell');
		tree.activeFormattingElements.push(HTML5.Marker);
	};

	phases.inRow.startTagTableOther = function(name, attributes) {
		var ignoreEndTag = this.ignoreEndTagTr();
		this.endTagTr('tr');
		// XXX how are we sure it's always ignored in the inner_html case?
		if (!ignoreEndTag) phase.processStartTag(name, attributes);
	};

	phases.inRow.startTagOther = function(name, attributes, self_closing) {
		phases.inTable.processStartTag(name, attributes, self_closing);
	};

	phases.inRow.endTagTr = function(name) {
		if (this.ignoreEndTagTr()) {
			assert.ok(parser.inner_html);
			parser.parse_error();
		} else {
			this.clearStackToTableRowContext();
			tree.pop_element();
			parser.newPhase('inTableBody');
		}
	};

	phases.inRow.endTagTable = function(name) {
		var ignoreEndTag = this.ignoreEndTagTr();
		this.endTagTr('tr');
		// Reprocess the current tag if the tr end tag was not ignored
		// XXX how are we sure it's always ignored in the inner_html case?
		if (!ignoreEndTag) phase.processEndTag(name);
	};

	phases.inRow.endTagTableRowGroup = function(name) {
		if (this.inScope(name, HTML5.TABLE_SCOPING_ELEMENTS)) {
			this.endTagTr('tr');
			phase.processEndTag(name);
		} else {
			// inner_html case
			parser.parse_error();
		}
	};

	phases.inRow.endTagIgnore = function(name) {
		parser.parse_error("unexpected-end-tag-in-table-row", {name: name});
	};

	phases.inRow.endTagOther = function(name) {
		phases.inTable.processEndTag(name);
	};

	phases.inRow.clearStackToTableRowContext = function() {
		var name = tree.open_elements.last().tagName.toLowerCase();
		while (name != 'tr' && name != 'html') {
			parser.parse_error("unexpected-implied-end-tag-in-table-row", {name: name});
			tree.pop_element();
			name = tree.open_elements.last().tagName.toLowerCase();
		}
	};

	phases.inRow.ignoreEndTagTr = function() {
		return !this.inScope('tr', HTML5.TABLE_SCOPING_ELEMENTS);
	};

	phases.rootElement = Object.create(phases.base);

	phases.rootElement.processEOF = function() {
		this.insert_html_element();
		phase.processEOF();
	};

	phases.rootElement.processComment = function(data) {
		tree.insert_comment(data, this.tree.document);
	};

	phases.rootElement.processSpaceCharacters = function(data) {
	};

	phases.rootElement.processCharacters = function(data) {
		this.insert_html_element();
		phase.processCharacters(data);
	};

	phases.rootElement.processStartTag = function(name, attributes, self_closing) {
		if (name == 'html') parser.first_start_tag = true;
		this.insert_html_element();
		phase.processStartTag(name, attributes, self_closing);
	};

	phases.rootElement.processEndTag = function(name) {
		this.insert_html_element();
		phase.processEndTag(name);
	};

	phases.rootElement.insert_html_element = function() {
		tree.insert_root('html');
		parser.newPhase('beforeHead');
	};

	phases.afterAfterFrameset = Object.create(phases.base);

	phases.afterAfterFrameset.start_tag_handlers = {
		html: 'startTagHtml',
		noframes: 'startTagNoFrames',
		'-default': 'startTagOther'
	};

	phases.afterAfterFrameset.processEOF = function() {};

	phases.afterAfterFrameset.processComment = function(data) {
		tree.insert_comment(data, tree.document);
	};

	phases.afterAfterFrameset.processSpaceCharacters = function(data) {
		phases.inBody.processSpaceCharacters(data);
	};

	phases.afterAfterFrameset.processCharacters = function(data) {
		parser.parse_error('expected-eof-but-got-char');
	};

	phases.afterAfterFrameset.startTagHtml = function(name, attributes) {
		phases.inBody.processStartTag(name, attributes);
	};

	phases.afterAfterFrameset.startTagNoFrames = function(name, attributes) {
		phases.inHead.processStartTag(name, attributes);
	};

	phases.afterAfterFrameset.startTagOther = function(name, attributes, self_closing) {
		parser.parse_error('expected-eof-but-got-start-tag', {name: name});
	};

	phases.afterAfterFrameset.processEndTag = function(name, attributes) {
		parser.parse_error('expected-eof-but-got-end-tag');
	};

	phases.inBody = Object.create(phases.base);

	phases.inBody.start_tag_handlers = {
		html: 'startTagHtml',
		head: 'startTagMisplaced',
		base: 'startTagProcessInHead',
		basefont: 'startTagProcessInHead',
		bgsound: 'startTagProcessInHead',
		command: 'startTagProcessInHead',
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

	phases.inBody.end_tag_handlers = {
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

	phases.inBody.processSpaceCharactersDropNewline = function(data) {
		this.dropNewline = false;
		var lastTag = tree.open_elements.last().tagName.toLowerCase();
		if (data.length > 0 && data[0] == "\n" && (['pre', 'listing', 'textarea'].indexOf(lastTag) > -1) && !tree.open_elements.last().hasChildNodes()) {
			data = data.slice(1);
		}

		if (data.length > 0) {
			tree.reconstructActiveFormattingElements();
			tree.insert_text(data);
		}
	};

	phases.inBody.processSpaceCharacters = function(data) {
		if (this.dropNewline) {
			this.processSpaceCharactersDropNewline(data);
		} else {
			this.processSpaceCharactersNonPre(data);
		}
	};

	phases.inBody.processSpaceCharactersNonPre = function(data) {
		tree.reconstructActiveFormattingElements();
		tree.insert_text(data);
	};

	phases.inBody.processCharacters = function(data) {
		// XXX The specification says to do this for every character at the moment,
		// but apparently that doesn't match the real world so we don't do it for
		// space characters.
		data = data.replace(/\u0000/g, function(match, index){
			// @todo position
			parser.parse_error("illegal-codepoint");
			return '';
		});
		if (!data)
			return;
		tree.reconstructActiveFormattingElements();
		tree.insert_text(data);
		if (parser.framesetOk && new RegExp('[^' + HTML5.SPACE_CHARACTERS_IN + ']').test(data))
			parser.framesetOk = false;
	};

	phases.inBody.startTagProcessInHead = function(name, attributes) {
		phases.inHead.processStartTag(name, attributes);
	};

	phases.inBody.startTagBody = function(name, attributes) {
		parser.parse_error('unexpected-start-tag', {name: 'body'});
		if (tree.open_elements.length == 1 ||
			tree.open_elements[1].tagName.toLowerCase() != 'body') {
			assert.ok(parser.inner_html);
		} else {
			parser.framesetOk = false;
			for(var i = 0; i < attributes.length; i++) {
				if (!tree.open_elements[1].getAttribute(attributes[i].nodeName)) {
					tree.open_elements[1].setAttribute(attributes[i].nodeName, attributes[i].nodeValue);
				}
			}
		}
	};

	phases.inBody.startTagFrameset = function(name, attributes) {
		parser.parse_error('unexpected-start-tag', {name: 'frameset'});
		if (tree.open_elements.length == 1 ||
			tree.open_elements[1].tagName.toLowerCase() != 'body') {
			assert.ok(parser.inner_html);
		} else if (parser.framesetOk) {
			if (tree.open_elements[1].parentNode)
				tree.open_elements[1].parentNode.removeChild(tree.open_elements[1]);
			while (tree.open_elements.last().tagName.toLowerCase() != 'html')
				tree.open_elements.pop();
			tree.insert_element(name, attributes);
			parser.newPhase('inFrameset');
		}
	};

	phases.inBody.startTagCloseP = function(name, attributes) {
		if (this.inScope('p', HTML5.BUTTON_SCOPING_ELEMENTS)) this.endTagP('p');
		tree.insert_element(name, attributes);
	};

	phases.inBody.startTagPreListing = function(name, attributes) {
		if (this.inScope('p', HTML5.BUTTON_SCOPING_ELEMENTS)) this.endTagP('p');
		tree.insert_element(name, attributes);
		parser.framesetOk = false;
		this.dropNewline = true;
	};

	phases.inBody.startTagForm = function(name, attributes) {
		if (tree.formPointer) {
			parser.parse_error('unexpected-start-tag', {name: name});
		} else {
			if (this.inScope('p', HTML5.BUTTON_SCOPING_ELEMENTS)) this.endTagP('p');
			tree.insert_element(name, attributes);
			tree.formPointer = tree.open_elements.last();
		}
	};

	phases.inBody.startTagRpRt = function(name, attributes) {
		if (this.inScope('ruby')) {
			tree.generateImpliedEndTags();
			if (tree.open_elements.last().tagName.toLowerCase() != 'ruby') {
				parser.parse_error('unexpected-start-tag', {name: name});
			}
		}
		tree.insert_element(name, attributes);
	};

	phases.inBody.startTagListItem = function(name, attributes) {
		/// @todo: Fix according to current spec. http://www.w3.org/TR/html5/tree-construction.html#parsing-main-inbody
		var stopNames = {li: ['li'], dd: ['dd', 'dt'], dt: ['dd', 'dt']};
		var stopName = stopNames[name];

		var els = tree.open_elements;
		for(var i = els.length - 1; i >= 0; i--) {
			var node = els[i];
			if (stopName.indexOf(node.tagName.toLowerCase()) != -1) {
				phase.processEndTag(node.tagName.toLowerCase());
				break;
			}

			// Phrasing eliments are all non special, non scoping, non
			// formatting elements
			if (((node.namespace || 'html') in HTML5.SPECIAL_ELEMENTS &&
					HTML5.SPECIAL_ELEMENTS[node.namespace || 'html'].indexOf(node.tagName.toLowerCase()) != -1)/* ||
				((node.namespace || 'html') in HTML5.SCOPING_ELEMENTS
					&& HTML5.SCOPING_ELEMENTS[node.namespace || 'html'].indexOf(node.tagName.toLowerCase()) != -1)*/ &&
				['address', 'div', 'p'].indexOf(node.tagName.toLowerCase()) == -1) break;
		}
		if (this.inScope('p', HTML5.BUTTON_SCOPING_ELEMENTS)) this.endTagP('p');

		// Always insert an <li> element
		tree.insert_element(name, attributes);
		parser.framesetOk = false;
	};

	phases.inBody.startTagPlaintext = function(name, attributes) {
		if (this.inScope('p', HTML5.BUTTON_SCOPING_ELEMENTS)) this.endTagP('p');
		tree.insert_element(name, attributes);
		parser.tokenizer.state = parser.tokenizer.plaintext_state;
	};

	phases.inBody.startTagHeading = function(name, attributes) {
		if (this.inScope('p', HTML5.BUTTON_SCOPING_ELEMENTS)) this.endTagP('p');
		if (HTML5.HEADING_ELEMENTS.indexOf(tree.open_elements.last().tagName.toLowerCase()) != -1) {
			parser.parse_error('unexpected-start-tag', {name: name});
			tree.pop_element();
		}

		tree.insert_element(name, attributes);
	};

	phases.inBody.startTagA = function(name, attributes) {
		var afeAElement = tree.elementInActiveFormattingElements('a');
		if (afeAElement) {
			parser.parse_error("unexpected-start-tag-implies-end-tag", {startName: "a", endName: "a"});
			this.endTagFormatting('a');
			var pos;
			pos = tree.open_elements.indexOf(afeAElement);
			if (pos != -1) tree.open_elements.splice(pos, 1);
			pos = tree.activeFormattingElements.indexOf(afeAElement);
			if (pos != -1) tree.activeFormattingElements.splice(pos, 1);
		}
		tree.reconstructActiveFormattingElements();
		this.addFormattingElement(name, attributes);
	};

	phases.inBody.startTagFormatting = function(name, attributes) {
		tree.reconstructActiveFormattingElements();
		this.addFormattingElement(name, attributes);
	};

	phases.inBody.startTagNobr = function(name, attributes) {
		tree.reconstructActiveFormattingElements();
		if (this.inScope('nobr')) {
			parser.parse_error("unexpected-start-tag-implies-end-tag", {startName: 'nobr', endName: 'nobr'});
			this.processEndTag('nobr');
				// XXX Need tests that trigger the following
				tree.reconstructActiveFormattingElements()
		}
		this.addFormattingElement(name, attributes);
	};

	phases.inBody.startTagButton = function(name, attributes) {
		if (this.inScope('button')) {
			parser.parse_error('unexpected-start-tag-implies-end-tag', {startName: 'button', endName: 'button'});
			this.processEndTag('button');
			phase.processStartTag(name, attributes);
		} else {
			parser.framesetOk = false;
			tree.reconstructActiveFormattingElements();
			tree.insert_element(name, attributes);
		}
	};

	phases.inBody.startTagAppletMarqueeObject = function(name, attributes) {
		tree.reconstructActiveFormattingElements();
		tree.insert_element(name, attributes);
		tree.activeFormattingElements.push(HTML5.Marker);
		parser.framesetOk = false;
	};

	phases.inBody.endTagAppletMarqueeObject = function(name) {
		if (!this.inScope(name)) {
			parser.parse_error("unexpected-end-tag", {name: name});
		} else {
			tree.generateImpliedEndTags();
			if (tree.open_elements.last().tagName.toLowerCase() != name) {
				parser.parse_error('end-tag-too-early', {name: name});
			}
			tree.remove_open_elements_until(name);
			tree.clearActiveFormattingElements();
		}
	};

	phases.inBody.startTagXmp = function(name, attributes) {
		if (this.inScope('p', HTML5.BUTTON_SCOPING_ELEMENTS)) this.processEndTag('p');
		tree.reconstructActiveFormattingElements();
		parser.parseRCDataRawText("RAWTEXT", name, attributes);
		parser.framesetOk = false;
	};

	phases.inBody.startTagTable = function(name, attributes) {
		if (parser.compatMode !== "quirks")
			if (this.inScope('p', HTML5.BUTTON_SCOPING_ELEMENTS))
				this.processEndTag('p');
		tree.insert_element(name, attributes);
		parser.newPhase('inTable');
		parser.framesetOk = false;
	};

	phases.inBody.startTagVoidFormatting = function(name, attributes) {
		tree.reconstructActiveFormattingElements();
		tree.insert_element(name, attributes);
		tree.pop_element();
		parser.framesetOk = false;
	};

	phases.inBody.startTagParamSourceTrack = function(name, attributes) {
		tree.insert_element(name, attributes);
		tree.pop_element();
	};

	phases.inBody.startTagHr = function(name, attributes) {
		if (this.inScope('p', HTML5.BUTTON_SCOPING_ELEMENTS)) this.endTagP('p');
		tree.insert_element(name, attributes);
		tree.pop_element();
		parser.framesetOk = false;
	};

	phases.inBody.startTagImage = function(name, attributes) {
		// No, really...
		parser.parse_error('unexpected-start-tag-treated-as', {originalName: 'image', newName: 'img'});
		this.processStartTag('img', attributes);
	};

	phases.inBody.startTagInput = function(name, attributes) {
		var currentFramesetOk = parser.framesetOk;
		this.startTagVoidFormatting(name, attributes);
		for (var key in attributes) {
			// input type=hidden doesn't change framesetOk
			if (attributes[key].nodeName == 'type') {
				if (attributes[key].nodeValue.toLowerCase() == 'hidden')
					parser.framesetOk = currentFramesetOk;
				break;
			}
		}
	};

	phases.inBody.startTagIsindex = function(name, attributes) {
		parser.parse_error('deprecated-tag', {name: 'isindex'});
		if (tree.formPointer)
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
		this.processCharacters(prompt);
		this.processStartTag('input', inputAttributes);
		this.processEndTag('label');
		this.processStartTag('hr');
		this.processEndTag('form');
	};

	phases.inBody.startTagTextarea = function(name, attributes) {
		// XXX Form element pointer checking here as well...
		tree.insert_element(name, attributes);
		parser.tokenizer.state = parser.tokenizer.rcdata_state;
		this.dropNewline = true;
		parser.framesetOk = false;
	};

	phases.inBody.startTagIFrame = function(name, attributes) {
		parser.framesetOk = false;
		this.startTagRawText(name, attributes);
	};

	phases.inBody.startTagRawText = function(name, attributes) {
		parser.parseRCDataRawText("RAWTEXT", name, attributes);
	};

	phases.inBody.startTagSelect = function(name, attributes) {
		tree.reconstructActiveFormattingElements();
		tree.insert_element(name, attributes);
		parser.framesetOk = false;
		var phaseName = parser.phaseName;
		if (phaseName == 'inTable' ||
			phaseName == 'inCaption' ||
			phaseName == 'inColumnGroup' ||
			phaseName == 'inTableBody' ||
			phaseName == 'inRow' ||
			phaseName == 'inCell') {
			parser.newPhase('inSelectInTable');
		} else {
			parser.newPhase('inSelect');
		}
	};

	phases.inBody.startTagMisplaced = function(name, attributes) {
		parser.parse_error('unexpected-start-tag-ignored', {name: name});
	};

	phases.inBody.endTagMisplaced = function(name) {
		// This handles elements with end tags in other insertion modes.
		parser.parse_error("unexpected-end-tag", {name: name});
	};

	phases.inBody.endTagBr = function(name) {
		parser.parse_error("unexpected-end-tag-treated-as", {originalName: "br", newName: "br element"});
		tree.reconstructActiveFormattingElements();
		tree.insert_element(name, []);
		tree.pop_element();
	};

	phases.inBody.startTagOptionOptgroup = function(name, attributes) {
		if (tree.open_elements.last().tagName.toLowerCase() == 'option') this.endTagOther('option');
		tree.reconstructActiveFormattingElements();
		tree.insert_element(name, attributes);
	};

	phases.inBody.startTagOther = function(name, attributes) {
		tree.reconstructActiveFormattingElements();
		tree.insert_element(name, attributes);
	};

	phases.inBody.endTagOther = function endTagOther(name) {
		var currentNode;
		function isCurrentNode(el) {
			return el == currentNode;
		}

		var nodes = tree.open_elements;
		for(var eli = nodes.length - 1; eli > 0; eli--) {
			currentNode = nodes[eli];
			if (nodes[eli].tagName.toLowerCase() == name) {
				tree.generateImpliedEndTags();
				if (tree.open_elements.last().tagName.toLowerCase() != name) {
					parser.parse_error('unexpected-end-tag', {name: name});
				}
				
				tree.remove_open_elements_until(isCurrentNode);

				break;
			} else {
				if (((currentNode.namespace || 'html') in HTML5.SPECIAL_ELEMENTS &&
						HTML5.SPECIAL_ELEMENTS[currentNode.namespace || 'html'].indexOf(currentNode.tagName.toLowerCase()) != -1) ||
					((currentNode.namespace || 'html') in HTML5.SCOPING_ELEMENTS &&
						HTML5.SCOPING_ELEMENTS[currentNode.namespace || 'html'].indexOf(currentNode.tagName.toLowerCase()) != -1)
				) {
					parser.parse_error('unexpected-end-tag', {name: name});
					break;
				}
			}
		}
	};

	phases.inBody.startTagMath = function(name, attributes, self_closing) {
		tree.reconstructActiveFormattingElements();
		attributes = this.adjust_mathml_attributes(attributes);
		attributes = this.adjust_foreign_attributes(attributes);
		tree.insert_foreign_element(name, attributes, 'math');
		// Need to get the parse error right for the case where the token
		// has a namespace not equal to the xmlns attribute
		if (self_closing) {
			tree.open_elements.pop();
		}
	};

	phases.inBody.startTagSVG = function(name, attributes, self_closing) {
		tree.reconstructActiveFormattingElements();
		attributes = this.adjust_svg_attributes(attributes);
		attributes = this.adjust_foreign_attributes(attributes);
		tree.insert_foreign_element(name, attributes, 'svg');
		// Need to get the parse error right for the case where the token
		// has a namespace not equal to the xmlns attribute
		if (self_closing) {
			tree.open_elements.pop();
		}
	};

	phases.inBody.endTagP = function(name) {
		if (!this.inScope('p', HTML5.BUTTON_SCOPING_ELEMENTS)) {
			parser.parse_error('unexpected-end-tag', {name: 'p'});
			this.startTagCloseP('p', {});
			this.endTagP('p');
		} else {
			tree.generateImpliedEndTags('p');
			if (tree.open_elements.last().tagName.toLowerCase() != 'p')
				parser.parse_error('unexpected-end-tag', {name: 'p'});
			tree.remove_open_elements_until(name);
		}
	};

	phases.inBody.endTagBody = function(name) {
		if (!this.inScope('body')) {
			parser.parse_error('unexpected-end-tag', {name: name});
			return;
		}

		/// @todo Emit parse error on end tags other than the ones listed in http://www.w3.org/TR/html5/tree-construction.html#parsing-main-inbody
		// ['dd', 'dt', 'li', 'optgroup', 'option', 'p', 'rp', 'rt', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'body', 'html']
		if (tree.open_elements.last().tagName.toLowerCase() != 'body') {
			parser.parse_error('expected-one-end-tag-but-got-another', {
				expectedName: tree.open_elements.last().tagName.toLowerCase(),
				gotName: name
			});
		}
		parser.newPhase('afterBody');
	};

	phases.inBody.endTagHtml = function(name) {
		if (!this.inScope('body')) {
			parser.parse_error('unexpected-end-tag', {name: name});
			return;
		}

		/// @todo Emit parse error on end tags other than the ones listed in http://www.w3.org/TR/html5/tree-construction.html#parsing-main-inbody
		// ['dd', 'dt', 'li', 'optgroup', 'option', 'p', 'rp', 'rt', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'body', 'html']
		if (tree.open_elements.last().tagName.toLowerCase() != 'body') {
			parser.parse_error('expected-one-end-tag-but-got-another', {
				expectedName: tree.open_elements.last().tagName.toLowerCase(),
				gotName: name
			});
		}
		parser.newPhase('afterBody');
		phase.processEndTag(name);
	};

	phases.inBody.endTagBlock = function(name) {
		if (!this.inScope(name)) {
			parser.parse_error('unexpected-end-tag', {name: name});
		} else {
			tree.generateImpliedEndTags();
			if (tree.open_elements.last().tagName.toLowerCase() != name) {
				parser.parse_error('end-tag-too-early', {name: name});
			}
			tree.remove_open_elements_until(name);
		}
	};

	phases.inBody.endTagForm = function(name)  {
		var node = tree.formPointer;
		tree.formPointer = null;
		if (!node || !this.inScope(name)) {
			parser.parse_error('unexpected-end-tag', {name: name});
		} else {
			tree.generateImpliedEndTags();
		
			if (tree.open_elements.last() != node) {
				parser.parse_error('end-tag-too-early-ignored', {name: 'form'});
			}
			tree.open_elements.splice(tree.open_elements.indexOf(node), 1);
		}
	};

	phases.inBody.endTagListItem = function(name) {
		if (!this.inScope(name, HTML5.LIST_SCOPING_ELEMENTS)) {
			parser.parse_error('unexpected-end-tag', {name: name});
		} else {
			tree.generateImpliedEndTags(name);
			if (tree.open_elements.last().tagName.toLowerCase() != name)
				parser.parse_error('end-tag-too-early', {name: name});
			tree.remove_open_elements_until(name);
		}
	};

	phases.inBody.endTagHeading = function(name) {
		var error = true;
		var i;

		for(i in HTML5.HEADING_ELEMENTS) {
			var el = HTML5.HEADING_ELEMENTS[i];
			if (this.inScope(el)) {
				error = false;
				break;
			}
		}
		if (error) {
			parser.parse_error('unexpected-end-tag', {name: name});
			return;
		}

		tree.generateImpliedEndTags();

		if (tree.open_elements.last().tagName.toLowerCase() != name)
			parser.parse_error('end-tag-too-early', {name: name});

		tree.remove_open_elements_until(function(e) {
			return HTML5.HEADING_ELEMENTS.indexOf(e.tagName.toLowerCase()) != -1;
		});
	};

	phases.inBody.endTagFormatting = function(name, attributes) {
		var element;
		var afeElement;

		function isAfeElement(el) {
			return el == afeElement;
		}

		var outerLoopCounter = 0;

		while (outerLoopCounter++ < 8) {
			afeElement = tree.elementInActiveFormattingElements(name);
			if (!afeElement || (tree.open_elements.indexOf(afeElement) != -1 &&
				!this.inScope(afeElement.tagName.toLowerCase()))) {
				parser.parse_error('adoption-agency-1.1', {name: name});
			this.endTagOther(name, attributes);
				return;
			} else if (tree.open_elements.indexOf(afeElement) == -1) {
				parser.parse_error('adoption-agency-1.2', {name: name});
				tree.activeFormattingElements.splice(tree.activeFormattingElements.indexOf(afeElement), 1);
				return;
			} else if (!this.inScope(afeElement.tagName.toLowerCase())) {
				parser.parse_error('adoption-agency-4.4', {name: name});
			}

			if (afeElement != tree.open_elements.last()) {
				parser.parse_error('adoption-agency-1.3', {name: name});
			}
			
			// Start of the adoption agency algorithm proper
			var afeIndex = tree.open_elements.indexOf(afeElement);
			var furthestBlock = null;
			var els = tree.open_elements.slice(afeIndex);
			var len = els.length;
			for (var i = 0; i < len; i++) {
				element = els[i];
				if (((element.namespace || 'html') in HTML5.SPECIAL_ELEMENTS &&
						HTML5.SPECIAL_ELEMENTS[element.namespace || 'html'].indexOf(element.tagName.toLowerCase()) != -1) ||
					((element.namespace || 'html') in HTML5.SCOPING_ELEMENTS &&
						HTML5.SCOPING_ELEMENTS[element.namespace || 'html'].indexOf(element.tagName.toLowerCase()) != -1)
				) {
					furthestBlock = element;
					break;
				}
			}
			
			if (!furthestBlock) {
				element = tree.remove_open_elements_until(isAfeElement);
				tree.activeFormattingElements.splice(tree.activeFormattingElements.indexOf(element), 1);
				return;
			}


			var commonAncestor = tree.open_elements[afeIndex - 1];

			var bookmark = tree.activeFormattingElements.indexOf(afeElement);

			var lastNode;
			var node;
			var clone;
			lastNode = node = furthestBlock;
			var index = tree.open_elements.indexOf(node);

			var innerLoopCounter = 0;
			while (innerLoopCounter++ < 3) {
				index -= 1;
				node = tree.open_elements[index];
				if (tree.activeFormattingElements.indexOf(node) < 0) {
					tree.open_elements.splice(index, 1);
					continue;
				}
				if (node == afeElement)
					break;

				if (lastNode == furthestBlock)
					bookmark = tree.activeFormattingElements.indexOf(node) + 1;

				var clone = node.cloneNode();

				tree.activeFormattingElements[tree.activeFormattingElements.indexOf(node)] = clone;
				tree.open_elements[tree.open_elements.indexOf(node)] = clone;

				node = clone;

				if (lastNode.parentNode)
					lastNode.parentNode.removeChild(lastNode);
				node.appendChild(lastNode);
				lastNode = node;
			}

			if (lastNode.parentNode)
				lastNode.parentNode.removeChild(lastNode);


			if (['table', 'tbody', 'tfoot', 'thead', 'tr'].indexOf(commonAncestor.tagName.toLowerCase()) > -1) {
				var position = tree.getTableMisnestedNodePosition();
				position.parent.insertBefore(lastNode, position.insertBefore);
			} else {
				commonAncestor.appendChild(lastNode);
			}

			clone = afeElement.cloneNode();

			tree.reparentChildren(furthestBlock, clone);

			furthestBlock.appendChild(clone);

			tree.activeFormattingElements.splice(tree.activeFormattingElements.indexOf(afeElement), 1);
			tree.activeFormattingElements.splice(Math.min(bookmark, tree.activeFormattingElements.length), 0, clone);

			tree.open_elements.splice(tree.open_elements.indexOf(afeElement), 1);
			tree.open_elements.splice(tree.open_elements.indexOf(furthestBlock) + 1, 0, clone);
		}
	};

	phases.inBody.addFormattingElement = function(name, attributes) {
		tree.insert_element(name, attributes);
		tree.activeFormattingElements.push(tree.open_elements.last());
	};

	phases.text = Object.create(phases.base);

	phases.text.start_tag_handlers = {
		'-default': 'startTagOther'
	};

	phases.text.end_tag_handlers = {
		script: 'endTagScript',
		'-default': 'endTagOther'
	};

	phases.text.processCharacters = function(data) {
		tree.insert_text(data);
	};

	phases.text.processEOF = function() {
		parser.parse_error("expected-named-closing-tag-but-got-eof",
			{name: tree.open_elements.last().tagName.toLowerCase()});
		tree.open_elements.pop();
		parser.newPhase(parser.original_phase);
		phase.processEOF();
	};

	phases.text.startTagOther = function(name) {
		throw "Tried to process start tag " + name + " in RCDATA/RAWTEXT mode";
	};

	phases.text.endTagScript = function(name) {
		var node = tree.open_elements.pop();
		assert.ok(node.tagName.toLowerCase() == 'script');
		parser.newPhase(parser.original_phase);
	};

	phases.text.endTagOther = function(name) {
		tree.open_elements.pop();
		parser.newPhase(parser.original_phase);
	}

	if (options) for(var o in options) {
		this[o] = options[o];
	}

	if (!this.document) {
		var l3, jsdom;
		jsdom = require('jsdom');
		l3 = jsdom.dom.level3.core;
		var DOM = jsdom.browserAugmentation(l3);
		this.document = new DOM.Document('html');
	}

	var tree = this.tree = new HTML5.TreeBuilder(this.document);
};

util.inherits(Parser, events.EventEmitter);

Parser.prototype.parse = function(source) {
	if (!source) throw(new Error("No source to parse"));
	HTML5.debug('parser.parse', source);
	this.tokenizer = new HTML5.Tokenizer(source, this.document, this.tree);
	this.setup();
	this.tokenizer.tokenize();
};

Parser.prototype.parse_fragment = function(source, element) {
	HTML5.debug('parser.parse_fragment', source, element);
	// FIXME: Check to make sure element is inside document
	if (element && element.ownerDocument) {
		// @todo take compatMode of ownerDocument into account
		this.tokenizer = new HTML5.Tokenizer(source, element.ownerDocument);
		this.setup(element.tagName.toLowerCase(), null);
		this.tree.open_elements.push(element);
		this.tree.root_pointer = element;
	} else {
		this.tokenizer = new HTML5.Tokenizer(source, this.document);
		this.setup(element ? String(element).toLowerCase() : null, null);
	}
	this.tokenizer.tokenize();
};

Object.defineProperty(Parser.prototype, 'fragment', {
	get: function() {
		return this.tree.getFragment();
	}
});

Parser.prototype.do_token = function(token) {
	var method = 'process' + token.type;

	if (token.type == 'ParseError') {
		this.parse_error(token.data, token.datavars);
	} else {
		var currentNode = this.tree.open_elements.last() || null;
		if (!currentNode || !currentNode.namespace ||
			(this.is_mathml_text_integration_point(currentNode) &&
				((token.type == 'StartTag' &&
						!(token.name in {mglyph:0, malignmark:0})) ||
					(token.type in {Characters:0, SpaceCharacters:0}))
			) ||
			(currentNode.namespace == 'math' &&
				currentNode.tagName.toLowerCase() == 'annotation-xml' &&
				token.type == 'StartTag' && token.name == 'svg'
			) ||
			(this.is_html_integration_point(currentNode) &&
				token.type in {StartTag:0, Characters:0, SpaceCharacters:0}
			) ||
			token.type == 'EOF'
		) {
			var phase = this.phase;
		} else {
			var phase = this.phases.inForeignContent;
		}
		switch(token.type) {
		case 'Characters':
		case 'SpaceCharacters':
		case 'Comment':
			phase[method](token.data);
			break;
		case 'StartTag':
			if (token.name == "script") {
				this.inScript = true;
				this.scriptBuffer = '';
			}
			phase[method](token.name, token.data, token.self_closing);
			break;
		case 'EndTag':
			phase[method](token.name);
			if (token.name == "script") {
				this.inScript = false;
			}
			break;
		case 'Doctype':
			phase[method](token.name, token.publicId, token.systemId, token.correct);
			break;
		case 'EOF':
			phase[method]();
			break;
		}
	}
};

Parser.prototype.setup = function(context, encoding) {
	this.tokenizer.addListener('token', function(t) {
		return function(token) { t.do_token(token); };
	}(this));
	this.tokenizer.addListener('end', function(t) {
		return function() { t.emit('end'); };
	}(this));
	this.emit('setup', this);

	this.tree.reset();
	this.first_start_tag = false;
	this.errors = [];
	// "quirks" / "limited quirks" / "no quirks"
	this.compatMode = "no quirks";
	this.framesetOk = true;

	this.inner_html = context;


	// FIXME: instantiate tokenizer and plumb. Pass lowercasing options.

	if (context) {
		switch(context) {
		case 'title':
		case 'textarea':
			this.tokenizer.state = this.tokenizer.rcdata_state;
			break;
		case 'style':
		case 'xmp':
		case 'iframe':
		case 'noembed':
		case 'noframes':
			this.tokenizer.state = this.tokenizer.rawtext_state;
			break;
		case 'script':
			this.tokenizer.state = this.tokenizer.script_data_state;
			break;
		case 'noscript':
			// @todo check scripting flag
			this.tokenizer.state = this.tokenizer.rawtext_state;
			break;
		case 'plaintext':
			this.tokenizer.state = this.tokenizer.plaintext_state;
			break;
		}
		this.tree.insert_root('html');
		this.reset_insertion_mode();
	} else {
		this.newPhase('initial');
	}

	this.last_phase = null;

};

Parser.prototype.parse_error = function(code, data, isWarning) {
	// FIXME: this.errors.push([this.tokenizer.position, code, data]);
	this.errors.push([code, data ,isWarning]);
	if (this.strict) throw(this.errors.last());
};

Parser.prototype.reset_insertion_mode = function() {

	var last = false;
	var node_name, new_phase;
	
	for(var i = this.tree.open_elements.length - 1; i >= 0; i--) {
		var node = this.tree.open_elements[i];
		node_name = node.tagName.toLowerCase();
		new_phase = null;
		if (node == this.tree.open_elements[0]) {
			assert.ok(this.inner_html);
			last = true;
			node_name = this.inner_html;
		}

		if ((node_name == 'select' || node_name == 'colgroup' || node_name == 'head' || node_name == 'html')) {
			// XXX
			assert.ok(this.inner_html)
		}

		if (!last && node.namespace)
			continue;

		if (HTML5.TAGMODES[node_name]) {
			this.newPhase(HTML5.TAGMODES[node_name]);
		} else if (last) {
			this.newPhase('inBody');
		} else {
			continue;
		}

		break;
	}
};

Parser.prototype.parseRCDataRawText = function(contentType, name, attributes) {
	this.tree.insert_element(name, attributes);
	if (contentType == "RAWTEXT") {
		this.tokenizer.state = this.tokenizer.rawtext_state;
	} else {
		this.tokenizer.state = this.tokenizer.rcdata_state;
	}
	this.original_phase = this.phaseName;
	this.newPhase('text');
}

Parser.prototype.is_html_integration_point = function(element) {
	if (element.namespace in HTML5.HTML_INTEGRATION_POINT_ELEMENTS &&
		HTML5.HTML_INTEGRATION_POINT_ELEMENTS[element.namespace].indexOf(element.tagName.toLowerCase()) > -1) {
		return element.tagName.toLowerCase() != 'annotation-xml' || (['text/html', 'application/xhtml+xml'].indexOf((element.getAttribute('encoding') || '').toLowerCase()) > -1);
	}
	return false;
};

Parser.prototype.is_mathml_text_integration_point = function(element) {
	if (element.namespace in HTML5.MATHML_TEXT_INTEGRATION_POINT_ELEMENTS &&
		HTML5.MATHML_TEXT_INTEGRATION_POINT_ELEMENTS[element.namespace].indexOf(element.tagName.toLowerCase()) > -1) {
		return true;
	}
	return false;
};