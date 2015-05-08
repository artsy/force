//This tracks the gallery application form on the gallery partnerships page, 
//and allows us to track gallery behavior by the tier subsequenly assigned
// in Salesforce by the GP team.

if (!location.pathname.match('/gallery-partnerships')) return
analytics.page('Gallery Partnerships')

if (sd.GALLERY_PARTNERSHIPS_APPLY == 'inline'){
  analytics.trackForm(
    $('.js-gallery-partnerships-apply-form')[0], 
    '/gallery-partnerships CTA',
    {session_id: sd.SESSION_ID}
  );
}else{
	analytics.trackLink($('.apply-link-cta')[0], '/gallery-partnerships CTA')
}

$('.partnerships-nav-link.internal').click(function(e){
  var section = $(e.currentTarget).attr('data-section')
  analytics.track('Clicked nav link on gallery partnerships', 
    {section: section})
})

$('.partnerships-nav-apply-link').click(function(e){
  analytics.track('Clicked nav apply on gallery partnerships')
})

$('.apply-button').click(function(e){
  analytics.track('Clicked bottom apply on gallery partnerships')
})
    

  