module.exports =
  """
  query partners_results($includeAggregations: Boolean!, $includeResults: Boolean!, $listing: Boolean, $near: String, $category: [String], $partner_types: [PartnerClassification], $page: Int) {
    category: filter_partners(eligible_for_listing:$listing, aggregations:[CATEGORY, TOTAL] size:0, near: $near, type: $partner_types, default_profile_public:true) @include(if: $includeAggregations) {
      total
      aggregations {
        counts {
          id
          name
          count
        }
      }
    }

    results: filter_partners(eligible_for_listing:$listing, aggregations:[TOTAL], page: $page, size: 9, near: $near, partner_categories:$category type: $partner_types, default_profile_public:true) @include(if: $includeResults) {
      total
      hits {
        ... partner
      }
    }
  }

  #{require './partner_fragment.coffee'}
  """