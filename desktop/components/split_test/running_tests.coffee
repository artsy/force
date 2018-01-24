# Centralizes configuration for currently running split tests
#
# eg.
# header_design:
#   key: 'header_design'
#   outcomes:
#     old: 8
#     new: 2
#   edge: 'new'
#   dimension: 'dimension1' # Optional GA dimension
#   scope: 'local' # Optionally disable global initialization
#
# Note: if there are no running tests
# this should export empty Object
# module.exports = {}

module.exports = {
  artist_market_data:
    key: 'artist_market_data'
    outcomes:
      control: 50
      experiment: 50
    edge: 'experiment'
  editorial_signup_test:
    key: 'editorial_signup_test'
    outcomes:
      control: 50
      experiment: 50
    edge: 'experiment'
  onboarding_test:
    key: 'onboarding_test'
    outcomes:
      control: 50
      experiment: 50
    edge: 'experiment'
}
