_ = require 'underscore'
Cycle = require '../../../components/cycle/index.coffee'
Sticky = require '../../../components/sticky/index.coffee'
{ isTouchDevice } = require '../../../components/util/device.coffee'

module.exports.init = ->
  unless isTouchDevice()
    sticky = new Sticky
    sticky.add $('.js-jobs-category-nav')

    # Adjust height for `pp-5-29-15` notice
    $(document).on 'click', '.js-notice-message-close', ->
      sticky.rebuild()

  cycle = new Cycle $el: $('.js-jobs-images-cycle'), selector: 'img'
  cycle.start()

  # Nav scrolling and section highlighting
  ($categories = $('.js-jobs-category'))
    .click (e) ->
      e.preventDefault()
      offset = $('#main-layout-header').height()
      selector = $(e.currentTarget).attr 'href'
      position = $(selector).offset().top - offset
      $('html, body').animate { scrollTop: position }, 250

  $categories.first().addClass 'is-active'

  toggleNavLink = (going, direction) ->
    $categories
      .filter "[href='##{$(this).attr 'id'}']"
      .toggleClass 'is-active', direction is going

  $('.js-jobs-items')
    .waypoint _.partial(toggleNavLink, 'down'), offset: '10%'
  $('.js-jobs-items')
    .waypoint _.partial(toggleNavLink, 'up'), offset: => -$(this).outerHeight()
