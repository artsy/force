#
# Hides any list items for artists without images.
#

module.exports = ->
  $('.artist-list img').error -> $(@).closest('li').hide()
