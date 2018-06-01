// FIXME
import 'regenerator-runtime/runtime'
require('@babel/polyfill')

const _ = require('underscore')
const $ = require('jquery')
const imagesLoaded = require('imagesloaded')
const jqueryFillwidthLite = require('jquery-fillwidth-lite')

window._ = _
window.$ = $
window.jQuery = $

imagesLoaded.makeJQueryPlugin(window.$)
jqueryFillwidthLite(window.$, window._, imagesLoaded)
