# Centralizes configuration for currently running split tests
#
# eg.
# header_design:
#   key: 'header_design'
#   outcomes:
#     old: 8
#     new: 2
#
# Or, `outcomes` can be an array, when you specify `weighting: 'equal'.
#   weighting: 'equal'
#   outcomes: [
#     'old'
#     'new'
#   ]
#   edge: 'new'
#   dimension: 'dimension1' # Optional GA dimension
#   scope: 'local' # Optionally disable global initialization
#   control_group: 'old'  #Defaults to `control`, Reflection sees this.
#
# For equal weighting, add `weighting: 'equal'` and `outcomes` as an array.
#
# Note: if there are no running tests
# this should export empty Object
# module.exports = {}

module.exports = {
  home_search_test:
    key: 'home_search_test'
    outcomes:
      experiment: 50
      control: 50
    control_group: 'control'
    edge: 'experiment'

  artist_page_pagination:
    key: 'artist_page_pagination'
    outcomes:
      experiment: 50
      control: 50
    control_group: 'control'
    edge: 'experiment'

  article_tooltips:
    key: 'article_tooltips'
    weighting: 'equal'
    outcomes: [
      'bio',
      'market',
      'control'
    ]
}

