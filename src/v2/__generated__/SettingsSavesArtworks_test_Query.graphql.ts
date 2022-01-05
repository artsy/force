/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsSavesArtworks_test_QueryVariables = {
    page?: number | null;
};
export type SettingsSavesArtworks_test_QueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"SettingsSavesArtworks_me">;
    } | null;
};
export type SettingsSavesArtworks_test_Query = {
    readonly response: SettingsSavesArtworks_test_QueryResponse;
    readonly variables: SettingsSavesArtworks_test_QueryVariables;
};



/*
query SettingsSavesArtworks_test_Query(
  $page: Int
) {
  me {
    ...SettingsSavesArtworks_me_2Pg8Wv
    id
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

fragment SaveButton_artwork on Artwork {
  id
  internalID
  slug
  is_saved: isSaved
  title
}

fragment SettingsSavesArtworks_me_2Pg8Wv on Me {
  followsAndSaves {
    artworksConnection(first: 12, private: true, page: $page) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      pageCursors {
        ...Pagination_pageCursors
      }
      edges {
        node {
          internalID
          ...GridItem_artwork
          id
          __typename
        }
        cursor
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
    "name": "page",
    "type": "Int"
  }
],
v1 = {
  "kind": "Variable",
  "name": "page",
  "variableName": "page"
},
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 12
  },
  (v1/*: any*/),
  {
    "kind": "Literal",
    "name": "private",
    "value": true
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v5 = [
  (v3/*: any*/),
  (v4/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
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
  "name": "id",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v10 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v11 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v12 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v13 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v14 = {
  "type": "PageCursor",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v15 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v16 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v17 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": false
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
    "name": "SettingsSavesArtworks_test_Query",
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
            "args": [
              (v1/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "SettingsSavesArtworks_me"
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
    "name": "SettingsSavesArtworks_test_Query",
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
                "alias": null,
                "args": (v2/*: any*/),
                "concreteType": "SavedArtworksConnection",
                "kind": "LinkedField",
                "name": "artworksConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "totalCount",
                    "storageKey": null
                  },
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
                        "selections": (v5/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PageCursor",
                        "kind": "LinkedField",
                        "name": "first",
                        "plural": false,
                        "selections": (v5/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PageCursor",
                        "kind": "LinkedField",
                        "name": "last",
                        "plural": false,
                        "selections": (v5/*: any*/),
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
                          (v3/*: any*/),
                          (v4/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SavedArtworksEdge",
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
                            "kind": "ScalarField",
                            "name": "internalID",
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
                            "concreteType": "Image",
                            "kind": "LinkedField",
                            "name": "image",
                            "plural": false,
                            "selections": [
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
                              },
                              {
                                "alias": "aspect_ratio",
                                "args": null,
                                "kind": "ScalarField",
                                "name": "aspectRatio",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "artistNames",
                            "storageKey": null
                          },
                          (v6/*: any*/),
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
                              (v8/*: any*/),
                              (v6/*: any*/),
                              (v9/*: any*/)
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
                              (v9/*: any*/),
                              (v6/*: any*/),
                              (v8/*: any*/),
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
                              (v8/*: any*/),
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
                                "selections": (v10/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": "opening_bid",
                                "args": null,
                                "concreteType": "SaleArtworkOpeningBid",
                                "kind": "LinkedField",
                                "name": "openingBid",
                                "plural": false,
                                "selections": (v10/*: any*/),
                                "storageKey": null
                              },
                              (v8/*: any*/)
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
                          (v8/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "slug",
                            "storageKey": null
                          },
                          {
                            "alias": "is_biddable",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isBiddable",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "__typename",
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
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v2/*: any*/),
                "filters": [
                  "private",
                  "page"
                ],
                "handle": "connection",
                "key": "SettingsSavesArtworks_artworksConnection",
                "kind": "LinkedHandle",
                "name": "artworksConnection"
              }
            ],
            "storageKey": null
          },
          (v8/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "type": "Me",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.id": (v11/*: any*/),
        "me.followsAndSaves": {
          "type": "FollowsAndSaves",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.followsAndSaves.artworksConnection": {
          "type": "SavedArtworksConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.followsAndSaves.artworksConnection.totalCount": {
          "type": "Int",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.followsAndSaves.artworksConnection.pageInfo": {
          "type": "PageInfo",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "me.followsAndSaves.artworksConnection.pageCursors": {
          "type": "PageCursors",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "me.followsAndSaves.artworksConnection.edges": {
          "type": "SavedArtworksEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "me.followsAndSaves.artworksConnection.pageInfo.hasNextPage": (v12/*: any*/),
        "me.followsAndSaves.artworksConnection.pageInfo.endCursor": (v13/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node": {
          "type": "Artwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.followsAndSaves.artworksConnection.pageCursors.around": {
          "type": "PageCursor",
          "enumValues": null,
          "plural": true,
          "nullable": false
        },
        "me.followsAndSaves.artworksConnection.pageCursors.first": (v14/*: any*/),
        "me.followsAndSaves.artworksConnection.pageCursors.last": (v14/*: any*/),
        "me.followsAndSaves.artworksConnection.pageCursors.previous": (v14/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.internalID": (v15/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.id": (v15/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.cursor": (v16/*: any*/),
        "me.followsAndSaves.artworksConnection.pageCursors.around.cursor": (v16/*: any*/),
        "me.followsAndSaves.artworksConnection.pageCursors.around.page": (v17/*: any*/),
        "me.followsAndSaves.artworksConnection.pageCursors.around.isCurrent": (v12/*: any*/),
        "me.followsAndSaves.artworksConnection.pageCursors.first.cursor": (v16/*: any*/),
        "me.followsAndSaves.artworksConnection.pageCursors.first.page": (v17/*: any*/),
        "me.followsAndSaves.artworksConnection.pageCursors.first.isCurrent": (v12/*: any*/),
        "me.followsAndSaves.artworksConnection.pageCursors.last.cursor": (v16/*: any*/),
        "me.followsAndSaves.artworksConnection.pageCursors.last.page": (v17/*: any*/),
        "me.followsAndSaves.artworksConnection.pageCursors.last.isCurrent": (v12/*: any*/),
        "me.followsAndSaves.artworksConnection.pageCursors.previous.cursor": (v16/*: any*/),
        "me.followsAndSaves.artworksConnection.pageCursors.previous.page": (v17/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.title": (v13/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.image_title": (v13/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.image": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.followsAndSaves.artworksConnection.edges.node.artistNames": (v13/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.href": (v13/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.is_saved": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.__typename": (v16/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.image.placeholder": (v13/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.image.url": (v13/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.image.aspect_ratio": {
          "type": "Float",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "me.followsAndSaves.artworksConnection.edges.node.slug": (v15/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.is_biddable": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.sale": {
          "type": "Sale",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.followsAndSaves.artworksConnection.edges.node.date": (v13/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.sale_message": (v13/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.cultural_maker": (v13/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.artists": {
          "type": "Artist",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "me.followsAndSaves.artworksConnection.edges.node.collecting_institution": (v13/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.partner": {
          "type": "Partner",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.followsAndSaves.artworksConnection.edges.node.sale_artwork": {
          "type": "SaleArtwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.followsAndSaves.artworksConnection.edges.node.is_inquireable": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.sale.is_preview": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.sale.display_timely_at": (v13/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.sale.id": (v11/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.artists.id": (v15/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.artists.href": (v13/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.artists.name": (v13/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.partner.name": (v13/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.partner.href": (v13/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.partner.id": (v11/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.sale.is_auction": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.sale.is_closed": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.sale_artwork.counts": {
          "type": "SaleArtworkCounts",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.followsAndSaves.artworksConnection.edges.node.sale_artwork.highest_bid": {
          "type": "SaleArtworkHighestBid",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.followsAndSaves.artworksConnection.edges.node.sale_artwork.opening_bid": {
          "type": "SaleArtworkOpeningBid",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.followsAndSaves.artworksConnection.edges.node.sale_artwork.id": (v11/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.sale.is_live_open": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.sale.is_open": (v18/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.partner.type": (v13/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.sale_artwork.counts.bidder_positions": {
          "type": "FormattedNumber",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.followsAndSaves.artworksConnection.edges.node.sale_artwork.highest_bid.display": (v13/*: any*/),
        "me.followsAndSaves.artworksConnection.edges.node.sale_artwork.opening_bid.display": (v13/*: any*/)
      }
    },
    "name": "SettingsSavesArtworks_test_Query",
    "operationKind": "query",
    "text": "query SettingsSavesArtworks_test_Query(\n  $page: Int\n) {\n  me {\n    ...SettingsSavesArtworks_me_2Pg8Wv\n    id\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  image_title: imageTitle\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio: aspectRatio\n  }\n  artistNames\n  href\n  is_saved: isSaved\n  ...Metadata_artwork\n  ...SaveButton_artwork\n  ...Badge_artwork\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment SettingsSavesArtworks_me_2Pg8Wv on Me {\n  followsAndSaves {\n    artworksConnection(first: 12, private: true, page: $page) {\n      totalCount\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      pageCursors {\n        ...Pagination_pageCursors\n      }\n      edges {\n        node {\n          internalID\n          ...GridItem_artwork\n          id\n          __typename\n        }\n        cursor\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '129c660fa56e39aff0b953d941d66b38';
export default node;
