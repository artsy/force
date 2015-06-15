modalize = require '../modalize/index.coffee'
defaults = require './defaults.coffee'
SpecialistView = require './views/specialist.coffee'
FlashMessage = require '../flash/index.coffee'

module.exports = ->
  view = new SpecialistView
  modal = modalize(view, defaults)

  modal.load (done) ->
    (representatives = view.representatives)
      .fetch()
        .then(-> representatives.first().fetch())
        .then(done)

  view.model.once 'sync', ->
    modal.close ->
      new FlashMessage message: 'Thank you. Your message has been sent.'
