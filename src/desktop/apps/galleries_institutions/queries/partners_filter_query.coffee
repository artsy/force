module.exports =
  """
  query GalleriesInstitutionsPartnersQuery($includeAggregations: Boolean!, $includeResults: Boolean!, $near: String, $category: [String], $type: [PartnerClassification], $page: Int, $term: String) {
    category: filterPartners(eligibleForListing:true, aggregations:[CATEGORY, TOTAL] size:0, near: $near, type: $type, defaultProfilePublic:true, term: $term) @include(if: $includeAggregations) {
      total
      aggregations {
        counts {
          id: value
          name
          count
        }
      }
    }

    results: filterPartners(eligibleForListing:true, aggregations:[TOTAL], sort: RANDOM_SCORE_DESC, page: $page, size: 9, near: $near, partnerCategories:$category type: $type, defaultProfilePublic:true, term: $term) @include(if: $includeResults) {
      total
      hits {
        ... partner
      }
    }
  }

  #{require './partner_fragment.coffee'}
  """
