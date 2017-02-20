module.exports =
  """
  query location ($near: String, $type: [PartnerClassification]) {

    primary: partners(eligible_for_listing: true, eligible_for_primary_bucket: true, sort: RANDOM_SCORE_DESC, default_profile_public: true, near: $near, type: $type) {
      ... partner
    }
    secondary: partners(eligible_for_listing: true, eligible_for_secondary_bucket: true, sort: RANDOM_SCORE_DESC, default_profile_public: true, near: $near, type: $type){
      ... partner
    }
  }

  #{require './partner_fragment.coffee'}
  """
