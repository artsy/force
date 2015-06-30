module.exports =
  views:
    commercial_interest: require './views/commercial_interest.coffee'
    basic_info: require './views/basic_info.coffee'
    artists_in_collection: require './views/artists_in_collection.coffee'
    galleries_auction_houses: require './views/galleries_auction_houses.coffee'
    art_fairs: require './views/art_fairs.coffee'
    institutional_affliation: require './views/institutional_affliation.coffee'
    auth: require './views/auth.coffee'
    how_can_we_help: require './views/how_can_we_help.coffee'
    specialist: require './views/specialist.coffee'
    contact_partner: require '../simple_contact/views/contact_partner.coffee'
    inquiry: require './views/inquiry.coffee'
    done: require './views/done.coffee'

  decisions:
    prequalify: ({ user }) ->
      not user.get 'prequalified'

    is_collector: ({ user }) ->
      user.isCollector()

    is_logged_in: ({ user }) ->
      user.isLoggedIn()

    help_by: ({ state }) ->
      state.get 'value'

    has_basic_info: ({ user }) ->
      user.has('profession') and
      user.has('location') and
      user.has('phone')

  steps: [
    prequalify:
      true: [
        'commercial_interest'
        is_collector:
          true: [
            'basic_info'
            'artists_in_collection'
            'galleries_auction_houses'
            'art_fairs'
            'institutional_affliation'
            'inquiry'
            'done'
          ]
          false: [
            'how_can_we_help'
            help_by:
              price: [
                'specialist'
                'done'
              ]
              purchase: [
                has_basic_info:
                  true: [
                    'inquiry'
                    'done'
                  ]
                  false: [
                    'basic_info'
                    'inquiry'
                    'done'
                  ]
              ]
              student_research_question: [
                'specialist'
                'done'
              ]
              journalist_question: [
                'contact_partner'
                'done'
              ]
              other_question: [
                'specialist'
                'done'
              ]
          ]
      ]

      false: [
        'commercial_interest'
        'basic_info'
        is_collector:
          true: [
            'artists_in_collection'
            'galleries_auction_houses'
            'art_fairs'
            'institutional_affliation'
            is_logged_in:
              true: ['done']
              false: ['auth']
          ]
          false: [
            is_logged_in:
              true: ['done']
              false: ['auth']
          ]
      ]
  ]

