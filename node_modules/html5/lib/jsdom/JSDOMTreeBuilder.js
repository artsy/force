var util = require('util');
var TreeBuilder = require('../TreeBuilder').TreeBuilder;

function JSDOMTreeBuilder(document, core) {
	TreeBuilder.call(this);
	this.scriptingEnabled = true;
	this.document = document;
	this.core = core;
}

util.inherits(JSDOMTreeBuilder, TreeBuilder);

JSDOMTreeBuilder.prototype.start = function() {

};

JSDOMTreeBuilder.prototype.insertDoctype = function(name, publicId, systemId) {
	var doctype = new this.core.DocumentType(null, name);
	doctype._publicId = publicId;
	doctype._systemId = systemId;
	this.attachNode(doctype, this.document);
	// TODO compatibility mode
};

JSDOMTreeBuilder.prototype.insertComment = function(data, parent) {
	if (!parent)
		parent = this.currentStackItem().node();
	var comment = new this.core.Comment(this.document, data);
	this.attachNode(comment, parent);
};

JSDOMTreeBuilder.prototype.appendCharacters = function(parent, data) {
	var lastChild = parent.lastChild;
	if (lastChild && lastChild.nodeType == lastChild.TEXT_NODE) {
		// todo parserAppendData
		lastChild.appendData(data);
		return;
	}
	var textNode = new this.core.Text(this.document, data);
	this.attachNode(textNode, parent);
};

JSDOMTreeBuilder.prototype.insertText = function(data) {
	if (this.redirectAttachToFosterParent && this.openElements.top.isFosterParenting()) {
		var tableIndex = this.openElements.findIndex('table');
		var tableItem = this.openElements.item(tableIndex);
		var table = tableItem.node;
		if (tableIndex === 0) {
			return this.appendCharacters(table, data);
		}
		var parent = table.parentNode;
		if (parent) {
			var previousSibling = table.previousSibling;
			if (previousSibling && previousSibling.nodeType === previousSibling.TEXT_NODE) {
				// todo parserAppendData
				previousSibling.appendData(data);
				return;
			}
			var textNode = new this.core.Text(this.document, data);
			// todo parserInsertBefore
			parent.insertBefore(textNode, table);
			return;
		}
		var stackParent = this.openElements.item(tableIndex - 1).node;
		var lastChild = stackParent.lastChild;
		if (listChild && lastChild.nodeType == lastChild.TEXT_NODE) {
			// todo parserAppendData
			lastChild.appendData(data);
			return;
		}
		var textNode = new this.core.Text(this.document, data);
		this.attachNode(textNode, stackParent);
		return;
	}
	this.appendCharacters(this.currentStackItem().node, data);
};

JSDOMTreeBuilder.prototype.createElement = function(namespaceURI, localName, attributes) {
	var element;
	if (namespaceURI === "http://www.w3.org/1999/xhtml") {
		element = (this.document._elementBuilders[localName] || this.document._defaultElementBuilder)(this.document, localName);
	} else {
		element = new this.core.Element(this.document, localName);
	}

	element._created = false;
	element._namespaceURI = namespaceURI;
	element._nodeName = localName;
	element._localName = localName;
	element._created = true;

	if (attributes) {
		for (var i = 0; i < attributes.length; i++) {
			var attr = new this.core.Attr(this.document, attributes[i].nodeName, false);
			attr.namespaceURI = attributes[i].namespaceURI || null;
			attr._nodeName = (attributes[i].prefix ? attributes[i].prefix + ':' : '') + attributes[i].nodeName;
			attr._localName = attributes[i].nodeName;
			attr._prefix = attributes[i].prefix || null;
			attr.value = attributes[i].nodeValue;
			element._attributes.setNamedItemNS(attr);
		}
	}
	return element;
};

JSDOMTreeBuilder.prototype.attachNode = function(child, parent) {
	// TODO parserAppendChild
	parent.appendChild(child);
};

JSDOMTreeBuilder.prototype.attachNodeToFosterParent = function(child, table, stackParent) {
	var parent = table.parentNode;
	if (parent)
		// TODO parserInsertBefore
		parent.insertBefore(child, table);
	else
		this.attachNode(child, stackParent);
};

JSDOMTreeBuilder.prototype.detachFromParent = function(node) {
	var parent = node.parentNode;
	if (parent)
		parent.removeChild(node);
};

JSDOMTreeBuilder.prototype.reparentChildren = function(oldParent, newParent) {
	while (oldParent.hasChildNodes()) {
		newParent.appendChild(oldParent.firstChild);
	}
};

JSDOMTreeBuilder.prototype.addAttributesToElement = function(element, attributes) {
	for (var i = 0; i < attributes.length; i++) {
		if (!element._attributes.getNamedItem(attributes[i].nodeName)) {
			var attr = new this.core.Attr(this.document, attributes[i].nodeName, false);
			attr.namespaceURI = attributes[i].namespaceURI || null;
			attr._nodeName = (attributes[i].prefix ? attributes[i].prefix + ':' : '') + attributes[i].nodeName;
			attr._localName = attributes[i].nodeName;
			attr._prefix = attributes[i].prefix || null;
			attr.value = attributes[i].nodeValue;
			element._attributes.setNamedItemNS(attr);
		}
	}
};

exports.JSDOMTreeBuilder = JSDOMTreeBuilder;