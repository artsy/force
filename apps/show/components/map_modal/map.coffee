_ = require 'underscore'
sd = require('sharify').data
GMaps = require 'gmaps'
ModalView = require '../../../../components/modal/view.coffee'

template = -> require('./map.jade') arguments...

module.exports = class MapModal extends ModalView

  template: template

  className: 'map-modal'

  events: -> _.extend super,
    'click input': 'selectAll'

  initialize: (options) ->
    @show = options.show
    @partner = options.partner
    @templateData =
      show: @show
      partner: @partner
    super

  postRender: -> 
    map = new GMaps
      el: '#map-modal-show-map'
      lat: @show.location().get('coordinates').lat
      lng: @show.location().get('coordinates').lng
      zoom: 16
    map.addStyle {
      styledMapName: "Styled Map"
      styles: [
        {
          stylers: [
            { lightness: 50 }
            { saturation: -100 }
          ]
        }
      ] 
      mapTypeId: "map_style"  
    }
    map.setStyle "map_style"
    map.addMarker {
      lat: @show.location().get('coordinates').lat
      lng: @show.location().get('coordinates').lng
      color: 0x873ff0
    }

  selectAll: (e) ->
    $(e.currentTarget).select()