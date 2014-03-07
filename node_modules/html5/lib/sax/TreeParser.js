/**
 * A tree visitor that replays a tree as SAX events.
 * @version $Id$
 * @author hsivonen
 */

/**
 * The constructor.
 * 
 * @param contentHandler
 *            must not be <code>null</code>
 * @param lexicalHandler
 *            may be <code>null</code>
 */
function TreeParser(contentHandler, lexicalHandler){

	/**
	 * The content handler.
	 */
	this.contentHandler;

	/**
	 * The lexical handler.
	 */
	this.lexicalHandler;

	/**
	 * The current locator.
	 */
	this.locatorDelegate;

	if (!contentHandler) {
		throw new IllegalArgumentException("contentHandler was null.");
	}
	this.contentHandler = contentHandler;
	if (!lexicalHandler) {
		this.lexicalHandler = new NullLexicalHandler();
	} else {
		this.lexicalHandler = lexicalHandler;
	}
}

/**
 * Causes SAX events for the tree rooted at the argument to be emitted.
 * <code>startDocument()</code> and <code>endDocument()</code> are only
 * emitted for a <code>Document</code> node.
 * 
 * @param node
 *            the root
 * @throws SAXException
 */
TreeParser.prototype.parse = function(node) {
	this.contentHandler.documentLocator = this;
	var current = node;
	var next;
	for (;;) {
		current.visit(this);
		if (next = current.firstChild) {
			current = next;
			continue;
		}
		for (;;) {
			current.revisit(this);
			if (current == node) {
				return;
			}
			if (next = current.nextSibling) {
				current = next;
				break;
			}
			current = current.parentNode;
		}
	}
};

/**
 * @see org.xml.sax.ContentHandler#characters(char[], int, int)
 */
TreeParser.prototype.characters = function(ch, start, length, locator) {
	this.locatorDelegate = locator;
	this.contentHandler.characters(ch, start, length);
};

/**
 * @see org.xml.sax.ContentHandler#endDocument()
 */
TreeParser.prototype.endDocument = function(locator) {
	this.locatorDelegate = locator;
	this.contentHandler.endDocument();
};

/**
 * @see org.xml.sax.ContentHandler#endElement(java.lang.String,
 *      java.lang.String, java.lang.String)
 */
TreeParser.prototype.endElement = function(uri, localName, qName, locator) {
	this.locatorDelegate = locator;
	this.contentHandler.endElement(uri, localName, qName);
};

/**
 * @see org.xml.sax.ContentHandler#endPrefixMapping(java.lang.String)
 */
TreeParser.prototype.endPrefixMapping = function(prefix, locator) {
	this.locatorDelegate = locator;
	this.contentHandler.endPrefixMapping(prefix);
};

/**
 * @see org.xml.sax.ContentHandler#ignorableWhitespace(char[], int, int)
 */
TreeParser.prototype.ignorableWhitespace = function(ch, start, length, locator) {
	this.locatorDelegate = locator;
	this.contentHandler.ignorableWhitespace(ch, start, length);
};

/**
 * @see org.xml.sax.ContentHandler#processingInstruction(java.lang.String,
 *      java.lang.String)
 */
TreeParser.prototype.processingInstruction = function(target, data, locator) {
	this.locatorDelegate = locator;
	this.contentHandler.processingInstruction(target, data);
};

/**
 * @see org.xml.sax.ContentHandler#skippedEntity(java.lang.String)
 */
TreeParser.prototype.skippedEntity = function(name, locator) {
	this.locatorDelegate = locator;
	this.contentHandler.skippedEntity(name);
};

/**
 * @see org.xml.sax.ContentHandler#startDocument()
 */
TreeParser.prototype.startDocument = function(locator) {
	this.locatorDelegate = locator;
	this.contentHandler.startDocument();
};

/**
 * @see org.xml.sax.ContentHandler#startElement(java.lang.String,
 *      java.lang.String, java.lang.String, org.xml.sax.Attributes)
 */
TreeParser.prototype.startElement = function(uri, localName, qName, atts, locator) {
	this.locatorDelegate = locator;
	this.contentHandler.startElement(uri, localName, qName, atts);
};

/**
 * @see org.xml.sax.ContentHandler#startPrefixMapping(java.lang.String,
 *      java.lang.String)
 */
TreeParser.prototype.startPrefixMapping = function(prefix, uri, locator) {
	this.locatorDelegate = locator;
	this.contentHandler.startPrefixMapping(prefix, uri);
};

/**
 * @see org.xml.sax.ext.LexicalHandler#comment(char[], int, int)
 */
TreeParser.prototype.comment = function(ch, start, length, locator) {
	this.locatorDelegate = locator;
	this.lexicalHandler.comment(ch, start, length);
};

/**
 * @see org.xml.sax.ext.LexicalHandler#endCDATA()
 */
TreeParser.prototype.endCDATA = function(locator) {
	this.locatorDelegate = locator;
	this.lexicalHandler.endCDATA();
};

/**
 * @see org.xml.sax.ext.LexicalHandler#endDTD()
 */
TreeParser.prototype.endDTD = function(locator) {
	this.locatorDelegate = locator;
	this.lexicalHandler.endDTD();
};

/**
 * @see org.xml.sax.ext.LexicalHandler#endEntity(java.lang.String)
 */
TreeParser.prototype.endEntity = function(name, locator) {
	this.locatorDelegate = locator;
	this.lexicalHandler.endEntity(name);
};

/**
 * @see org.xml.sax.ext.LexicalHandler#startCDATA()
 */
TreeParser.prototype.startCDATA = function(locator) {
	this.locatorDelegate = locator;
	this.lexicalHandler.startCDATA();
};

/**
 * @see org.xml.sax.ext.LexicalHandler#startDTD(java.lang.String,
 *      java.lang.String, java.lang.String)
 */
TreeParser.prototype.startDTD = function(name, publicId, systemId, locator) {
	this.locatorDelegate = locator;
	this.lexicalHandler.startDTD(name, publicId, systemId);
};

/**
 * @see org.xml.sax.ext.LexicalHandler#startEntity(java.lang.String)
 */
TreeParser.prototype.startEntity = function(name, locator) {
	this.locatorDelegate = locator;
	this.lexicalHandler.startEntity(name);
};

Object.defineProperty(TreeParser.prototype, 'columnNumber', {
	get: function() {
		if (!this.locatorDelegate)
			return -1;
		else
			return this.locatorDelegate.columnNumber;
	}
});

Object.defineProperty(TreeParser.prototype, 'lineNumber', {
	get: function() {
		if (!this.locatorDelegate)
			return -1;
		else
			return this.locatorDelegate.lineNumber;
	}
});

/**
 * A lexical handler that does nothing.
 * @version $Id$
 * @author hsivonen
 */
// implements LexicalHandler
function NullLexicalHandler() {

}

NullLexicalHandler.prototype.comment = function() {};
NullLexicalHandler.prototype.endCDATA = function() {};
NullLexicalHandler.prototype.endDTD = function() {};
NullLexicalHandler.prototype.endEntity = function() {};
NullLexicalHandler.prototype.startCDATA = function() {};
NullLexicalHandler.prototype.startDTD = function() {};
NullLexicalHandler.prototype.startEntity = function() {};

exports.TreeParser = TreeParser;
