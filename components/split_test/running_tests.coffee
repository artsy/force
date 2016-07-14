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

module.exports =
  # Set up so we can slowly activate new_homepage_buckets
  # as we are comfortable with the load and performance
  personalized_homepage:
    key: 'personalized_homepage'
    outcomes:
      new_homepage_1: 1
      new_homepage_2: 1
      new_homepage_3: 1
      new_homepage_4: 1
      new_homepage_5: 1
      old_homepage_1: 1
      old_homepage_2: 1
      old_homepage_3: 1
      old_homepage_4: 1
      old_homepage_5: 1
    edge: 'new_homepage_1'
    dimension: 'dimension14'
