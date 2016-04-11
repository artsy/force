{ INQUIRY } = require('sharify').data
ArtworkInquiryView = require './view.coffee'

module.exports = ->

  view = new ArtworkInquiryView
    el: $('.js-artwork-inquiry-form')
    data: INQUIRY
