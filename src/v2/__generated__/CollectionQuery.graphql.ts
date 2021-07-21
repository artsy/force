/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkAggregation = "ARTIST" | "ARTIST_NATIONALITY" | "ATTRIBUTION_CLASS" | "COLOR" | "DIMENSION_RANGE" | "FOLLOWED_ARTISTS" | "GALLERY" | "INSTITUTION" | "LOCATION_CITY" | "MAJOR_PERIOD" | "MATERIALS_TERMS" | "MEDIUM" | "MERCHANDISABLE_ARTISTS" | "PARTNER" | "PARTNER_CITY" | "PERIOD" | "PRICE_RANGE" | "TOTAL" | "%future added value";
export type ArtworkSizes = "LARGE" | "MEDIUM" | "SMALL" | "%future added value";
export type FilterArtworksInput = {
    acquireable?: boolean | null;
    additionalGeneIDs?: Array<string | null> | null;
    after?: string | null;
    aggregationPartnerCities?: Array<string | null> | null;
    aggregations?: Array<ArtworkAggregation | null> | null;
    artistID?: string | null;
    artistIDs?: Array<string | null> | null;
    artistNationalities?: Array<string | null> | null;
    artistSeriesID?: string | null;
    atAuction?: boolean | null;
    attributionClass?: Array<string | null> | null;
    before?: string | null;
    color?: string | null;
    colors?: Array<string | null> | null;
    dimensionRange?: string | null;
    excludeArtworkIDs?: Array<string | null> | null;
    extraAggregationGeneIDs?: Array<string | null> | null;
    first?: number | null;
    forSale?: boolean | null;
    geneID?: string | null;
    geneIDs?: Array<string | null> | null;
    height?: string | null;
    includeArtworksByFollowedArtists?: boolean | null;
    includeMediumFilterInAggregation?: boolean | null;
    inquireableOnly?: boolean | null;
    keyword?: string | null;
    keywordMatchExact?: boolean | null;
    last?: number | null;
    locationCities?: Array<string | null> | null;
    majorPeriods?: Array<string | null> | null;
    marketable?: boolean | null;
    materialsTerms?: Array<string | null> | null;
    medium?: string | null;
    offerable?: boolean | null;
    page?: number | null;
    partnerCities?: Array<string | null> | null;
    partnerID?: string | null;
    partnerIDs?: Array<string | null> | null;
    period?: string | null;
    periods?: Array<string | null> | null;
    priceRange?: string | null;
    saleID?: string | null;
    size?: number | null;
    sizes?: Array<ArtworkSizes | null> | null;
    sort?: string | null;
    tagID?: string | null;
    width?: string | null;
};
export type CollectionQueryVariables = {
    input?: FilterArtworksInput | null;
    slug: string;
    aggregations?: Array<ArtworkAggregation | null> | null;
};
export type CollectionQueryResponse = {
    readonly collection: {
        readonly " $fragmentRefs": FragmentRefs<"Collection_collection">;
    } | null;
};
export type CollectionQuery = {
    readonly response: CollectionQueryResponse;
    readonly variables: CollectionQueryVariables;
};



/*
query CollectionQuery(
  $input: FilterArtworksInput
  $slug: String!
  $aggregations: [ArtworkAggregation]
) {
  collection: marketingCollection(slug: $slug) @principalField {
    ...Collection_collection_2p2tYs
    id
  }
}

fragment ArtistSeriesEntity_member on MarketingCollection {
  id
  slug
  headerImage
  thumbnail
  title
  priceGuidance
  artworksConnection(first: 3, aggregations: [TOTAL], sort: "-decayed_merch") {
    edges {
      node {
        internalID
        artist {
          name
          id
        }
        title
        image {
          resized(width: 150, height: 150) {
            width
            height
            src
            srcSet
          }
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

fragment ArtworkFilterArtworkGrid_filtered_artworks on FilterArtworksConnection {
  id
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
      internalID
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
  href
  sale {
    is_preview: isPreview
    display_timely_at: displayTimelyAt
    id
  }
}

fragment Collection_collection_2p2tYs on MarketingCollection {
  ...Header_collection
  description
  headerImage
  slug
  id
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
  fallbackHeaderImage: artworksConnection(includeMediumFilterInAggregation: true, first: 1, sort: "-decayed_merch") {
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
  artworksConnection(aggregations: $aggregations, includeMediumFilterInAggregation: true, first: 20, sort: "-decayed_merch") {
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
  descending_artworks: artworksConnection(includeMediumFilterInAggregation: true, first: 1, sort: "sold,-has_price,-prices") {
    ...SeoProductsForCollections_descending_artworks
    id
  }
  ascending_artworks: artworksConnection(includeMediumFilterInAggregation: true, first: 1, sort: "sold,-has_price,prices") {
    ...SeoProductsForCollections_ascending_artworks
    id
  }
  filtered_artworks: artworksConnection(input: $input) {
    id
    ...ArtworkFilterArtworkGrid_filtered_artworks
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

fragment DefaultHeaderArtwork_artwork on Artwork {
  id
  title
  href
  slug
  image {
    resized(width: 300, height: 450) {
      src
      srcSet
      width
      height
    }
  }
}

fragment DefaultHeader_headerArtworks on FilterArtworksConnection {
  edges {
    node {
      ...DefaultHeaderArtwork_artwork
      id
    }
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
    id
    slug
    title
    description
    priceGuidance
    thumbnail
  }
}

fragment FollowArtistButton_artist on Artist {
  id
  internalID
  name
  slug
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
  artistNames
  href
  is_saved: isSaved
  ...Metadata_artwork
  ...SaveButton_artwork
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
  id
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
  id
  priceGuidance
  artworksConnection(first: 3, aggregations: [TOTAL], sort: "-decayed_merch") {
    edges {
      node {
        artist {
          name
          id
        }
        title
        image {
          resized(width: 150, height: 150) {
            width
            height
            src
            srcSet
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

fragment SaveButton_artwork on Artwork {
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
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input",
    "type": "FilterArtworksInput"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug",
    "type": "String!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "aggregations",
    "type": "[ArtworkAggregation]"
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
v3 = {
  "kind": "Variable",
  "name": "input",
  "variableName": "input"
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "category",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "headerImage",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "priceGuidance",
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v14 = [
  (v13/*: any*/),
  (v7/*: any*/)
],
v15 = {
  "alias": null,
  "args": null,
  "concreteType": "Artist",
  "kind": "LinkedField",
  "name": "artist",
  "plural": false,
  "selections": (v14/*: any*/),
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "image",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "height",
          "value": 150
        },
        {
          "kind": "Literal",
          "name": "width",
          "value": 150
        }
      ],
      "concreteType": "ResizedImageUrl",
      "kind": "LinkedField",
      "name": "resized",
      "plural": false,
      "selections": [
        (v16/*: any*/),
        (v17/*: any*/),
        (v18/*: any*/),
        (v19/*: any*/)
      ],
      "storageKey": "resized(height:150,width:150)"
    }
  ],
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v22 = {
  "kind": "Literal",
  "name": "first",
  "value": 1
},
v23 = {
  "kind": "Literal",
  "name": "includeMediumFilterInAggregation",
  "value": true
},
v24 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  }
],
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "version",
      "value": "larger"
    }
  ],
  "kind": "ScalarField",
  "name": "url",
  "storageKey": "url(version:\"larger\")"
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "availability",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v30 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v31 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v32 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v33 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "convertTo",
        "value": "USD"
      }
    ],
    "kind": "ScalarField",
    "name": "major",
    "storageKey": "major(convertTo:\"USD\")"
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "currencyCode",
    "storageKey": null
  }
],
v34 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "FilterArtworksEdge",
    "kind": "LinkedField",
    "name": "edges",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v7/*: any*/),
          (v27/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "listPrice",
            "plural": false,
            "selections": [
              (v29/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "minPrice",
                    "plural": false,
                    "selections": (v33/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "maxPrice",
                    "plural": false,
                    "selections": (v33/*: any*/),
                    "storageKey": null
                  }
                ],
                "type": "PriceRange"
              },
              {
                "kind": "InlineFragment",
                "selections": (v33/*: any*/),
                "type": "Money"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  (v7/*: any*/)
],
v35 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v36 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v37 = [
  (v35/*: any*/),
  (v36/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CollectionQuery",
    "selections": [
      {
        "alias": "collection",
        "args": (v1/*: any*/),
        "concreteType": "MarketingCollection",
        "kind": "LinkedField",
        "name": "marketingCollection",
        "plural": false,
        "selections": [
          {
            "args": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "Collection_collection"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CollectionQuery",
    "selections": [
      {
        "alias": "collection",
        "args": (v1/*: any*/),
        "concreteType": "MarketingCollection",
        "kind": "LinkedField",
        "name": "marketingCollection",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "credit",
            "storageKey": null
          },
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "featuredArtistExclusionIds",
            "storageKey": null
          },
          (v6/*: any*/),
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "MarketingCollectionQuery",
            "kind": "LinkedField",
            "name": "query",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "artistIDs",
                "storageKey": null
              },
              (v7/*: any*/),
              {
                "alias": "artist_id",
                "args": null,
                "kind": "ScalarField",
                "name": "artistID",
                "storageKey": null
              },
              {
                "alias": "gene_id",
                "args": null,
                "kind": "ScalarField",
                "name": "geneID",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v8/*: any*/),
          (v9/*: any*/),
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "size",
                "value": 16
              }
            ],
            "concreteType": "MarketingCollection",
            "kind": "LinkedField",
            "name": "relatedCollections",
            "plural": true,
            "selections": [
              (v6/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v7/*: any*/),
              (v10/*: any*/),
              {
                "alias": null,
                "args": (v12/*: any*/),
                "concreteType": "FilterArtworksConnection",
                "kind": "LinkedField",
                "name": "artworksConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "FilterArtworksEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v15/*: any*/),
                          (v9/*: any*/),
                          (v20/*: any*/),
                          (v7/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v7/*: any*/)
                ],
                "storageKey": "artworksConnection(aggregations:[\"TOTAL\"],first:3,sort:\"-decayed_merch\")"
              }
            ],
            "storageKey": "relatedCollections(size:16)"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "MarketingCollectionGroup",
            "kind": "LinkedField",
            "name": "linkedCollections",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "groupType",
                "storageKey": null
              },
              (v13/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "MarketingCollection",
                "kind": "LinkedField",
                "name": "members",
                "plural": true,
                "selections": [
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v5/*: any*/),
                  (v10/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "thumbnail",
                    "storageKey": null
                  },
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": (v12/*: any*/),
                    "concreteType": "FilterArtworksConnection",
                    "kind": "LinkedField",
                    "name": "artworksConnection",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "FilterArtworksEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Artwork",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v21/*: any*/),
                              (v15/*: any*/),
                              (v9/*: any*/),
                              (v20/*: any*/),
                              (v7/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v7/*: any*/)
                    ],
                    "storageKey": "artworksConnection(aggregations:[\"TOTAL\"],first:3,sort:\"-decayed_merch\")"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": "fallbackHeaderImage",
            "args": [
              (v22/*: any*/),
              (v23/*: any*/),
              (v11/*: any*/)
            ],
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "artworksConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FilterArtworksEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "image",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 600
                              }
                            ],
                            "concreteType": "ResizedImageUrl",
                            "kind": "LinkedField",
                            "name": "resized",
                            "plural": false,
                            "selections": (v24/*: any*/),
                            "storageKey": "resized(width:600)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v7/*: any*/)
            ],
            "storageKey": "artworksConnection(first:1,includeMediumFilterInAggregation:true,sort:\"-decayed_merch\")"
          },
          {
            "alias": null,
            "args": [
              (v2/*: any*/),
              {
                "kind": "Literal",
                "name": "first",
                "value": 20
              },
              (v23/*: any*/),
              (v11/*: any*/)
            ],
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "artworksConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FilterArtworksEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
                      (v9/*: any*/),
                      (v25/*: any*/),
                      (v8/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "image",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 450
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 300
                              }
                            ],
                            "concreteType": "ResizedImageUrl",
                            "kind": "LinkedField",
                            "name": "resized",
                            "plural": false,
                            "selections": [
                              (v18/*: any*/),
                              (v19/*: any*/),
                              (v16/*: any*/),
                              (v17/*: any*/)
                            ],
                            "storageKey": "resized(height:450,width:300)"
                          },
                          (v26/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v27/*: any*/),
                      (v4/*: any*/),
                      (v28/*: any*/),
                      {
                        "alias": "is_acquireable",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isAcquireable",
                        "storageKey": null
                      },
                      {
                        "alias": "is_price_range",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isPriceRange",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "listPrice",
                        "plural": false,
                        "selections": [
                          (v29/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": (v30/*: any*/),
                            "type": "PriceRange"
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v30/*: any*/),
                            "type": "Money"
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": "price_currency",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "priceCurrency",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v31/*: any*/),
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artists",
                        "plural": true,
                        "selections": (v14/*: any*/),
                        "storageKey": "artists(shallow:true)"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtworkMeta",
                        "kind": "LinkedField",
                        "name": "meta",
                        "plural": false,
                        "selections": [
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v31/*: any*/),
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v13/*: any*/),
                          (v32/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Profile",
                            "kind": "LinkedField",
                            "name": "profile",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Image",
                                "kind": "LinkedField",
                                "name": "icon",
                                "plural": false,
                                "selections": [
                                  (v26/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v7/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "size",
                                "value": 1
                              }
                            ],
                            "concreteType": "Location",
                            "kind": "LinkedField",
                            "name": "locations",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "address",
                                "storageKey": null
                              },
                              {
                                "alias": "address_2",
                                "args": null,
                                "kind": "ScalarField",
                                "name": "address2",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "city",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "state",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "country",
                                "storageKey": null
                              },
                              {
                                "alias": "postal_code",
                                "args": null,
                                "kind": "ScalarField",
                                "name": "postalCode",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "phone",
                                "storageKey": null
                              },
                              (v7/*: any*/)
                            ],
                            "storageKey": "locations(size:1)"
                          },
                          (v7/*: any*/)
                        ],
                        "storageKey": "partner(shallow:true)"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Artist",
                "kind": "LinkedField",
                "name": "merchandisableArtists",
                "plural": true,
                "selections": [
                  (v8/*: any*/),
                  (v21/*: any*/),
                  (v13/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Image",
                    "kind": "LinkedField",
                    "name": "image",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
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
                        "kind": "LinkedField",
                        "name": "resized",
                        "plural": false,
                        "selections": (v24/*: any*/),
                        "storageKey": "resized(height:45,version:\"square\",width:45)"
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "birthday",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "nationality",
                    "storageKey": null
                  },
                  (v7/*: any*/),
                  {
                    "alias": "is_followed",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isFollowed",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ArtistCounts",
                    "kind": "LinkedField",
                    "name": "counts",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "follows",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtworksAggregationResults",
                "kind": "LinkedField",
                "name": "aggregations",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "slice",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AggregationCount",
                    "kind": "LinkedField",
                    "name": "counts",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "value",
                        "storageKey": null
                      },
                      (v13/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "count",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v7/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": "descending_artworks",
            "args": [
              (v22/*: any*/),
              (v23/*: any*/),
              {
                "kind": "Literal",
                "name": "sort",
                "value": "sold,-has_price,-prices"
              }
            ],
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "artworksConnection",
            "plural": false,
            "selections": (v34/*: any*/),
            "storageKey": "artworksConnection(first:1,includeMediumFilterInAggregation:true,sort:\"sold,-has_price,-prices\")"
          },
          {
            "alias": "ascending_artworks",
            "args": [
              (v22/*: any*/),
              (v23/*: any*/),
              {
                "kind": "Literal",
                "name": "sort",
                "value": "sold,-has_price,prices"
              }
            ],
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "artworksConnection",
            "plural": false,
            "selections": (v34/*: any*/),
            "storageKey": "artworksConnection(first:1,includeMediumFilterInAggregation:true,sort:\"sold,-has_price,prices\")"
          },
          {
            "alias": "filtered_artworks",
            "args": [
              (v3/*: any*/)
            ],
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "artworksConnection",
            "plural": false,
            "selections": [
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageCursors",
                "kind": "LinkedField",
                "name": "pageCursors",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "around",
                    "plural": true,
                    "selections": (v37/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "first",
                    "plural": false,
                    "selections": (v37/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "last",
                    "plural": false,
                    "selections": (v37/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "previous",
                    "plural": false,
                    "selections": [
                      (v35/*: any*/),
                      (v36/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "FilterArtworksEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v25/*: any*/),
                      (v21/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "image",
                        "plural": false,
                        "selections": [
                          {
                            "alias": "aspect_ratio",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "aspectRatio",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "placeholder",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "version",
                                "value": "large"
                              }
                            ],
                            "kind": "ScalarField",
                            "name": "url",
                            "storageKey": "url(version:\"large\")"
                          }
                        ],
                        "storageKey": null
                      },
                      (v9/*: any*/),
                      {
                        "alias": "image_title",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "imageTitle",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "artistNames",
                        "storageKey": null
                      },
                      {
                        "alias": "is_saved",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isSaved",
                        "storageKey": null
                      },
                      (v28/*: any*/),
                      {
                        "alias": "sale_message",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "saleMessage",
                        "storageKey": null
                      },
                      {
                        "alias": "cultural_maker",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "culturalMaker",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v31/*: any*/),
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artists",
                        "plural": true,
                        "selections": [
                          (v7/*: any*/),
                          (v25/*: any*/),
                          (v13/*: any*/)
                        ],
                        "storageKey": "artists(shallow:true)"
                      },
                      {
                        "alias": "collecting_institution",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "collectingInstitution",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v31/*: any*/),
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v13/*: any*/),
                          (v25/*: any*/),
                          (v7/*: any*/),
                          (v32/*: any*/)
                        ],
                        "storageKey": "partner(shallow:true)"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Sale",
                        "kind": "LinkedField",
                        "name": "sale",
                        "plural": false,
                        "selections": [
                          {
                            "alias": "is_auction",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isAuction",
                            "storageKey": null
                          },
                          {
                            "alias": "is_closed",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isClosed",
                            "storageKey": null
                          },
                          (v7/*: any*/),
                          {
                            "alias": "is_live_open",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isLiveOpen",
                            "storageKey": null
                          },
                          {
                            "alias": "is_open",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isOpen",
                            "storageKey": null
                          },
                          {
                            "alias": "is_preview",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isPreview",
                            "storageKey": null
                          },
                          {
                            "alias": "display_timely_at",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "displayTimelyAt",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": "sale_artwork",
                        "args": null,
                        "concreteType": "SaleArtwork",
                        "kind": "LinkedField",
                        "name": "saleArtwork",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "SaleArtworkCounts",
                            "kind": "LinkedField",
                            "name": "counts",
                            "plural": false,
                            "selections": [
                              {
                                "alias": "bidder_positions",
                                "args": null,
                                "kind": "ScalarField",
                                "name": "bidderPositions",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": "highest_bid",
                            "args": null,
                            "concreteType": "SaleArtworkHighestBid",
                            "kind": "LinkedField",
                            "name": "highestBid",
                            "plural": false,
                            "selections": (v30/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": "opening_bid",
                            "args": null,
                            "concreteType": "SaleArtworkOpeningBid",
                            "kind": "LinkedField",
                            "name": "openingBid",
                            "plural": false,
                            "selections": (v30/*: any*/),
                            "storageKey": null
                          },
                          (v7/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": "is_inquireable",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isInquireable",
                        "storageKey": null
                      },
                      {
                        "alias": "is_biddable",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isBiddable",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v7/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "CollectionQuery",
    "operationKind": "query",
    "text": "query CollectionQuery(\n  $input: FilterArtworksInput\n  $slug: String!\n  $aggregations: [ArtworkAggregation]\n) {\n  collection: marketingCollection(slug: $slug) @principalField {\n    ...Collection_collection_2p2tYs\n    id\n  }\n}\n\nfragment ArtistSeriesEntity_member on MarketingCollection {\n  id\n  slug\n  headerImage\n  thumbnail\n  title\n  priceGuidance\n  artworksConnection(first: 3, aggregations: [TOTAL], sort: \"-decayed_merch\") {\n    edges {\n      node {\n        internalID\n        artist {\n          name\n          id\n        }\n        title\n        image {\n          resized(width: 150, height: 150) {\n            width\n            height\n            src\n            srcSet\n          }\n        }\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment ArtistSeriesRail_collectionGroup on MarketingCollectionGroup {\n  groupType\n  name\n  members {\n    slug\n    ...ArtistSeriesEntity_member\n    id\n  }\n}\n\nfragment ArtworkFilterArtworkGrid_filtered_artworks on FilterArtworksConnection {\n  id\n  pageInfo {\n    hasNextPage\n    endCursor\n  }\n  pageCursors {\n    ...Pagination_pageCursors\n  }\n  edges {\n    node {\n      id\n    }\n  }\n  ...ArtworkGrid_artworks\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnectionInterface {\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      internalID\n      image {\n        aspect_ratio: aspectRatio\n      }\n      ...GridItem_artwork\n    }\n    ... on Node {\n      id\n    }\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Collection_collection_2p2tYs on MarketingCollection {\n  ...Header_collection\n  description\n  headerImage\n  slug\n  id\n  title\n  query {\n    artist_id: artistID\n    gene_id: geneID\n    id\n  }\n  relatedCollections(size: 16) {\n    ...RelatedCollectionsRail_collections\n    id\n  }\n  linkedCollections {\n    ...CollectionsHubRails_linkedCollections\n  }\n  fallbackHeaderImage: artworksConnection(includeMediumFilterInAggregation: true, first: 1, sort: \"-decayed_merch\") {\n    edges {\n      node {\n        image {\n          resized(width: 600) {\n            url\n          }\n        }\n        id\n      }\n    }\n    id\n  }\n  artworksConnection(aggregations: $aggregations, includeMediumFilterInAggregation: true, first: 20, sort: \"-decayed_merch\") {\n    ...Header_artworks\n    ...SeoProductsForArtworks_artworks\n    aggregations {\n      slice\n      counts {\n        value\n        name\n        count\n      }\n    }\n    id\n  }\n  descending_artworks: artworksConnection(includeMediumFilterInAggregation: true, first: 1, sort: \"sold,-has_price,-prices\") {\n    ...SeoProductsForCollections_descending_artworks\n    id\n  }\n  ascending_artworks: artworksConnection(includeMediumFilterInAggregation: true, first: 1, sort: \"sold,-has_price,prices\") {\n    ...SeoProductsForCollections_ascending_artworks\n    id\n  }\n  filtered_artworks: artworksConnection(input: $input) {\n    id\n    ...ArtworkFilterArtworkGrid_filtered_artworks\n  }\n}\n\nfragment CollectionsHubRails_linkedCollections on MarketingCollectionGroup {\n  groupType\n  ...FeaturedCollectionsRails_collectionGroup\n  ...OtherCollectionsRail_collectionGroup\n  ...ArtistSeriesRail_collectionGroup\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment DefaultHeaderArtwork_artwork on Artwork {\n  id\n  title\n  href\n  slug\n  image {\n    resized(width: 300, height: 450) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n}\n\nfragment DefaultHeader_headerArtworks on FilterArtworksConnection {\n  edges {\n    node {\n      ...DefaultHeaderArtwork_artwork\n      id\n    }\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment FeaturedCollectionsRails_collectionGroup on MarketingCollectionGroup {\n  groupType\n  name\n  members {\n    id\n    slug\n    title\n    description\n    priceGuidance\n    thumbnail\n  }\n}\n\nfragment FollowArtistButton_artist on Artist {\n  id\n  internalID\n  name\n  slug\n  is_followed: isFollowed\n  counts {\n    follows\n  }\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  image_title: imageTitle\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio: aspectRatio\n  }\n  artistNames\n  href\n  is_saved: isSaved\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n\nfragment Header_artworks on FilterArtworksConnection {\n  ...DefaultHeader_headerArtworks\n  merchandisableArtists {\n    slug\n    internalID\n    name\n    image {\n      resized(width: 45, height: 45, version: \"square\") {\n        url\n      }\n    }\n    birthday\n    nationality\n    ...FollowArtistButton_artist\n    id\n  }\n}\n\nfragment Header_collection on MarketingCollection {\n  category\n  credit\n  description\n  featuredArtistExclusionIds\n  headerImage\n  id\n  query {\n    artistIDs\n    id\n  }\n  slug\n  title\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment OtherCollectionEntity_member on MarketingCollection {\n  id\n  slug\n  thumbnail\n  title\n}\n\nfragment OtherCollectionsRail_collectionGroup on MarketingCollectionGroup {\n  groupType\n  name\n  members {\n    ...OtherCollectionEntity_member\n    id\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment RelatedCollectionEntity_collection on MarketingCollection {\n  headerImage\n  slug\n  title\n  id\n  priceGuidance\n  artworksConnection(first: 3, aggregations: [TOTAL], sort: \"-decayed_merch\") {\n    edges {\n      node {\n        artist {\n          name\n          id\n        }\n        title\n        image {\n          resized(width: 150, height: 150) {\n            width\n            height\n            src\n            srcSet\n          }\n        }\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment RelatedCollectionsRail_collections on MarketingCollection {\n  ...RelatedCollectionEntity_collection\n  artworksConnection(first: 3, aggregations: [TOTAL], sort: \"-decayed_merch\") {\n    edges {\n      node {\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment SeoProductsForArtworks_artworks on FilterArtworksConnection {\n  edges {\n    node {\n      id\n      availability\n      category\n      date\n      href\n      is_acquireable: isAcquireable\n      is_price_range: isPriceRange\n      listPrice {\n        __typename\n        ... on PriceRange {\n          display\n        }\n        ... on Money {\n          display\n        }\n      }\n      price_currency: priceCurrency\n      title\n      artists(shallow: true) {\n        name\n        id\n      }\n      image {\n        url(version: \"larger\")\n      }\n      meta {\n        description\n      }\n      partner(shallow: true) {\n        name\n        type\n        profile {\n          icon {\n            url(version: \"larger\")\n          }\n          id\n        }\n        locations(size: 1) {\n          address\n          address_2: address2\n          city\n          state\n          country\n          postal_code: postalCode\n          phone\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment SeoProductsForCollections_ascending_artworks on FilterArtworksConnection {\n  edges {\n    node {\n      id\n      availability\n      listPrice {\n        __typename\n        ... on PriceRange {\n          minPrice {\n            major(convertTo: \"USD\")\n            currencyCode\n          }\n          maxPrice {\n            major(convertTo: \"USD\")\n            currencyCode\n          }\n        }\n        ... on Money {\n          major(convertTo: \"USD\")\n          currencyCode\n        }\n      }\n    }\n  }\n}\n\nfragment SeoProductsForCollections_descending_artworks on FilterArtworksConnection {\n  edges {\n    node {\n      id\n      availability\n      listPrice {\n        __typename\n        ... on PriceRange {\n          minPrice {\n            major(convertTo: \"USD\")\n            currencyCode\n          }\n          maxPrice {\n            major(convertTo: \"USD\")\n            currencyCode\n          }\n        }\n        ... on Money {\n          major(convertTo: \"USD\")\n          currencyCode\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'af68d1ef5a86a6e8b3be9db95a8d46d4';
export default node;
