_ = require 'underscore'
qs = require 'querystring'
Backbone = require 'backbone'
openMultiPage = require '../../../components/multi_page/index.coffee'
mediator = require '../../../lib/mediator.coffee'
ModalView = require '../../../components/modal/view.coffee'
Representatives = require '../../../collections/representatives.coffee'
openSpecialistModal = require '../../../components/specialist_modal/index.coffee'

module.exports = class ContactView extends Backbone.View

  events:
    "click .js-multipage": "openMultiPage"
    "click .js-contact-specialist": "openSpecialistView"

  initialize: ->
    mediator.on 'scrollto:element', @scrollToPage

  openMultiPage: (e) ->
    id = $(e.currentTarget).data('id')
    multiPage = openMultiPage id
    multiPage.collection.invoke 'fetch'
    modal = new ModalView
    modal.render()
    @$el.append modal.$el
    modal.insertModalContent multiPage.$el

  scrollToPage: (options) ->
    $containerDiv = $('.contact-page-modal')
    top = $containerDiv.scrollTop() + options.$targetDiv.position().top
    $containerDiv.scrollTop top

  openSpecialistView: (e) ->
    openSpecialistModal(@$el)
