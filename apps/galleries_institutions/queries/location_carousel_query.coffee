module.exports =
  """
  query location ($near: String, $listing:Boolean, $partner_types: [PartnerClassification]) {

    primary: partners(eligible_for_listing:$listing, active:false, eligible_for_primary_bucket: true, sort:RANDOM_SCORE_DESC, default_profile_public:true, near: $near, type: $partner_types) {
      ... partner
    }
    secondary: partners(eligible_for_listing:$listing, active:false, eligible_for_secondary_bucket:true, sort:RANDOM_SCORE_DESC, default_profile_public:true, near: $near, type: $partner_types){
      ... partner
    }
  }

  #{require './partner_fragment.coffee'}
  """