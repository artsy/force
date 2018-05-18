module.exports = [
  is_auction: {
    true: [
      'specialist'
      { is_logged_out: true: ['account'] }
    ]
    false: [
      pre_qualify: {
        true: [
          { has_seen_commercial_interest: false: ['commercial_interest'] }
          {
            is_collector:
              true: [
                { has_basic_info: false: ['basic_info'] }
                { has_seen_artists_in_collection: false: ['artists_in_collection'] }
                { has_seen_galleries_you_work_with: false: ['galleries_you_work_with'] }
                { has_seen_auction_houses_you_work_with: false: ['auction_houses_you_work_with'] }
                { has_seen_fairs_you_attend: false: ['fairs_you_attend'] }
                { has_seen_institutional_affiliations: false: ['institutional_affiliations'] }
                'inquiry'
                { is_logged_out: true: ['account'] }
              ]
              false: [
                'how_can_we_help'
                {
                  help_by:
                    price: [
                      'specialist'
                      { is_logged_out: true: ['account'] }
                    ]
                    purchase: [
                      { has_basic_info: false: ['basic_info'] }
                      'inquiry'
                      { is_logged_out: true: ['account'] }
                    ]
                    student_research_question: [
                      'specialist'
                      { is_logged_out: true: ['account'] }
                    ]
                    journalist_question: [
                      'inquiry'
                      { is_logged_out: true: ['account'] }
                    ]
                    other_question: [
                      'specialist'
                      { is_logged_out: true: ['account'] }
                    ]
                }
              ]
          }
        ]
        false: [
          'inquiry'
          {
            enable_new_inquiry_flow: false: [
              { is_logged_out: true: ['account'] }
            ]
          }
          { has_completed_profile: false: ['confirmation'] }
          { has_seen_commercial_interest: false: ['commercial_interest'] }
          { has_basic_info: false: ['basic_info'] }
          {
            is_collector: true: [
              { has_seen_artists_in_collection: false: ['artists_in_collection'] }
              { has_seen_galleries_you_work_with: false: ['galleries_you_work_with'] }
              { has_seen_auction_houses_you_work_with: false: ['auction_houses_you_work_with'] }
              { has_seen_fairs_you_attend: false: ['fairs_you_attend'] }
              { has_seen_institutional_affiliations: false: ['institutional_affiliations'] }
            ]
          }
        ]
      }
      {
        is_logged_in: false: [
          { has_seen_confirmation_this_session: false: ['confirmation'] }
          'account'
        ]
      }
    ]
  }
  'done'
]
