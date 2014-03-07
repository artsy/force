var elementNamespaces = {
	"http://www.w3.org/2000/svg": 'svg',
	"http://www.w3.org/1998/Math/MathML": 'math'
};

var attributeNamespaces = {
	"http://www.w3.org/1999/xlink": 'xlink',
	"http://www.w3.org/XML/1998/namespace": 'xml',
	"http://www.w3.org/2000/xmlns/": 'xmlns'
};

exports.serializeTestOutput = function(doc) {
	var lines = [];
	var indent = '';

	function walk(node) {
		switch (node.nodeType) {
			case node.DOCUMENT_FRAGMENT_NODE:
			case node.DOCUMENT_NODE:
				for (var child = 0; child < node.childNodes.length; child++) {
					walk(node.childNodes[child]);
				}
				break;
			case node.ELEMENT_NODE:
				var elementNsDecorator = '';
				if (node.namespaceURI in elementNamespaces) {
					elementNsDecorator = elementNamespaces[node.namespaceURI] + ' ';
				}
				lines.push(indent + '<' + elementNsDecorator + node.localName + ">");
				indent += '  ';
				var attrs = [];
				for (var i = 0; i < node.attributes.length; i++) {
					attrs.push(node.attributes.item(i));
				}
				attrs = attrs.sort(function(a1, a2) {
					if ( a1.nodeName < a2.nodeName) return -1;
					if ( a1.nodeName > a2.nodeName) return 1;
					if ( a1.nodeName == a2.nodeName) return 0;
				});
				for (var i = 0; i < attrs.length; i++) {
					var attrNsDecorator = '';
					if (attrs[i].namespaceURI in attributeNamespaces) {
						attrNsDecorator = attributeNamespaces[attrs[i].namespaceURI] + ' ';
					}
					lines.push(indent + attrNsDecorator + attrs[i].localName + '="' + attrs[i].nodeValue + '"');
				}
				for (var child = 0; child < node.childNodes.length; child++) {
					walk(node.childNodes[child]);
				}
				indent = indent.slice(2);
				break;
			case node.TEXT_NODE:
				lines.push(indent + '"' + node.nodeValue + '"');
				break;
			case node.COMMENT_NODE:
				lines.push(indent + '<!-- ' + node.nodeValue + ' -->');
				break;
			case node.DOCUMENT_TYPE_NODE:
				var ids = '';
				if (node.publicId || node.systemId) {
					ids = ' "' + node.publicId + '" "' + node.systemId + '"';
				}
				lines.push(indent + '<!DOCTYPE ' + node.nodeName + ids + '>');
				break;
		}
	}

	walk(doc);

	return lines.join('\n');
};