module.exports =
  defaults:
    # A gallery's 'WORKS' section, if enabled. Includes for-sale & not-for-sale, all search facets
    'works':
      'aggregations': ['dimension_range', 'medium', 'price_range', 'total', 'for_sale']
      'forSale': null
      'hideForSaleButton': false

    # An institution's 'WORKS' section. Includes not-for-sale works, excludes filtering based on price and saleability.
    'collection':
      'aggregations': ['dimension_range', 'medium', 'total']
      'forSale': false
      'hideForSaleButton': true

    # An institution's 'SHOP' section, if enabled. Includes only for-sale works, excludes filtering based on saleability.
    'shop':
      'aggregations': ['dimension_range', 'price_range', 'medium', 'total']
      'forSale': true
      'hideForSaleButton': true

  filterRoot: (partner, section) ->
    return "#{partner.href()}/#{section}"

  settings: (partner, section) ->
    return _.extend @defaults[section], {filterRoot: @filterRoot(partner, section)}
