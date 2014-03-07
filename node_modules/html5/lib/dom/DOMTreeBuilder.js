var util = require('util');
var TreeBuilder = require('../TreeBuilder').TreeBuilder;

function DOMTreeBuilder(implementation) {
    this.implementation = implementation;
	TreeBuilder.call(this);
}

util.inherits(DOMTreeBuilder, TreeBuilder);

DOMTreeBuilder.prototype.start = function() {
	this.document = this.implementation.createDocument(null, null, null);
};

DOMTreeBuilder.prototype.insertDoctype = function(name, publicId, systemId) {
	var doctype = this.implementation.createDocumentType(name, publicId, systemId);
	this.document.appendChild(doctype);
};

DOMTreeBuilder.prototype.insertComment = function(data, parent) {
	if (!parent)
		parent = this.currentStackItem().node();
	var comment = this.document.createComment(data);
	parent.appendChild(comment);
};

DOMTreeBuilder.prototype.appendCharacters = function(parent, data) {
	var lastChild = parent.lastChild;
	if (lastChild && lastChild.nodeType == lastChild.TEXT_NODE) {
		lastChild.appendData(data);
		return;
	}
	parent.appendChild(this.document.createTextNode(data));
};

DOMTreeBuilder.prototype.insertText = function(data) {
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
				previousSibling.appendData(data);
				return;
			}
			parent.insertBefore(this.document.createTextNode(data), table);
			return;
		}
		var stackParent = this.openElements.item(tableIndex - 1).node;
		var lastChild = stackParent.lastChild;
		if (listChild && lastChild.nodeType == lastChild.TEXT_NODE) {
			lastChild.appendChild(data);
			return;
		}
		stackParent.appendChild(this.document.createTextNode(data));
		return;
	}
	this.appendCharacters(this.currentStackItem().node, data);
};

DOMTreeBuilder.prototype.createElement = function(namespaceURI, localName, attributes) {
	var element = this.document.createElementNS(namespaceURI, localName);
	if (attributes) {
		for (var i = 0; i < attributes.length; i++) {
			element.setAttributeNS(attributes[i].namespaceURI || null,
				attributes[i].nodeName, attributes[i].nodeValue);
		}
	}
	return element;
};

DOMTreeBuilder.prototype.attachNode = function(child, parent) {
	parent.appendChild(child);
};

DOMTreeBuilder.prototype.attachNodeToFosterParent = function(child, table, stackParent) {
	var parent = table.parentNode;
	if (parent)
		parent.insertBefore(child, table);
	else
		stackParent.appendChild(child);
};

DOMTreeBuilder.prototype.detachFromParent = function(node) {
	var parent = node.parentNode;
	if (parent)
		parent.removeChild(node);
};

DOMTreeBuilder.prototype.reparentChildren = function(oldParent, newParent) {
	while (oldParent.hasChildNodes()) {
		newParent.appendChild(oldParent.firstChild);
	}
};

TreeBuilder.prototype.getFragment = function() {
	var fragment = this.document.createDocumentFragment();
	this.reparentChildren(this.openElements.rootNode, fragment);
	return fragment;
};

DOMTreeBuilder.prototype.addAttributesToElement = function(element, attributes) {
	for (var i = 0; i < attributes.length; i++) {
		if (!element.getAttributeNS(attributes[i].namespaceURI || null, attributes[i].nodeName)) {
			element.setAttributeNS(attributes[i].namespaceURI || null, attributes[i].nodeName, attributes[i].nodeValue);
		}
	}
};

exports.DOMTreeBuilder = DOMTreeBuilder;