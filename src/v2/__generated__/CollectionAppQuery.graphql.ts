/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkAggregation = "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "MAJOR_PERIOD" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "TOTAL" | "%future added value";
export type CollectionAppQueryVariables = {
    acquireable?: boolean | null;
    aggregations?: ReadonlyArray<ArtworkAggregation | null> | null;
    atAuction?: boolean | null;
    color?: string | null;
    forSale?: boolean | null;
    height?: string | null;
    inquireableOnly?: boolean | null;
    majorPeriods?: ReadonlyArray<string | null> | null;
    medium?: string | null;
    offerable?: boolean | null;
    page?: number | null;
    priceRange?: string | null;
    sort?: string | null;
    slug: string;
    width?: string | null;
};
export type CollectionAppQueryResponse = {
    readonly collection: {
        readonly " $fragmentRefs": FragmentRefs<"Collection_collection">;
    } | null;
};
export type CollectionAppQuery = {
    readonly response: CollectionAppQueryResponse;
    readonly variables: CollectionAppQueryVariables;
};



/*
query CollectionAppQuery(
  $acquireable: Boolean
  $aggregations: [ArtworkAggregation] = [MERCHANDISABLE_ARTISTS, MEDIUM, MAJOR_PERIOD, TOTAL]
  $atAuction: Boolean
  $color: String
  $forSale: Boolean
  $height: String
  $inquireableOnly: Boolean
  $majorPeriods: [String]
  $medium: String
  $offerable: Boolean
  $page: Int
  $priceRange: String
  $sort: String
  $slug: String!
  $width: String
) {
  collection: marketingCollection(slug: $slug) {
    ...Collection_collection_2Pwt5i
    id
  }
}

fragment ArtistSeriesEntity_member on MarketingCollection {
  slug
  headerImage
  thumbnail
  title
  price_guidance: priceGuidance
  artworksConnection(first: 3, aggregations: [TOTAL], sort: "-decayed_merch") {
    edges {
      node {
        artist {
          name
          id
        }
        title
        image {
          url(version: "small")
        }
        id
      }
    }
    id
  }
}

fragment ArtistSeriesRail_collectionGroup on MarketingCollectionGroup {
  groupType
  name
  members {
    slug
    ...ArtistSeriesEntity_member
    id
  }
}

fragment ArtworkFilterArtworkGrid2_filtered_artworks on FilterArtworksConnection {
  id
  aggregations {
    slice
    counts {
      value
      name
      count
    }
  }
  pageInfo {
    hasNextPage
    endCursor
  }
  pageCursors {
    ...Pagination_pageCursors
  }
  edges {
    node {
      id
    }
  }
  ...ArtworkGrid_artworks
}

fragment ArtworkGrid_artworks on ArtworkConnectionInterface {
  edges {
    __typename
    node {
      id
      slug
      href
      image {
        aspect_ratio: aspectRatio
      }
      ...GridItem_artwork
    }
    ... on Node {
      id
    }
  }
}

fragment Badge_artwork on Artwork {
  is_biddable: isBiddable
  is_acquireable: isAcquireable
  is_offerable: isOfferable
  href
  sale {
    is_preview: isPreview
    display_timely_at: displayTimelyAt
    id
  }
}

fragment Collection_collection_2Pwt5i on MarketingCollection {
  ...Header_collection
  description
  headerImage
  slug
  title
  query {
    artist_id: artistID
    gene_id: geneID
    id
  }
  relatedCollections(size: 16) {
    ...RelatedCollectionsRail_collections
    id
  }
  linkedCollections {
    ...CollectionsHubRails_linkedCollections
  }
  fallbackHeaderImage: artworksConnection(aggregations: $aggregations, includeMediumFilterInAggregation: true, size: 1, first: 1, sort: "-decayed_merch") {
    edges {
      node {
        image {
          resized(width: 600) {
            url
          }
        }
        id
      }
    }
    id
  }
  artworksConnection(aggregations: $aggregations, includeMediumFilterInAggregation: true, size: 20, first: 20, sort: "-decayed_merch") {
    ...Header_artworks
    ...SeoProductsForArtworks_artworks
    aggregations {
      slice
      counts {
        value
        name
        count
      }
    }
    id
  }
  descending_artworks: artworksConnection(aggregations: $aggregations, includeMediumFilterInAggregation: true, first: 1, size: 1, sort: "sold,-has_price,-prices") {
    ...SeoProductsForCollections_descending_artworks
    id
  }
  ascending_artworks: artworksConnection(aggregations: $aggregations, includeMediumFilterInAggregation: true, first: 1, size: 1, sort: "sold,-has_price,prices") {
    ...SeoProductsForCollections_ascending_artworks
    id
  }
  filtered_artworks: artworksConnection(acquireable: $acquireable, aggregations: $aggregations, atAuction: $atAuction, color: $color, forSale: $forSale, height: $height, inquireableOnly: $inquireableOnly, majorPeriods: $majorPeriods, medium: $medium, offerable: $offerable, page: $page, priceRange: $priceRange, first: 30, sort: $sort, width: $width) {
    id
    ...ArtworkFilterArtworkGrid2_filtered_artworks
  }
}

fragment CollectionsHubRails_linkedCollections on MarketingCollectionGroup {
  groupType
  ...FeaturedCollectionsRails_collectionGroup
  ...OtherCollectionsRail_collectionGroup
  ...ArtistSeriesRail_collectionGroup
}

fragment Contact_artwork on Artwork {
  href
  is_inquireable: isInquireable
  sale {
    is_auction: isAuction
    is_live_open: isLiveOpen
    is_open: isOpen
    is_closed: isClosed
    id
  }
  partner(shallow: true) {
    type
    id
  }
  sale_artwork: saleArtwork {
    highest_bid: highestBid {
      display
    }
    opening_bid: openingBid {
      display
    }
    counts {
      bidder_positions: bidderPositions
    }
    id
  }
}

fragment DefaultHeaderArtwork_artwork on FilterArtworksEdge {
  node {
    id
    href
    slug
    image {
      large: resized(height: 230) {
        url
        width
        height
      }
      small: resized(height: 160) {
        url
        width
        height
      }
    }
  }
}

fragment DefaultHeader_headerArtworks on FilterArtworksConnection {
  edges {
    node {
      id
      image {
        large: resized(height: 230) {
          width
          height
        }
        small: resized(height: 160) {
          width
          height
        }
      }
    }
    ...DefaultHeaderArtwork_artwork
  }
}

fragment Details_artwork on Artwork {
  href
  title
  date
  sale_message: saleMessage
  cultural_maker: culturalMaker
  artists(shallow: true) {
    id
    href
    name
  }
  collecting_institution: collectingInstitution
  partner(shallow: true) {
    name
    href
    id
  }
  sale {
    is_auction: isAuction
    is_closed: isClosed
    id
  }
  sale_artwork: saleArtwork {
    counts {
      bidder_positions: bidderPositions
    }
    highest_bid: highestBid {
      display
    }
    opening_bid: openingBid {
      display
    }
    id
  }
}

fragment FeaturedCollectionsRails_collectionGroup on MarketingCollectionGroup {
  groupType
  name
  members {
    slug
    title
    description
    price_guidance: priceGuidance
    thumbnail
    id
  }
}

fragment FollowArtistButton_artist on Artist {
  id
  internalID
  name
  is_followed: isFollowed
  counts {
    follows
  }
}

fragment GridItem_artwork on Artwork {
  internalID
  title
  image_title: imageTitle
  image {
    placeholder
    url(version: "large")
    aspect_ratio: aspectRatio
  }
  href
  ...Metadata_artwork
  ...Save_artwork
  ...Badge_artwork
}

fragment Header_artworks on FilterArtworksConnection {
  ...DefaultHeader_headerArtworks
  merchandisableArtists {
    slug
    internalID
    name
    image {
      resized(width: 45, height: 45, version: "square") {
        url
      }
    }
    birthday
    nationality
    ...FollowArtistButton_artist
    id
  }
}

fragment Header_collection on MarketingCollection {
  category
  credit
  description
  featuredArtistExclusionIds
  headerImage
  id
  query {
    artistIDs
    id
  }
  slug
  title
}

fragment Metadata_artwork on Artwork {
  ...Details_artwork
  ...Contact_artwork
  href
}

fragment OtherCollectionEntity_member on MarketingCollection {
  slug
  thumbnail
  title
}

fragment OtherCollectionsRail_collectionGroup on MarketingCollectionGroup {
  groupType
  name
  members {
    ...OtherCollectionEntity_member
    id
  }
}

fragment Pagination_pageCursors on PageCursors {
  around {
    cursor
    page
    isCurrent
  }
  first {
    cursor
    page
    isCurrent
  }
  last {
    cursor
    page
    isCurrent
  }
  previous {
    cursor
    page
  }
}

fragment RelatedCollectionEntity_collection on MarketingCollection {
  headerImage
  slug
  title
  price_guidance: priceGuidance
  artworksConnection(first: 3, aggregations: [TOTAL], sort: "-decayed_merch") {
    edges {
      node {
        artist {
          name
          id
        }
        title
        image {
          resized(width: 262) {
            url
          }
        }
        id
      }
    }
    id
  }
}

fragment RelatedCollectionsRail_collections on MarketingCollection {
  ...RelatedCollectionEntity_collection
  artworksConnection(first: 3, aggregations: [TOTAL], sort: "-decayed_merch") {
    edges {
      node {
        id
      }
    }
    id
  }
}

fragment Save_artwork on Artwork {
  id
  internalID
  slug
  is_saved: isSaved
  title
}

fragment SeoProductsForArtworks_artworks on FilterArtworksConnection {
  edges {
    node {
      id
      availability
      category
      date
      href
      is_acquireable: isAcquireable
      is_price_range: isPriceRange
      listPrice {
        __typename
        ... on PriceRange {
          display
        }
        ... on Money {
          display
        }
      }
      price_currency: priceCurrency
      title
      artists(shallow: true) {
        name
        id
      }
      image {
        url(version: "larger")
      }
      meta {
        description
      }
      partner(shallow: true) {
        name
        type
        profile {
          icon {
            url(version: "larger")
          }
          id
        }
        locations(size: 1) {
          address
          address_2: address2
          city
          state
          country
          postal_code: postalCode
          phone
          id
        }
        id
      }
    }
  }
}

fragment SeoProductsForCollections_ascending_artworks on FilterArtworksConnection {
  edges {
    node {
      id
      availability
      listPrice {
        __typename
        ... on PriceRange {
          minPrice {
            major(convertTo: "USD")
            currencyCode
          }
          maxPrice {
            major(convertTo: "USD")
            currencyCode
          }
        }
        ... on Money {
          major(convertTo: "USD")
          currencyCode
        }
      }
    }
  }
}

fragment SeoProductsForCollections_descending_artworks on FilterArtworksConnection {
  edges {
    node {
      id
      availability
      listPrice {
        __typename
        ... on PriceRange {
          minPrice {
            major(convertTo: "USD")
            currencyCode
          }
          maxPrice {
            major(convertTo: "USD")
            currencyCode
          }
        }
        ... on Money {
          major(convertTo: "USD")
          currencyCode
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "acquireable",
    "type": "Boolean",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "aggregations",
    "type": "[ArtworkAggregation]",
    "defaultValue": [
      "MERCHANDISABLE_ARTISTS",
      "MEDIUM",
      "MAJOR_PERIOD",
      "TOTAL"
    ]
  },
  {
    "kind": "LocalArgument",
    "name": "atAuction",
    "type": "Boolean",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "color",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "forSale",
    "type": "Boolean",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "height",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "inquireableOnly",
    "type": "Boolean",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "majorPeriods",
    "type": "[String]",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "medium",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "offerable",
    "type": "Boolean",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "page",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "priceRange",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "sort",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "slug",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "width",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "slug"
  }
],
v2 = {
  "kind": "Variable",
  "name": "aggregations",
  "variableName": "aggregations"
},
v3 = [
  {
    "kind": "Variable",
    "name": "acquireable",
    "variableName": "acquireable"
  },
  (v2/*: any*/),
  {
    "kind": "Variable",
    "name": "atAuction",
    "variableName": "atAuction"
  },
  {
    "kind": "Variable",
    "name": "color",
    "variableName": "color"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 30
  },
  {
    "kind": "Variable",
    "name": "forSale",
    "variableName": "forSale"
  },
  {
    "kind": "Variable",
    "name": "height",
    "variableName": "height"
  },
  {
    "kind": "Variable",
    "name": "inquireableOnly",
    "variableName": "inquireableOnly"
  },
  {
    "kind": "Variable",
    "name": "majorPeriods",
    "variableName": "majorPeriods"
  },
  {
    "kind": "Variable",
    "name": "medium",
    "variableName": "medium"
  },
  {
    "kind": "Variable",
    "name": "offerable",
    "variableName": "offerable"
  },
  {
    "kind": "Variable",
    "name": "page",
    "variableName": "page"
  },
  {
    "kind": "Variable",
    "name": "priceRange",
    "variableName": "priceRange"
  },
  {
    "kind": "Variable",
    "name": "sort",
    "variableName": "sort"
  },
  {
    "kind": "Variable",
    "name": "width",
    "variableName": "width"
  }
],
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "category",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "description",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "headerImage",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": "price_guidance",
  "name": "priceGuidance",
  "args": null,
  "storageKey": null
},
v11 = {
  "kind": "Literal",
  "name": "sort",
  "value": "-decayed_merch"
},
v12 = [
  {
    "kind": "Literal",
    "name": "aggregations",
    "value": [
      "TOTAL"
    ]
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 3
  },
  (v11/*: any*/)
],
v13 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v14 = [
  (v13/*: any*/),
  (v7/*: any*/)
],
v15 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "artist",
  "storageKey": null,
  "args": null,
  "concreteType": "Artist",
  "plural": false,
  "selections": (v14/*: any*/)
},
v16 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "url",
  "args": null,
  "storageKey": null
},
v17 = [
  (v16/*: any*/)
],
v18 = {
  "kind": "Literal",
  "name": "first",
  "value": 1
},
v19 = {
  "kind": "Literal",
  "name": "includeMediumFilterInAggregation",
  "value": true
},
v20 = {
  "kind": "Literal",
  "name": "size",
  "value": 1
},
v21 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "width",
    "args": null,
    "storageKey": null
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "height",
    "args": null,
    "storageKey": null
  },
  (v16/*: any*/)
],
v22 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "url",
  "args": [
    {
      "kind": "Literal",
      "name": "version",
      "value": "larger"
    }
  ],
  "storageKey": "url(version:\"larger\")"
},
v23 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v24 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "availability",
  "args": null,
  "storageKey": null
},
v25 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "date",
  "args": null,
  "storageKey": null
},
v26 = {
  "kind": "ScalarField",
  "alias": "is_acquireable",
  "name": "isAcquireable",
  "args": null,
  "storageKey": null
},
v27 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v28 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "display",
    "args": null,
    "storageKey": null
  }
],
v29 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v30 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "type",
  "args": null,
  "storageKey": null
},
v31 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v32 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "aggregations",
  "storageKey": null,
  "args": null,
  "concreteType": "ArtworksAggregationResults",
  "plural": true,
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slice",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "counts",
      "storageKey": null,
      "args": null,
      "concreteType": "AggregationCount",
      "plural": true,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "value",
          "args": null,
          "storageKey": null
        },
        (v13/*: any*/),
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "count",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
},
v33 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "major",
    "args": [
      {
        "kind": "Literal",
        "name": "convertTo",
        "value": "USD"
      }
    ],
    "storageKey": "major(convertTo:\"USD\")"
  },
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "currencyCode",
    "args": null,
    "storageKey": null
  }
],
v34 = [
  {
    "kind": "LinkedField",
    "alias": null,
    "name": "edges",
    "storageKey": null,
    "args": null,
    "concreteType": "FilterArtworksEdge",
    "plural": true,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
        "storageKey": null,
        "args": null,
        "concreteType": "Artwork",
        "plural": false,
        "selections": [
          (v7/*: any*/),
          (v24/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "listPrice",
            "storageKey": null,
            "args": null,
            "concreteType": null,
            "plural": false,
            "selections": [
              (v27/*: any*/),
              {
                "kind": "InlineFragment",
                "type": "PriceRange",
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "minPrice",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Money",
                    "plural": false,
                    "selections": (v33/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "maxPrice",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Money",
                    "plural": false,
                    "selections": (v33/*: any*/)
                  }
                ]
              },
              {
                "kind": "InlineFragment",
                "type": "Money",
                "selections": (v33/*: any*/)
              }
            ]
          }
        ]
      }
    ]
  },
  (v7/*: any*/)
],
v35 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v36 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "page",
  "args": null,
  "storageKey": null
},
v37 = [
  (v35/*: any*/),
  (v36/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "isCurrent",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "CollectionAppQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "collection",
        "name": "marketingCollection",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "MarketingCollection",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "Collection_collection",
            "args": (v3/*: any*/)
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "CollectionAppQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "collection",
        "name": "marketingCollection",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "MarketingCollection",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "credit",
            "args": null,
            "storageKey": null
          },
          (v5/*: any*/),
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "featuredArtistExclusionIds",
            "args": null,
            "storageKey": null
          },
          (v6/*: any*/),
          (v7/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "query",
            "storageKey": null,
            "args": null,
            "concreteType": "MarketingCollectionQuery",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "artistIDs",
                "args": null,
                "storageKey": null
              },
              (v7/*: any*/),
              {
                "kind": "ScalarField",
                "alias": "artist_id",
                "name": "artistID",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": "gene_id",
                "name": "geneID",
                "args": null,
                "storageKey": null
              }
            ]
          },
          (v8/*: any*/),
          (v9/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "relatedCollections",
            "storageKey": "relatedCollections(size:16)",
            "args": [
              {
                "kind": "Literal",
                "name": "size",
                "value": 16
              }
            ],
            "concreteType": "MarketingCollection",
            "plural": true,
            "selections": [
              (v6/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "artworksConnection",
                "storageKey": "artworksConnection(aggregations:[\"TOTAL\"],first:3,sort:\"-decayed_merch\")",
                "args": (v12/*: any*/),
                "concreteType": "FilterArtworksConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "FilterArtworksEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "plural": false,
                        "selections": [
                          (v15/*: any*/),
                          (v9/*: any*/),
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "image",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Image",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "resized",
                                "storageKey": "resized(width:262)",
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 262
                                  }
                                ],
                                "concreteType": "ResizedImageUrl",
                                "plural": false,
                                "selections": (v17/*: any*/)
                              }
                            ]
                          },
                          (v7/*: any*/)
                        ]
                      }
                    ]
                  },
                  (v7/*: any*/)
                ]
              },
              (v7/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "linkedCollections",
            "storageKey": null,
            "args": null,
            "concreteType": "MarketingCollectionGroup",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "groupType",
                "args": null,
                "storageKey": null
              },
              (v13/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "members",
                "storageKey": null,
                "args": null,
                "concreteType": "MarketingCollection",
                "plural": true,
                "selections": [
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v5/*: any*/),
                  (v10/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "thumbnail",
                    "args": null,
                    "storageKey": null
                  },
                  (v7/*: any*/),
                  (v6/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "artworksConnection",
                    "storageKey": "artworksConnection(aggregations:[\"TOTAL\"],first:3,sort:\"-decayed_merch\")",
                    "args": (v12/*: any*/),
                    "concreteType": "FilterArtworksConnection",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "edges",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "FilterArtworksEdge",
                        "plural": true,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "node",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Artwork",
                            "plural": false,
                            "selections": [
                              (v15/*: any*/),
                              (v9/*: any*/),
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "image",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "Image",
                                "plural": false,
                                "selections": [
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "url",
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "version",
                                        "value": "small"
                                      }
                                    ],
                                    "storageKey": "url(version:\"small\")"
                                  }
                                ]
                              },
                              (v7/*: any*/)
                            ]
                          }
                        ]
                      },
                      (v7/*: any*/)
                    ]
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "fallbackHeaderImage",
            "name": "artworksConnection",
            "storageKey": null,
            "args": [
              (v2/*: any*/),
              (v18/*: any*/),
              (v19/*: any*/),
              (v20/*: any*/),
              (v11/*: any*/)
            ],
            "concreteType": "FilterArtworksConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "FilterArtworksEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "image",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Image",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "resized",
                            "storageKey": "resized(width:600)",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 600
                              }
                            ],
                            "concreteType": "ResizedImageUrl",
                            "plural": false,
                            "selections": (v17/*: any*/)
                          }
                        ]
                      },
                      (v7/*: any*/)
                    ]
                  }
                ]
              },
              (v7/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "artworksConnection",
            "storageKey": null,
            "args": [
              (v2/*: any*/),
              {
                "kind": "Literal",
                "name": "first",
                "value": 20
              },
              (v19/*: any*/),
              {
                "kind": "Literal",
                "name": "size",
                "value": 20
              },
              (v11/*: any*/)
            ],
            "concreteType": "FilterArtworksConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "FilterArtworksEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "image",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Image",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": "large",
                            "name": "resized",
                            "storageKey": "resized(height:230)",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 230
                              }
                            ],
                            "concreteType": "ResizedImageUrl",
                            "plural": false,
                            "selections": (v21/*: any*/)
                          },
                          {
                            "kind": "LinkedField",
                            "alias": "small",
                            "name": "resized",
                            "storageKey": "resized(height:160)",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 160
                              }
                            ],
                            "concreteType": "ResizedImageUrl",
                            "plural": false,
                            "selections": (v21/*: any*/)
                          },
                          (v22/*: any*/)
                        ]
                      },
                      (v23/*: any*/),
                      (v8/*: any*/),
                      (v24/*: any*/),
                      (v4/*: any*/),
                      (v25/*: any*/),
                      (v26/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": "is_price_range",
                        "name": "isPriceRange",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "listPrice",
                        "storageKey": null,
                        "args": null,
                        "concreteType": null,
                        "plural": false,
                        "selections": [
                          (v27/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "type": "PriceRange",
                            "selections": (v28/*: any*/)
                          },
                          {
                            "kind": "InlineFragment",
                            "type": "Money",
                            "selections": (v28/*: any*/)
                          }
                        ]
                      },
                      {
                        "kind": "ScalarField",
                        "alias": "price_currency",
                        "name": "priceCurrency",
                        "args": null,
                        "storageKey": null
                      },
                      (v9/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "artists",
                        "storageKey": "artists(shallow:true)",
                        "args": (v29/*: any*/),
                        "concreteType": "Artist",
                        "plural": true,
                        "selections": (v14/*: any*/)
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "meta",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "ArtworkMeta",
                        "plural": false,
                        "selections": [
                          (v5/*: any*/)
                        ]
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "partner",
                        "storageKey": "partner(shallow:true)",
                        "args": (v29/*: any*/),
                        "concreteType": "Partner",
                        "plural": false,
                        "selections": [
                          (v13/*: any*/),
                          (v30/*: any*/),
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "profile",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Profile",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "icon",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "Image",
                                "plural": false,
                                "selections": [
                                  (v22/*: any*/)
                                ]
                              },
                              (v7/*: any*/)
                            ]
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "locations",
                            "storageKey": "locations(size:1)",
                            "args": [
                              (v20/*: any*/)
                            ],
                            "concreteType": "Location",
                            "plural": true,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "address",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": "address_2",
                                "name": "address2",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "city",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "state",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "country",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": "postal_code",
                                "name": "postalCode",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "phone",
                                "args": null,
                                "storageKey": null
                              },
                              (v7/*: any*/)
                            ]
                          },
                          (v7/*: any*/)
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "merchandisableArtists",
                "storageKey": null,
                "args": null,
                "concreteType": "Artist",
                "plural": true,
                "selections": [
                  (v8/*: any*/),
                  (v31/*: any*/),
                  (v13/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "image",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Image",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "resized",
                        "storageKey": "resized(height:45,version:\"square\",width:45)",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "height",
                            "value": 45
                          },
                          {
                            "kind": "Literal",
                            "name": "version",
                            "value": "square"
                          },
                          {
                            "kind": "Literal",
                            "name": "width",
                            "value": 45
                          }
                        ],
                        "concreteType": "ResizedImageUrl",
                        "plural": false,
                        "selections": (v17/*: any*/)
                      }
                    ]
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "birthday",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "nationality",
                    "args": null,
                    "storageKey": null
                  },
                  (v7/*: any*/),
                  {
                    "kind": "ScalarField",
                    "alias": "is_followed",
                    "name": "isFollowed",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "counts",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ArtistCounts",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "follows",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  }
                ]
              },
              (v32/*: any*/),
              (v7/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "descending_artworks",
            "name": "artworksConnection",
            "storageKey": null,
            "args": [
              (v2/*: any*/),
              (v18/*: any*/),
              (v19/*: any*/),
              (v20/*: any*/),
              {
                "kind": "Literal",
                "name": "sort",
                "value": "sold,-has_price,-prices"
              }
            ],
            "concreteType": "FilterArtworksConnection",
            "plural": false,
            "selections": (v34/*: any*/)
          },
          {
            "kind": "LinkedField",
            "alias": "ascending_artworks",
            "name": "artworksConnection",
            "storageKey": null,
            "args": [
              (v2/*: any*/),
              (v18/*: any*/),
              (v19/*: any*/),
              (v20/*: any*/),
              {
                "kind": "Literal",
                "name": "sort",
                "value": "sold,-has_price,prices"
              }
            ],
            "concreteType": "FilterArtworksConnection",
            "plural": false,
            "selections": (v34/*: any*/)
          },
          {
            "kind": "LinkedField",
            "alias": "filtered_artworks",
            "name": "artworksConnection",
            "storageKey": null,
            "args": (v3/*: any*/),
            "concreteType": "FilterArtworksConnection",
            "plural": false,
            "selections": [
              (v7/*: any*/),
              (v32/*: any*/),
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "pageInfo",
                "storageKey": null,
                "args": null,
                "concreteType": "PageInfo",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "hasNextPage",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "endCursor",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "pageCursors",
                "storageKey": null,
                "args": null,
                "concreteType": "PageCursors",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "around",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "plural": true,
                    "selections": (v37/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "first",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "plural": false,
                    "selections": (v37/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "last",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "plural": false,
                    "selections": (v37/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "previous",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "plural": false,
                    "selections": [
                      (v35/*: any*/),
                      (v36/*: any*/)
                    ]
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "FilterArtworksEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v23/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "image",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Image",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": "aspect_ratio",
                            "name": "aspectRatio",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "placeholder",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "url",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "version",
                                "value": "large"
                              }
                            ],
                            "storageKey": "url(version:\"large\")"
                          }
                        ]
                      },
                      (v31/*: any*/),
                      (v9/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": "image_title",
                        "name": "imageTitle",
                        "args": null,
                        "storageKey": null
                      },
                      (v25/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": "sale_message",
                        "name": "saleMessage",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": "cultural_maker",
                        "name": "culturalMaker",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "artists",
                        "storageKey": "artists(shallow:true)",
                        "args": (v29/*: any*/),
                        "concreteType": "Artist",
                        "plural": true,
                        "selections": [
                          (v7/*: any*/),
                          (v23/*: any*/),
                          (v13/*: any*/)
                        ]
                      },
                      {
                        "kind": "ScalarField",
                        "alias": "collecting_institution",
                        "name": "collectingInstitution",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "partner",
                        "storageKey": "partner(shallow:true)",
                        "args": (v29/*: any*/),
                        "concreteType": "Partner",
                        "plural": false,
                        "selections": [
                          (v13/*: any*/),
                          (v23/*: any*/),
                          (v7/*: any*/),
                          (v30/*: any*/)
                        ]
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "sale",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Sale",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": "is_auction",
                            "name": "isAuction",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": "is_closed",
                            "name": "isClosed",
                            "args": null,
                            "storageKey": null
                          },
                          (v7/*: any*/),
                          {
                            "kind": "ScalarField",
                            "alias": "is_live_open",
                            "name": "isLiveOpen",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": "is_open",
                            "name": "isOpen",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": "is_preview",
                            "name": "isPreview",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": "display_timely_at",
                            "name": "displayTimelyAt",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      },
                      {
                        "kind": "LinkedField",
                        "alias": "sale_artwork",
                        "name": "saleArtwork",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "SaleArtwork",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "counts",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "SaleArtworkCounts",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": "bidder_positions",
                                "name": "bidderPositions",
                                "args": null,
                                "storageKey": null
                              }
                            ]
                          },
                          {
                            "kind": "LinkedField",
                            "alias": "highest_bid",
                            "name": "highestBid",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "SaleArtworkHighestBid",
                            "plural": false,
                            "selections": (v28/*: any*/)
                          },
                          {
                            "kind": "LinkedField",
                            "alias": "opening_bid",
                            "name": "openingBid",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "SaleArtworkOpeningBid",
                            "plural": false,
                            "selections": (v28/*: any*/)
                          },
                          (v7/*: any*/)
                        ]
                      },
                      {
                        "kind": "ScalarField",
                        "alias": "is_inquireable",
                        "name": "isInquireable",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": "is_saved",
                        "name": "isSaved",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": "is_biddable",
                        "name": "isBiddable",
                        "args": null,
                        "storageKey": null
                      },
                      (v26/*: any*/),
                      {
                        "kind": "ScalarField",
                        "alias": "is_offerable",
                        "name": "isOfferable",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  },
                  (v7/*: any*/)
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "CollectionAppQuery",
    "id": null,
    "text": "query CollectionAppQuery(\n  $acquireable: Boolean\n  $aggregations: [ArtworkAggregation] = [MERCHANDISABLE_ARTISTS, MEDIUM, MAJOR_PERIOD, TOTAL]\n  $atAuction: Boolean\n  $color: String\n  $forSale: Boolean\n  $height: String\n  $inquireableOnly: Boolean\n  $majorPeriods: [String]\n  $medium: String\n  $offerable: Boolean\n  $page: Int\n  $priceRange: String\n  $sort: String\n  $slug: String!\n  $width: String\n) {\n  collection: marketingCollection(slug: $slug) {\n    ...Collection_collection_2Pwt5i\n    id\n  }\n}\n\nfragment ArtistSeriesEntity_member on MarketingCollection {\n  slug\n  headerImage\n  thumbnail\n  title\n  price_guidance: priceGuidance\n  artworksConnection(first: 3, aggregations: [TOTAL], sort: \"-decayed_merch\") {\n    edges {\n      node {\n        artist {\n          name\n          id\n        }\n        title\n        image {\n          url(version: \"small\")\n        }\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment ArtistSeriesRail_collectionGroup on MarketingCollectionGroup {\n  groupType\n  name\n  members {\n    slug\n    ...ArtistSeriesEntity_member\n    id\n  }\n}\n\nfragment ArtworkFilterArtworkGrid2_filtered_artworks on FilterArtworksConnection {\n  id\n  aggregations {\n    slice\n    counts {\n      value\n      name\n      count\n    }\n  }\n  pageInfo {\n    hasNextPage\n    endCursor\n  }\n  pageCursors {\n    ...Pagination_pageCursors\n  }\n  edges {\n    node {\n      id\n    }\n  }\n  ...ArtworkGrid_artworks\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnectionInterface {\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      image {\n        aspect_ratio: aspectRatio\n      }\n      ...GridItem_artwork\n    }\n    ... on Node {\n      id\n    }\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  is_acquireable: isAcquireable\n  is_offerable: isOfferable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Collection_collection_2Pwt5i on MarketingCollection {\n  ...Header_collection\n  description\n  headerImage\n  slug\n  title\n  query {\n    artist_id: artistID\n    gene_id: geneID\n    id\n  }\n  relatedCollections(size: 16) {\n    ...RelatedCollectionsRail_collections\n    id\n  }\n  linkedCollections {\n    ...CollectionsHubRails_linkedCollections\n  }\n  fallbackHeaderImage: artworksConnection(aggregations: $aggregations, includeMediumFilterInAggregation: true, size: 1, first: 1, sort: \"-decayed_merch\") {\n    edges {\n      node {\n        image {\n          resized(width: 600) {\n            url\n          }\n        }\n        id\n      }\n    }\n    id\n  }\n  artworksConnection(aggregations: $aggregations, includeMediumFilterInAggregation: true, size: 20, first: 20, sort: \"-decayed_merch\") {\n    ...Header_artworks\n    ...SeoProductsForArtworks_artworks\n    aggregations {\n      slice\n      counts {\n        value\n        name\n        count\n      }\n    }\n    id\n  }\n  descending_artworks: artworksConnection(aggregations: $aggregations, includeMediumFilterInAggregation: true, first: 1, size: 1, sort: \"sold,-has_price,-prices\") {\n    ...SeoProductsForCollections_descending_artworks\n    id\n  }\n  ascending_artworks: artworksConnection(aggregations: $aggregations, includeMediumFilterInAggregation: true, first: 1, size: 1, sort: \"sold,-has_price,prices\") {\n    ...SeoProductsForCollections_ascending_artworks\n    id\n  }\n  filtered_artworks: artworksConnection(acquireable: $acquireable, aggregations: $aggregations, atAuction: $atAuction, color: $color, forSale: $forSale, height: $height, inquireableOnly: $inquireableOnly, majorPeriods: $majorPeriods, medium: $medium, offerable: $offerable, page: $page, priceRange: $priceRange, first: 30, sort: $sort, width: $width) {\n    id\n    ...ArtworkFilterArtworkGrid2_filtered_artworks\n  }\n}\n\nfragment CollectionsHubRails_linkedCollections on MarketingCollectionGroup {\n  groupType\n  ...FeaturedCollectionsRails_collectionGroup\n  ...OtherCollectionsRail_collectionGroup\n  ...ArtistSeriesRail_collectionGroup\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment DefaultHeaderArtwork_artwork on FilterArtworksEdge {\n  node {\n    id\n    href\n    slug\n    image {\n      large: resized(height: 230) {\n        url\n        width\n        height\n      }\n      small: resized(height: 160) {\n        url\n        width\n        height\n      }\n    }\n  }\n}\n\nfragment DefaultHeader_headerArtworks on FilterArtworksConnection {\n  edges {\n    node {\n      id\n      image {\n        large: resized(height: 230) {\n          width\n          height\n        }\n        small: resized(height: 160) {\n          width\n          height\n        }\n      }\n    }\n    ...DefaultHeaderArtwork_artwork\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment FeaturedCollectionsRails_collectionGroup on MarketingCollectionGroup {\n  groupType\n  name\n  members {\n    slug\n    title\n    description\n    price_guidance: priceGuidance\n    thumbnail\n    id\n  }\n}\n\nfragment FollowArtistButton_artist on Artist {\n  id\n  internalID\n  name\n  is_followed: isFollowed\n  counts {\n    follows\n  }\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  image_title: imageTitle\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio: aspectRatio\n  }\n  href\n  ...Metadata_artwork\n  ...Save_artwork\n  ...Badge_artwork\n}\n\nfragment Header_artworks on FilterArtworksConnection {\n  ...DefaultHeader_headerArtworks\n  merchandisableArtists {\n    slug\n    internalID\n    name\n    image {\n      resized(width: 45, height: 45, version: \"square\") {\n        url\n      }\n    }\n    birthday\n    nationality\n    ...FollowArtistButton_artist\n    id\n  }\n}\n\nfragment Header_collection on MarketingCollection {\n  category\n  credit\n  description\n  featuredArtistExclusionIds\n  headerImage\n  id\n  query {\n    artistIDs\n    id\n  }\n  slug\n  title\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment OtherCollectionEntity_member on MarketingCollection {\n  slug\n  thumbnail\n  title\n}\n\nfragment OtherCollectionsRail_collectionGroup on MarketingCollectionGroup {\n  groupType\n  name\n  members {\n    ...OtherCollectionEntity_member\n    id\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment RelatedCollectionEntity_collection on MarketingCollection {\n  headerImage\n  slug\n  title\n  price_guidance: priceGuidance\n  artworksConnection(first: 3, aggregations: [TOTAL], sort: \"-decayed_merch\") {\n    edges {\n      node {\n        artist {\n          name\n          id\n        }\n        title\n        image {\n          resized(width: 262) {\n            url\n          }\n        }\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment RelatedCollectionsRail_collections on MarketingCollection {\n  ...RelatedCollectionEntity_collection\n  artworksConnection(first: 3, aggregations: [TOTAL], sort: \"-decayed_merch\") {\n    edges {\n      node {\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment Save_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment SeoProductsForArtworks_artworks on FilterArtworksConnection {\n  edges {\n    node {\n      id\n      availability\n      category\n      date\n      href\n      is_acquireable: isAcquireable\n      is_price_range: isPriceRange\n      listPrice {\n        __typename\n        ... on PriceRange {\n          display\n        }\n        ... on Money {\n          display\n        }\n      }\n      price_currency: priceCurrency\n      title\n      artists(shallow: true) {\n        name\n        id\n      }\n      image {\n        url(version: \"larger\")\n      }\n      meta {\n        description\n      }\n      partner(shallow: true) {\n        name\n        type\n        profile {\n          icon {\n            url(version: \"larger\")\n          }\n          id\n        }\n        locations(size: 1) {\n          address\n          address_2: address2\n          city\n          state\n          country\n          postal_code: postalCode\n          phone\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment SeoProductsForCollections_ascending_artworks on FilterArtworksConnection {\n  edges {\n    node {\n      id\n      availability\n      listPrice {\n        __typename\n        ... on PriceRange {\n          minPrice {\n            major(convertTo: \"USD\")\n            currencyCode\n          }\n          maxPrice {\n            major(convertTo: \"USD\")\n            currencyCode\n          }\n        }\n        ... on Money {\n          major(convertTo: \"USD\")\n          currencyCode\n        }\n      }\n    }\n  }\n}\n\nfragment SeoProductsForCollections_descending_artworks on FilterArtworksConnection {\n  edges {\n    node {\n      id\n      availability\n      listPrice {\n        __typename\n        ... on PriceRange {\n          minPrice {\n            major(convertTo: \"USD\")\n            currencyCode\n          }\n          maxPrice {\n            major(convertTo: \"USD\")\n            currencyCode\n          }\n        }\n        ... on Money {\n          major(convertTo: \"USD\")\n          currencyCode\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '696c4494870016c2f7a7e4f702fb05d9';
export default node;
