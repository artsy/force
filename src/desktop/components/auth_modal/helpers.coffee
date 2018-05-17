sd = require('sharify').data

module.exports =
  checkAcceptedTerms: () ->
    input = $('input#accepted_terms_of_service').get(0)
    input.setCustomValidity? ''
    if $(input).prop('checked')
      $('.tos-error').text ''
      $boxContainer = $('.gdpr-signup__form__checkbox__accept-terms')
      $boxContainer.attr('data-state', null)
      true
    else
      $boxContainer = $('.gdpr-signup__form__checkbox__accept-terms')
      $boxContainer.attr('data-state', 'error')
      input = $('input#accepted_terms_of_service').get(0)
      input.setCustomValidity('')
      $('.tos-error').text 'Please agree to our terms to continue'
      false

  fbSignup: (e) ->
    e.preventDefault()
    queryData =
      'signup-intent': @signupIntent
      'signup-referer': @signupReferer
      'redirect-to': @afterAuthPath
    queryString = $.param(queryData)
    fbUrl = sd.AP.facebookPath + '?' + queryString

    if @checkAcceptedTerms()
      gdprString = $.param(@gdprData(@serializeForm()))
      gdprFbUrl = fbUrl + "&" + gdprString
      window.location.href = gdprFbUrl


  gdprData: (formData) ->
    'accepted_terms_of_service': !!formData['accepted_terms_of_service']
    'agreed_to_receive_emails': !!formData['accepted_terms_of_service']
