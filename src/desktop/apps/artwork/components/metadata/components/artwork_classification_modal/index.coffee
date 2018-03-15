modalize = require '../../../../../../components/modalize/index.coffee'
template = -> require('./templates/attribution_class_details.jade')

module.exports = ->
  view = render: ->
    $el: template()

  modal = modalize view,
    className: 'modalize artwork-classification-modal'
    dimensions: width: '600px'
  modal.open()
  modal
