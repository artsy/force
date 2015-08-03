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

    is_logged_in: ({ user }) ->
      user.isLoggedIn()

    has_seen_commercial_interest: ({ logger }) ->
      logger.hasLogged 'commercial_interest'

    has_seen_basic_info: ({ logger }) ->
      logger.hasLogged 'basic_info'

    has_seen_artists_in_collection: ({ logger }) ->
      logger.hasLogged 'artists_in_collection'

  steps: [
    pre_qualify: {
      true: [
        { has_seen_commercial_interest: false: ['commercial_interest'] }
        {
          is_collector:
            true: [
              { has_basic_info: false: ['basic_info'] }
              { has_seen_artists_in_collection: false: ['artists_in_collection'] }
              'inquiry'
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
            ]
        }
      ]
      false: [
        'inquiry'
        { has_seen_commercial_interest: false: ['commercial_interest'] }
        { has_seen_basic_info: false: ['basic_info'] }
        {
          is_collector: true: [
            has_seen_artists_in_collection: false: ['artists_in_collection']
          ]
        }
      ]
    }
    { is_logged_in: false: ['account'] }
    'done'
  ]
