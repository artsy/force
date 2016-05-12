module.exports =
  """
  query partners_results($includeAggregations: Boolean!, $includeResults: Boolean!, $near: String, $category: [String], $type: [PartnerClassification], $page: Int, $term: String) {
    category: filter_partners(eligible_for_listing:true, aggregations:[CATEGORY, TOTAL] size:0, near: $near, type: $type, default_profile_public:true, term: $term) @include(if: $includeAggregations) {
      total
      aggregations {
        counts {
          id
          name
          count
        }
      }
    }

    results: filter_partners(eligible_for_listing:true, aggregations:[TOTAL], sort: RANDOM_SCORE_DESC, page: $page, size: 9, near: $near, partner_categories:$category type: $type, default_profile_public:true, term: $term) @include(if: $includeResults) {
      total
      hits {
        ... partner
      }
    }
  }

  #{require './partner_fragment.coffee'}
  """
