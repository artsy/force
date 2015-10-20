# Centralizes configuration for currently running split tests
#
# eg.
# header_design:
#   key: 'header_design'
#   outcomes:
#     old: 0.8
#     new: 0.2
#   edge: 'new'
#   dimension: 'dimension1' # Optional GA dimension
#   scope: 'local' # Optionally disable global initialization
#
# Note: if there are no running tests
# this should export empty Object
# module.exports = {}

module.exports =

  partner_application_copy:
    key: 'partner_application_copy'
    outcomes:
      join: 0.5
      apply: 0.5

  share_article:
    key: 'share_article'
    edge: 'current_fixed'
    outcomes:
      current: 0.33
      current_fixed: 0.33
      fixed: 0.34

  scroll_article:
    key: 'scroll_article'
    edge: 'infinite'
    outcomes:
      infinite: 0.5
      static: 0.5
