module.exports =
  views:
    confirmation: require './views/confirmation.coffee'
    commercial_interest: require './views/commercial_interest.coffee'
    basic_info: require './views/basic_info.coffee'
    artists_in_collection: require './views/artists_in_collection.coffee'
    galleries_you_work_with: require './views/galleries_you_work_with.coffee'
    auction_houses_you_work_with: require './views/auction_houses_you_work_with.coffee'
    institutional_affiliations: require './views/institutional_affiliations.coffee'
    fairs_you_attend: require './views/fairs_you_attend.coffee'
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

    has_completed_profile: ({ logger, user }) ->
      steps = ['commercial_interest', 'basic_info']
      steps.push 'artists_in_collection' if user.isCollector()
      logger.hasLogged steps...

    has_seen_confirmation: ({ logger }) ->
      logger.hasLogged 'confirmation'

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
        { has_completed_profile: false: ['confirmation'] }
        { has_seen_commercial_interest: false: ['commercial_interest'] }
        { has_seen_basic_info: false: ['basic_info'] }
        {
          is_collector: true: [
            has_seen_artists_in_collection: false: ['artists_in_collection']
          ]
        }
      ]
    }
    {
      is_logged_in: false: [
        { has_seen_confirmation: false: ['confirmation'] }
        'account'
      ]
    }
    'done'
  ]
