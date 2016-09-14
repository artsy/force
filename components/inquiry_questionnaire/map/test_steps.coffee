module.exports = [
  { is_logged_out_but_has_account: true: ['account'] }
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
            'test_inquiry'
            { is_logged_out: true: ['test_account'] }
          ]
          false: [
            'how_can_we_help'
            {
              help_by:
                price: [
                  'test_specialist'
                  { is_logged_out: true: ['test_account'] }
                ]
                purchase: [
                  { has_basic_info: false: ['basic_info'] }
                  'test_inquiry'
                  { is_logged_out: true: ['test_account'] }
                ]
                student_research_question: [
                  'test_specialist'
                  { is_logged_out: true: ['test_account'] }
                ]
                journalist_question: [
                  'test_inquiry'
                  { is_logged_out: true: ['test_account'] }
                ]
                other_question: [
                  'test_specialist'
                  { is_logged_out: true: ['test_account'] }
                ]
            }
          ]
      }
    ]
    false: [
      'test_inquiry'
      { is_logged_out: true: ['test_account'] }
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
  'done'
]
