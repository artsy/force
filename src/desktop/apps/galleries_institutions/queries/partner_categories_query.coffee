module.exports =

  """
  query GalleriesInstitutionsPartnerCategoriesQuery($categoryType: PartnerCategoryType, $type: [PartnerClassification]){
    partner_categories: partnerCategories(categoryType: $categoryType, size: 50, internal: false){
      name
      id: slug
      primary: partners(eligibleForListing: true, eligibleForPrimaryBucket: true, type: $type, sort: RANDOM_SCORE_DESC, defaultProfilePublic: true) {
        ... partner
      }
      secondary: partners(eligibleForListing: true, eligibleForSecondaryBucket: true, type: $type, sort: RANDOM_SCORE_DESC, defaultProfilePublic: true){
        ... partner
      }
    }
  }

  #{require './partner_fragment.coffee'}
  """
