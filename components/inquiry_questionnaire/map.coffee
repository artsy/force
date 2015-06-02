module.exports =
  views:
    commercial_interest: require './views/commercial_interest.coffee'
    basic_info: require './views/basic_info.coffee'
    artists_in_collection: require './views/artists_in_collection.coffee'
    galleries_auction_houses: require './views/galleries_auction_houses.coffee'
    art_fairs: require './views/art_fairs.coffee'
    institutional_affliation: require './views/institutional_affliation.coffee'
    login: require './views/login.coffee'
    how_can_we_help: require './views/how_can_we_help.coffee'

  decisions:
    prequalify: ({ user }) ->
      user.set 'prequalified', false
      true

    is_collector: ({ user }) ->
      user.isCollector()

    how_can_we_help: ({ state }) ->
      state.get 'value'

  steps: [
    prequalify:
      true: [
        'commercial_interest'
        is_collector:
          true: [
            'basic_info'
          ]
          false: [
            'basic_info'
            'how_can_we_help'
            how_can_we_help:
              purchase: [
                'basic_info'
                'artists_in_collection'
                'galleries_auction_houses'
                'art_fairs'
                'institutional_affliation'
                'inquiry'
              ]
              price: ['ask_specialist']
              student_research_question: ['ask_specialist']
              journalist_question: ['contact_gallery']
              other_question: ['ask_specialist']
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
            'login'
          ]
          false: ['login']
      ]
  ]

