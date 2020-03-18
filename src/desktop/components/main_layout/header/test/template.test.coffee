_ = require 'underscore'
jade = require 'jade'
path = require 'path'
fs = require 'fs'

{ fabricate } = require '@artsy/antigravity'
CurrentUser = require '../../../../models/current_user'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )


describe 'Header template', ->
  it 'shows the admin link for admins', ->
    user = new CurrentUser fabricate('user', type: 'Admin', is_slumming: false)
    html = render('index')(sd: { ADMIN_URL: 'admin.com' }, user: user)
    html.should.containEql 'admin.com'

  it 'hides the admin link for slumming admins', ->
    user = new CurrentUser fabricate('user', type: 'Admin', is_slumming: true)
    html = render('index')(sd: { ADMIN_URL: 'admin.com' }, user: user)
    html.should.not.containEql 'admin.com'

  it 'shows the cms link for users with partner access', ->
    user = new CurrentUser(fabricate 'user', has_partner_access: true)
    html = render('index')(sd: { CMS_URL: 'cms.com' }, user: user)
    html.should.containEql 'cms.com'

  it 'shows the notification link for users logged in', ->
    html = render('index')(sd: { CURRENT_USER: { type: 'Admin' } })
    html.should.containEql 'mlh-notification'

  it 'sets the notification count if present in cookie', ->
    html = render('index')(sd: { CURRENT_USER: { type: 'Admin' }, NOTIFICATION_COUNT: "2" })
    html.should.containEql '<div data-visible="true" class="mlh-bundle-count js-notification-count">2</div>'
