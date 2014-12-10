v1.0.3
=============

* Fix SAX fragment parsing.

v1.0.2
=============

* Fix jsdom versioning shenanigan

v1.0.1
=============

* Use the right version of jsdom, not so loose with versioning
* Simplify package.json
* Fix README example

v1.0.0
=============

* Add badge
* Drop testing node 0.8 thanks to pointy versions in package.json
* Start testing under node 0.11
* Make tree construction test use new jsdom API
* Fix duplicate devDependencies section; use pointy versions
* Fix ronn dependency
* replaced `IllegalArgumentException` with `Error`
* Pass error code to error handler.
* add syntax highlighting

v0.4.1
=============

* Add a new index module and fix main entry point in package.json; v0.4.1

v0.4.0
=============

* Remove node 0.6 from test builds.
* Always pass attributes (even empty) to sax startElement event
* Add locators to SAX parser.
* Add "unexpected implied end tag (p)" message for fake end p tags.
* Add dirty fix for \r\n handling
* Fix char ref 0x10FFFF codepoint handling
* Init JSDOMTreeBuilder.scriptingEnabled flag (set "true")
* Fix attr namespace decorator in test serializer
* Drop "command" tag support
* Add more jsDoc for ElementStack
* Fix second `<html>` tag handling
* Remove obsolete test files
* Update test scripts to work with undivided test data files
* Add test data in original form
* Fix empty attributes (use empty array, not object)
* Fix character handing in after[After]Body modes
* Fix attribute merging in SAXTreeBuilder
* Fix message mistypes.
* Remove streaming-test temporary
* Actually rename files (CamelCase.js)
* Use jsdom object constructors insead of public DOM factory methods
* Fix serializing for test
* Handle UTF-16 characters in EntityParser
* Emit Characters instead of SpaceCharacters, refactor TreeBuilder
* Set foreign attribute prefix
* Performance improvement of ElementStack.inScope()
* Fix syntax error in package.json
* corrected repository information in package.json. It should be singular
* Make jsdom an optional dependency.
* Big refactoring
* Fix #31: remove sites directory.
* Add missing untracked files
* Move encodings from constants to json file
* Move EOF to Buffer, do not pass document to Tokenizer
* Update tests that involve `<frame>` in `<template>` to match specified behaviour.
* Add README files to tokenizer/tree-construction directories.

v0.3.16
=============

* Bump version to 0.3.16 and dependency on jsdom to 0.9.0
* Remove todos from passings tests
* Skip todoed tests
* Stop overriding array.last, refactor to last(someArray) fixes #101
* Remove obsolete documentation
* Drop support for node 0.6 and 0.4
* use the list actually specified in http://www.w3.org/html/wg/drafts/html/master/single-page.html#generate-implied-end-tags
* Use a better algorithm for keeping track of the recognition of named entities.
* Stop reinitializing parser in `parse_fragment`. Fixes #94
* Improve debug output
* Tidy indent
* Fix syntax error in package.json
* corrected repository information in package.json. It should be singular

v0.3.15
=============

* Make jsdom an optional dependency.
* Call buffer.commit() in rcdata/rawtext/plaintext states
* Add new rcdata/rawdata/plaintext states instead of content models
* Attributes no longer inherit from Node in DOM4.
* Only use jsdom private apis when available.
* Call EventEmitter in TreeWalker constructor.
* Fix fragment parsing, reset framesetOk flag
* Update parsing algorithm according to current spec
* Handle `<` character in attribute name begin as invalid.
* Misc fixes in parser
* Impove doctype handling
* Improve foreign content handling
* Serialize doctype publicId and systemId
* Fix entity, doctype tokenizing, refactor empty tag handling.
* Add missing messages, improve error handling
* Add todos to four tests

v0.3.14
=============

* Bump jsdom dependency
* Add DanyaPostfactum as contributor
* Remove unused core
* Move root creation code to TreeBuilder.insertRoot()
* Use Object.defineProperty instead of `__defineGetter__`
* Use tape instead of tap
* Better error handling in attributes
* Fix heading nesting detection
* use Object.keys
* Fix more mistypes in error messages
* Fix mistype in endTagBlock
* Restore "tap" dependency.
* Fix mistypes
* Fix mistype in error message

v0.3.13
=============

* hack up the tap dependency

v0.3.12
=============

* v0.3.12
* EventEmitter.call(this) in tokenizer
* Properly inherit from EventEmitter in treewalker
* Try to avoid materializing arguments in debug code
* test against node 0.10
* whitespace
* Update dependencies
* Use util.inherits
* v0.3.11
* Commit parser state after adding characters to doctype name.
* Bring in the assert module, since it's used here.
* Remove doc/jquery-example. Fixes #45
* Add var keyword to prevent global leak

v0.3.10
=============

* v0.3.10
* Remove dependency on async
* Move tap and bench dependencies to devDependencies
* Use jsdom internal attributes to set invalid attribute names
* Use jsdom private API to create elements with otherwise invalid tag names

v0.3.9
=============

* Formatting in constants.js
* Separate entities into a separate module
* Add cdata section handling
* Add shebang to tools/parse-test-data.js
* Remove submodules
* Remove some todo markers
* Lint the tokenizer
* Remove debugging from hot path
* Reference `secondary_phase` directly
* Reference the current phase directly
* Remove support for constructed phases
* Move the phase code entirely into the parser routine
* Internalize inBody
* Internalize trailingEnd
* Internalize rootElement
* Internalize inRow
* Internalize inSelectInTable
* Internalize inSelect
* Internalize inTableBody
* Internalize inTable
* Internalize inHead
* Internalize inFrameset
* Internalize inForeignContent
* Internalize inColumnGroup
* Internalize inCell
* Internalize inCaption
* Internalize beforeHTML
* Internalize beforeHead
* Internalize afterHead
* Internalize afterFrameset
* Internalize afterBody phase
* Internalize afterAfterFrameset
* Internalize afterAfterBody
* Move tree variable into closure
* Start moving parser phases into the main parser body
* Add build products to .gitignore
* Add ronn devDependency
* Simplify some conditionals and code formatting
* Export single functions rather than an object
* Add `node_modules` to .gitignore
* Add shebang to test
* Correct expected test result per section 8.2.4.54
* EOF messages are very frequent, debug messages aren't very useful then, and getter/setter methods are expensive.
* Cache the keys of the HTML5 entities. Iterating the keys of objects is expensive.
* Update lib/html5/tokenizer.js
* Make parse-doc executable
* fixes tests. sometimes docuent is a document element?
* call to document.appendChild should be document.documentElement.appendChild
* Test with node 0.8
* Update lib/html5/tokenizer.js
* Issue #60: Reset `open_elements` and activeFormattingElements
* Yeah, node 0.4 doesn't work. Upgrade already.
* Specify language in .travis.yml

v0.3.8
=============

* Add TODO tests
* Add .npmignore

v0.3.7
=============

* Example showing issue parses correctly. Closes #59
* more var keywords, and two variable name errors
* Add var keyword to fix global leak.
* declaring more vars to avoid global leaks
* add var keywords to avoid global leaks
* Remove spurious todo, add another
* Split test data into separate files; add support for TODO tests
* Add .gitignore

v0.3.6
=============

* Use more efficient push/reverse
* Restore original attribute order in `normalize_token`
* Update doc Right event name is "end", not "done"
* Fix undefined reference to PHASES.
* Reference 'PHASES' on the required object
* Removed global variable p, made local
* Removed global varibles t & b, made local
* Removed global variable PHASES, made local
* Make tap runner work when only installed locally
* The "sys" module is now called "util"
* Remove .swp file
* Use latest entity table from the spec
* Add performance benchmark script
* Update tap and add bench
* Rewrite tokenizer to be more functional
* Fix scoping in select in table phase
* Improve nulls in `data_state`
* Fix indentation of test output in empty tags
* Rework endTagMarqueeAppletObject
* Continue reworking inScope
* Start reworking inScope
* Don't emit empty CDATA for empty scripts
* Improve debugging of script chunking
* Handle another weirdness in the test data parsing
* Carry on, badly, when jsdom refuses to make an element like `div<div`
* Make an empty string a valid parseable document
* Simplify reading test data and make more permissive
* Fix mispassing of attributes from `after_body_phase`
* Improve debugging output
* Fix EOF handling in `markup_declaration_open_state`
* Fix debugging typos
* Fix EOF handling in `tag_open_state`
* Fix EOF handling inside `SCRIPT_CDATA`
* Add some debugging to inHead phase
* Stringify content model flags
* Fix EOF in `consume_entity`
* Add more test data
* Make matchWhile and matchUntil return '' rather than EOF.
* Fix EOF in `several states`
* Fix EOF in `attribute_name_state`
* Fix EOF in `before_attribute_name_state`
* Fix EOF in `data_state`
* Fix EOF in `bogus_comment_state`
* Handle EOF in `comment_state` and `comment_dash_state`
* Simplify test harness; fix EOF bugs in `data_state`
* Add missing data/tree-construction/plain-text-unsafe.dat
* Fix permissions on test data
* Update test data
* Refactor and update conversion of numeric entities
* Handle rp and rt tags in the body phase
* Change in HTML5 spec around `<title>` inside 	`<body>`
* Fix handling of EOF in `attribute_value_unquoted` state
* Allow debug flags to be set in test code
* Fix EOF handling in `attribute_value_double_quoted_state`
* Fix parser state with EOF at `token_name_state`
* Make buffer cope with new HTML5.EOF
* Make HTML5.EOF token unstringable, so that it throws an exception
* Make skip-to-test code more obvious
* Remove changelog code from makefile
* Makefile cleanups

v0.3.5
=============

* Fixups to buffering
* Documentation cleanup. Closes #42
* More test fixes; improve tokenizer some; add buffer debugging
* Don't do a dumb and add \0
* s/vows/tap/
* s/sys/util/

v0.3.4
=============

* When buffering script tag data, also buffer SpaceCharacters.

v0.3.3
=============

* Catch JSDOM exceptions (such as they are, thrown strings)
* Remove jQuery dep, since it's now bundled with jsdom
* Fix parse-test-data script
* Fix serializer glitch
* Change EOF and DRAIN constants
* Avoid using full regexps where just a character class is needed
* Fix paths in parse-doc
* Use new jsdom api
* Add 'code' element to formatting elements list
* Update URL in readme
* Remove unneeded test.js
* finish re-arranging tests
* Re-arrange tests
* No longer require('sys'), a first step to being able to use the parser clientside.
* Clean up package.json
* Make tests named how vows expects, and add travi-ci configuration

v0.3.2
=============

* Release v0.3.2
* Update vows dependency to work with node 0.5

v0.3.1
=============

* fix issues 32 bug

v0.3.0
=============

* Change parsing of scripts to emit executable data on tag close
* Convert serializer test to vows
* Switch to vows; split streaming tests out
* move tests into test/
