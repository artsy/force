#
# Runs on every page and listens for clicks and keyups scoped by set management
# related selectors like `click .favorites2-onboarding-modal a` to track
# set management analytics.
#

{ track } = require '../../../lib/analytics.coffee'
mediator = require '../../../lib/mediator.coffee'

# Click through NUX modal
$(document).on 'click', '.favorites2-onboarding-modal a', ->
  track.funnel 'Set Management: Clicked through NUX modal'

# Dismiss NUX modal
mediator.on 'modal:closed', ({ view }) ->
  return unless view.$el.html().match('favorites2-onboarding-modal')?
  track.funnel 'Set Management: Dismissed NUX modal'

# Open "create new set" modal
$(document).on 'click', '.favorites2-new-collection', ->
  track.funnel 'Set Management: Clicked create new set'

# Create a new set
onNewSet = (e) ->
  return if e.which and e.which isnt 13
  return unless $(e.target).closest('.modal-body').html().match('favorites2-onboarding-modal')?
  track.funnel 'Set Management: Created a new set'
$(document).on 'keyup', '.favorites2-edit-modal input', onNewSet
$(document).on 'click', '.favorites2-edit-modal-submit', onNewSet

# Clicked heart icon
$(document).on 'click', '.overlay-button-save', ->
  track.funnel 'Set Management: Clicked favicon'

# Added it to a set
$(document).on 'click', [
    '.save-controls-drop-down-menu-item:not(.save-controls-drop-down-new)'
    '.save-controls-one-btn-modal .favorites2-collection-list li'
    '.save-controls-two-btn-modal .favorites2-collection-list li'
  ].join(','), ->
    track.funnel 'Set Management: Added to a set'

# Created a new set inline
onNewSetInline = (e) ->
  return if e?.which and e?.which isnt 13
  track.funnel 'Set Management: Created a new set inline'
$(document).on 'keyup', '.favorites2-collection-list-create input', onNewSetInline
$(document).on 'click', '.favorites2-collection-list-create button', onNewSetInline
$(document).on 'click', '.save-controls-drop-down-new form button', -> onNewSetInline()