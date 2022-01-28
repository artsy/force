// TODO: Remove let added for 'rewire'
let opts = require("../options")
// TODO: Remove let added for 'rewire'
let Analytics = require("analytics-node")

module.exports.setCampaign = function (req, res, next) {
  if (!opts.SEGMENT_WRITE_KEY) {
    return next()
  }
  req.session.modalId = req.body.modal_id || req.query.modal_id
  req.session.acquisitionInitiative =
    req.body.acquisition_initiative || req.query.acquisition_initiative
  next()
}

module.exports.trackSignup = service =>
  function (req, res, next) {
    const { acquisitionInitiative, modalId } = req.session
    delete req.session.acquisitionInitiative
    delete req.session.modalId

    if (!opts.SEGMENT_WRITE_KEY) {
      return next()
    }

    const analytics = new Analytics(opts.SEGMENT_WRITE_KEY)
    analytics.track({
      event: "Created account",
      userId: req.user.get("id"),
      properties: {
        modal_id: modalId,
        acquisition_initiative: acquisitionInitiative,
        signup_service: service,
        user_id: req.user.get("id"),
      },
    })
    next()
  }

module.exports.trackLogin = function (req, res, next) {
  if (!opts.SEGMENT_WRITE_KEY) {
    return next()
  }
  const analytics = new Analytics(opts.SEGMENT_WRITE_KEY)
  analytics.track({
    event: "Successfully logged in",
    userId: req.user.get("id"),
  })
  next()
}
