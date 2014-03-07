var util = require('util');
var TreeBuilder = require('../TreeBuilder').TreeBuilder;

function SAXTreeBuilder() {
	TreeBuilder.call(this);
}

util.inherits(SAXTreeBuilder, TreeBuilder);

SAXTreeBuilder.prototype.start = function(tokenizer) {
	this.document = new Document(this.tokenizer);
};

SAXTreeBuilder.prototype.end = function() {
	this.document.endLocator = this.tokenizer;
};

SAXTreeBuilder.prototype.insertDoctype = function(name, publicId, systemId) {
	var doctype = new DTD(this.tokenizer, name, publicId, systemId);
	doctype.endLocator = this.tokenizer;
	this.document.appendChild(doctype);
};

SAXTreeBuilder.prototype.createElement = function(namespaceURI, localName, attributes) {
	var element = new Element(this.tokenizer, namespaceURI, localName, localName, attributes || []);
	return element;
};

SAXTreeBuilder.prototype.insertComment = function(data, parent) {
	if (!parent)
		parent = this.currentStackItem();
	var comment = new Comment(this.tokenizer, data);
	parent.appendChild(comment);
};

SAXTreeBuilder.prototype.appendCharacters = function(parent, data) {
	var text = new Characters(this.tokenizer, data);
	parent.appendChild(text);
};

SAXTreeBuilder.prototype.insertText = function(data) {
	if (this.redirectAttachToFosterParent && this.openElements.top.isFosterParenting()) {
		var tableIndex = this.openElements.findIndex('table');
		var tableItem = this.openElements.item(tableIndex);
		var table = tableItem.node;
		if (tableIndex === 0) {
			return this.appendCharacters(table, data);
		}
		var text = new Characters(this.tokenizer, data);
		var parent = table.parentNode;
		if (parent) {
			parent.insertBetween(text, table.previousSibling, table);
			return;
		}
		var stackParent = this.openElements.item(tableIndex - 1).node;
		stackParent.appendChild(text);
		return;
	}
	this.appendCharacters(this.currentStackItem().node, data);
};

SAXTreeBuilder.prototype.attachNode = function(node, parent) {
	parent.appendChild(node);
};

SAXTreeBuilder.prototype.attachNodeToFosterParent = function(child, table, stackParent) {
	var parent = table.parentNode;
	if (parent)
		parent.insertBetween(child, table.previousSibling, table);
	else
		stackParent.appendChild(child);
};

SAXTreeBuilder.prototype.detachFromParent = function(element) {
	element.detach();
};

SAXTreeBuilder.prototype.reparentChildren = function(oldParent, newParent) {
	newParent.appendChildren(oldParent.firstChild);
};

SAXTreeBuilder.prototype.getFragment = function() {
	var fragment = new DocumentFragment();
	this.reparentChildren(this.openElements.rootNode, fragment);
	return fragment;
};

function getAttribute(node, name) {
	for (var i = 0; i < node.attributes.length; i++) {
		var attribute = node.attributes[i];
		if (attribute.nodeName === name)
			return attribute.nodeValue;
	}
}

SAXTreeBuilder.prototype.addAttributesToElement = function(element, attributes) {
	for (var i = 0; i < attributes.length; i++) {
		var attribute = attributes[i];
		if (!getAttribute(element, attribute.nodeName))
			element.attributes.push(attribute);
	}
};

var NodeType = {
	/**
	 * A CDATA section.
	 */
	CDATA: 1,
	/**
	 * A run of characters.
	 */
	CHARACTERS: 2,
	/**
	 * A comment.
	 */
	COMMENT: 3,
	/**
	 * A document.
	 */
	DOCUMENT: 4,
	/**
	 * A document fragment.
	 */
	DOCUMENT_FRAGMENT: 5,
	/**
	 * A DTD.
	 */
	DTD: 6,
	/**
	 * An element.
	 */
	ELEMENT: 7,
	/**
	 * An entity.
	 */
	ENTITY: 8,
	/**
	 * A run of ignorable whitespace.
	 */
	IGNORABLE_WHITESPACE: 9,
	/**
	 * A processing instruction.
	 */
	PROCESSING_INSTRUCTION: 10,
	/**
	 * A skipped entity.
	 */
	SKIPPED_ENTITY: 11
};
/**
 * The common node superclass.
 * @version $Id$
 * @author hsivonen
 */
function Node(locator) {
	if (!locator) {
		this.columnNumber = -1;
		this.lineNumber = -1;
	} else {
		this.columnNumber = locator.columnNumber;
		this.lineNumber = locator.lineNumber;
	}
	this.parentNode = null;
	this.nextSibling = null;
	this.firstChild = null;
}

/**
 * Visit the node.
 * 
 * @param treeParser the visitor
 * @throws SAXException if stuff goes wrong
 */
Node.prototype.visit = function(treeParser) {
	throw new Error("Not Implemented");
};

/**
 * Revisit the node.
 * 
 * @param treeParser the visitor
 * @throws SAXException if stuff goes wrong
 */
Node.prototype.revisit = function(treeParser) {
	return;
};


// Subclass-specific accessors that are hoisted here to 
// avoid casting.

/**
 * Detach this node from its parent.
 */
Node.prototype.detach = function() {
	if (this.parentNode !== null) {
		this.parentNode.removeChild(this);
		this.parentNode = null;
	}
};

Object.defineProperty(Node.prototype, 'previousSibling', {
	get: function() {
		var prev = null;
		var next = this.parentNode.firstChild;
		for(;;) {
			if (this == next) {
				return prev;
			}
			prev = next;
			next = next.nextSibling;
		}
	}
});


function ParentNode(locator) {
	Node.call(this, locator);
	this.lastChild = null;
	this._endLocator = null;
}

ParentNode.prototype = Object.create(Node.prototype);

/**
 * Insert a new child before a pre-existing child and return the newly inserted child.
 * @param child the new child
 * @param sibling the existing child before which to insert (must be a child of this node) or <code>null</code> to append
 * @return <code>child</code>
 */
ParentNode.prototype.insertBefore = function(child, sibling) {
	//assert sibling == null || this == sibling.getParentNode();
	if (!sibling) {
		return this.appendChild(child);
	}
	child.detach();
	child.parentNode = this;
	if (this.firstChild == sibling) {
		child.nextSibling = sibling;
		this.firstChild = child;
	} else {
		var prev = this.firstChild;
		var next = this.firstChild.nextSibling;
		while (next != sibling) {
			prev = next;
			next = next.nextSibling;
		}
		prev.nextSibling = child;
		child.nextSibling = next;
	}
	return child;
};

ParentNode.prototype.insertBetween = function(child, prev, next) {
	// assert prev == null || this == prev.getParentNode();
	// assert next == null || this == next.getParentNode();
	// assert prev != null || next == firstChild;
	// assert next != null || prev == lastChild;
	// assert prev == null || next == null || prev.getNextSibling() == next;
	if (!next) {
		return this.appendChild(child);
	}
	child.detach();
	child.parentNode = this;
	child.nextSibling = next;
	if (!prev) {
		firstChild = child;
	} else {
		prev.nextSibling = child;
	}
	return child;
};

/**
 * Append a child to this node and return the child.
 * 
 * @param child the child to append.
 * @return <code>child</code>
 */
ParentNode.prototype.appendChild = function(child) {
	child.detach();
	child.parentNode = this;
	if (!this.firstChild) {
		this.firstChild = child;
	} else {
		this.lastChild.nextSibling = child;
	}
	this.lastChild = child;
	return child;
};

/**
 * Append the children of another node to this node removing them from the other node .
 * @param parent the other node whose children to append to this one
 */
ParentNode.prototype.appendChildren = function(parent) {
	var child = parent.firstChild;
	if (!child) {
		return;
	}
	var another = parent;
	if (!this.firstChild) {
		this.firstChild = child;
	} else {
		this.lastChild.nextSibling = child;
	}
	this.lastChild = another.lastChild;
	do {
		child.parentNode = this;
	} while ((child = child.nextSibling));
	another.firstChild = null;
	another.lastChild = null;
};

/**
 * Remove a child from this node.
 * @param node the child to remove
 */
ParentNode.prototype.removeChild = function(node) {
	//assert this == node.getParentNode();
	if (this.firstChild == node) {
		this.firstChild = node.nextSibling;
		if (this.lastChild == node) {
			this.lastChild = null;
		}
	} else {
		var prev = this.firstChild;
		var next = this.firstChild.nextSibling;
		while (next != node) {
			prev = next;
			next = next.nextSibling;
		}
		prev.nextSibling = node.nextSibling;
		if (this.lastChild == node) {
			this.lastChild = prev;
		}
	}
	node.parentNode = null;
	return node;
};

Object.defineProperty(ParentNode.prototype, 'endLocator', {
	get: function() {
		return this._endLocator;
	},
	set: function(endLocator) {
		this._endLocator = {
			lineNumber: endLocator.lineNumber,
			columnNumber: endLocator.columnNumber
		};
	}
});

/**
 * A document.
 * @version $Id$
 * @author hsivonen
 */
function Document (locator) {
	ParentNode.call(this, locator);
	this.nodeType = NodeType.DOCUMENT;
}

Document.prototype = Object.create(ParentNode.prototype);

/**
 * 
 * @see nu.validator.saxtree.Node#visit(nu.validator.saxtree.TreeParser)
 */
Document.prototype.visit = function(treeParser) {
	treeParser.startDocument(this);
};

/**
 * @see nu.validator.saxtree.Node#revisit(nu.validator.saxtree.TreeParser)
 */
Document.prototype.revisit = function(treeParser) {
	treeParser.endDocument(this.endLocator);
};

/**
 * A document fragment.
 * 
 * @version $Id$
 * @author hsivonen
 */

/**
 * The constructor.
 */
function DocumentFragment() {
	ParentNode.call(this, new Locator());
	this.nodeType = NodeType.DOCUMENT_FRAGMENT;
}

DocumentFragment.prototype = Object.create(ParentNode.prototype);
/**
 * 
 * @see nu.validator.saxtree.Node#visit(nu.validator.saxtree.TreeParser)
 */
DocumentFragment.prototype.visit = function(treeParser) {
	// nothing
};

/**
 * An element.
 * @version $Id$
 * @author hsivonen
 */
function Element(locator, uri, localName, qName, atts, prefixMappings) {
	ParentNode.call(this, locator);
	this.uri = uri;
	this.localName = localName;
	this.qName = qName;
	this.attributes = atts;
	this.prefixMappings = prefixMappings;
	this.nodeType = NodeType.ELEMENT;
}

Element.prototype = Object.create(ParentNode.prototype);

/**
 * 
 * @see nu.validator.saxtree.Node#visit(nu.validator.saxtree.TreeParser)
 */
Element.prototype.visit = function(treeParser) {
	if (this.prefixMappings) {
		for (var key in prefixMappings) {
			var mapping = prefixMappings[key];
			treeParser.startPrefixMapping(mapping.getPrefix(),
					mapping.getUri(), this);
		}
	}
	treeParser.startElement(this.uri, this.localName, this.qName, this.attributes, this);
};

/**
 * @see nu.validator.saxtree.Node#revisit(nu.validator.saxtree.TreeParser)
 */
Element.prototype.revisit = function(treeParser) {
	treeParser.endElement(this.uri, this.localName, this.qName, this.endLocator);
	if (this.prefixMappings) {
		for (var key in prefixMappings) {
			var mapping = prefixMappings[key];
			treeParser.endPrefixMapping(mapping.getPrefix(), this.endLocator);
		}
	}
};

/**
 * The constructor.
 * @param locator the locator
 * @param {String} data the buffer
 */
function Characters(locator, data){
	Node.call(this, locator);
	this.data = data;
	this.nodeType = NodeType.CHARACTERS;
}

Characters.prototype = Object.create(Node.prototype);

/**
 * 
 * @see nu.validator.saxtree.Node#visit(nu.validator.saxtree.TreeParser)
 */
Characters.prototype.visit = function (treeParser) {
	treeParser.characters(this.data, 0, this.data.length, this);
};

/**
 * The constructor.
 * @param buf the buffer
 * @param start the offset
 * @param length the length
 */
function IgnorableWhitespace(locator, data) {
	Node.call(this, locator);
	this.data = data;
	this.nodeType = NodeType.IGNORABLE_WHITESPACE;
}

IgnorableWhitespace.prototype = Object.create(Node.prototype);

/**
 * 
 * @see nu.validator.saxtree.Node#visit(nu.validator.saxtree.TreeParser)
 */
IgnorableWhitespace.prototype.visit = function(treeParser) {
	treeParser.ignorableWhitespace(this.data, 0, this.data.length, this);
};

/**
 * A comment.
 * 
 * @version $Id$
 * @author hsivonen
 */

/**
 * The constructor.
 * @param locator the locator
 * @param buf the buffer
 * @param start the offset
 * @param length the length
 */
function Comment(locator, data) {
	Node.call(this, locator);
	this.data = data;
	this.nodeType = NodeType.COMMENT;
}

Comment.prototype = Object.create(Node.prototype);

/**
 * 
 * @see nu.validator.saxtree.Node#visit(nu.validator.saxtree.TreeParser)
 */
Comment.prototype.visit = function(treeParser) {
	treeParser.comment(this.data, 0, this.data.length, this);
};

/**
 * A CDATA section.
 * @version $Id$
 * @author hsivonen
 */
/**
 * The constructor.
 * @param locator the locator
 */
function CDATA(locator) {
	ParentNode.call(this, locator);
	this.nodeType = NodeType.CDATA;
}

CDATA.prototype = Object.create(ParentNode.prototype);

/**
 * @see nu.validator.saxtree.Node#visit(nu.validator.saxtree.TreeParser)
 */
CDATA.prototype.visit = function(treeParser) {
	treeParser.startCDATA(this);
};

/**
 * 
 * @throws SAXException if things go wrong
 * @see nu.validator.saxtree.Node#revisit(nu.validator.saxtree.TreeParser)
 */
CDATA.prototype.revisit = function(treeParser) {
	treeParser.endCDATA(this.endLocator);
};

/**
 * An entity.
 * @version $Id$
 * @author hsivonen
 */

/**
 * The constructor.
 * @param locator the locator
 * @param name the name
 */
function Entity(name) {
	ParentNode.call(this);
	this.name = name;
	this.nodeType = NodeType.ENTITY;
}

Entity.prototype = Object.create(ParentNode.prototype);

/**
 * 
 * @see nu.validator.saxtree.Node#visit(nu.validator.saxtree.TreeParser)
 */
Entity.prototype.visit = function(treeParser) {
	treeParser.startEntity(this.name, this);
};

/**
 * @see nu.validator.saxtree.Node#revisit(nu.validator.saxtree.TreeParser)
 */
Entity.prototype.revisit = function(treeParser) {
	treeParser.endEntity(this.name);
};

/**
 * A skipped entity.
 * @version $Id$
 * @author hsivonen
 */

/**
 * Constructor.
 * @param locator the locator
 * @param name the name
 */

function SkippedEntity(name) {
	Node.call(this);
	this.name = name;
	this.nodeType = NodeType.SKIPPED_ENTITY;
}

SkippedEntity.prototype = Object.create(Node.prototype);

/**
 * 
 * @see nu.validator.saxtree.Node#visit(nu.validator.saxtree.TreeParser)
 */
SkippedEntity.prototype.visit = function(treeParser) {
	treeParser.skippedEntity(this.name, this);
};

/**
 * A processing instruction.
 * @version $Id$
 * @author hsivonen
 */

/**
 * PI target.
 */
//private final String target;

/**
 * PI data.
 */
//private final String data;

/**
 * Constructor.
 * @param locator the locator
 * @param target PI target
 * @param data PI data
 */
function ProcessingInstruction(target, data) {
	Node.call(this);
	this.target = target;
	this.data = data;
}

ProcessingInstruction.prototype = Object.create(Node.prototype);

/**
 * 
 * @see nu.validator.saxtree.Node#visit(nu.validator.saxtree.TreeParser)
 */
ProcessingInstruction.prototype.visit = function(treeParser) {
	treeParser.processingInstruction(this.target, this.data, this);
};

/**
 * 
 * @see nu.validator.saxtree.Node#getNodeType()
 */
ProcessingInstruction.prototype.getNodeType = function() {
	return NodeType.PROCESSING_INSTRUCTION;
};

/**
 * The constructor.
 * @param locator the locator
 * @param name the name
 * @param publicIdentifier the public id
 * @param systemIdentifier the system id
 */
function DTD(name, publicIdentifier, systemIdentifier) {
	ParentNode.call(this);
	this.name = name;
	this.publicIdentifier = publicIdentifier;
	this.systemIdentifier = systemIdentifier;
	this.nodeType = NodeType.DTD;
}

DTD.prototype = Object.create(ParentNode.prototype);

/**
 * 
 * @see nu.validator.saxtree.Node#visit(nu.validator.saxtree.TreeParser)
 */
DTD.prototype.visit = function(treeParser) {
	treeParser.startDTD(this.name, this.publicIdentifier, this.systemIdentifier, this);
};

/**
 * @see nu.validator.saxtree.Node#revisit(nu.validator.saxtree.TreeParser)
 */
DTD.prototype.revisit = function(treeParser) {
	treeParser.endDTD();
};

exports.SAXTreeBuilder = SAXTreeBuilder;
