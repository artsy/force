module.exports =
  views:
    commercial_interest: require './views/commercial_interest.coffee'
    basic_info: require './views/basic_info.coffee'
    # artists_in_collection: require './views/artists_in_collection.coffee'
    # galleries_auction_houses: require './views/galleries_auction_houses.coffee'
    # art_fairs: require './views/art_fairs.coffee'
    # institutional_affliation: require './views/institutional_affliation.coffee'
    # authenticate: require './views/how_can_we_help.coffee'
    # how_can_we_help: require './views/how_can_we_help.coffee'

  predicates:
    prequalify: -> false
    has_commercial_interest: -> true
    follow_up: -> true

  steps: [
    prequalify:
      true: [
        'commercial_interest'
        follow_up:
          true: [
            'basic_info'
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
              journalist_question: ['ask_specialist']
              other_question: ['ask_specialist']
        ]
      ]

      false: [
        'commercial_interest'
        'basic_info'
        has_commercial_interest:
          true: [
            'artists_in_collection'
            'galleries_auction_houses'
            'art_fairs'
            'institutional_affliation'
            'authenticate'
          ]
          false: ['authenticate']
      ]
  ]

