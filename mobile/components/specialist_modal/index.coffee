SpecialistsView = require './client/specialist_view'
Representatives = require '../../collections/representatives'
ModalView = require '../modal/view'

module.exports = ($el)->
  collection = new Representatives
  specialists_view = new SpecialistsView collection: collection
  collection.fetch()
  modal = new ModalView
  modal.render()
  $el.append modal.$el
  modal.insertModalContent specialists_view.$el
