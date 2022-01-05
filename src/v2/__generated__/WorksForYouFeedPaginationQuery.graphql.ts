/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type WorksForYouFeedPaginationQueryVariables = {
    count: number;
    cursor?: string | null;
};
export type WorksForYouFeedPaginationQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"WorksForYouFeed_viewer">;
    } | null;
};
export type WorksForYouFeedPaginationQuery = {
    readonly response: WorksForYouFeedPaginationQueryResponse;
    readonly variables: WorksForYouFeedPaginationQueryVariables;
};



/*
query WorksForYouFeedPaginationQuery(
  $count: Int!
  $cursor: String
) {
  viewer {
    ...WorksForYouFeed_viewer_1G22uz
  }
}

fragment ArtworkGrid_artworks on ArtworkConnectionInterface {
  __isArtworkConnectionInterface: __typename
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
      __isNode: __typename
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

fragment WorksForYouFeed_viewer_1G22uz on Viewer {
  me {
    followsAndSaves {
      notifications: bundledArtworksByArtistConnection(sort: PUBLISHED_AT_DESC, first: $count, after: $cursor, forSale: true) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            href
            summary
            artists
            published_at: publishedAt(format: "MMM DD")
            artworksConnection {
              ...ArtworkGrid_artworks
            }
            image {
              resized(height: 80, width: 80) {
                url
              }
            }
            __typename
          }
          cursor
        }
      }
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "count"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  },
  {
    "kind": "Literal",
    "name": "forSale",
    "value": true
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "PUBLISHED_AT_DESC"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = [
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
    "name": "WorksForYouFeedPaginationQuery",
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
                "name": "count",
                "variableName": "count"
              },
              {
                "kind": "Variable",
                "name": "cursor",
                "variableName": "cursor"
              }
            ],
            "kind": "FragmentSpread",
            "name": "WorksForYouFeed_viewer"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "WorksForYouFeedPaginationQuery",
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
            "args": null,
            "concreteType": "Me",
            "kind": "LinkedField",
            "name": "me",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FollowsAndSaves",
                "kind": "LinkedField",
                "name": "followsAndSaves",
                "plural": false,
                "selections": [
                  {
                    "alias": "notifications",
                    "args": (v1/*: any*/),
                    "concreteType": "FollowedArtistsArtworksGroupConnection",
                    "kind": "LinkedField",
                    "name": "bundledArtworksByArtistConnection",
                    "plural": false,
                    "selections": [
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
                        "concreteType": "FollowedArtistsArtworksGroupEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "FollowedArtistsArtworksGroup",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
                              (v3/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "summary",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "artists",
                                "storageKey": null
                              },
                              {
                                "alias": "published_at",
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "format",
                                    "value": "MMM DD"
                                  }
                                ],
                                "kind": "ScalarField",
                                "name": "publishedAt",
                                "storageKey": "publishedAt(format:\"MMM DD\")"
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ArtworkConnection",
                                "kind": "LinkedField",
                                "name": "artworksConnection",
                                "plural": false,
                                "selections": [
                                  {
                                    "kind": "InlineFragment",
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": null,
                                        "kind": "LinkedField",
                                        "name": "edges",
                                        "plural": true,
                                        "selections": [
                                          (v4/*: any*/),
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "Artwork",
                                            "kind": "LinkedField",
                                            "name": "node",
                                            "plural": false,
                                            "selections": [
                                              (v2/*: any*/),
                                              {
                                                "alias": null,
                                                "args": null,
                                                "kind": "ScalarField",
                                                "name": "slug",
                                                "storageKey": null
                                              },
                                              (v3/*: any*/),
                                              {
                                                "alias": null,
                                                "args": null,
                                                "kind": "ScalarField",
                                                "name": "internalID",
                                                "storageKey": null
                                              },
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
                                              {
                                                "alias": null,
                                                "args": null,
                                                "kind": "ScalarField",
                                                "name": "title",
                                                "storageKey": null
                                              },
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
                                                "args": (v5/*: any*/),
                                                "concreteType": "Artist",
                                                "kind": "LinkedField",
                                                "name": "artists",
                                                "plural": true,
                                                "selections": [
                                                  (v2/*: any*/),
                                                  (v3/*: any*/),
                                                  (v6/*: any*/)
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
                                                "args": (v5/*: any*/),
                                                "concreteType": "Partner",
                                                "kind": "LinkedField",
                                                "name": "partner",
                                                "plural": false,
                                                "selections": [
                                                  (v6/*: any*/),
                                                  (v3/*: any*/),
                                                  (v2/*: any*/),
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
                                                  (v2/*: any*/),
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
                                                    "selections": (v7/*: any*/),
                                                    "storageKey": null
                                                  },
                                                  {
                                                    "alias": "opening_bid",
                                                    "args": null,
                                                    "concreteType": "SaleArtworkOpeningBid",
                                                    "kind": "LinkedField",
                                                    "name": "openingBid",
                                                    "plural": false,
                                                    "selections": (v7/*: any*/),
                                                    "storageKey": null
                                                  },
                                                  (v2/*: any*/)
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
                                          {
                                            "kind": "InlineFragment",
                                            "selections": [
                                              (v2/*: any*/)
                                            ],
                                            "type": "Node",
                                            "abstractKey": "__isNode"
                                          }
                                        ],
                                        "storageKey": null
                                      }
                                    ],
                                    "type": "ArtworkConnectionInterface",
                                    "abstractKey": "__isArtworkConnectionInterface"
                                  }
                                ],
                                "storageKey": null
                              },
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
                                        "value": 80
                                      },
                                      {
                                        "kind": "Literal",
                                        "name": "width",
                                        "value": 80
                                      }
                                    ],
                                    "concreteType": "ResizedImageUrl",
                                    "kind": "LinkedField",
                                    "name": "resized",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "url",
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": "resized(height:80,width:80)"
                                  }
                                ],
                                "storageKey": null
                              },
                              (v4/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "cursor",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": "notifications",
                    "args": (v1/*: any*/),
                    "filters": [
                      "sort",
                      "forSale"
                    ],
                    "handle": "connection",
                    "key": "WorksForYou_notifications",
                    "kind": "LinkedHandle",
                    "name": "bundledArtworksByArtistConnection"
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "73c4ce4ce7fee1665bebdff1de6dbbbc",
    "id": null,
    "metadata": {},
    "name": "WorksForYouFeedPaginationQuery",
    "operationKind": "query",
    "text": "query WorksForYouFeedPaginationQuery(\n  $count: Int!\n  $cursor: String\n) {\n  viewer {\n    ...WorksForYouFeed_viewer_1G22uz\n  }\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnectionInterface {\n  __isArtworkConnectionInterface: __typename\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      internalID\n      image {\n        aspect_ratio: aspectRatio\n      }\n      ...GridItem_artwork\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  image_title: imageTitle\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio: aspectRatio\n  }\n  artistNames\n  href\n  is_saved: isSaved\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment WorksForYouFeed_viewer_1G22uz on Viewer {\n  me {\n    followsAndSaves {\n      notifications: bundledArtworksByArtistConnection(sort: PUBLISHED_AT_DESC, first: $count, after: $cursor, forSale: true) {\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n        edges {\n          node {\n            id\n            href\n            summary\n            artists\n            published_at: publishedAt(format: \"MMM DD\")\n            artworksConnection {\n              ...ArtworkGrid_artworks\n            }\n            image {\n              resized(height: 80, width: 80) {\n                url\n              }\n            }\n            __typename\n          }\n          cursor\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '149b7694e3ce81d09a3b328ae2ae1b4d';
export default node;
