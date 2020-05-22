/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeatureAKGRoute_Test_QueryVariables = {
    articleIDs: ReadonlyArray<string | null>;
    selectedWorksSetID: string;
    collectionRailItemIDs?: ReadonlyArray<string> | null;
    auctionRailItemIDs?: ReadonlyArray<string> | null;
    fairRailItemIDs?: ReadonlyArray<string> | null;
    hasCollectionRailItems: boolean;
    hasAuctionRailItems: boolean;
    hasFairRailItems: boolean;
};
export type FeatureAKGRoute_Test_QueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"FeatureAKGApp_viewer">;
    } | null;
};
export type FeatureAKGRoute_Test_QueryRawResponse = {
    readonly viewer: ({
        readonly articles: ReadonlyArray<({
            readonly thumbnailTitle: string | null;
            readonly publishedAt: string | null;
            readonly thumbnailImage: ({
                readonly cropped: ({
                    readonly width: number | null;
                    readonly height: number | null;
                    readonly url: string | null;
                }) | null;
            }) | null;
            readonly tinyImage: ({
                readonly cropped: ({
                    readonly url: string | null;
                }) | null;
            }) | null;
            readonly href: string | null;
            readonly id: string | null;
        }) | null> | null;
        readonly selectedWorks: ({
            readonly itemsConnection: ({
                readonly edges: ReadonlyArray<({
                    readonly __typename: string | null;
                    readonly node: ({
                        readonly id: string;
                        readonly slug: string;
                        readonly href: string | null;
                        readonly image: ({
                            readonly aspect_ratio: number;
                            readonly placeholder: string | null;
                            readonly url: string | null;
                        }) | null;
                        readonly internalID: string;
                        readonly title: string | null;
                        readonly image_title: string | null;
                        readonly date: string | null;
                        readonly sale_message: string | null;
                        readonly cultural_maker: string | null;
                        readonly artists: ReadonlyArray<({
                            readonly id: string;
                            readonly href: string | null;
                            readonly name: string | null;
                        }) | null> | null;
                        readonly collecting_institution: string | null;
                        readonly partner: ({
                            readonly name: string | null;
                            readonly href: string | null;
                            readonly id: string | null;
                            readonly type: string | null;
                        }) | null;
                        readonly sale: ({
                            readonly is_auction: boolean | null;
                            readonly is_closed: boolean | null;
                            readonly id: string | null;
                            readonly is_live_open: boolean | null;
                            readonly is_open: boolean | null;
                            readonly is_preview: boolean | null;
                            readonly display_timely_at: string | null;
                        }) | null;
                        readonly sale_artwork: ({
                            readonly counts: ({
                                readonly bidder_positions: number | null;
                            }) | null;
                            readonly highest_bid: ({
                                readonly display: string | null;
                            }) | null;
                            readonly opening_bid: ({
                                readonly display: string | null;
                            }) | null;
                            readonly id: string | null;
                        }) | null;
                        readonly is_inquireable: boolean | null;
                        readonly is_saved: boolean | null;
                        readonly is_biddable: boolean | null;
                        readonly is_acquireable: boolean | null;
                        readonly is_offerable: boolean | null;
                    }) | null;
                    readonly id: string | null;
                }) | null> | null;
            }) | null;
            readonly id: string | null;
        }) | null;
        readonly collections?: ReadonlyArray<({
            readonly slug: string;
            readonly title: string;
            readonly id: string | null;
        }) | null> | null;
        readonly auctions?: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly slug: string;
                    readonly name: string | null;
                    readonly href: string | null;
                    readonly id: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly fairs?: ReadonlyArray<({
            readonly internalID: string;
            readonly name: string | null;
            readonly href: string | null;
            readonly id: string | null;
        }) | null> | null;
    }) | null;
};
export type FeatureAKGRoute_Test_Query = {
    readonly response: FeatureAKGRoute_Test_QueryResponse;
    readonly variables: FeatureAKGRoute_Test_QueryVariables;
    readonly rawResponse: FeatureAKGRoute_Test_QueryRawResponse;
};



/*
query FeatureAKGRoute_Test_Query(
  $articleIDs: [String]!
  $selectedWorksSetID: String!
  $collectionRailItemIDs: [String!]
  $auctionRailItemIDs: [String!]
  $fairRailItemIDs: [String!]
  $hasCollectionRailItems: Boolean!
  $hasAuctionRailItems: Boolean!
  $hasFairRailItems: Boolean!
) {
  viewer {
    ...FeatureAKGApp_viewer_2x5Kr1
  }
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

fragment FeatureAKGApp_viewer_2x5Kr1 on Viewer {
  ...Feature_viewer_2x5Kr1
}

fragment Feature_viewer_2x5Kr1 on Viewer {
  articles(ids: $articleIDs) {
    ...FeaturedArticles_articles
    id
  }
  selectedWorks: orderedSet(id: $selectedWorksSetID) {
    ...SelectedWorks_selectedWorks
    id
  }
  ...FeaturedRails_viewer_1Tm9K3
}

fragment FeaturedArticles_articles on Article {
  thumbnailTitle
  publishedAt(format: "MMM Do, YYYY")
  thumbnailImage {
    cropped(width: 1170, height: 780) {
      width
      height
      url
    }
  }
  tinyImage: thumbnailImage {
    cropped(width: 120, height: 120) {
      url
    }
  }
  href
}

fragment FeaturedAuctions_auctions on SaleConnection {
  edges {
    node {
      slug
      name
      href
      id
    }
  }
}

fragment FeaturedCollections_collections on MarketingCollection {
  slug
  title
}

fragment FeaturedFairs_fairs on Fair {
  internalID
  name
  href
}

fragment FeaturedRails_viewer_1Tm9K3 on Viewer {
  collections: marketingCollections(slugs: $collectionRailItemIDs) @include(if: $hasCollectionRailItems) {
    ...FeaturedCollections_collections
    id
  }
  auctions: salesConnection(first: 50, ids: $auctionRailItemIDs) @include(if: $hasAuctionRailItems) {
    ...FeaturedAuctions_auctions
  }
  fairs(ids: $fairRailItemIDs) @include(if: $hasFairRailItems) {
    ...FeaturedFairs_fairs
    id
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

fragment Metadata_artwork on Artwork {
  ...Details_artwork
  ...Contact_artwork
  href
}

fragment Save_artwork on Artwork {
  id
  internalID
  slug
  is_saved: isSaved
  title
}

fragment SelectedWorks_selectedWorks on OrderedSet {
  itemsConnection(first: 6) {
    ...ArtworkGrid_artworks
    edges {
      node {
        id
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "articleIDs",
    "type": "[String]!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "selectedWorksSetID",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "collectionRailItemIDs",
    "type": "[String!]",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "auctionRailItemIDs",
    "type": "[String!]",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "fairRailItemIDs",
    "type": "[String!]",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "hasCollectionRailItems",
    "type": "Boolean!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "hasAuctionRailItems",
    "type": "Boolean!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "hasFairRailItems",
    "type": "Boolean!",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "url",
  "args": null,
  "storageKey": null
},
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
  "args": null,
  "storageKey": null
},
v7 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v8 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v9 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "display",
    "args": null,
    "storageKey": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "FeatureAKGRoute_Test_Query",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "FeatureAKGApp_viewer",
            "args": [
              {
                "kind": "Variable",
                "name": "articleIDs",
                "variableName": "articleIDs"
              },
              {
                "kind": "Variable",
                "name": "auctionRailItemIDs",
                "variableName": "auctionRailItemIDs"
              },
              {
                "kind": "Variable",
                "name": "collectionRailItemIDs",
                "variableName": "collectionRailItemIDs"
              },
              {
                "kind": "Variable",
                "name": "fairRailItemIDs",
                "variableName": "fairRailItemIDs"
              },
              {
                "kind": "Variable",
                "name": "hasAuctionRailItems",
                "variableName": "hasAuctionRailItems"
              },
              {
                "kind": "Variable",
                "name": "hasCollectionRailItems",
                "variableName": "hasCollectionRailItems"
              },
              {
                "kind": "Variable",
                "name": "hasFairRailItems",
                "variableName": "hasFairRailItems"
              },
              {
                "kind": "Variable",
                "name": "selectedWorksSetID",
                "variableName": "selectedWorksSetID"
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "FeatureAKGRoute_Test_Query",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "articles",
            "storageKey": null,
            "args": [
              {
                "kind": "Variable",
                "name": "ids",
                "variableName": "articleIDs"
              }
            ],
            "concreteType": "Article",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "thumbnailTitle",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "publishedAt",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "format",
                    "value": "MMM Do, YYYY"
                  }
                ],
                "storageKey": "publishedAt(format:\"MMM Do, YYYY\")"
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "thumbnailImage",
                "storageKey": null,
                "args": null,
                "concreteType": "Image",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "cropped",
                    "storageKey": "cropped(height:780,width:1170)",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 780
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 1170
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "plural": false,
                    "selections": [
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
                      (v1/*: any*/)
                    ]
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": "tinyImage",
                "name": "thumbnailImage",
                "storageKey": null,
                "args": null,
                "concreteType": "Image",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "cropped",
                    "storageKey": "cropped(height:120,width:120)",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 120
                      },
                      {
                        "kind": "Literal",
                        "name": "width",
                        "value": 120
                      }
                    ],
                    "concreteType": "CroppedImageUrl",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/)
                    ]
                  }
                ]
              },
              (v2/*: any*/),
              (v3/*: any*/)
            ]
          },
          {
            "kind": "LinkedField",
            "alias": "selectedWorks",
            "name": "orderedSet",
            "storageKey": null,
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "selectedWorksSetID"
              }
            ],
            "concreteType": "OrderedSet",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "itemsConnection",
                "storageKey": "itemsConnection(first:6)",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 6
                  }
                ],
                "concreteType": "ArtworkConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": null,
                    "plural": true,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "__typename",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          (v4/*: any*/),
                          (v2/*: any*/),
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
                          (v5/*: any*/),
                          (v6/*: any*/),
                          {
                            "kind": "ScalarField",
                            "alias": "image_title",
                            "name": "imageTitle",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "date",
                            "args": null,
                            "storageKey": null
                          },
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
                            "args": (v7/*: any*/),
                            "concreteType": "Artist",
                            "plural": true,
                            "selections": [
                              (v3/*: any*/),
                              (v2/*: any*/),
                              (v8/*: any*/)
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
                            "args": (v7/*: any*/),
                            "concreteType": "Partner",
                            "plural": false,
                            "selections": [
                              (v8/*: any*/),
                              (v2/*: any*/),
                              (v3/*: any*/),
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "type",
                                "args": null,
                                "storageKey": null
                              }
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
                              (v3/*: any*/),
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
                                "selections": (v9/*: any*/)
                              },
                              {
                                "kind": "LinkedField",
                                "alias": "opening_bid",
                                "name": "openingBid",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "SaleArtworkOpeningBid",
                                "plural": false,
                                "selections": (v9/*: any*/)
                              },
                              (v3/*: any*/)
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
                          {
                            "kind": "ScalarField",
                            "alias": "is_acquireable",
                            "name": "isAcquireable",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": "is_offerable",
                            "name": "isOfferable",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      },
                      (v3/*: any*/)
                    ]
                  }
                ]
              },
              (v3/*: any*/)
            ]
          },
          {
            "kind": "Condition",
            "passingValue": true,
            "condition": "hasCollectionRailItems",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": "collections",
                "name": "marketingCollections",
                "storageKey": null,
                "args": [
                  {
                    "kind": "Variable",
                    "name": "slugs",
                    "variableName": "collectionRailItemIDs"
                  }
                ],
                "concreteType": "MarketingCollection",
                "plural": true,
                "selections": [
                  (v4/*: any*/),
                  (v6/*: any*/),
                  (v3/*: any*/)
                ]
              }
            ]
          },
          {
            "kind": "Condition",
            "passingValue": true,
            "condition": "hasAuctionRailItems",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": "auctions",
                "name": "salesConnection",
                "storageKey": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 50
                  },
                  {
                    "kind": "Variable",
                    "name": "ids",
                    "variableName": "auctionRailItemIDs"
                  }
                ],
                "concreteType": "SaleConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "SaleEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Sale",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          (v8/*: any*/),
                          (v2/*: any*/),
                          (v3/*: any*/)
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "kind": "Condition",
            "passingValue": true,
            "condition": "hasFairRailItems",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "fairs",
                "storageKey": null,
                "args": [
                  {
                    "kind": "Variable",
                    "name": "ids",
                    "variableName": "fairRailItemIDs"
                  }
                ],
                "concreteType": "Fair",
                "plural": true,
                "selections": [
                  (v5/*: any*/),
                  (v8/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/)
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
    "name": "FeatureAKGRoute_Test_Query",
    "id": null,
    "text": "query FeatureAKGRoute_Test_Query(\n  $articleIDs: [String]!\n  $selectedWorksSetID: String!\n  $collectionRailItemIDs: [String!]\n  $auctionRailItemIDs: [String!]\n  $fairRailItemIDs: [String!]\n  $hasCollectionRailItems: Boolean!\n  $hasAuctionRailItems: Boolean!\n  $hasFairRailItems: Boolean!\n) {\n  viewer {\n    ...FeatureAKGApp_viewer_2x5Kr1\n  }\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnectionInterface {\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      image {\n        aspect_ratio: aspectRatio\n      }\n      ...GridItem_artwork\n    }\n    ... on Node {\n      id\n    }\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  is_acquireable: isAcquireable\n  is_offerable: isOfferable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment FeatureAKGApp_viewer_2x5Kr1 on Viewer {\n  ...Feature_viewer_2x5Kr1\n}\n\nfragment Feature_viewer_2x5Kr1 on Viewer {\n  articles(ids: $articleIDs) {\n    ...FeaturedArticles_articles\n    id\n  }\n  selectedWorks: orderedSet(id: $selectedWorksSetID) {\n    ...SelectedWorks_selectedWorks\n    id\n  }\n  ...FeaturedRails_viewer_1Tm9K3\n}\n\nfragment FeaturedArticles_articles on Article {\n  thumbnailTitle\n  publishedAt(format: \"MMM Do, YYYY\")\n  thumbnailImage {\n    cropped(width: 1170, height: 780) {\n      width\n      height\n      url\n    }\n  }\n  tinyImage: thumbnailImage {\n    cropped(width: 120, height: 120) {\n      url\n    }\n  }\n  href\n}\n\nfragment FeaturedAuctions_auctions on SaleConnection {\n  edges {\n    node {\n      slug\n      name\n      href\n      id\n    }\n  }\n}\n\nfragment FeaturedCollections_collections on MarketingCollection {\n  slug\n  title\n}\n\nfragment FeaturedFairs_fairs on Fair {\n  internalID\n  name\n  href\n}\n\nfragment FeaturedRails_viewer_1Tm9K3 on Viewer {\n  collections: marketingCollections(slugs: $collectionRailItemIDs) @include(if: $hasCollectionRailItems) {\n    ...FeaturedCollections_collections\n    id\n  }\n  auctions: salesConnection(first: 50, ids: $auctionRailItemIDs) @include(if: $hasAuctionRailItems) {\n    ...FeaturedAuctions_auctions\n  }\n  fairs(ids: $fairRailItemIDs) @include(if: $hasFairRailItems) {\n    ...FeaturedFairs_fairs\n    id\n  }\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  image_title: imageTitle\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio: aspectRatio\n  }\n  href\n  ...Metadata_artwork\n  ...Save_artwork\n  ...Badge_artwork\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment Save_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment SelectedWorks_selectedWorks on OrderedSet {\n  itemsConnection(first: 6) {\n    ...ArtworkGrid_artworks\n    edges {\n      node {\n        id\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '283a3b299812bd426ea15db0a3a3e009';
export default node;
