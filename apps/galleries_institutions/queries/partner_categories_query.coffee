module.exports =

  """
  query partnerCategories($category_type: CategoryType, $partner_types: [PartnerClassification], $listing: Boolean){
    partner_categories(category_type: $category_type, size:30){
      name
      id
      primary: partners(eligible_for_listing:$listing, eligible_for_primary_bucket: true, type: $partner_types, sort: RANDOM_SCORE_DESC, has_full_profile:true, default_profile_public:true) {
        ... partner
      }
      secondary: partners(eligible_for_listing:$listing, eligible_for_secondary_bucket:true, type: $partner_types, sort: RANDOM_SCORE_DESC, has_full_profile:true, default_profile_public:true){
        ... partner
      }
    }
  }

  #{require './partner_fragment.coffee'}
  """