sd = require('sharify').data

# These need to be updated when a new mailing is added or one is removed from Gravity.
emailTypes =
  'weekly_email': "Weekly Newsletters"
  'personalized_email': "Personalized Emails"
  'follow_users_email': "User Follow Emails"
  'offer_emails': "Offer Emails"

@unsubscribe = (req, res, next) ->
  auth_token = req.query.authentication_token
  res.locals.sd.UNSUB_AUTH_TOKEN = auth_token
  res.render 'index', emailTypes: emailTypes
