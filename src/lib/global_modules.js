const _ = require("underscore")
const $ = require("jquery")
const imagesLoaded = require("imagesloaded")

window._ = _
window.$ = $
window.jQuery = $

imagesLoaded.makeJQueryPlugin(window.$)
