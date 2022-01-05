/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeatureAKGRoute_Test_QueryVariables = {
    articleIDs: Array<string | null>;
    selectedWorksSetID: string;
    collectionRailItemIDs?: Array<string> | null;
    auctionRailItemIDs?: Array<string> | null;
    fairRailItemIDs?: Array<string> | null;
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
                    readonly width: number;
                    readonly height: number;
                    readonly url: string;
                }) | null;
            }) | null;
            readonly tinyImage: ({
                readonly cropped: ({
                    readonly url: string;
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
                        readonly internalID: string;
                        readonly image: ({
                            readonly aspect_ratio: number;
                            readonly placeholder: string | null;
                            readonly url: string | null;
                        }) | null;
                        readonly title: string | null;
                        readonly image_title: string | null;
                        readonly artistNames: string | null;
                        readonly is_saved: boolean | null;
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
                        readonly is_biddable: boolean | null;
                    }) | null;
                    readonly id: string | null;
                }) | null> | null;
            }) | null;
            readonly id: string | null;
        }) | null;
        readonly collections: ReadonlyArray<({
            readonly slug: string;
            readonly title: string;
            readonly id: string | null;
        }) | null> | null;
        readonly auctions: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly slug: string;
                    readonly name: string | null;
                    readonly href: string | null;
                    readonly id: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly fairs: ReadonlyArray<({
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
  artistNames
  href
  is_saved: isSaved
  ...Metadata_artwork
  ...SaveButton_artwork
  ...Badge_artwork
}

fragment Metadata_artwork on Artwork {
  ...Details_artwork
  ...Contact_artwork
  href
}

fragment SaveButton_artwork on Artwork {
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
],
v10 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v11 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v12 = {
  "type": "Image",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v13 = {
  "type": "CroppedImageUrl",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v14 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v15 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v16 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v17 = {
  "type": "Sale",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v18 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": true
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FeatureAKGRoute_Test_Query",
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
    "name": "FeatureAKGRoute_Test_Query",
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
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "type": "Viewer",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.articles": {
          "type": "Article",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "viewer.selectedWorks": {
          "type": "OrderedSet",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.articles.id": (v10/*: any*/),
        "viewer.selectedWorks.id": (v10/*: any*/),
        "viewer.articles.thumbnailTitle": (v11/*: any*/),
        "viewer.articles.publishedAt": (v11/*: any*/),
        "viewer.articles.thumbnailImage": (v12/*: any*/),
        "viewer.articles.tinyImage": (v12/*: any*/),
        "viewer.articles.href": (v11/*: any*/),
        "viewer.selectedWorks.itemsConnection": {
          "type": "ArtworkConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.collections": {
          "type": "MarketingCollection",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "viewer.auctions": {
          "type": "SaleConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.fairs": {
          "type": "Fair",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "viewer.articles.thumbnailImage.cropped": (v13/*: any*/),
        "viewer.articles.tinyImage.cropped": (v13/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges": {
          "type": "ArtworkEdgeInterface",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "viewer.collections.id": (v10/*: any*/),
        "viewer.fairs.id": (v10/*: any*/),
        "viewer.articles.thumbnailImage.cropped.width": (v14/*: any*/),
        "viewer.articles.thumbnailImage.cropped.height": (v14/*: any*/),
        "viewer.articles.thumbnailImage.cropped.url": (v15/*: any*/),
        "viewer.articles.tinyImage.cropped.url": (v15/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node": {
          "type": "Artwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.collections.slug": (v15/*: any*/),
        "viewer.collections.title": (v15/*: any*/),
        "viewer.auctions.edges": {
          "type": "SaleEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "viewer.fairs.internalID": (v16/*: any*/),
        "viewer.fairs.name": (v11/*: any*/),
        "viewer.fairs.href": (v11/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.id": (v16/*: any*/),
        "viewer.auctions.edges.node": (v17/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.slug": (v16/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.href": (v11/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.internalID": (v16/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.image": (v12/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.id": (v10/*: any*/),
        "viewer.auctions.edges.node.slug": (v16/*: any*/),
        "viewer.auctions.edges.node.name": (v11/*: any*/),
        "viewer.auctions.edges.node.href": (v11/*: any*/),
        "viewer.auctions.edges.node.id": (v10/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.image.aspect_ratio": {
          "type": "Float",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "viewer.selectedWorks.itemsConnection.edges.node.title": (v11/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.image_title": (v11/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.artistNames": (v11/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.is_saved": (v18/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.image.placeholder": (v11/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.image.url": (v11/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.is_biddable": (v18/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.sale": (v17/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.date": (v11/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.sale_message": (v11/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.cultural_maker": (v11/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.artists": {
          "type": "Artist",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "viewer.selectedWorks.itemsConnection.edges.node.collecting_institution": (v11/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.partner": {
          "type": "Partner",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.selectedWorks.itemsConnection.edges.node.sale_artwork": {
          "type": "SaleArtwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.selectedWorks.itemsConnection.edges.node.is_inquireable": (v18/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.sale.is_preview": (v18/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.sale.display_timely_at": (v11/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.sale.id": (v10/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.artists.id": (v16/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.artists.href": (v11/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.artists.name": (v11/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.partner.name": (v11/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.partner.href": (v11/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.partner.id": (v10/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.sale.is_auction": (v18/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.sale.is_closed": (v18/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.sale_artwork.counts": {
          "type": "SaleArtworkCounts",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.selectedWorks.itemsConnection.edges.node.sale_artwork.highest_bid": {
          "type": "SaleArtworkHighestBid",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.selectedWorks.itemsConnection.edges.node.sale_artwork.opening_bid": {
          "type": "SaleArtworkOpeningBid",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.selectedWorks.itemsConnection.edges.node.sale_artwork.id": (v10/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.sale.is_live_open": (v18/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.sale.is_open": (v18/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.partner.type": (v11/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.sale_artwork.counts.bidder_positions": {
          "type": "FormattedNumber",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.selectedWorks.itemsConnection.edges.node.sale_artwork.highest_bid.display": (v11/*: any*/),
        "viewer.selectedWorks.itemsConnection.edges.node.sale_artwork.opening_bid.display": (v11/*: any*/)
      }
    },
    "name": "FeatureAKGRoute_Test_Query",
    "operationKind": "query",
    "text": "query FeatureAKGRoute_Test_Query(\n  $articleIDs: [String]!\n  $selectedWorksSetID: String!\n  $collectionRailItemIDs: [String!]\n  $auctionRailItemIDs: [String!]\n  $fairRailItemIDs: [String!]\n  $hasCollectionRailItems: Boolean!\n  $hasAuctionRailItems: Boolean!\n  $hasFairRailItems: Boolean!\n) {\n  viewer {\n    ...FeatureAKGApp_viewer_2x5Kr1\n  }\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnectionInterface {\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      internalID\n      image {\n        aspect_ratio: aspectRatio\n      }\n      ...GridItem_artwork\n    }\n    ... on Node {\n      id\n    }\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment FeatureAKGApp_viewer_2x5Kr1 on Viewer {\n  ...Feature_viewer_2x5Kr1\n}\n\nfragment Feature_viewer_2x5Kr1 on Viewer {\n  articles(ids: $articleIDs) {\n    ...FeaturedArticles_articles\n    id\n  }\n  selectedWorks: orderedSet(id: $selectedWorksSetID) {\n    ...SelectedWorks_selectedWorks\n    id\n  }\n  ...FeaturedRails_viewer_1Tm9K3\n}\n\nfragment FeaturedArticles_articles on Article {\n  thumbnailTitle\n  publishedAt(format: \"MMM Do, YYYY\")\n  thumbnailImage {\n    cropped(width: 1170, height: 780) {\n      width\n      height\n      url\n    }\n  }\n  tinyImage: thumbnailImage {\n    cropped(width: 120, height: 120) {\n      url\n    }\n  }\n  href\n}\n\nfragment FeaturedAuctions_auctions on SaleConnection {\n  edges {\n    node {\n      slug\n      name\n      href\n      id\n    }\n  }\n}\n\nfragment FeaturedCollections_collections on MarketingCollection {\n  slug\n  title\n}\n\nfragment FeaturedFairs_fairs on Fair {\n  internalID\n  name\n  href\n}\n\nfragment FeaturedRails_viewer_1Tm9K3 on Viewer {\n  collections: marketingCollections(slugs: $collectionRailItemIDs) @include(if: $hasCollectionRailItems) {\n    ...FeaturedCollections_collections\n    id\n  }\n  auctions: salesConnection(first: 50, ids: $auctionRailItemIDs) @include(if: $hasAuctionRailItems) {\n    ...FeaturedAuctions_auctions\n  }\n  fairs(ids: $fairRailItemIDs) @include(if: $hasFairRailItems) {\n    ...FeaturedFairs_fairs\n    id\n  }\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  image_title: imageTitle\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio: aspectRatio\n  }\n  artistNames\n  href\n  is_saved: isSaved\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment SelectedWorks_selectedWorks on OrderedSet {\n  itemsConnection(first: 6) {\n    ...ArtworkGrid_artworks\n    edges {\n      node {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '011ae648b292a21111dbfb4124b617e6';
export default node;
