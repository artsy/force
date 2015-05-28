Notice = require '../../notice/index.coffee'
CurrentUser = require '../../../models/current_user.coffee'
Dismisser = require '../../has_seen/dismisser.coffee'

pastCutoff = (user) ->
  userCreatedAt = new Date(user.get('created_at')).getTime()
  cutoff = new Date('2015-05-29T00:00:00').getTime()
  userCreatedAt > cutoff

module.exports = ->
  if user = CurrentUser.orNull() # Only display if logged in
    dismisser = new Dismisser name: 'pp-5-29-15', limit: 5

    return if dismisser.dismissed()

    user.fetch success: ->
      return if pastCutoff(user)

      notice = new Notice message: "
        Please note: Our
        <a href='/terms' class='faux-underline'>Terms of Use</a>
        and
        <a href='/privacy' class='faux-underline'>Privacy Policy</a>
        were recently updated.
      "

      notice.on 'open', ->
        dismisser.tick()
      notice.on 'close', ->
        dismisser.dismiss()

      notice.open()
