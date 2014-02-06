_     = require 'underscore'
jade  = require 'jade'
path  = require 'path'
fs    = require 'fs'

{ fabricate } = require 'antigravity'
CurrentUser   = require '../../../../models/current_user'

render = (templateName) ->
  filename = path.resolve __dirname, "../#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Header template', ->
  it 'displays the welcome header', ->
    render('template')(sd: { HIDE_HEADER: false }, user: undefined).should.include 'main-layout-welcome-header'

  it 'hides the welcome header', ->
    render('template')(sd: { HIDE_HEADER: true }, user: undefined).should.not.include 'main-layout-welcome-header'

  it 'shows the admin link for admins', ->
    user = new CurrentUser fabricate('user', type: 'Admin', is_slumming: false)
    html = render('template')(sd: { ADMIN_URL: 'admin.com' }, user: user)
    html.should.not.include 'main-layout-welcome-header'
    html.should.include 'admin.com'

  it 'hides the admin link for slumming admins', ->
    user = new CurrentUser fabricate('user', type: 'Admin', is_slumming: true)
    html = render('template')(sd: { ADMIN_URL: 'admin.com' }, user: user)
    html.should.not.include 'main-layout-welcome-header'
    html.should.not.include 'admin.com'

  it 'shows the cms link for users with partner access', ->
    user = new CurrentUser(fabricate 'user', has_partner_access: true)
    html = render('template')(sd: { CMS_URL: 'cms.com' }, user: user)
    html.should.not.include 'main-layout-welcome-header'
    html.should.include 'cms.com'
