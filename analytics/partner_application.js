//This tracks the partner application form flow,
//and allows us to track gallery behavior by the tier subsequenly assigned
// in Salesforce by the GP team.

module.exports = function(router) {
  var state = router.state
  var form = router.form
  console.log('module.exports worked')

  analytics.track('Landed on partner application form', _.extend(state.attributes, {
    session_id: sd.SESSION_ID
  }))

  router.on('route', function(route) {
    analytics.track('Changed partner application route', _.extend(state.attributes, 
      {route: route}, {session_id: sd.SESSION_ID}
    ))
  })

  state.on('change:mode', function(state, mode) {
    analytics.track('Partner application mode changed', _.extend(state.attributes, 
      {session_id: sd.SESSION_ID}
    ))
  })

  state.on('change:step', function(state, step) {
    analytics.track('Partner application step changed', _.extend(state.attributes, 
      {session_id: sd.SESSION_ID}
    ))
  })

  state.on('change:state', function(state, value) {
    analytics.track('Submitted partner application form', _.extend(state.attributes, 
      {session_id: sd.SESSION_ID}
    ))
  })

  $(document).on('click', '.paf-submit', function() {
    analytics.track('Clicked submit button on partner application form', _.extend(state.attributes, 
      {session_id: sd.SESSION_ID}
    ))    
  })

  $(document).on('click', '.paf-next', function() {
    analytics.track('Clicked next button on partner application form', _.extend(state.attributes, 
      {session_id: sd.SESSION_ID}
    ))
  })
 
}

if (location.pathname.match('/gallery-partnerships')) {

  analytics.page('Gallery Partnerships');

  analytics.trackForm(
    $('.js-gallery-partnerships-apply-form')[0],
    '/gallery-partnerships CTA',
    {
      session_id: sd.SESSION_ID,
      user_id: sd.CURRENT_USER && sd.CURRENT_USER.id
    }
  );

  $('.partnerships-nav-link.internal').click(function(e){
    var section = $(e.currentTarget).attr('data-section')
    analytics.track('Clicked nav link on gallery partnerships',
      {section: section, session_id: sd.SESSION_ID}
    )
  })

  $('.partnerships-nav-apply-link').click(function(e){
    analytics.track('Clicked nav apply on gallery partnerships', 
      {session_id: sd.SESSION_ID}
    )
  })

  $('.js-gallery-partnerships-apply-submit').click(function(e){
    analytics.track('Clicked bottom apply on gallery partnerships',
      {session_id: sd.SESSION_ID}
    )
  })

}