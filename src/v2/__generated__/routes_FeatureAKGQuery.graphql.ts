/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type routes_FeatureAKGQueryVariables = {
    articleIDs: Array<string | null>;
    selectedWorksSetID: string;
    collectionRailItemIDs?: Array<string> | null;
    auctionRailItemIDs?: Array<string> | null;
    fairRailItemIDs?: Array<string> | null;
    hasCollectionRailItems: boolean;
    hasAuctionRailItems: boolean;
    hasFairRailItems: boolean;
};
export type routes_FeatureAKGQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"FeatureAKGApp_viewer">;
    } | null;
};
export type routes_FeatureAKGQuery = {
    readonly response: routes_FeatureAKGQueryResponse;
    readonly variables: routes_FeatureAKGQueryVariables;
};



/*
query routes_FeatureAKGQuery(
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
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "articleIDs",
    "type": "[String]!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "selectedWorksSetID",
    "type": "String!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "collectionRailItemIDs",
    "type": "[String!]"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "auctionRailItemIDs",
    "type": "[String!]"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "fairRailItemIDs",
    "type": "[String!]"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "hasCollectionRailItems",
    "type": "Boolean!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "hasAuctionRailItems",
    "type": "Boolean!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "hasFairRailItems",
    "type": "Boolean!"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v9 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "routes_FeatureAKGQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
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
            ],
            "kind": "FragmentSpread",
            "name": "FeatureAKGApp_viewer"
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
    "name": "routes_FeatureAKGQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "ids",
                "variableName": "articleIDs"
              }
            ],
            "concreteType": "Article",
            "kind": "LinkedField",
            "name": "articles",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "thumbnailTitle",
                "storageKey": null
              },
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "format",
                    "value": "MMM Do, YYYY"
                  }
                ],
                "kind": "ScalarField",
                "name": "publishedAt",
                "storageKey": "publishedAt(format:\"MMM Do, YYYY\")"
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "thumbnailImage",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
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
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "width",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "height",
                        "storageKey": null
                      },
                      (v1/*: any*/)
                    ],
                    "storageKey": "cropped(height:780,width:1170)"
                  }
                ],
                "storageKey": null
              },
              {
                "alias": "tinyImage",
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "thumbnailImage",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
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
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/)
                    ],
                    "storageKey": "cropped(height:120,width:120)"
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": "selectedWorks",
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "selectedWorksSetID"
              }
            ],
            "concreteType": "OrderedSet",
            "kind": "LinkedField",
            "name": "orderedSet",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 6
                  }
                ],
                "concreteType": "ArtworkConnection",
                "kind": "LinkedField",
                "name": "itemsConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          (v4/*: any*/),
                          (v2/*: any*/),
                          (v5/*: any*/),
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
                          (v6/*: any*/),
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
                            "name": "date",
                            "storageKey": null
                          },
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
                            "args": (v7/*: any*/),
                            "concreteType": "Artist",
                            "kind": "LinkedField",
                            "name": "artists",
                            "plural": true,
                            "selections": [
                              (v3/*: any*/),
                              (v2/*: any*/),
                              (v8/*: any*/)
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
                            "args": (v7/*: any*/),
                            "concreteType": "Partner",
                            "kind": "LinkedField",
                            "name": "partner",
                            "plural": false,
                            "selections": [
                              (v8/*: any*/),
                              (v2/*: any*/),
                              (v3/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "type",
                                "storageKey": null
                              }
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
                              (v3/*: any*/),
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
                                "selections": (v9/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": "opening_bid",
                                "args": null,
                                "concreteType": "SaleArtworkOpeningBid",
                                "kind": "LinkedField",
                                "name": "openingBid",
                                "plural": false,
                                "selections": (v9/*: any*/),
                                "storageKey": null
                              },
                              (v3/*: any*/)
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
                            "alias": "is_saved",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isSaved",
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
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "itemsConnection(first:6)"
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          {
            "condition": "hasCollectionRailItems",
            "kind": "Condition",
            "passingValue": true,
            "selections": [
              {
                "alias": "collections",
                "args": [
                  {
                    "kind": "Variable",
                    "name": "slugs",
                    "variableName": "collectionRailItemIDs"
                  }
                ],
                "concreteType": "MarketingCollection",
                "kind": "LinkedField",
                "name": "marketingCollections",
                "plural": true,
                "selections": [
                  (v4/*: any*/),
                  (v6/*: any*/),
                  (v3/*: any*/)
                ],
                "storageKey": null
              }
            ]
          },
          {
            "condition": "hasAuctionRailItems",
            "kind": "Condition",
            "passingValue": true,
            "selections": [
              {
                "alias": "auctions",
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
                "kind": "LinkedField",
                "name": "salesConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SaleEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Sale",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          (v8/*: any*/),
                          (v2/*: any*/),
                          (v3/*: any*/)
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
          {
            "condition": "hasFairRailItems",
            "kind": "Condition",
            "passingValue": true,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Variable",
                    "name": "ids",
                    "variableName": "fairRailItemIDs"
                  }
                ],
                "concreteType": "Fair",
                "kind": "LinkedField",
                "name": "fairs",
                "plural": true,
                "selections": [
                  (v5/*: any*/),
                  (v8/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/)
                ],
                "storageKey": null
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "routes_FeatureAKGQuery",
    "operationKind": "query",
    "text": "query routes_FeatureAKGQuery(\n  $articleIDs: [String]!\n  $selectedWorksSetID: String!\n  $collectionRailItemIDs: [String!]\n  $auctionRailItemIDs: [String!]\n  $fairRailItemIDs: [String!]\n  $hasCollectionRailItems: Boolean!\n  $hasAuctionRailItems: Boolean!\n  $hasFairRailItems: Boolean!\n) {\n  viewer {\n    ...FeatureAKGApp_viewer_2x5Kr1\n  }\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnectionInterface {\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      internalID\n      image {\n        aspect_ratio: aspectRatio\n      }\n      ...GridItem_artwork\n    }\n    ... on Node {\n      id\n    }\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment FeatureAKGApp_viewer_2x5Kr1 on Viewer {\n  ...Feature_viewer_2x5Kr1\n}\n\nfragment Feature_viewer_2x5Kr1 on Viewer {\n  articles(ids: $articleIDs) {\n    ...FeaturedArticles_articles\n    id\n  }\n  selectedWorks: orderedSet(id: $selectedWorksSetID) {\n    ...SelectedWorks_selectedWorks\n    id\n  }\n  ...FeaturedRails_viewer_1Tm9K3\n}\n\nfragment FeaturedArticles_articles on Article {\n  thumbnailTitle\n  publishedAt(format: \"MMM Do, YYYY\")\n  thumbnailImage {\n    cropped(width: 1170, height: 780) {\n      width\n      height\n      url\n    }\n  }\n  tinyImage: thumbnailImage {\n    cropped(width: 120, height: 120) {\n      url\n    }\n  }\n  href\n}\n\nfragment FeaturedAuctions_auctions on SaleConnection {\n  edges {\n    node {\n      slug\n      name\n      href\n      id\n    }\n  }\n}\n\nfragment FeaturedCollections_collections on MarketingCollection {\n  slug\n  title\n}\n\nfragment FeaturedFairs_fairs on Fair {\n  internalID\n  name\n  href\n}\n\nfragment FeaturedRails_viewer_1Tm9K3 on Viewer {\n  collections: marketingCollections(slugs: $collectionRailItemIDs) @include(if: $hasCollectionRailItems) {\n    ...FeaturedCollections_collections\n    id\n  }\n  auctions: salesConnection(first: 50, ids: $auctionRailItemIDs) @include(if: $hasAuctionRailItems) {\n    ...FeaturedAuctions_auctions\n  }\n  fairs(ids: $fairRailItemIDs) @include(if: $hasFairRailItems) {\n    ...FeaturedFairs_fairs\n    id\n  }\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  image_title: imageTitle\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio: aspectRatio\n  }\n  href\n  ...Metadata_artwork\n  ...Save_artwork\n  ...Badge_artwork\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment Save_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment SelectedWorks_selectedWorks on OrderedSet {\n  itemsConnection(first: 6) {\n    ...ArtworkGrid_artworks\n    edges {\n      node {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f9545342bfbad3db42310d379053d22c';
export default node;
