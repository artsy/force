const Analytics = require("analytics-node")
const { data: sd } = require("sharify")

export const analytics = new Analytics(sd.SEGMENT_WRITE_KEY)

module.exports.setCampaign = function (req, _res, next) {
  if (!sd.SEGMENT_WRITE_KEY) {
    return next()
  }

  req.session.modalId = req.body.modal_id || req.query.modal_id
  req.session.acquisitionInitiative =
    req.body.acquisition_initiative || req.query.acquisition_initiative

  next()
}

module.exports.trackSignup = service =>
  function (req, _res, next) {
    const { acquisitionInitiative, modalId } = req.session

    delete req.session.acquisitionInitiative
    delete req.session.modalId

    if (!sd.SEGMENT_WRITE_KEY) {
      return next()
    }

    analytics.track({
      event: "Created account",
      userId: req.user.id,
      properties: {
        modal_id: modalId,
        acquisition_initiative: acquisitionInitiative,
        signup_service: service,
        user_id: req.user.id,
      },
    })

    next()
  }

module.exports.trackLogin = function (req, _res, next) {
  if (!sd.SEGMENT_WRITE_KEY) {
    return next()
  }

  analytics.track({
    event: "Successfully logged in",
    userId: req.user.id,
  })

  next()
}
