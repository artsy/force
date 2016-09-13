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
      { is_logged_out_but_has_account: true: ['account'] }
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
