modalize = require '../modalize/index.coffee'
defaults = require './defaults.coffee'
SpecialistFeedbackView = require './views/specialist_feedback.coffee'
FlashMessage = require '../flash/index.coffee'

# This does not actually contact a 'specialist', since we don't
# have general purpose inquiries that we can pass contact_partner: false
# we just make it look like you are contacting a specialist directly when in fact
# this goes direct to the feedback endpoint.
module.exports = ->
  view = new SpecialistFeedbackView
  modal = modalize(view, defaults)

  modal.load (done) ->
    (representatives = view.representatives)
      .fetch()
        .then(-> representatives.first().fetch())
        .then(done)

  view.model.once 'sync', ->
    modal.close ->
      new FlashMessage message: 'Thank you. Your message has been sent.'
