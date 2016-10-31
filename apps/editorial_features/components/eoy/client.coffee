_ = require 'underscore'
Backbone = require 'backbone'
slinky = require './slinky.js'

module.exports.EoyView = class EoyView extends Backbone.View

  initialize: ->
    #set container to be scrollable height of all sections expanded
    @heroHeight = $('section').length * $(window).height()
    $content = $('.content').height(@heroHeight)
    @flattenedHeight = $('section').length * 20
    @activeHeight = $(window).height() - 95 - @flattenedHeight
    $('section').first().height(@activeHeight)
    @sayHi()

  sayHi: =>
    $content = $('.content')
    $(window).scroll () =>
      diff = $(window).scrollTop()
      active_id = $content.find('section').first().attr('data-section')
      active_next = parseInt(active_id) + 1
      active_height = $content.find('[data-section="' + active_id + '"]').height()
      if diff < @activeHeight
        $content.find('[data-section="' + active_id + '"]').height(@activeHeight - diff)
        $content.find('[data-section="' + active_next + '"]').height(diff)
      # else
      #   debugger
      # position = $content.scrollTop()
      # diff = active_height - position
      # console.log diff
      # $content.find('section.active').attr('data-id', active_id).animate({height: diff})
      # $content.find('section').data('id', 1).animate({height: active_height}).toggleClass('active')
      # debugger
    # $('article .inner').waypoint (direction) =>
    #   if direction is 'down'
    #     console.log 'section down scroll'
    #     $(this).closest('section').addClass('active')
    #   if direction is 'up'
    #     console.log 'section up scroll'
    #     $(this).closest('section').removeClass('active')
    # , { offset: 'bottom-in-view' }
    # $('.nav').on('scroll', @doScroll() )
    # $('.nav').slinky()
    # $('.nav').waypoint (direction) =>
    #   if direction is 'down'
    #     console.log 'scroll out of view'
    #     $('.nav').addClass('hidden')
    #   if direction is 'up'
    #     console.log 'hit top of page'
    #     $('.nav').removeClass('hidden')
    # # , { offset: 'bottom-in-view' }

    # $('.nav').waypoint (direction) =>
    #   if direction is 'down'
    #     console.log 'bottom-in-view down'
    #     # $('.nav').addClass('hidden')
    #   if direction is 'up'
    #     console.log 'bottom-in-view up'
    #     # $('.nav').removeClass('hidden')
    # , { offset: 'bottom-in-view' }

    # $('.page-content').waypoint (direction) =>
    #   if direction is 'down'
    #     console.log 'add menu'
    #     $('.header').addClass('solid')
    #   if direction is 'up'
    #     console.log 'remove menu'
    #     $('.header').removeClass('solid')
    # , { offset: '5%' }


    # $('section').waypoint (direction) =>
    #   if direction is 'down'
    #     console.log 'box down'
    #   if direction is 'up'
    #     console.log 'box up'
    # , { offset: 'bottom-in-view' }

  doScroll: =>
    console.log 'doScroll'

        # console.log 'doScroll'
    #   debugger
    #   scrollTop = $(window).scrollTop()
    #   console.log scrollTop

      # if scrollTop < 200)
      #   maxHeight = 150
      # else if(scrollTop > 400)
      #   maxHeight = 75
      # else
      #   maxHeight = 150 - 75 * (((scrollTop-200) * 100)/200)/100
      # $('.main-title').stop().animate({'max-height': maxHeight+"px"}, 500)


module.exports.init = ->
  new EoyView