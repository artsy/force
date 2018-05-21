multiPageView = require '../../../components/multi_page/index.coffee'
<<<<<<< HEAD
mediator = require('../../../lib/mediator')
=======
mediator = require '../../../lib/mediator.coffee'
>>>>>>> 44144afcc6e9e59746b6d08dee539f4c7b3539cb

module.exports.init = ->
  view = multiPageView 'auction-faqs'
  view.collection.invoke 'fetch'
  ($faq = $('.js-multi-page-embed'))
    .html view.render().$el

  $('a[href*=#]:not(.avant-garde-button-black)').click (e) ->
    e.preventDefault()
    id = $(this).attr('href').replace '#', ''
    view.state.set 'active', id
    $('html, body')
      .animate { scrollTop: $faq.offset().top }, 'fast'

  $('.js-register-button').click (e) ->
    # TODO: remove dead code
    e.preventDefault()
    mediator.trigger 'open:auth',
      width: '500px',
      mode: 'register'
      copy: 'Sign up to bid on artworks'
