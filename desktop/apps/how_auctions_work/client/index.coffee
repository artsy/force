multiPageView = require '../../../components/multi_page/index'
AuthModalView = require '../../../components/auth_modal/view'

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
    e.preventDefault()
    new AuthModalView
      width: '500px',
      mode: 'register'
      copy: 'Sign up to bid on artworks'
