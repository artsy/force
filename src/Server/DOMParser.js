// These globals don't expose any instance specific data, nor do they persist or
// share data across requests in any way. These could have been exported
// separately by jsdom, but they aren’t and thus the need for a JSDOM instance.
// However, if/when more is exposed, be sure to not expose instance data that
// may lead to sharing of data across requests.

const { JSDOM } = require("jsdom")

const jsdom = new JSDOM()

const _global = global
_global.DOMParser = jsdom.window.DOMParser

// TDOO: Determine what is using this, fails in staging and works in review apps?
_global.Node = jsdom.window.Node
