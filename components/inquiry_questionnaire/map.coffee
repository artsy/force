module.exports =
  views:
    commercial_interest: require './views/commercial_interest.coffee'
    basic_info: require './views/basic_info.coffee'
    artists_in_collection: require './views/artists_in_collection.coffee'
    how_can_we_help: require './views/how_can_we_help.coffee'
    specialist: require './views/specialist.coffee'
    inquiry: require './views/inquiry.coffee'
    account: require './views/account.coffee'
    done: require './views/done.coffee'

  decisions:
    pre_qualify: ({ artwork }) ->
      artwork.related()
        .partner.get('pre_qualify') is true

    is_collector: ({ user }) ->
      user.isCollector()

    help_by: ({ state }) ->
      state.get 'value'

    has_basic_info: ({ user }) ->
      user.has('profession') and
      user.has('location') and
      user.has('phone')

    has_commercial_interest: ({ user }) ->
      user.isCommercial()

    is_logged_in: ({ user }) ->
      user.isLoggedIn()

  steps: [
    pre_qualify:
      true: [
        { has_commercial_interest: false: ['commercial_interest'] }
        {
          is_collector:
            true: [
              'basic_info'
              'artists_in_collection'
              'inquiry'
              {
                is_logged_in:
                  true: ['done']
                  false: [
                    'account'
                    'done'
                  ]
              }
            ]
            false: [
              'how_can_we_help'
              {
                help_by:
                  price: ['specialist']
                  purchase: [
                    { has_basic_info: false: ['basic_info'] }
                    'inquiry'
                  ]
                  student_research_question: ['specialist']
                  journalist_question: ['inquiry']
                  other_question: ['specialist']
              }
              {
                is_logged_in:
                  true: ['done']
                  false: [
                    'account'
                    'done'
                  ]
              }
            ]
        }
      ]

      false: [
        'inquiry'
        { has_commercial_interest: false: ['commercial_interest'] }
        { has_basic_info: false: ['basic_info'] }
        { is_collector: true: ['artists_in_collection'] }
        {
          is_logged_in:
            true: ['done']
            false: [
              'account'
              'done'
            ]
        }
      ]
  ]
