Notice = require '../../notice/index.coffee'
CurrentUser = require '../../../models/current_user.coffee'
Dismisser = require '../../has_seen/dismisser.coffee'

pastCutoff = (user) ->
  userCreatedAt = new Date(user.get 'created_at').getTime()
  cutoff = new Date('2016-01-20T00:00:00').getTime()
  userCreatedAt > cutoff

module.exports = ->
  # Only display if logged in
  if user = CurrentUser.orNull()
    dismisser = new Dismisser name: 'pp-01-20-16', limit: 2

    # Don't display if it's been previously dismissed
    return if dismisser.dismissed()

    user.fetch success: ->
      # Don't display if the user has already accepted the updated policy
      return if pastCutoff user

      notice = new Notice message: "
        Please note: Our
        <a href='/privacy' class='faux-underline'>Privacy Policy</a>
        was recently updated.
      "
      notice.$el.one 'click', dismisser.dismiss
      notice.on 'open', dismisser.tick
      notice.on 'close', dismisser.dismiss

      notice.open()
