require('../core-upgrade');
var HTML5 = require('../html5');
var events = require('events');
var util = require('util');
var Buffer = require('./buffer').Buffer;
var Models = HTML5.Models;

var ENTITY_KEYS = Object.keys(HTML5.ENTITIES);

var Tokenizer = HTML5.Tokenizer = function HTML5Tokenizer(input, document, tree) {
	events.EventEmitter.call(this);
	var state;
	var buffer = new Buffer();
	var current_token = null;
	var temporaryBuffer = null;
	var source;

	function data_state(buffer) {
		var data = buffer.char();
		if (data === HTML5.EOF) {
			emitToken(HTML5.EOF_TOK);
			return false;
		} else if (data == '&') {
			newState(entity_data_state);
		} else if (data == '<') {
			newState(tag_open_state);
		} else if (data == '\u0000') {
			emitToken({type: 'Characters', data: data});
			buffer.commit();
		} else if (HTML5.SPACE_CHARACTERS_R.test(data)) {
			emitToken({type: 'SpaceCharacters', data: data + buffer.matchWhile(HTML5.SPACE_CHARACTERS)});
			buffer.commit();
		} else {
			var chars = buffer.matchUntil("&|<|\u0000");
			emitToken({type: 'Characters', data: data + chars});
			buffer.commit();
		}
		return true;
	}

	var entity_data_state = function entity_data_state(buffer) {
		var entity = consume_entity(buffer);
		if (entity) {
			emitToken({type: 'Characters', data: entity});
		} else {
			emitToken({type: 'Characters', data: '&'});
		}
		newState(data_state);
		return true;
	};

	this.tokenize = function() {
		if (this.pump) this.pump();
	};

	var emitToken = function emitToken(tok) { 
		tok = normalize_token(tok);
		HTML5.debug('tokenizer.token', tok);
		this.emit('token', tok);
	}.bind(this);

	function consume_entity(buffer, allowed_char, from_attr) {
		var char = null;
		var chars = buffer.char();
		var c;
		if (chars === HTML5.EOF) return false;
		if (chars.match(HTML5.SPACE_CHARACTERS) || chars == '<' || chars == '&'
			|| (allowed_char && allowed_char == chars)) {
			buffer.unget(chars);
		} else if (chars[0] == '#') { // Maybe a numeric entity
			c = buffer.shift(2);
			if (c === HTML5.EOF) {
				parse_error("expected-numeric-entity-but-got-eof");
				buffer.unget(chars);
				return false;
			}
			chars += c;
			if (chars[1] && chars[1].toLowerCase() == 'x' && HTML5.HEX_DIGITS_R.test(chars[2])) {
				// Hex entity
				buffer.unget(chars[2]);
				char = consume_numeric_entity(buffer, true);
			} else if (chars[1] && HTML5.DIGITS_R.test(chars[1])) {
				// Decimal entity
				buffer.unget(chars.slice(1));
				char = consume_numeric_entity(buffer, false);
			} else {
				// Not numeric
				buffer.unget(chars);
				parse_error("expected-numeric-entity");
			}
		} else {
			var filteredEntityList = ENTITY_KEYS.filter(function(e) {
				return e[0] == chars[0];
			});
			var entityName = null;
			var matches = function(e) {
				return e.indexOf(chars) === 0;
			};
			while(true) {
				if (filteredEntityList.some(matches)) {
					filteredEntityList = filteredEntityList.filter(matches);
					c = buffer.char();
					if (c !== HTML5.EOF) {
						chars += c;
					} else {
						break;
					}
				} else {
					break;
				}

				if (HTML5.ENTITIES[chars]) {
					entityName = chars;
					if (entityName[entityName.length - 1] == ';') break;
				}
			} 

			if (entityName) {
				if (entityName[entityName.length - 1] != ';') {
					parse_error("named-entity-without-semicolon");
				}
				if (entityName[entityName.length - 1] != ';' && from_attr && (HTML5.ASCII_LETTERS_R.test(chars.substr(entityName.length, 1)) || HTML5.DIGITS_R.test(chars.substr(entityName.length, 1)) || chars.substr(entityName.length, 1) == '=')) {
					buffer.unget(chars);
					char = '&';
				} else {
					buffer.unget(chars.slice(entityName.length));
					char = HTML5.ENTITIES[entityName];
				}
			} else {
				parse_error("expected-named-entity");
				buffer.unget(chars);
			}
		}

		return char;
	}

	function replaceEntityNumbers(c) {
		switch(c) {
			case 0x00: return 0xFFFD; // REPLACEMENT CHARACTER
			case 0x13: return 0x0010; // Carriage return
			case 0x80: return 0x20AC; // EURO SIGN
			case 0x81: return 0x0081; // <control>
			case 0x82: return 0x201A; // SINGLE LOW-9 QUOTATION MARK
			case 0x83: return 0x0192; // LATIN SMALL LETTER F WITH HOOK
			case 0x84: return 0x201E; // DOUBLE LOW-9 QUOTATION MARK
			case 0x85: return 0x2026; // HORIZONTAL ELLIPSIS
			case 0x86: return 0x2020; // DAGGER
			case 0x87: return 0x2021; // DOUBLE DAGGER
			case 0x88: return 0x02C6; // MODIFIER LETTER CIRCUMFLEX ACCENT
			case 0x89: return 0x2030; // PER MILLE SIGN
			case 0x8A: return 0x0160; // LATIN CAPITAL LETTER S WITH CARON
			case 0x8B: return 0x2039; // SINGLE LEFT-POINTING ANGLE QUOTATION MARK
			case 0x8C: return 0x0152; // LATIN CAPITAL LIGATURE OE
			case 0x8D: return 0x008D; // <control>
			case 0x8E: return 0x017D; // LATIN CAPITAL LETTER Z WITH CARON
			case 0x8F: return 0x008F; // <control>
			case 0x90: return 0x0090; // <control>
			case 0x91: return 0x2018; // LEFT SINGLE QUOTATION MARK
			case 0x92: return 0x2019; // RIGHT SINGLE QUOTATION MARK
			case 0x93: return 0x201C; // LEFT DOUBLE QUOTATION MARK
			case 0x94: return 0x201D; // RIGHT DOUBLE QUOTATION MARK
			case 0x95: return 0x2022; // BULLET
			case 0x96: return 0x2013; // EN DASH
			case 0x97: return 0x2014; // EM DASH
			case 0x98: return 0x02DC; // SMALL TILDE
			case 0x99: return 0x2122; // TRADE MARK SIGN
			case 0x9A: return 0x0161; // LATIN SMALL LETTER S WITH CARON
			case 0x9B: return 0x203A; // SINGLE RIGHT-POINTING ANGLE QUOTATION MARK
			case 0x9C: return 0x0153; // LATIN SMALL LIGATURE OE
			case 0x9D: return 0x009D; // <control>
			case 0x9E: return 0x017E; // LATIN SMALL LETTER Z WITH CARON
			case 0x9F: return 0x0178; // LATIN CAPITAL LETTER Y WITH DIAERESIS
			default:
				if ((c >= 0xD800 && c <= 0xDFFF) || c >= 0x10FFFF) { /// @todo. The spec says > 0x10FFFF, not >=. Section 8.2.4.69.
					return 0xFFFD;
				} else if ((c >= 0x0001 && c <= 0x0008) || (c >= 0x000E && c <= 0x001F) ||
					(c >= 0x007F && c <= 0x009F) || (c >= 0xFDD0 && c <= 0xFDEF) ||
					c == 0x000B || c == 0xFFFE || c == 0x1FFFE || c == 0x2FFFFE ||
					c == 0x2FFFF || c == 0x3FFFE || c == 0x3FFFF || c == 0x4FFFE ||
					c == 0x4FFFF || c == 0x5FFFE || c == 0x5FFFF || c == 0x6FFFE ||
					c == 0x6FFFF || c == 0x7FFFE || c == 0x7FFFF || c == 0x8FFFE ||
					c == 0x8FFFF || c == 0x9FFFE || c == 0x9FFFF || c == 0xAFFFE ||
					c == 0xAFFFF || c == 0xBFFFE || c == 0xBFFFF || c == 0xCFFFE ||
					c == 0xCFFFF || c == 0xDFFFE || c == 0xDFFFF || c == 0xEFFFE ||
					c == 0xEFFFF || c == 0xFFFFE || c == 0xFFFFF || c == 0x10FFFE ||
					c == 0x10FFFF) {
					return c;
				}
		}
	}

	function consume_numeric_entity(buffer, hex) {
		var allowed, radix;
		if (hex) {
			allowed = HTML5.HEX_DIGITS_R;
			radix = 16;
		} else {
			allowed = HTML5.DIGITS_R;
			radix = 10;
		}

		var chars = '';

		var c = buffer.char();
		while(c !== HTML5.EOF && allowed.test(c)) {
			chars = chars + c;
			c = buffer.char();
		}

		var charAsInt = parseInt(chars, radix);

		var replacement = replaceEntityNumbers(charAsInt);
		if (replacement) {
			parse_error("invalid-numeric-entity-replaced");
			charAsInt = replacement;
		}

		var char = String.fromCharCode(charAsInt);
		/*if (charAsInt <= 0x10FFFF && !(charAsInt >= 0xD800 && charAsInt <= 0xDFFF)) {
		} else {
			char = String.fromCharCode(0xFFFD);
			parse_error("cant-convert-numeric-entity");
		} */

		if (c !== ';') {
			parse_error("numeric-entity-without-semicolon");
			buffer.unget(c);
		} 

		return char;
	}

	function process_entity_in_attribute(buffer, allowed_char) {
		var entity = consume_entity(buffer, allowed_char, true);
		if (entity) {
			current_token.data.last().nodeValue += entity;
		} else {
			current_token.data.last().nodeValue += '&';
		}
	}

	function rcdata_state(buffer) {
		var data = buffer.char();
		if (data === HTML5.EOF) {
			emitToken(HTML5.EOF_TOK);
			return false;
		} else if (data == '&') {
			newState(entity_rcdata_state);
		} else if (data == '<') {
			newState(rcdata_less_than_sign_state);
		} else if (data == "\u0000") {
			parse_error("invalid-codepoint");
			emitToken({type: 'Characters', data: '\uFFFD'});
			buffer.commit();
		} else if (HTML5.SPACE_CHARACTERS_R.test(data)) {
			emitToken({type: 'SpaceCharacters', data: data + buffer.matchWhile(HTML5.SPACE_CHARACTERS)});
			buffer.commit();
		} else {
			var chars = buffer.matchUntil("&|<|\u0000");
			emitToken({type: 'Characters', data: data + chars});
			buffer.commit();
		}
		return true;
	}

	function entity_rcdata_state(buffer) {
		var entity = consume_entity(buffer);
		if (entity) {
			emitToken({type: 'Characters', data: entity});
		} else {
			emitToken({type: 'Characters', data: '&'});
		}
		newState(rcdata_state);
		return true;
	}

	function rawtext_state(buffer) {
		var data = buffer.char();
		if (data === HTML5.EOF) {
			emitToken(HTML5.EOF_TOK);
			return false;
		} else if (data == '<') {
			newState(rawtext_less_than_sign_state);
		} else if (data == "\u0000") {
			parse_error("invalid-codepoint");
			emitToken({type: 'Characters', data: '\uFFFD'});
			buffer.commit();
		} else {
			var chars = buffer.matchUntil("<|\u0000");
			emitToken({type: 'Characters', data: data + chars});
			buffer.commit();
		}
		return true;
	}

	function plaintext_state(buffer) {
		var data = buffer.char();
		if (data === HTML5.EOF) {
			emitToken(HTML5.EOF_TOK);
			return false;
		} else if (data == "\u0000") {
			parse_error("invalid-codepoint");
			emitToken({type: 'Characters', data: '\uFFFD'});
			buffer.commit();
		} else {
			var chars = buffer.matchUntil("\u0000");
			emitToken({type: 'Characters', data: data + chars});
			buffer.commit();
		}
		return true;
	}


	function script_data_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			emitToken(HTML5.EOF_TOK);
			return false;
		} else if (data == '<') {
			newState(script_data_less_than_sign_state);
		} else if (data == '\u0000') {
			parse_error("invalid-codepoint");
			emitToken({type: 'Characters', data: '\uFFFD'});
			buffer.commit();
		} else {
			var chars = buffer.matchUntil("<|\u0000");
			emitToken({type: 'Characters', data: data + chars});
			buffer.commit();
		}
		return true;
	}

	function rcdata_less_than_sign_state(buffer) {
		var data = buffer.shift(1);
		if (data == "/") {
			temporaryBuffer = '';
			newState(rcdata_end_tag_open_state);
		} else {
			emitToken({type: 'Characters', data: '<'});
			buffer.unget(data);
			newState(rcdata_state);
		}
		return true;
	}

	function rcdata_end_tag_open_state(buffer) {
		var data = buffer.shift(1);
		if (HTML5.ASCII_LETTERS_R.test(data)) {
			temporaryBuffer += data;
			newState(rcdata_end_tag_name_state);
		} else {
			emitToken({type: 'Characters', data: '</'});
			buffer.unget(data);
			newState(rcdata_state);
		}
		return true;
	}

	function rcdata_end_tag_name_state(buffer) {
		var appropriate = current_token && (current_token.name == temporaryBuffer.toLowerCase());
		var data = buffer.shift(1);
		if (HTML5.SPACE_CHARACTERS_R.test(data) && appropriate) {
			current_token = {type: 'EndTag', name: temporaryBuffer, data: [], self_closing: false};
			newState(before_attribute_name_state);
		} else if (data == '/' && appropriate) {
			current_token = {type: 'EndTag', name: temporaryBuffer, data: [], self_closing: false};
			newState(self_closing_tag_state);
		} else if (data == '>' && appropriate) {
			current_token = {type: 'EndTag', name: temporaryBuffer, data: [], self_closing: false};
			emit_current_token();
			newState(data_state);
		} else if (HTML5.ASCII_LETTERS_R.test(data)) {
			temporaryBuffer += data;
			buffer.commit();
		} else {
			emitToken({type: 'Characters', data: '</' + temporaryBuffer});
			buffer.unget(data);
			newState(rcdata_state);
		}
		return true;
	}

	function rawtext_less_than_sign_state(buffer) {
		var data = buffer.shift(1);
		if (data == "/") {
			temporaryBuffer = '';
			newState(rawtext_end_tag_open_state);
		} else {
			emitToken({type: 'Characters', data: '<'});
			buffer.unget(data);
			newState(rawtext_state);
		}
		return true;
	}

	function rawtext_end_tag_open_state(buffer) {
		var data = buffer.shift(1);
		if (HTML5.ASCII_LETTERS_R.test(data)) {
			temporaryBuffer += data;
			newState(rawtext_end_tag_name_state);
		} else {
			emitToken({type: 'Characters', data: '</'});
			buffer.unget(data);
			newState(rawtext_state);
		}
		return true;
	}

	function rawtext_end_tag_name_state(buffer) {
		var appropriate = current_token && (current_token.name == temporaryBuffer.toLowerCase());
		var data = buffer.shift(1);
		if (HTML5.SPACE_CHARACTERS_R.test(data) && appropriate) {
			current_token = {type: 'EndTag', name: temporaryBuffer, data: [], self_closing: false};
			newState(before_attribute_name_state);
		} else if (data == '/' && appropriate) {
			current_token = {type: 'EndTag', name: temporaryBuffer, data: [], self_closing: false};
			newState(self_closing_tag_state);
		} else if (data == '>' && appropriate) {
			current_token = {type: 'EndTag', name: temporaryBuffer, data: [], self_closing: false};
			emit_current_token();
			newState(data_state);
		} else if (HTML5.ASCII_LETTERS_R.test(data)) {
			temporaryBuffer += data;
			buffer.commit();
		} else {
			emitToken({type: 'Characters', data: '</' + temporaryBuffer});
			buffer.unget(data);
			newState(rawtext_state);
		}
		return true;
	}

	function script_data_less_than_sign_state(buffer) {
		var data = buffer.shift(1);
		if (data == "/") {
			temporaryBuffer = '';
			newState(script_data_end_tag_open_state);
		} else if (data == '!') {
			emitToken({type: 'Characters', data: '<!'});
			newState(script_data_escape_start_state);
		} else {
			emitToken({type: 'Characters', data: '<'});
			buffer.unget(data);
			newState(script_data_state);
		}
		return true;
	}

	function script_data_end_tag_open_state(buffer) {
		var data = buffer.shift(1);
		if (HTML5.ASCII_LETTERS_R.test(data)) {
			temporaryBuffer += data;
			newState(script_data_end_tag_name_state);
		} else {
			emitToken({type: 'Characters', data: '</'});
			buffer.unget(data);
			newState(script_data_state);
		}
		return true;
	}

	function script_data_end_tag_name_state(buffer) {
		var appropriate = current_token && (current_token.name == temporaryBuffer.toLowerCase());
		var data = buffer.shift(1);
		if (HTML5.SPACE_CHARACTERS_R.test(data) && appropriate) {
			current_token = {type: 'EndTag', name: 'script', data: [], self_closing: false};
			newState(before_attribute_name_state);
		} else if (data == '/' && appropriate) {
			current_token = {type: 'EndTag', name: 'script', data: [], self_closing: false};
			newState(self_closing_tag_state);
		} else if (data == '>' && appropriate) {
			current_token = {type: 'EndTag', name: 'script', data: [], self_closing: false};
			emit_current_token();
		} else if (HTML5.ASCII_LETTERS_R.test(data)) {
			temporaryBuffer += data;
			buffer.commit();
		} else {
			emitToken({type: 'Characters', data: '</' + temporaryBuffer});
			buffer.unget(data);
			newState(script_data_state);
		}
		return true;
	}

	function script_data_escape_start_state(buffer) {
		var data = buffer.shift(1);
		if (data == '-') {
			emitToken({type: 'Characters', data: '-'});
			newState(script_data_escape_start_dash_state);
		} else {
			buffer.unget(data);
			newState(script_data_state);
		}
		return true;
	}

	function script_data_escape_start_dash_state(buffer) {
		var data = buffer.shift(1);
		if (data == '-') {
			emitToken({type: 'Characters', data: '-'});
			newState(script_data_escaped_dash_dash_state);
		} else {
			buffer.unget(data);
			newState(script_data_state);
		}
		return true;
	}

	function script_data_escaped_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			buffer.unget(data);
			newState(data_state);
		} else if (data == '-') {
			emitToken({type: 'Characters', data: '-'});
			newState(script_data_escaped_dash_state);
		} else if (data == '<') {
			newState(script_data_escaped_less_then_sign_state);
		} else if (data == '\u0000') {
			parse_error("invalid-codepoint");
			emitToken({type: 'Characters', data: '\uFFFD'});
			buffer.commit();
		} else {
			var chars = buffer.matchUntil('<|-|\u0000');
			emitToken({type: 'Characters', data: data + chars});
			buffer.commit();
		}
		return true;
	}

	function script_data_escaped_dash_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			buffer.unget(data);
			newState(data_state);
		} else if (data == '-') {
			emitToken({type: 'Characters', data: '-'});
			newState(script_data_escaped_dash_dash_state);
		} else if (data == '<') {
			newState(script_data_escaped_less_then_sign_state);
		} else if (data == '\u0000') {
			parse_error("invalid-codepoint");
			emitToken({type: 'Characters', data: '\uFFFD'});
			newState(script_data_escaped_state);
		} else {
			emitToken({type: 'Characters', data: data});
			newState(script_data_escaped_state);
		}
		return true;
	}

	function script_data_escaped_dash_dash_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			parse_error('eof-in-script');
			buffer.unget(data);
			newState(data_state);
		} else if (data == '<') {
			newState(script_data_escaped_less_then_sign_state);
		} else if (data == '>') {
			emitToken({type: 'Characters', data: '>'});
			newState(script_data_state);
		} else if (data == '\u0000') {
			parse_error("invalid-codepoint");
			emitToken({type: 'Characters', data: '\uFFFD'});
			newState(script_data_escaped_state);
		} else {
			emitToken({type: 'Characters', data: data});
			newState(script_data_escaped_state);
		}
		return true;
	}

	function script_data_escaped_less_then_sign_state(buffer) {
		var data = buffer.shift(1);
		if (data == '/') {
			temporaryBuffer = '';
			newState(script_data_escaped_end_tag_open_state);
		} else if (HTML5.ASCII_LETTERS_R.test(data)) {
			emitToken({type: 'Characters', data: '<' + data});
			temporaryBuffer = data;
			newState(script_data_double_escape_start_state);
		} else {
			emitToken({type: 'Characters', data: '<'});
			buffer.unget(data);
			newState(script_data_escaped_state);
		}
		return true;
	}

	function script_data_escaped_end_tag_open_state(buffer) {
		var data = buffer.shift(1);
		if (HTML5.ASCII_LETTERS_R.test(data)) {
			temporaryBuffer = data;
			newState(script_data_escaped_end_tag_name_state);
		} else {
			emitToken({type: 'Characters', data: '</'});
			buffer.unget(data);
			newState(script_data_escaped_state);
		}
		return true;
	}

	function script_data_escaped_end_tag_name_state(buffer) {
		var appropriate = current_token && (current_token.name == temporaryBuffer.toLowerCase());
		var data = buffer.shift(1);
		if (HTML5.SPACE_CHARACTERS_R.test(data) && appropriate) {
			current_token = {type: 'EndTag', name: 'script', data: [], self_closing: false};
			newState(before_attribute_name_state);
		} else if (data == '/' && appropriate) {
			current_token = {type: 'EndTag', name: 'script', data: [], self_closing: false};
			newState(self_closing_tag_state);
		} else if (data == '>' &&  appropriate) {
			current_token = {type: 'EndTag', name: 'script', data: [], self_closing: false};
			newState(data_state);
			emit_current_token();
		} else if (HTML5.ASCII_LETTERS_R.test(data)) {
			temporaryBuffer += data;
			buffer.commit();
		} else {
			emitToken({type: 'Characters', data: '</' + temporaryBuffer});
			buffer.unget(data);
			newState(script_data_escaped_state);
		}
		return true;
	}

	function script_data_double_escape_start_state(buffer) {
		var data = buffer.shift(1);
		if (HTML5.SPACE_CHARACTERS_R.test(data) || data == '/' || data == '>') {
			emitToken({type: 'Characters', data: data});
			if (temporaryBuffer.toLowerCase() == 'script')
				newState(script_data_double_escaped_state);
			else
				newState(script_data_escaped_state);
		} else if (HTML5.ASCII_LETTERS_R.test(data)) {
			emitToken({type: 'Characters', data: data});
			temporaryBuffer += data;
			buffer.commit()
		} else {
			buffer.unget(data);
			newState(script_data_escaped_state);
		}
		return true;
	}

	function script_data_double_escaped_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			parse_error('eof-in-script');
			buffer.unget(data);
			newState(data_state);
		} else if (data == '-') {
			emitToken({type: 'Characters', data: '-'});
			newState(script_data_double_escaped_dash_state);
		} else if (data == '<') {
			emitToken({type: 'Characters', data: '<'});
			newState(script_data_double_escaped_less_than_sign_state);
		} else if (data == '\u0000') {
			parse_error('invalid-codepoint');
			emitToken({type: 'Characters', data: '\uFFFD'});
			buffer.commit();
		} else {
			emitToken({type: 'Characters', data: data});
			buffer.commit();
		}
		return true;
	}

	function script_data_double_escaped_dash_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			parse_error('eof-in-script');
			buffer.unget(data);
			newState(data_state);
		} else if (data == '-') {
			emitToken({type: 'Characters', data: '-'});
			newState(script_data_double_escaped_dash_dash_state);
		} else if (data == '<') {
			emitToken({type: 'Characters', data: '<'});
			newState(script_data_double_escaped_less_than_sign_state);
		} else if (data == '\u0000') {
			parse_error('invalid-codepoint');
			emitToken({type: 'Characters', data: '\uFFFD'});
			newState(script_data_double_escaped_state);
		} else {
			emitToken({type: 'Characters', data: data});
			newState(script_data_double_escaped_state);
		}
		return true;
	}

	function script_data_double_escaped_dash_dash_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			parse_error('eof-in-script');
			buffer.unget(data);
			newState(data_state);
		} else if (data == '-') {
			emitToken({type: 'Characters', data: '-'});
			buffer.commit();
		} else if (data == '<') {
			emitToken({type: 'Characters', data: '<'});
			newState(script_data_double_escaped_less_than_sign_state);
		} else if (data == '>') {
			emitToken({type: 'Characters', data: '>'});
			newState(script_data_state);
		} else if (data == '\u0000') {
			parse_error('invalid-codepoint');
			emitToken({type: 'Characters', data: '\uFFFD'});
			newState(script_data_double_escaped_state);
		} else {
			emitToken({type: 'Characters', data: data});
			newState(script_data_double_escaped_state);
		}
		return true;
	}

	function script_data_double_escaped_less_than_sign_state(buffer) {
		var data = buffer.shift(1);
		if (data == '/') {
			emitToken({type: 'Characters', data: '/'});
			temporaryBuffer = '';
			newState(script_data_double_escape_end_state);
		} else {
			buffer.unget(data);
			newState(script_data_double_escaped_state);
		}
		return true;
	}

	function script_data_double_escape_end_state(buffer) {
		var data = buffer.shift(1);
		if (HTML5.SPACE_CHARACTERS_R.test(data) || data == '/' || data == '>') {
			emitToken({type: 'Characters', data: data});
			if (temporaryBuffer.toLowerCase() == 'script')
				newState(script_data_escaped_state);
			else
				newState(script_data_double_escaped_state);
		} else if (HTML5.ASCII_LETTERS_R.test(data)) {
			emitToken({type: 'Characters', data: data});
			temporaryBuffer += data;
			buffer.commit();
		} else {
			buffer.unget(data);
			newState(script_data_double_escaped_state);
		}
		return true;
	}

	function tag_open_state(buffer) {
		var data = buffer.char();
		if (data === HTML5.EOF) {
			parse_error("bare-less-than-sign-at-eof");
			emitToken({type: 'Characters', data: '<'});
			buffer.unget(data);
			newState(data_state);
		} else if (HTML5.ASCII_LETTERS_R.test(data)) {
			current_token = {type: 'StartTag', name: data, data: []};
			newState(tag_name_state);
		} else if (data == '!') {
			newState(markup_declaration_open_state);
		} else if (data == '/') {
			newState(close_tag_open_state);
		} else if (data == '>') {
			// XXX In theory it could be something besides a tag name. But
			// do we really care?
			parse_error("expected-tag-name-but-got-right-bracket");
			emitToken({type: 'Characters', data: "<>"});
			newState(data_state);
		} else if (data == '?') {
			// XXX In theory it could be something besides a tag name. But
			// do we really care?
			parse_error("expected-tag-name-but-got-question-mark");
			buffer.unget(data);
			newState(bogus_comment_state);
		} else {
			// XXX
			parse_error("expected-tag-name");
			emitToken({type: 'Characters', data: "<"});
			buffer.unget(data);
			newState(data_state);
		}
		return true;
	}

	function close_tag_open_state(buffer) {
		var data = buffer.char();
		if (data === HTML5.EOF) {
			parse_error("expected-closing-tag-but-got-eof");
			emitToken({type: 'Characters', data: '</'});
			buffer.unget(data);
			newState(data_state);
		} else if (HTML5.ASCII_LETTERS_R.test(data)) {
			current_token = {type: 'EndTag', name: data, data: []};
			newState(tag_name_state);
		} else if (data == '>') {
			parse_error("expected-closing-tag-but-got-right-bracket");
			newState(data_state);
		} else {
			parse_error("expected-closing-tag-but-got-char", {data: data}); // param 1 is datavars:
			buffer.unget(data);
			newState(bogus_comment_state);
		}
		return true;
	}

	function tag_name_state(buffer) {
		var data = buffer.char();
		if (data === HTML5.EOF) {
			parse_error('eof-in-tag-name');
			buffer.unget(data);
			newState(data_state);
		} else if (HTML5.SPACE_CHARACTERS_R.test(data)) {
			newState(before_attribute_name_state);
		} else if (HTML5.ASCII_LETTERS_R.test(data)) {
			current_token.name += data + buffer.matchWhile(HTML5.ASCII_LETTERS);
		} else if (data == '>') {
			emit_current_token();
		} else if (data == '/') {
			newState(self_closing_tag_state);
		} else if (data == '\u0000') {
			parse_error("invalid-codepoint");
			current_token.name += "\uFFFD";
		} else { 
			current_token.name += data;
		}
		buffer.commit();

		return true;
	}

	function before_attribute_name_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			parse_error("expected-attribute-name-but-got-eof");
			buffer.unget(data);
			newState(data_state);
		} else if (HTML5.SPACE_CHARACTERS_R.test(data)) {
			buffer.matchWhile(HTML5.SPACE_CHARACTERS);
		} else if (HTML5.ASCII_LETTERS_R.test(data)) {
			current_token.data.push({nodeName: data, nodeValue: ""});
			newState(attribute_name_state);
		} else if (data == '>') {
			emit_current_token();
		} else if (data == '/') {
			newState(self_closing_tag_state);
		} else if (data == "'" || data == '"' || data == '=' || data == '<') {
			parse_error("invalid-character-in-attribute-name");
			current_token.data.push({nodeName: data, nodeValue: ""});
			newState(attribute_name_state);
		} else if (data == '\u0000') {
			parse_error("invalid-codepoint");
			current_token.data.push({nodeName: "\uFFFD", nodeValue: ""});
		} else {
			current_token.data.push({nodeName: data, nodeValue: ""});
			newState(attribute_name_state);
		}
		return true;
	}

	function attribute_name_state(buffer) {
		var data = buffer.shift(1);
		var leavingThisState = true;
		var emitToken = false;
		if (data === HTML5.EOF) {
			parse_error("eof-in-attribute-name");
			buffer.unget(data);
			newState(data_state);
			emitToken = true;
		} else if (data == '=') {
			newState(before_attribute_value_state);
		} else if (HTML5.ASCII_LETTERS_R.test(data)) {
			current_token.data.last().nodeName += data + buffer.matchWhile(HTML5.ASCII_LETTERS);
			leavingThisState = false;
		} else if (data == '>') {
			// XXX If we emit here the attributes are converted to a dict
			// without being checked and when the code below runs we error
			// because data is a dict not a list
			emitToken = true;
		} else if (HTML5.SPACE_CHARACTERS_R.test(data)) {
			newState(after_attribute_name_state);
		} else if (data == '/') {
			newState(self_closing_tag_state);
		} else if (data == "'" || data == '"') {
			parse_error("invalid-character-in-attribute-name");
			current_token.data.last().nodeName += data;
			leavingThisState = false;
		} else if (data == '\u0000') {
			parse_error("invalid-codepoint");
			current_token.data.last().nodeName += "\uFFFD";
		} else {
			current_token.data.last().nodeName += data;
			leavingThisState = false;
		}

		if (leavingThisState) {
			// Attributes are not dropped at this stage. That happens when the
			// start tag token is emitted so values can still be safely appended
			// to attributes, but we do want to report the parse error in time.
			var attributes = current_token.data;
			for (var k in attributes.slice(0, -1)) {
				if (attributes.last().nodeName == attributes[k].nodeName) {
					parse_error("duplicate-attribute");
					break; // Don't emit more than one of these errors
				}
			}
			if (emitToken) emit_current_token();
		} else {
			buffer.commit();
		}
		return true;
	}

	function after_attribute_name_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			parse_error("expected-end-of-tag-but-got-eof");
			buffer.unget(data);
			newState(data_state);
		} else if (HTML5.SPACE_CHARACTERS_R.test(data)) {
			buffer.matchWhile(HTML5.SPACE_CHARACTERS);
		} else if (data == '=') {
			newState(before_attribute_value_state);
		} else if (data == '>') {
			emit_current_token();
		} else if (HTML5.ASCII_LETTERS_R.test(data)) {
			current_token.data.push({nodeName: data, nodeValue: ""});
			newState(attribute_name_state);
		} else if (data == '/') {
			newState(self_closing_tag_state);
		} else if (data == "'" || data == '"' || data == '<') {
			parse_error("invalid-character-after-attribute-name");
			current_token.data.push({nodeName: data, nodeValue: ""});
			newState(attribute_name_state);
		} else if (data == '\u0000') {
			parse_error("invalid-codepoint");
			current_token.data.push({nodeName: "\uFFFD", nodeValue: ""});
		} else {
			current_token.data.push({nodeName: data, nodeValue: ""});
			newState(attribute_name_state);
		}
		return true;
	}

	function before_attribute_value_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			parse_error("expected-attribute-value-but-got-eof");
			buffer.unget(data);
			newState(data_state);
		} else if (HTML5.SPACE_CHARACTERS_R.test(data)) {
			buffer.matchWhile(HTML5.SPACE_CHARACTERS);
		} else if (data == '"') {
			newState(attribute_value_double_quoted_state);
		} else if (data == '&') {
			newState(attribute_value_unquoted_state);
			buffer.unget(data);
		} else if (data == "'") {
			newState(attribute_value_single_quoted_state);
		} else if (data == '>') {
			parse_error("expected-attribute-value-but-got-right-bracket");
			emit_current_token();
		} else if (data == '=' || data == '<' || data == '`') {
			parse_error("unexpected-character-in-unquoted-attribute-value");
			current_token.data.last().nodeValue += data;
			newState(attribute_value_unquoted_state);
		} else if (data == '\u0000') {
			parse_error("invalid-codepoint");
			current_token.data.last().nodeValue += "\uFFFD";
		} else {
			current_token.data.last().nodeValue += data;
			newState(attribute_value_unquoted_state);
		}

		return true;
	}

	function attribute_value_double_quoted_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			parse_error("eof-in-attribute-value-double-quote");
			buffer.unget(data);
			newState(data_state);
		} else if (data == '"') {
			newState(after_attribute_value_state);
		} else if (data == '&') {
			process_entity_in_attribute(buffer, '"');
		} else if (data == '\u0000') {
			parse_error("invalid-codepoint");
			current_token.data.last().nodeValue += "\uFFFD";
		} else {
			var s = buffer.matchUntil('\u0000|["&]');
			data = data + s;
			current_token.data.last().nodeValue += data;
		}
		return true;
	}

	function attribute_value_single_quoted_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			parse_error("eof-in-attribute-value-single-quote");
			buffer.unget(data);
			newState(data_state);
		} else if (data == "'") {
			newState(after_attribute_value_state);
		} else if (data == '&') {
			process_entity_in_attribute(buffer, "'");
		} else if (data == '\u0000') {
			parse_error("invalid-codepoint");
			current_token.data.last().nodeValue += "\uFFFD";
		} else {
			current_token.data.last().nodeValue += data + buffer.matchUntil("\u0000|['&]");
		}
		return true;
	}

	function attribute_value_unquoted_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			parse_error("eof-after-attribute-value");
			buffer.unget(data);
			newState(data_state);
		} else if (HTML5.SPACE_CHARACTERS_R.test(data)) {
			newState(before_attribute_name_state);
		} else if (data == '&') {
			process_entity_in_attribute(buffer, '>');
		} else if (data == '>') {
			emit_current_token();
		} else if (data == '"' || data == "'" || data == '=' || data == '`' || data == '<') {
			parse_error("unexpected-character-in-unquoted-attribute-value");
			current_token.data.last().nodeValue += data;
			buffer.commit();
		} else if (data == '\u0000') {
			parse_error("invalid-codepoint");
			current_token.data.last().nodeValue += "\uFFFD";
		} else {
			var o = buffer.matchUntil("\u0000|["+ HTML5.SPACE_CHARACTERS_IN + '&<>"\'=`' +"]");
			if (o === HTML5.EOF) {
				parse_error("eof-in-attribute-value-no-quotes");
				emit_current_token();
			}
			// Commit here since this state is re-enterable and its outcome won't change with more data.
			buffer.commit();
			current_token.data.last().nodeValue += data + o;
		}
		return true;
	}

	function after_attribute_value_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			parse_error("eof-after-attribute-value");
			buffer.unget(data);
			newState(data_state);
		} else if (HTML5.SPACE_CHARACTERS_R.test(data)) {
			newState(before_attribute_name_state);
		} else if (data == '>') {
			newState(data_state);
			emit_current_token();
		} else if (data == '/') {
			newState(self_closing_tag_state);
		} else {
			parse_error("unexpected-character-after-attribute-value");
			buffer.unget(data);
			newState(before_attribute_name_state);
		}
		return true;
	}

	function self_closing_tag_state(buffer) {
		var c = buffer.shift(1);
		if (c === HTML5.EOF) {
			parse_error("unexpected-eof-after-solidus-in-tag");
			buffer.unget(c);
			newState(data_state);
		} else if (c == '>') {
			current_token.self_closing = true;
			newState(data_state);
			emit_current_token();
		} else {
			parse_error("unexpected-character-after-solidus-in-tag");
			buffer.unget(c);
			newState(before_attribute_name_state);
		}
		return true;
	}

	function bogus_comment_state(buffer) {
		var s = buffer.matchUntil('>');
		s = s.replace(/\u0000/g, "\uFFFD");
		var tok = {type: 'Comment', data: s};
		buffer.char();
		emitToken(tok);
		newState(data_state);
		return true;
	}

	function markup_declaration_open_state(buffer) {
		var chars = buffer.shift(2);
		if (chars === '--') {
			current_token = {type: 'Comment', data: ''};
			newState(comment_start_state);
		} else {
			var newchars = buffer.shift(5);
			if (newchars === HTML5.EOF || chars === HTML5.EOF) {
				parse_error("expected-dashes-or-doctype");
				newState(bogus_comment_state);
				buffer.unget(chars);
				return true;
			}

			chars += newchars;
			if (chars.toUpperCase() == 'DOCTYPE') {
				current_token = {type: 'Doctype', name: '', publicId: null, systemId: null, correct: true};
				newState(doctype_state);
			} else if (tree.open_elements.last() && tree.open_elements.last().namespace && chars == '[CDATA[') {
				newState(cdata_section_state);
			} else {
				parse_error("expected-dashes-or-doctype");
				buffer.unget(chars);
				newState(bogus_comment_state);
			}
		}
		return true;
	}

	function cdata_section_state(buffer) {
		var data = buffer.matchUntil(']]>');
		// skip ]]>
		buffer.shift(3);
		if (data) {
			emitToken({type: 'Characters', data: data});
		}
		newState(data_state);
		return true;
	}

	function comment_start_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			parse_error("eof-in-comment");
			emitToken(current_token);
			buffer.unget(data);
			newState(data_state);
		} else if (data == '-') {
			newState(comment_start_dash_state);
		} else if (data == '>') {
			parse_error("incorrect-comment");
			emitToken(current_token);
			newState(data_state);
		} else if (data == '\u0000') {
			parse_error("invalid-codepoint");
			current_token.data += "\uFFFD";
		} else {
			current_token.data += data + buffer.matchUntil('\u0000|-');
			newState(comment_state);
		}
		return true;
	}

	function comment_start_dash_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			parse_error("eof-in-comment");
			emitToken(current_token);
			buffer.unget(data);
			newState(data_state);
		} else if (data == '-') {
			newState(comment_end_state);
		} else if (data == '>') {
			parse_error("incorrect-comment");
			emitToken(current_token);
			newState(data_state);
		} else if (data == '\u0000') {
			parse_error("invalid-codepoint");
			current_token.data += "\uFFFD";
		} else {
			var s = buffer.matchUntil('\u0000|-');
			data = data + s;
			current_token.data += '-' + data;
			newState(comment_state);
		}
		return true;
	}

	function comment_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			parse_error("eof-in-comment");
			emitToken(current_token);
			buffer.unget(data);
			newState(data_state);
		} else if (data == '-') {
			newState(comment_end_dash_state);
		} else if (data == '\u0000') {
			parse_error("invalid-codepoint");
			current_token.data += "\uFFFD";
		} else {
			current_token.data += data + buffer.matchUntil('\u0000|-');
		}
		return true;
	}

	function comment_end_dash_state(buffer) {
		var data = buffer.char();
		if (data === HTML5.EOF) {
			parse_error("eof-in-comment-end-dash");
			emitToken(current_token);
			buffer.unget(data);
			newState(data_state);
		} else if (data == '-') {
			newState(comment_end_state);
		} else if (data == '\u0000') {
			parse_error("invalid-codepoint");
			current_token.data += "-\uFFFD";
			newState(comment_state);
		} else {
			current_token.data += '-' + data + buffer.matchUntil('\u0000|-');
			// Consume the next character which is either a "-" or an :EOF as
			// well so if there's a "-" directly after the "-" we go nicely to
			// the "comment end state" without emitting a ParseError there.
			buffer.char();
		}
		return true;
	}

	function comment_end_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			parse_error("eof-in-comment-double-dash");
			emitToken(current_token);
			buffer.unget(data);
			newState(data_state);
		} else if (data == '>') {
			emitToken(current_token);
			newState(data_state);
		} else if (data == '!') {
			parse_error("unexpected-bang-after-double-dash-in-comment");
			newState(comment_end_bang_state);
		} else if (data == '-') {
			parse_error("unexpected-dash-after-double-dash-in-comment");
			current_token.data += data;
		} else if (data == '\u0000') {
			parse_error("invalid-codepoint");
			current_token.data += "--\uFFFD";
			newState(comment_state);
		} else {
			// XXX
			parse_error("unexpected-char-in-comment");
			current_token.data += '--' + data;
			newState(comment_state);
		}
		return true;
	}

	function comment_end_bang_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			parse_error("eof-in-comment-end-bang-state");
			emitToken(current_token);
			buffer.unget(data);
			newState(data_state);
		} else if (data == '>') {
			emitToken(current_token);
			newState(data_state);
		} else if (data == '-') {
			current_token.data += '--!';
			newState(comment_end_dash_state);
		} else {
			current_token.data += '--!' + data;
			newState(comment_state);
		}
		return true;
	}

	function doctype_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			parse_error("expected-doctype-name-but-got-eof");
			current_token.correct = false;
			buffer.unget(data)
			newState(data_state);
			emit_current_token();
		} else if (HTML5.SPACE_CHARACTERS_R.test(data)) {
			newState(before_doctype_name_state);
		} else {
			parse_error("need-space-after-doctype");
			buffer.unget(data);
			newState(before_doctype_name_state);
		}
		return true;
	}

	function before_doctype_name_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			parse_error("expected-doctype-name-but-got-eof");
			current_token.correct = false;
			buffer.unget(data)
			newState(data_state);
			emit_current_token();
		} else if (HTML5.SPACE_CHARACTERS_R.test(data)) {
			// pass
		} else if (data == '>') {
			parse_error("expected-doctype-name-but-got-right-bracket");
			current_token.correct = false;
			newState(data_state);
			emit_current_token();
		} else {
			if (HTML5.ASCII_LETTERS_R.test(data))
				data = data.toLowerCase();
			current_token.name = data;
			newState(doctype_name_state);
		}
		return true;
	}

	function doctype_name_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			current_token.correct = false;
			buffer.unget(data);
			parse_error("eof-in-doctype-name");
			newState(data_state);
			emit_current_token();
		} else if (HTML5.SPACE_CHARACTERS_R.test(data)) {
			newState(after_doctype_name_state);
		} else if (data == '>') {
			newState(data_state);
			emit_current_token();
		} else {
			if (HTML5.ASCII_LETTERS_R.test(data))
				data = data.toLowerCase();
			current_token.name += data;
			buffer.commit();
		}
		return true;
	}

	function after_doctype_name_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			current_token.correct = false;
			buffer.unget(data);
			parse_error("eof-in-doctype");
			newState(data_state);
			emit_current_token();
		} else if (HTML5.SPACE_CHARACTERS_R.test(data)) {
			// pass
		} else if (data == '>') {
			newState(data_state);
			emit_current_token();
		} else {
			if (['p', 'P'].indexOf(data) > -1) {
				var expected = [['u', 'U'], ['b', 'B'], ['l', 'L'], ['i', 'I'], ['c', 'C']];
				var matched = expected.every(function(expected){
					data = buffer.shift(1);
					return expected.indexOf(data) > -1;
				});
				if (matched) {
					newState(after_doctype_public_keyword_state);
					return true;
				}
			} else if (['s', 'S'].indexOf(data) > -1) {
				var expected = [['y', 'Y'], ['s', 'S'], ['t', 'T'], ['e', 'E'], ['m', 'M']];
				var matched = expected.every(function(expected){
					data = buffer.shift(1);
					return expected.indexOf(data) > -1;
				});
				if (matched) {
					newState(after_doctype_system_keyword_state);
					return true;
				}
			}

			// All the characters read before the current 'data' will be
			// [a-zA-Z], so they're garbage in the bogus doctype and can be
			// discarded; only the latest character might be '>' or EOF
			// and needs to be ungetted
			buffer.unget(data);
			current_token.correct = false;

			if (data === HTML5.EOF) {
				parse_error("eof-in-doctype");
				buffer.unget(data)
				newState(data_state);
				emit_current_token();
			} else {
				parse_error("expected-space-or-right-bracket-in-doctype", {data: data});
				newState(bogus_doctype_state);
			}
		}
		return true;
	}

	function after_doctype_public_keyword_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			parse_error("eof-in-doctype");
			current_token.correct = false;
			buffer.unget(data)
			newState(data_state);
			emit_current_token();
		} else if (HTML5.SPACE_CHARACTERS_R.test(data)) {
			newState(before_doctype_public_identifier_state);
		} else if (data == "'" || data == '"') {
			parse_error("unexpected-char-in-doctype");
			buffer.unget(data);
			newState(before_doctype_public_identifier_state);
		} else {
			buffer.unget(data);
			newState(before_doctype_public_identifier_state);
		}
		return true;
	}

	function before_doctype_public_identifier_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			parse_error("eof-in-doctype");
			current_token.correct = false;
			buffer.unget(data)
			newState(data_state);
			emit_current_token();
		} else if (HTML5.SPACE_CHARACTERS_R.test(data)) {
			// pass
		} else if (data == '"') {
			current_token.publicId = '';
			newState(doctype_public_identifier_double_quoted_state);
		} else if (data == "'") {
			current_token.publicId = '';
			newState(doctype_public_identifier_single_quoted_state);
		} else if (data == '>') {
			parse_error("unexpected-end-of-doctype");
			current_token.correct = false;
			newState(data_state);
			emit_current_token();
		} else {
			parse_error("unexpected-char-in-doctype");
			current_token.correct = false;
			newState(bogus_doctype_state);
		}
		return true;
	}

	function doctype_public_identifier_double_quoted_state(buffer) {
		var data = buffer.char();
		if (data === HTML5.EOF) {
			parse_error("eof-in-doctype");
			current_token.correct = false;
			buffer.unget(data)
			newState(data_state);
			emit_current_token();
		} else if (data == '"') {
			newState(after_doctype_public_identifier_state);
		} else if (data == '>') {
			parse_error("unexpected-end-of-doctype");
			current_token.correct = false;
			newState(data_state);
			emit_current_token();
		} else {
			current_token.publicId += data;
		}
		return true;
	}

	function doctype_public_identifier_single_quoted_state(buffer) {
		var data = buffer.char();
		if (data === HTML5.EOF) {
			parse_error("eof-in-doctype");
			current_token.correct = false;
			buffer.unget(data)
			newState(data_state);
			emit_current_token();
		} else if (data == "'") {
			newState(after_doctype_public_identifier_state);
		} else if (data == '>') {
			parse_error("unexpected-end-of-doctype");
			current_token.correct = false;
			newState(data_state);
			emit_current_token();
		} else {
			current_token.publicId += data;
		}
		return true;
	}

	function after_doctype_public_identifier_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			parse_error("eof-in-doctype");
			current_token.correct = false;
			emit_current_token();
			buffer.unget(data)
			newState(data_state);
		} else if (HTML5.SPACE_CHARACTERS_R.test(data)) {
			newState(between_doctype_public_and_system_identifiers_state);
		} else if (data == '>') {
			newState(data_state);
			emit_current_token();
		} else if (data == '"') {
			parse_error("unexpected-char-in-doctype");
			current_token.systemId = '';
			newState(doctype_system_identifier_double_quoted_state);
		} else if (data == "'") {
			parse_error("unexpected-char-in-doctype");
			current_token.systemId = '';
			newState(doctype_system_identifier_single_quoted_state);
		} else {
			parse_error("unexpected-char-in-doctype");
			current_token.correct = false;
			newState(bogus_doctype_state);
		}
		return true;
	}

	function between_doctype_public_and_system_identifiers_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			parse_error("eof-in-doctype");
			current_token.correct = false;
			emit_current_token();
			buffer.unget(data)
			newState(data_state);
		} else if (HTML5.SPACE_CHARACTERS_R.test(data)) {
			// pass
		} else if (data == '>') {
			emit_current_token();
			newState(data_state);
		} else if (data == '"') {
			current_token.systemId = '';
			newState(doctype_system_identifier_double_quoted_state);
		} else if (data == "'") {
			current_token.systemId = '';
			newState(doctype_system_identifier_single_quoted_state);
		} else {
			parse_error("unexpected-char-in-doctype");
			current_token.correct = false;
			newState(bogus_doctype_state);
		}
		return true;
	}

	function after_doctype_system_keyword_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			parse_error("eof-in-doctype");
			current_token.correct = false;
			emit_current_token();
			buffer.unget(data)
			newState(data_state);
		} else if (HTML5.SPACE_CHARACTERS_R.test(data)) {
			newState(before_doctype_system_identifier_state);
		} else if (data == "'" || data == '"') {
			parse_error("unexpected-char-in-doctype");
			buffer.unget(data);
			newState(before_doctype_system_identifier_state);
		} else {
			buffer.unget(data);
			newState(before_doctype_system_identifier_state);
		}
		return true;
	}

	function before_doctype_system_identifier_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			parse_error("eof-in-doctype");
			current_token.correct = false;
			emit_current_token();
			buffer.unget(data)
			newState(data_state);
		} else if (HTML5.SPACE_CHARACTERS_R.test(data)) {
			// pass
		} else if (data == '"') {
			current_token.systemId = '';
			newState(doctype_system_identifier_double_quoted_state);
		} else if (data == "'") {
			current_token.systemId = '';
			newState(doctype_system_identifier_single_quoted_state);
		} else if (data == '>') {
			parse_error("unexpected-end-of-doctype");
			current_token.correct = false;
			emit_current_token();
			newState(data_state);
		} else {
			parse_error("unexpected-char-in-doctype");
			current_token.correct = false;
			newState(bogus_doctype_state);
		}
		return true;
	}

	function doctype_system_identifier_double_quoted_state(buffer) {
		var data = buffer.char();
		if (data === HTML5.EOF) {
			parse_error("eof-in-doctype");
			current_token.correct = false;
			emit_current_token();
			buffer.unget(data)
			newState(data_state);
		} else if (data == '"') {
			newState(after_doctype_system_identifier_state);
		} else if (data == '>') {
			parse_error("unexpected-end-of-doctype");
			current_token.correct = false;
			emit_current_token();
			newState(data_state);
		} else {
			current_token.systemId += data;
		}
		return true;
	}

	function doctype_system_identifier_single_quoted_state(buffer) {
		var data = buffer.char();
		if (data === HTML5.EOF) {
			parse_error("eof-in-doctype");
			current_token.correct = false;
			emit_current_token();
			buffer.unget(data)
			newState(data_state);
		} else if (data == "'") {
			newState(after_doctype_system_identifier_state);
		} else if (data == '>') {
			parse_error("unexpected-end-of-doctype");
			current_token.correct = false;
			emit_current_token();
			newState(data_state);
		} else {
			current_token.systemId += data;
		}
		return true;
	}

	function after_doctype_system_identifier_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			parse_error("eof-in-doctype");
			current_token.correct = false;
			emit_current_token();
			buffer.unget(data)
			newState(data_state);
		} else if (HTML5.SPACE_CHARACTERS_R.test(data)) {
			// pass
		} else if (data == '>') {
			emit_current_token();
			newState(data_state);
		} else {
			parse_error("unexpected-char-in-doctype");
			newState(bogus_doctype_state);
		}
		return true;
	}

	function bogus_doctype_state(buffer) {
		var data = buffer.shift(1);
		if (data === HTML5.EOF) {
			buffer.unget(data);
			emit_current_token();
			newState(data_state);
		} else if (data == '>') {
			emit_current_token();
			newState(data_state);
		}
		return true;
	}

	function parse_error(message, context) {
		emitToken({type: 'ParseError', data: message, datavars: context});
		HTML5.debug('tokenizer.parseError', message, context);
	}

	function emit_current_token() {
		newState(data_state);
		var token = current_token;
		emitToken(token);
	}

	function normalize_token(token) {
		if (token.type == 'StartTag') {
			token.name = token.name.toLowerCase();
			if (token.data.length !== 0) {
				var data = {};
				// the first value for each key wins
				token.data.reverse();
				token.data.forEach(function(e) {
					data[e.nodeName.toLowerCase()] = e.nodeValue;
				});
				token.data = [];
				for(var k in data) {
					token.data.push({nodeName: k, nodeValue: data[k]});
				}
				// restore original attribute order
				token.data.reverse();
			}
			if (token.self_closing && HTML5.VOID_ELEMENTS.indexOf(token.name) == -1) {
				parse_error('non-void-element-with-trailing-solidus', {name: token.name});
			}
		} else if (token.type == 'EndTag') {
			token.name = token.name.toLowerCase();
			if (token.self_closing) {
				parse_error('self-closing-flag-on-end-tag');
			}
			if (token.data.length !== 0) {
				parse_error('attributes-in-end-tag');
			}
		}

		return token;
	}

	if (typeof input === 'undefined') throw(new Error("No input given"));
	Object.defineProperty(this, 'state', {
		set: function(state) {
			newState(state);
		},
		get: function() {
			return state;
		}
	});
	this.rcdata_state = rcdata_state;
	this.plaintext_state = plaintext_state;
	this.rawtext_state = rawtext_state;
	this.script_data_state = script_data_state;
	function newState(newstate) {
		HTML5.debug('tokenizer.state=', newstate.name);
		state = newstate;
		buffer.commit();
	}

	newState(data_state);

	if (input instanceof events.EventEmitter) {
		source = input;
		this.pump = null;
	} else {
		source = new events.EventEmitter();
		this.pump = function() {
			source.emit('data', input);
			source.emit('end');
		};
	}
	
	source.addListener('data', function(data) {
		if (typeof data !== 'string') data = data.toString();
		buffer.append(data);
		try {
			while(state(buffer));
		} catch(e) {
			if (e != HTML5.DRAIN) {
				throw(e);
			} else {
				HTML5.debug('tokenizer.drain', 'Drain');
				buffer.undo();
			}
		}
	});
	source.addListener('end', function() {
		buffer.eof = true;
		while(state(buffer));
		this.emit('end');
	}.bind(this));

};

util.inherits(Tokenizer, events.EventEmitter);
