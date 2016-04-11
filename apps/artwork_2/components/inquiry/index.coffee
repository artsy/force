{ INQUIRY } = require('sharify').data
Artwork = require '../../../../models/artwork.coffee'
EmbeddedInquiryView = require '../../../../components/embedded_inquiry/view.coffee'

module.exports = ->
  artwork = new Artwork INQUIRY.artwork

  view = new EmbeddedInquiryView
    el: $('.js-artwork-inquiry-form')
    artwork: artwork
