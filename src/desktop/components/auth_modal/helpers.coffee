sd = require('sharify').data
gdprDisabled = sd.GDPR_COMPLIANCE_TEST is 'control'

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
      'redirect-to': @afterAuthPath
    queryString = $.param(queryData)
    fbUrl = sd.AP.facebookPath + '?' + queryString
    return window.location.href = fbUrl if gdprDisabled

    if @checkAcceptedTerms()
      gdprString = $.param(@gdprData(@serializeForm()))
      gdprFbUrl = fbUrl + "&" + gdprString
      window.location.href = gdprFbUrl

  # accomodate AB test for checkboxes
  gdprData: (formData) ->
    return {} if gdprDisabled
    if sd.GDPR_COMPLIANCE_TEST is 'separated_checkboxes'
      'receive_emails': !!formData['receive_emails']
      'accepted_terms_of_service': !!formData['accepted_terms_of_service']
    else if sd.GDPR_COMPLIANCE_TEST is 'combined_checkboxes'
      'receive_emails': !!formData['accepted_terms_of_service']
      'accepted_terms_of_service': !!formData['accepted_terms_of_service']