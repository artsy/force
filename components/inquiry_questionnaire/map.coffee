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
    specialist: require '../simple_contact/views/specialist.coffee'
    contact_partner: require '../simple_contact/views/contact_partner.coffee'
    inquiry: require '../simple_contact/views/inquiry.coffee'
    done: require './views/done.coffee'

  decisions:
    prequalify: ({ user }) ->
      not user.get 'prequalified'

    is_collector: ({ user }) ->
      user.isCollector()

    is_logged_in: ({ user }) ->
      user.id?

    help_by: ({ state }) ->
      state.get 'value'

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
          ]
          false: [
            'basic_info'
            'how_can_we_help'
            help_by:
              purchase: [
                'basic_info'
                'artists_in_collection'
                'galleries_auction_houses'
                'art_fairs'
                'institutional_affliation'
                'inquiry'
              ]
              price: ['specialist']
              student_research_question: ['specialist']
              journalist_question: ['contact_partner']
              other_question: ['specialist']
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

