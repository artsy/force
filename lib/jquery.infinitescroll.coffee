#
# Will trigger the 'infiniteScroll' event on window when the user
# reaches the bottom of the page and there are no pending ajax requests.
# Includes convenience plugin function, simply use `$.infiniteScroll ->
#
# TODO: Open source this module.
#

$.fn.infiniteScroll = (callback) ->
  $(window).on 'infiniteScroll', callback
  $(window).on 'scroll', onScroll

onScroll = module.exports = =>
  return unless $.active is 0
  offset = $(window).height() * 0.7
  viewPortBottom = $(window).scrollTop() + $(window).height()
  reachedBottom = viewPortBottom >= $(document).height() - offset
  return unless reachedBottom
  $(window).trigger 'infiniteScroll'