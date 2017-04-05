module.exports =

  """
  query partnerCategories($category_type: CategoryType, $type: [PartnerClassification]){
    partner_categories(category_type: $category_type, size: 30, internal: false){
      name
      id
      primary: partners(eligible_for_listing: true, eligible_for_primary_bucket: true, type: $type, sort: RANDOM_SCORE_DESC, default_profile_public: true) {
        ... partner
      }
      secondary: partners(eligible_for_listing: true, eligible_for_secondary_bucket: true, type: $type, sort: RANDOM_SCORE_DESC, default_profile_public: true){
        ... partner
      }
    }
  }

  #{require './partner_fragment'}
  """
