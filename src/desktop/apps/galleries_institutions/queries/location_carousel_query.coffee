module.exports =
  """
  query GalleriesInstitutionsLocationsQuery($near: String, $type: [PartnerClassification]) {
    primary: filterPartners(eligibleForListing: true, aggregations:[TOTAL], eligibleForPrimaryBucket: true, sort: RANDOM_SCORE_DESC, defaultProfilePublic: true, near: $near, type: $type) {
      hits {
        ... partner
      }
    }
    secondary: filterPartners(eligibleForListing: true, aggregations:[TOTAL], eligibleForSecondaryBucket: true, sort: RANDOM_SCORE_DESC, defaultProfilePublic: true, near: $near, type: $type){
      hits {
        ... partner
      }
    }
  }

  #{require './partner_fragment.coffee'}
  """
