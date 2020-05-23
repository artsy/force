/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistArtworksFilters = "IS_FOR_SALE" | "IS_NOT_FOR_SALE" | "%future added value";
export type WorksForYouQueryVariables = {
    includeSelectedArtist: boolean;
    artistID: string;
    forSale?: boolean | null;
    filter?: ReadonlyArray<ArtistArtworksFilters | null> | null;
};
export type WorksForYouQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"WorksForYouFeed_viewer" | "WorksForYouArtistFeed_viewer">;
    } | null;
};
export type WorksForYouQuery = {
    readonly response: WorksForYouQueryResponse;
    readonly variables: WorksForYouQueryVariables;
};



/*
query WorksForYouQuery(
  $includeSelectedArtist: Boolean!
  $artistID: String!
  $forSale: Boolean
  $filter: [ArtistArtworksFilters]
) {
  viewer {
    ...WorksForYouFeed_viewer_2l4hpM @skip(if: $includeSelectedArtist)
    ...WorksForYouArtistFeed_viewer_45bsh6 @include(if: $includeSelectedArtist)
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

fragment WorksForYouArtistFeed_viewer_45bsh6 on Viewer {
  artist(id: $artistID) {
    name
    href
    counts {
      artworks
      for_sale_artworks: forSaleArtworks
    }
    image {
      resized(height: 80, width: 80) {
        url
      }
    }
    artworks_connection: artworksConnection(sort: PUBLISHED_AT_DESC, first: 10, filter: $filter) {
      pageInfo {
        hasNextPage
        endCursor
      }
      ...ArtworkGrid_artworks
      edges {
        node {
          id
          __typename
        }
        cursor
      }
    }
    id
  }
}

fragment WorksForYouFeed_viewer_2l4hpM on Viewer {
  me {
    followsAndSaves {
      notifications: bundledArtworksByArtistConnection(sort: PUBLISHED_AT_DESC, first: 10, forSale: $forSale) {
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
    "kind": "LocalArgument",
    "name": "includeSelectedArtist",
    "type": "Boolean!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "artistID",
    "type": "String!",
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
    "name": "filter",
    "type": "[ArtistArtworksFilters]",
    "defaultValue": null
  }
],
v1 = {
  "kind": "Variable",
  "name": "forSale",
  "variableName": "forSale"
},
v2 = {
  "kind": "Variable",
  "name": "filter",
  "variableName": "filter"
},
v3 = {
  "kind": "Literal",
  "name": "first",
  "value": 10
},
v4 = {
  "kind": "Literal",
  "name": "sort",
  "value": "PUBLISHED_AT_DESC"
},
v5 = [
  (v3/*: any*/),
  (v1/*: any*/),
  (v4/*: any*/)
],
v6 = {
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
  "name": "href",
  "args": null,
  "storageKey": null
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
},
v11 = {
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
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v13 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "title",
  "args": null,
  "storageKey": null
},
v14 = {
  "kind": "ScalarField",
  "alias": "image_title",
  "name": "imageTitle",
  "args": null,
  "storageKey": null
},
v15 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "date",
  "args": null,
  "storageKey": null
},
v16 = {
  "kind": "ScalarField",
  "alias": "sale_message",
  "name": "saleMessage",
  "args": null,
  "storageKey": null
},
v17 = {
  "kind": "ScalarField",
  "alias": "cultural_maker",
  "name": "culturalMaker",
  "args": null,
  "storageKey": null
},
v18 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v19 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v20 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "artists",
  "storageKey": "artists(shallow:true)",
  "args": (v18/*: any*/),
  "concreteType": "Artist",
  "plural": true,
  "selections": [
    (v7/*: any*/),
    (v8/*: any*/),
    (v19/*: any*/)
  ]
},
v21 = {
  "kind": "ScalarField",
  "alias": "collecting_institution",
  "name": "collectingInstitution",
  "args": null,
  "storageKey": null
},
v22 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "partner",
  "storageKey": "partner(shallow:true)",
  "args": (v18/*: any*/),
  "concreteType": "Partner",
  "plural": false,
  "selections": [
    (v19/*: any*/),
    (v8/*: any*/),
    (v7/*: any*/),
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "type",
      "args": null,
      "storageKey": null
    }
  ]
},
v23 = {
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
v24 = [
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "display",
    "args": null,
    "storageKey": null
  }
],
v25 = {
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
      "selections": (v24/*: any*/)
    },
    {
      "kind": "LinkedField",
      "alias": "opening_bid",
      "name": "openingBid",
      "storageKey": null,
      "args": null,
      "concreteType": "SaleArtworkOpeningBid",
      "plural": false,
      "selections": (v24/*: any*/)
    },
    (v7/*: any*/)
  ]
},
v26 = {
  "kind": "ScalarField",
  "alias": "is_inquireable",
  "name": "isInquireable",
  "args": null,
  "storageKey": null
},
v27 = {
  "kind": "ScalarField",
  "alias": "is_saved",
  "name": "isSaved",
  "args": null,
  "storageKey": null
},
v28 = {
  "kind": "ScalarField",
  "alias": "is_biddable",
  "name": "isBiddable",
  "args": null,
  "storageKey": null
},
v29 = {
  "kind": "ScalarField",
  "alias": "is_acquireable",
  "name": "isAcquireable",
  "args": null,
  "storageKey": null
},
v30 = {
  "kind": "ScalarField",
  "alias": "is_offerable",
  "name": "isOfferable",
  "args": null,
  "storageKey": null
},
v31 = {
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
      "storageKey": "resized(height:80,width:80)",
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
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "url",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
},
v32 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v33 = [
  (v2/*: any*/),
  (v3/*: any*/),
  (v4/*: any*/)
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "WorksForYouQuery",
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
            "kind": "Condition",
            "passingValue": false,
            "condition": "includeSelectedArtist",
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "WorksForYouFeed_viewer",
                "args": [
                  (v1/*: any*/)
                ]
              }
            ]
          },
          {
            "kind": "Condition",
            "passingValue": true,
            "condition": "includeSelectedArtist",
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "WorksForYouArtistFeed_viewer",
                "args": [
                  {
                    "kind": "Variable",
                    "name": "artistID",
                    "variableName": "artistID"
                  },
                  (v2/*: any*/)
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "WorksForYouQuery",
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
            "kind": "Condition",
            "passingValue": false,
            "condition": "includeSelectedArtist",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "me",
                "storageKey": null,
                "args": null,
                "concreteType": "Me",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "followsAndSaves",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "FollowsAndSaves",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": "notifications",
                        "name": "bundledArtworksByArtistConnection",
                        "storageKey": null,
                        "args": (v5/*: any*/),
                        "concreteType": "FollowedArtistsArtworksGroupConnection",
                        "plural": false,
                        "selections": [
                          (v6/*: any*/),
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "edges",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "FollowedArtistsArtworksGroupEdge",
                            "plural": true,
                            "selections": [
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "node",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "FollowedArtistsArtworksGroup",
                                "plural": false,
                                "selections": [
                                  (v7/*: any*/),
                                  (v8/*: any*/),
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "summary",
                                    "args": null,
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "artists",
                                    "args": null,
                                    "storageKey": null
                                  },
                                  {
                                    "kind": "ScalarField",
                                    "alias": "published_at",
                                    "name": "publishedAt",
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "format",
                                        "value": "MMM DD"
                                      }
                                    ],
                                    "storageKey": "publishedAt(format:\"MMM DD\")"
                                  },
                                  {
                                    "kind": "LinkedField",
                                    "alias": null,
                                    "name": "artworksConnection",
                                    "storageKey": null,
                                    "args": null,
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
                                          (v9/*: any*/),
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
                                              (v10/*: any*/),
                                              (v8/*: any*/),
                                              (v11/*: any*/),
                                              (v12/*: any*/),
                                              (v13/*: any*/),
                                              (v14/*: any*/),
                                              (v15/*: any*/),
                                              (v16/*: any*/),
                                              (v17/*: any*/),
                                              (v20/*: any*/),
                                              (v21/*: any*/),
                                              (v22/*: any*/),
                                              (v23/*: any*/),
                                              (v25/*: any*/),
                                              (v26/*: any*/),
                                              (v27/*: any*/),
                                              (v28/*: any*/),
                                              (v29/*: any*/),
                                              (v30/*: any*/)
                                            ]
                                          },
                                          (v7/*: any*/)
                                        ]
                                      }
                                    ]
                                  },
                                  (v31/*: any*/),
                                  (v9/*: any*/)
                                ]
                              },
                              (v32/*: any*/)
                            ]
                          }
                        ]
                      },
                      {
                        "kind": "LinkedHandle",
                        "alias": "notifications",
                        "name": "bundledArtworksByArtistConnection",
                        "args": (v5/*: any*/),
                        "handle": "connection",
                        "key": "WorksForYou_notifications",
                        "filters": [
                          "sort",
                          "forSale"
                        ]
                      }
                    ]
                  },
                  (v7/*: any*/)
                ]
              }
            ]
          },
          {
            "kind": "Condition",
            "passingValue": true,
            "condition": "includeSelectedArtist",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "artist",
                "storageKey": null,
                "args": [
                  {
                    "kind": "Variable",
                    "name": "id",
                    "variableName": "artistID"
                  }
                ],
                "concreteType": "Artist",
                "plural": false,
                "selections": [
                  (v19/*: any*/),
                  (v8/*: any*/),
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
                        "name": "artworks",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": "for_sale_artworks",
                        "name": "forSaleArtworks",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  },
                  (v31/*: any*/),
                  {
                    "kind": "LinkedField",
                    "alias": "artworks_connection",
                    "name": "artworksConnection",
                    "storageKey": null,
                    "args": (v33/*: any*/),
                    "concreteType": "ArtworkConnection",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "edges",
                        "storageKey": null,
                        "args": null,
                        "concreteType": null,
                        "plural": true,
                        "selections": [
                          (v9/*: any*/),
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
                              (v10/*: any*/),
                              (v8/*: any*/),
                              (v11/*: any*/),
                              (v12/*: any*/),
                              (v13/*: any*/),
                              (v14/*: any*/),
                              (v15/*: any*/),
                              (v16/*: any*/),
                              (v17/*: any*/),
                              (v20/*: any*/),
                              (v21/*: any*/),
                              (v22/*: any*/),
                              (v23/*: any*/),
                              (v25/*: any*/),
                              (v26/*: any*/),
                              (v27/*: any*/),
                              (v28/*: any*/),
                              (v29/*: any*/),
                              (v30/*: any*/),
                              (v9/*: any*/)
                            ]
                          },
                          (v7/*: any*/),
                          (v32/*: any*/)
                        ]
                      }
                    ]
                  },
                  {
                    "kind": "LinkedHandle",
                    "alias": "artworks_connection",
                    "name": "artworksConnection",
                    "args": (v33/*: any*/),
                    "handle": "connection",
                    "key": "WorksForYouArtistFeed_artworks_connection",
                    "filters": [
                      "sort",
                      "filter"
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
    "name": "WorksForYouQuery",
    "id": null,
    "text": "query WorksForYouQuery(\n  $includeSelectedArtist: Boolean!\n  $artistID: String!\n  $forSale: Boolean\n  $filter: [ArtistArtworksFilters]\n) {\n  viewer {\n    ...WorksForYouFeed_viewer_2l4hpM @skip(if: $includeSelectedArtist)\n    ...WorksForYouArtistFeed_viewer_45bsh6 @include(if: $includeSelectedArtist)\n  }\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnectionInterface {\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      image {\n        aspect_ratio: aspectRatio\n      }\n      ...GridItem_artwork\n    }\n    ... on Node {\n      id\n    }\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  is_acquireable: isAcquireable\n  is_offerable: isOfferable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment Contact_artwork on Artwork {\n  href\n  is_inquireable: isInquireable\n  sale {\n    is_auction: isAuction\n    is_live_open: isLiveOpen\n    is_open: isOpen\n    is_closed: isClosed\n    id\n  }\n  partner(shallow: true) {\n    type\n    id\n  }\n  sale_artwork: saleArtwork {\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  image_title: imageTitle\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio: aspectRatio\n  }\n  href\n  ...Metadata_artwork\n  ...Save_artwork\n  ...Badge_artwork\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n}\n\nfragment Save_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment WorksForYouArtistFeed_viewer_45bsh6 on Viewer {\n  artist(id: $artistID) {\n    name\n    href\n    counts {\n      artworks\n      for_sale_artworks: forSaleArtworks\n    }\n    image {\n      resized(height: 80, width: 80) {\n        url\n      }\n    }\n    artworks_connection: artworksConnection(sort: PUBLISHED_AT_DESC, first: 10, filter: $filter) {\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      ...ArtworkGrid_artworks\n      edges {\n        node {\n          id\n          __typename\n        }\n        cursor\n      }\n    }\n    id\n  }\n}\n\nfragment WorksForYouFeed_viewer_2l4hpM on Viewer {\n  me {\n    followsAndSaves {\n      notifications: bundledArtworksByArtistConnection(sort: PUBLISHED_AT_DESC, first: 10, forSale: $forSale) {\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n        edges {\n          node {\n            id\n            href\n            summary\n            artists\n            published_at: publishedAt(format: \"MMM DD\")\n            artworksConnection {\n              ...ArtworkGrid_artworks\n            }\n            image {\n              resized(height: 80, width: 80) {\n                url\n              }\n            }\n            __typename\n          }\n          cursor\n        }\n      }\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '6af56adbec06dd9f977c6d543d4dba51';
export default node;
