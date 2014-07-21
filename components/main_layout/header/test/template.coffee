_ = require 'underscore'
jade = require 'jade'
path = require 'path'
fs = require 'fs'

{ fabricate } = require 'antigravity'
CurrentUser = require '../../../../models/current_user'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Header template', ->
  it 'displays the welcome header', ->
    render('index')(sd: { HIDE_HEADER: false }, user: undefined).should.include 'main-layout-welcome-header'

  it 'hides the welcome header', ->
    render('index')(sd: { HIDE_HEADER: true }, user: undefined).should.not.include 'main-layout-welcome-header'

  it 'shows the admin link for admins', ->
    user = new CurrentUser fabricate('user', type: 'Admin', is_slumming: false)
    html = render('index')(sd: { ADMIN_URL: 'admin.com' }, user: user)
    html.should.not.include 'main-layout-welcome-header'
    html.should.include 'admin.com'

  it 'hides the admin link for slumming admins', ->
    user = new CurrentUser fabricate('user', type: 'Admin', is_slumming: true)
    html = render('index')(sd: { ADMIN_URL: 'admin.com' }, user: user)
    html.should.not.include 'main-layout-welcome-header'
    html.should.not.include 'admin.com'

  it 'shows the cms link for users with partner access', ->
    user = new CurrentUser(fabricate 'user', has_partner_access: true)
    html = render('index')(sd: { CMS_URL: 'cms.com' }, user: user)
    html.should.not.include 'main-layout-welcome-header'
    html.should.include 'cms.com'

describe 'Microsite template', ->
  it 'does not render the welcome header', ->
    render('microsite')(sd: { HIDE_HEADER: true }, user: undefined).should.not.include 'main-layout-welcome-header'

  it 'links to the user profile', ->
    user = new CurrentUser fabricate('user')
    html = render('microsite')(sd: {}, user: user)
    html.should.not.include 'main-layout-welcome-header'
    html.should.include user.get('default_profile_id')
    html.should.include user.get('name')

  it 'works with out user', ->
    html = render('microsite')(sd: { CMS_URL: 'cms.com' })
    html.should.include '/log_in'
