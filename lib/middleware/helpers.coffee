#
# Adds route helpers to the req or res objects.
#

module.exports = (req, res, next) ->
  res.backboneError = (m, e) -> next e.text
  next()