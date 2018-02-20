modalize = require '../modalize/index.coffee'
State = require '../branching_state/index.coffee'
StateView = require '../branching_state/view.coffee'
openMultiPageModal = require '../multi_page_modal/index.coffee'
openFeedback = require '../simple_contact/feedback.coffee'
views =
  how_can_we_help: require './views/how_can_we_help.coffee'
  press: require './views/press.coffee'

module.exports = ->
  state = new State
    steps: [
      'how_can_we_help'
      {
        help_by:
          artist: ['artist']
          collector: ['collector']
          press: ['press']
          feedback: ['feedback']
          auction: ['auction']
      }
    ]

    decisions:
      help_by: ({ state }) -> state.get 'value'

  view = new StateView
    className: 'feedback-modal'
    state: state
    views: views

  modal = modalize view,
    dimensions: width: '470px'

  state.on 'next', (step) ->
    switch step
      when 'collector'
        modal.close ->
          openMultiPageModal 'collector-faqs', 'collector-faqs-selling-on-artsy'

      when 'artist'
        modal.close ->
          openMultiPageModal 'artist-faqs'

      when 'feedback'
        modal.close ->
          openFeedback()

      when 'auction'
        modal.close ->
          openMultiPageModal 'auction-faqs'

  modal.open()
  modal
