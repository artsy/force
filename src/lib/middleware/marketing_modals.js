const _ = require("underscore")
const JSONPage = require("../../desktop/components/json_page")

module.exports = function marketingModals(req, res, next) {
  let slug
  if (!(slug = req.query["m-id"])) {
    res.locals.sd.MARKETING_SIGNUP_MODALS = []
    return next()
  }

  const page = new JSONPage({ name: "marketing-signup-modals" })
  return page
    .get()
    .then(function (data) {
      // Used by desktop
      res.locals.sd.MARKETING_SIGNUP_MODALS = data.modals

      // Used by mobile
      res.locals.sd.MOBILE_MARKETING_SIGNUP_MODALS = data.modals
      const modalData = _.findWhere(data.modals, { slug })
      if (modalData) {
        res.locals.modal = modalData
      }
      const loggedOut = req.user == null
      if (loggedOut && modalData != null && res.locals.sd.IS_MOBILE) {
        res.locals.showMarketingSignupModal = true
      }

      next()
    })
    .catch(next)
}
