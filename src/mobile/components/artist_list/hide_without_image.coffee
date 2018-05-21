#
# Hides any list items for artists without images.
#

module.exports = ->
  $('.artist-list img').on 'error', ->
    $(@).closest('li').hide()
