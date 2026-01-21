/**
 * @generated SignedSource<<69da586b97a939c3e519a5790af25a69>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type worksForYouRoutes_TopLevelQuery$variables = {
  artistSlug: string;
  includeSelectedArtist: boolean;
};
export type worksForYouRoutes_TopLevelQuery$data = {
  readonly viewerArtist: {
    readonly " $fragmentSpreads": FragmentRefs<"WorksForYouApp_viewerArtist">;
  } | null | undefined;
  readonly viewerFeed: {
    readonly " $fragmentSpreads": FragmentRefs<"WorksForYouApp_viewerFeed">;
  } | null | undefined;
  readonly viewerMe: {
    readonly " $fragmentSpreads": FragmentRefs<"WorksForYouApp_viewerMe">;
  } | null | undefined;
};
export type worksForYouRoutes_TopLevelQuery = {
  response: worksForYouRoutes_TopLevelQuery$data;
  variables: worksForYouRoutes_TopLevelQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "artistSlug"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "includeSelectedArtist"
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v7 = {
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
        (v5/*: any*/),
        (v6/*: any*/)
      ],
      "storageKey": "resized(height:80,width:80)"
    }
  ],
  "storageKey": null
},
v8 = {
  "kind": "Literal",
  "name": "first",
  "value": 25
},
v9 = {
  "kind": "Literal",
  "name": "sort",
  "value": "PUBLISHED_AT_DESC"
},
v10 = [
  {
    "kind": "Literal",
    "name": "filter",
    "value": [
      "IS_FOR_SALE"
    ]
  },
  (v8/*: any*/),
  (v9/*: any*/)
],
v11 = {
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
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v16 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "larger",
    "large"
  ]
},
v17 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "includeAll",
      "value": false
    }
  ],
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "image",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "aspectRatio",
      "storageKey": null
    },
    (v2/*: any*/),
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
        (v16/*: any*/)
      ],
      "kind": "ScalarField",
      "name": "url",
      "storageKey": "url(version:[\"larger\",\"large\"])"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "versions",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "quality",
          "value": 85
        },
        (v16/*: any*/),
        {
          "kind": "Literal",
          "name": "width",
          "value": 445
        }
      ],
      "concreteType": "ResizedImageUrl",
      "kind": "LinkedField",
      "name": "resized",
      "plural": false,
      "selections": [
        (v5/*: any*/),
        (v6/*: any*/),
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
        }
      ],
      "storageKey": "resized(quality:85,version:[\"larger\",\"large\"],width:445)"
    }
  ],
  "storageKey": "image(includeAll:false)"
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "imageTitle",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "artistNames",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v23 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v24 = {
  "alias": null,
  "args": null,
  "concreteType": "CollectorSignals",
  "kind": "LinkedField",
  "name": "collectorSignals",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "primaryLabel",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AuctionCollectorSignals",
      "kind": "LinkedField",
      "name": "auction",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "bidCount",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "lotClosesAt",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "liveBiddingStarted",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "registrationEndsAt",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "onlineBiddingExtended",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PartnerOfferToCollector",
      "kind": "LinkedField",
      "name": "partnerOffer",
      "plural": false,
      "selections": [
        (v22/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "priceWithDiscount",
          "plural": false,
          "selections": (v23/*: any*/),
          "storageKey": null
        },
        (v12/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v25 = {
  "alias": "sale_message",
  "args": null,
  "kind": "ScalarField",
  "name": "saleMessage",
  "storageKey": null
},
v26 = {
  "alias": "cultural_maker",
  "args": null,
  "kind": "ScalarField",
  "name": "culturalMaker",
  "storageKey": null
},
v27 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v28 = {
  "alias": null,
  "args": (v27/*: any*/),
  "concreteType": "Artist",
  "kind": "LinkedField",
  "name": "artist",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistTargetSupply",
      "kind": "LinkedField",
      "name": "targetSupply",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isP1",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    (v12/*: any*/)
  ],
  "storageKey": "artist(shallow:true)"
},
v29 = {
  "alias": null,
  "args": null,
  "concreteType": "ArtworkPriceInsights",
  "kind": "LinkedField",
  "name": "marketPriceInsights",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "demandRank",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": (v27/*: any*/),
  "concreteType": "Artist",
  "kind": "LinkedField",
  "name": "artists",
  "plural": true,
  "selections": [
    (v12/*: any*/),
    (v4/*: any*/),
    (v3/*: any*/)
  ],
  "storageKey": "artists(shallow:true)"
},
v31 = {
  "alias": "collecting_institution",
  "args": null,
  "kind": "ScalarField",
  "name": "collectingInstitution",
  "storageKey": null
},
v32 = {
  "alias": null,
  "args": (v27/*: any*/),
  "concreteType": "Partner",
  "kind": "LinkedField",
  "name": "partner",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    (v4/*: any*/),
    (v12/*: any*/)
  ],
  "storageKey": "partner(shallow:true)"
},
v33 = {
  "alias": null,
  "args": null,
  "concreteType": "Sale",
  "kind": "LinkedField",
  "name": "sale",
  "plural": false,
  "selections": [
    (v22/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "cascadingEndTimeIntervalMinutes",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "extendedBiddingIntervalMinutes",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "startAt",
      "storageKey": null
    },
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
    (v12/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isOpen",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "extendedBiddingPeriodMinutes",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v34 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotID",
  "storageKey": null
},
v35 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "extendedBiddingEndAt",
  "storageKey": null
},
v36 = {
  "alias": "sale_artwork",
  "args": null,
  "concreteType": "SaleArtwork",
  "kind": "LinkedField",
  "name": "saleArtwork",
  "plural": false,
  "selections": [
    (v34/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lotLabel",
      "storageKey": null
    },
    (v22/*: any*/),
    (v35/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "formattedEndDateTime",
      "storageKey": null
    },
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
      "selections": (v23/*: any*/),
      "storageKey": null
    },
    {
      "alias": "opening_bid",
      "args": null,
      "concreteType": "SaleArtworkOpeningBid",
      "kind": "LinkedField",
      "name": "openingBid",
      "plural": false,
      "selections": (v23/*: any*/),
      "storageKey": null
    },
    (v12/*: any*/)
  ],
  "storageKey": null
},
v37 = {
  "alias": null,
  "args": null,
  "concreteType": "SaleArtwork",
  "kind": "LinkedField",
  "name": "saleArtwork",
  "plural": false,
  "selections": [
    (v34/*: any*/),
    (v12/*: any*/),
    (v22/*: any*/),
    (v35/*: any*/)
  ],
  "storageKey": null
},
v38 = [
  (v3/*: any*/),
  (v12/*: any*/)
],
v39 = {
  "alias": null,
  "args": null,
  "concreteType": "AttributionClass",
  "kind": "LinkedField",
  "name": "attributionClass",
  "plural": false,
  "selections": (v38/*: any*/),
  "storageKey": null
},
v40 = {
  "alias": null,
  "args": null,
  "concreteType": "ArtworkMedium",
  "kind": "LinkedField",
  "name": "mediumType",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Gene",
      "kind": "LinkedField",
      "name": "filterGene",
      "plural": false,
      "selections": (v38/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
},
v41 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isUnlisted",
  "storageKey": null
},
v42 = {
  "alias": "image_title",
  "args": null,
  "kind": "ScalarField",
  "name": "imageTitle",
  "storageKey": null
},
v43 = [
  (v12/*: any*/)
],
v44 = {
  "kind": "InlineFragment",
  "selections": (v43/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
},
v45 = {
  "kind": "Literal",
  "name": "forSale",
  "value": true
},
v46 = [
  (v8/*: any*/),
  (v45/*: any*/),
  (v9/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "worksForYouRoutes_TopLevelQuery",
    "selections": [
      {
        "alias": "viewerArtist",
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "condition": "includeSelectedArtist",
            "kind": "Condition",
            "passingValue": true,
            "selections": [
              {
                "args": [
                  {
                    "kind": "Variable",
                    "name": "artistSlug",
                    "variableName": "artistSlug"
                  }
                ],
                "kind": "FragmentSpread",
                "name": "WorksForYouApp_viewerArtist"
              }
            ]
          }
        ],
        "storageKey": null
      },
      {
        "alias": "viewerFeed",
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "condition": "includeSelectedArtist",
            "kind": "Condition",
            "passingValue": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "WorksForYouApp_viewerFeed"
              }
            ]
          }
        ],
        "storageKey": null
      },
      {
        "alias": "viewerMe",
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "WorksForYouApp_viewerMe"
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "worksForYouRoutes_TopLevelQuery",
    "selections": [
      {
        "alias": "viewerArtist",
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "condition": "includeSelectedArtist",
            "kind": "Condition",
            "passingValue": true,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Variable",
                    "name": "id",
                    "variableName": "artistSlug"
                  }
                ],
                "concreteType": "Artist",
                "kind": "LinkedField",
                "name": "artist",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
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
                        "name": "artworks",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "forSaleArtworks",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": (v10/*: any*/),
                    "concreteType": "ArtworkConnection",
                    "kind": "LinkedField",
                    "name": "artworksConnection",
                    "plural": false,
                    "selections": [
                      (v11/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtworkEdge",
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
                              (v12/*: any*/),
                              (v13/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v14/*: any*/)
                        ],
                        "storageKey": null
                      },
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
                              (v13/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Artwork",
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  (v15/*: any*/),
                                  (v4/*: any*/),
                                  (v2/*: any*/),
                                  (v17/*: any*/),
                                  (v18/*: any*/),
                                  (v19/*: any*/),
                                  (v20/*: any*/),
                                  (v21/*: any*/),
                                  (v24/*: any*/),
                                  (v25/*: any*/),
                                  (v26/*: any*/),
                                  (v28/*: any*/),
                                  (v29/*: any*/),
                                  (v30/*: any*/),
                                  (v31/*: any*/),
                                  (v32/*: any*/),
                                  (v33/*: any*/),
                                  (v36/*: any*/),
                                  (v37/*: any*/),
                                  (v39/*: any*/),
                                  (v40/*: any*/),
                                  (v41/*: any*/),
                                  (v42/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v44/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "ArtworkConnectionInterface",
                        "abstractKey": "__isArtworkConnectionInterface"
                      }
                    ],
                    "storageKey": "artworksConnection(filter:[\"IS_FOR_SALE\"],first:25,sort:\"PUBLISHED_AT_DESC\")"
                  },
                  {
                    "alias": null,
                    "args": (v10/*: any*/),
                    "filters": [
                      "sort",
                      "filter"
                    ],
                    "handle": "connection",
                    "key": "WorksForYouArtistFeed_artworksConnection",
                    "kind": "LinkedHandle",
                    "name": "artworksConnection"
                  },
                  (v12/*: any*/)
                ],
                "storageKey": null
              }
            ]
          }
        ],
        "storageKey": null
      },
      {
        "alias": "viewerFeed",
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "condition": "includeSelectedArtist",
            "kind": "Condition",
            "passingValue": false,
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
                        "args": (v46/*: any*/),
                        "concreteType": "FollowedArtistsArtworksGroupConnection",
                        "kind": "LinkedField",
                        "name": "bundledArtworksByArtistConnection",
                        "plural": false,
                        "selections": [
                          (v11/*: any*/),
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
                                  (v12/*: any*/),
                                  (v4/*: any*/),
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
                                    "alias": null,
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
                                              (v13/*: any*/),
                                              {
                                                "alias": null,
                                                "args": null,
                                                "concreteType": "Artwork",
                                                "kind": "LinkedField",
                                                "name": "node",
                                                "plural": false,
                                                "selections": [
                                                  (v12/*: any*/),
                                                  (v15/*: any*/),
                                                  (v4/*: any*/),
                                                  (v2/*: any*/),
                                                  (v17/*: any*/),
                                                  (v18/*: any*/),
                                                  (v19/*: any*/),
                                                  (v20/*: any*/),
                                                  (v21/*: any*/),
                                                  (v24/*: any*/),
                                                  (v25/*: any*/),
                                                  (v26/*: any*/),
                                                  (v28/*: any*/),
                                                  (v29/*: any*/),
                                                  (v30/*: any*/),
                                                  (v31/*: any*/),
                                                  (v32/*: any*/),
                                                  (v33/*: any*/),
                                                  (v36/*: any*/),
                                                  (v37/*: any*/),
                                                  (v39/*: any*/),
                                                  (v40/*: any*/),
                                                  (v41/*: any*/),
                                                  (v42/*: any*/)
                                                ],
                                                "storageKey": null
                                              },
                                              (v44/*: any*/)
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
                                  (v7/*: any*/),
                                  (v13/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v14/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": "bundledArtworksByArtistConnection(first:25,forSale:true,sort:\"PUBLISHED_AT_DESC\")"
                      },
                      {
                        "alias": null,
                        "args": (v46/*: any*/),
                        "filters": [
                          "sort",
                          "forSale"
                        ],
                        "handle": "connection",
                        "key": "WorksForYouFeed_bundledArtworksByArtistConnection",
                        "kind": "LinkedHandle",
                        "name": "bundledArtworksByArtistConnection"
                      }
                    ],
                    "storageKey": null
                  },
                  (v12/*: any*/)
                ],
                "storageKey": null
              }
            ]
          }
        ],
        "storageKey": null
      },
      {
        "alias": "viewerMe",
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
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 99
                      }
                    ],
                    "concreteType": "FollowArtistConnection",
                    "kind": "LinkedField",
                    "name": "artistsConnection",
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
                        "concreteType": "FollowArtistEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "FollowArtist",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Artist",
                                "kind": "LinkedField",
                                "name": "artist",
                                "plural": false,
                                "selections": [
                                  (v3/*: any*/),
                                  (v15/*: any*/),
                                  (v12/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v12/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "artistsConnection(first:99)"
                  },
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "first",
                        "value": 1
                      },
                      (v45/*: any*/)
                    ],
                    "concreteType": "FollowedArtistsArtworksGroupConnection",
                    "kind": "LinkedField",
                    "name": "bundledArtworksByArtistConnection",
                    "plural": false,
                    "selections": [
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
                            "selections": (v43/*: any*/),
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "bundledArtworksByArtistConnection(first:1,forSale:true)"
                  }
                ],
                "storageKey": null
              },
              (v12/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "bc60f1a21cb3076bd71e25a49db5d05e",
    "id": null,
    "metadata": {},
    "name": "worksForYouRoutes_TopLevelQuery",
    "operationKind": "query",
    "text": "query worksForYouRoutes_TopLevelQuery(\n  $includeSelectedArtist: Boolean!\n  $artistSlug: String!\n) {\n  viewerArtist: viewer {\n    ...WorksForYouApp_viewerArtist_1H2h5M @include(if: $includeSelectedArtist)\n  }\n  viewerFeed: viewer {\n    ...WorksForYouApp_viewerFeed @skip(if: $includeSelectedArtist)\n  }\n  viewerMe: viewer {\n    ...WorksForYouApp_viewerMe\n  }\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnectionInterface {\n  __isArtworkConnectionInterface: __typename\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      internalID\n      image(includeAll: false) {\n        aspectRatio\n      }\n      ...GridItem_artwork\n      ...FlatGridItem_artwork\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment BidTimerLine_artwork on Artwork {\n  saleArtwork {\n    lotID\n    id\n  }\n  collectorSignals {\n    auction {\n      lotClosesAt\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n}\n\nfragment Details_artwork on Artwork {\n  internalID\n  href\n  title\n  date\n  collectorSignals {\n    primaryLabel\n    auction {\n      bidCount\n      lotClosesAt\n      liveBiddingStarted\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...PrimaryLabelLine_artwork\n  ...BidTimerLine_artwork\n  ...HoverDetails_artwork\n}\n\nfragment ExclusiveAccessBadge_artwork on Artwork {\n  isUnlisted\n}\n\nfragment FlatGridItem_artwork on Artwork {\n  ...Metadata_artwork\n  sale {\n    extendedBiddingPeriodMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    isOpen\n    id\n  }\n  saleArtwork {\n    endAt\n    extendedBiddingEndAt\n    lotID\n    id\n  }\n  internalID\n  title\n  image_title: imageTitle\n  image(includeAll: false) {\n    resized(quality: 85, width: 445, version: [\"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n  artistNames\n  href\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  imageTitle\n  image(includeAll: false) {\n    internalID\n    placeholder\n    url(version: [\"larger\", \"large\"])\n    aspectRatio\n    versions\n  }\n  artistNames\n  href\n  ...Metadata_artwork\n  ...ExclusiveAccessBadge_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n  sale {\n    isOpen\n    id\n  }\n}\n\nfragment PrimaryLabelLine_artwork on Artwork {\n  internalID\n  collectorSignals {\n    primaryLabel\n    partnerOffer {\n      endAt\n      priceWithDiscount {\n        display\n      }\n      id\n    }\n  }\n}\n\nfragment WorksForYouApp_viewerArtist_1H2h5M on Viewer {\n  ...WorksForYouArtistFeed_viewer_1H2h5M\n}\n\nfragment WorksForYouApp_viewerFeed on Viewer {\n  ...WorksForYouFeed_viewer\n}\n\nfragment WorksForYouApp_viewerMe on Viewer {\n  me {\n    followsAndSaves {\n      artistsConnection(first: 99) {\n        totalCount\n        edges {\n          node {\n            artist {\n              name\n              slug\n              id\n            }\n            id\n          }\n        }\n      }\n      bundledArtworksByArtistConnection(first: 1, forSale: true) {\n        edges {\n          node {\n            id\n          }\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment WorksForYouArtistFeed_viewer_1H2h5M on Viewer {\n  artist(id: $artistSlug) {\n    internalID\n    name\n    href\n    counts {\n      artworks\n      forSaleArtworks\n    }\n    image {\n      resized(height: 80, width: 80) {\n        src\n        srcSet\n      }\n    }\n    artworksConnection(sort: PUBLISHED_AT_DESC, first: 25, filter: [IS_FOR_SALE]) {\n      ...ArtworkGrid_artworks\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n      edges {\n        node {\n          id\n          __typename\n        }\n        cursor\n      }\n    }\n    id\n  }\n}\n\nfragment WorksForYouFeed_viewer on Viewer {\n  me {\n    followsAndSaves {\n      bundledArtworksByArtistConnection(sort: PUBLISHED_AT_DESC, first: 25, forSale: true) {\n        pageInfo {\n          hasNextPage\n          endCursor\n        }\n        edges {\n          node {\n            id\n            href\n            summary\n            artists\n            publishedAt(format: \"MMM DD\")\n            artworksConnection {\n              ...ArtworkGrid_artworks\n            }\n            image {\n              resized(height: 80, width: 80) {\n                src\n                srcSet\n              }\n            }\n            __typename\n          }\n          cursor\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "2ba756dea691537925ada1feba6b63ad";

export default node;
