#
# Runs on every page and listens for clicks and keyups scoped by set management
# related selectors like `click .favorites2-onboarding-modal a` to track set
# management analytics.
#
# See: http://cl.ly/image/3q040w1J2I2y/o
#

Cookies = require 'cookies-js'
mediator = require '../../../lib/mediator.coffee'

MODE = Cookies.get('save-controls')

# Funnel 1 (NUX Onboarding modal to new set made)
# ------------------------------------------------------------------------------

# NUX modal
mediator.on 'modal:opened', ({ view }) ->
  return unless view.$el.html().match('favorites2-onboarding-modal')?
  analytics.track 'Set Management: NUX modal'

# Click
$(document).on 'click', '.favorites2-onboarding-modal a', ->
  analytics.track 'Set Management: NUX modal - click'

# Dismiss
mediator.on 'modal:closed', ({ view }) ->
  return unless view.$el.html().match('favorites2-onboarding-modal')?
  analytics.track 'Set Management: NUX modal - dismiss'

# Click create new set
$(document).on 'click', '.favorites2-new-collection', ->
  analytics.track 'Set Management: Click create new set'

# New set made
onNewSet = (e) ->
  return if e.keyCode and e.keyCode isnt 13
  analytics.track 'Set Management: New set made'
$(document).on 'keyup', '.favorites2-edit-modal input', onNewSet
$(document).on 'click', '.favorites2-edit-modal-save', onNewSet

# Funnel 2 (Hover over work to successful save/new set made)
# ------------------------------------------------------------------------------

clickedSaveControl = false
addedToSet = false
hoverTimeout = null
listenForMenuDismiss = ->
  $(document).one 'click', (e) ->
    return if $(e.target).closest('.save-controls-drop-down-container').length
    return if ($(e.target).closest(
                 '.favorites2-collection-list-container'
              ).length > 0 and not $(e.target).hasClass('.modal-close'))
    analytics.track 'Set Management: Open menu - dismiss'

# Hover on work
$(document).on 'mouseenter', '.artwork-item', ->
  hoverTimeout = setTimeout ->
    hoverTimeout = null
    analytics.track 'Set Management: Hover on work'
  , 300

# Click remove
$(document).on 'click', '.artwork-item-remove', ->
  clickedSaveControl = true
  analytics.track 'Set Management: Click remove'

# Click favicon
$(document).on 'click', '.overlay-button-save, .circle-icon-button-save', (e) ->
  clickedSaveControl = true
  analytics.track 'Set Management: Click favicon'
  if $(e.target).closest('.save-controls-one-btn-container').length
    listenForMenuDismiss()
  if $(e.target).closest('.save-controls-two-btn-container').length
    analytics.track 'Set Management: Successful save'

# Click set stack
$(document).on 'click', ('.save-controls-two-btn-add-to-collection, ' +
                         '.circle-icon-button-add'), ->
  clickedSaveControl = true
  openedMenu = true
  analytics.track 'Set Management: Click set stack'
  listenForMenuDismiss()

# Dismiss
$(document).on 'mouseleave', '.artwork-item', (e) ->
  return clearTimeout(hoverTimeout) if hoverTimeout
  unless clickedSaveControl
    analytics.track 'Set Management: Hover on work - dismiss'
  clickedSaveControl = false

# Work saved to My Favs
$(document).on 'click', ('.save-controls-drop-down-container ' +
                         '.overlay-button-save, .circle-icon-button-save'), ->
  return unless MODE is 'drop down'
  analytics.track 'Set Management: Work Saved to My Favs'
  analytics.track 'Set Management: Successful save'
  listenForMenuDismiss()

# Added to set X
$(document).on 'click', [
  ('.save-controls-drop-down-menu-item' +
    ':not(.save-controls-drop-down-new):not(.is-active)')
  '.favorites2-collection-list li:not(.is-active)'
].join(','), (e) ->
  addedToSet = true
  analytics.track 'Set Management: Add to set',
    setId: $(e.currentTarget).attr('data-id')
  analytics.track 'Set Management: Successful save'
  # Added to an additional set
  if $(e.currentTarget).siblings().hasClass('is-active')
    analytics.track 'Set Management: Add to set - additional set'

# Removed from set X
$(document).on 'click', [
  '.save-controls-drop-down-menu-item.is-active'
  '.favorites2-collection-list > li.is-active'
].join(','), (e) ->
  analytics.track 'Set Management: Remove from set',
    inline: true
    setId: $(e.currentTarget).attr('data-id')

# Name Create new set
onNewSetInline = (e) ->
  return if e.keyCode and e.keyCode isnt 13
  analytics.track 'Set Management: Name Create new set'
$(document).on(
  'keyup', '.favorites2-collection-list-create input', onNewSetInline
)
$(document).on(
  'click', '.favorites2-collection-list-create button', onNewSetInline
)
$(document).on(
  'click', '.save-controls-drop-down-new form button', onNewSetInline
)

# Non-funnel
# ------------------------------------------------------------------------------

# Remove via X in corner
$(document).on 'click', ('.favorites2-edit-modal-delete-confirm'), (e) ->
  return unless $(e.target).text() is 'Remove work'
  analytics.track 'Set Management: Remove from set', inline: false

# Delete set
$(document).on 'click', ('.favorites2-edit-modal-init + ' +
                         '.favorites2-edit-modal-delete-container' +
                         'favorites2-edit-modal-delete-confirm'), ->
  analytics.track 'Set Management: Delete set'

# Privacy switch
$(document).on 'click', '.favorites2-toggle-public', ->
  analytics.track 'Set Management: Make private'
$(document).on 'click', '.favorites2-toggle-private', ->
  analytics.track 'Set Management: Make public'

# Slideshow
$(document).on 'click', '#user-profile-collection-right-slideshow', ->
  analytics.track 'Set Management: Slideshow'

# Share set
$(document).on 'click', '#user-profile-collection-right-share', ->
  analytics.track 'Set Management: Share set'
