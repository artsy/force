/**
 * @generated SignedSource<<7e3d63e5a3ad35bbe3e3f3c0b6e6fd5a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type auctionRoutes_TopLevelQuery$variables = {
  isLoggedIn: boolean;
  slug: string;
};
export type auctionRoutes_TopLevelQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"AuctionApp_me">;
  } | null | undefined;
  readonly sale: {
    readonly " $fragmentSpreads": FragmentRefs<"AuctionApp_sale">;
  } | null | undefined;
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"AuctionApp_viewer">;
  } | null | undefined;
};
export type auctionRoutes_TopLevelQuery = {
  response: auctionRoutes_TopLevelQuery$data;
  variables: auctionRoutes_TopLevelQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "isLoggedIn"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "slug"
},
v2 = {
  "kind": "Variable",
  "name": "saleID",
  "variableName": "slug"
},
v3 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v5 = {
  "kind": "Literal",
  "name": "live",
  "value": true
},
v6 = [
  (v5/*: any*/),
  (v2/*: any*/)
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotLabel",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v9 = [
  (v8/*: any*/)
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "formattedEndDateTime",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "artistNames",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endedAt",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isLiveOpen",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isClosed",
  "storageKey": null
},
v24 = [
  (v4/*: any*/),
  (v19/*: any*/)
],
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v26 = {
  "kind": "Literal",
  "name": "width",
  "value": 445
},
v27 = [
  (v13/*: any*/),
  (v14/*: any*/)
],
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v29 = {
  "kind": "Literal",
  "name": "first",
  "value": 30
},
v30 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v31 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cascadingEndTimeIntervalMinutes",
  "storageKey": null
},
v32 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "extendedBiddingIntervalMinutes",
  "storageKey": null
},
v33 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startAt",
  "storageKey": null
},
v34 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotID",
  "storageKey": null
},
v35 = [
  (v25/*: any*/),
  (v19/*: any*/)
],
v36 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "larger",
    "large"
  ]
},
v37 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isUnlisted",
    "storageKey": null
  },
  (v4/*: any*/),
  (v28/*: any*/),
  (v12/*: any*/),
  (v11/*: any*/),
  {
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
          (v21/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Money",
            "kind": "LinkedField",
            "name": "priceWithDiscount",
            "plural": false,
            "selections": (v9/*: any*/),
            "storageKey": null
          },
          (v19/*: any*/)
        ],
        "storageKey": null
      }
    ],
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
    "args": (v30/*: any*/),
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
      (v19/*: any*/)
    ],
    "storageKey": "artist(shallow:true)"
  },
  {
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
  {
    "alias": null,
    "args": (v30/*: any*/),
    "concreteType": "Artist",
    "kind": "LinkedField",
    "name": "artists",
    "plural": true,
    "selections": [
      (v19/*: any*/),
      (v28/*: any*/),
      (v25/*: any*/)
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
    "args": (v30/*: any*/),
    "concreteType": "Partner",
    "kind": "LinkedField",
    "name": "partner",
    "plural": false,
    "selections": [
      (v25/*: any*/),
      (v28/*: any*/),
      (v19/*: any*/)
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
      (v21/*: any*/),
      (v31/*: any*/),
      (v32/*: any*/),
      (v33/*: any*/),
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
      (v19/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isOpen",
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
      (v34/*: any*/),
      (v7/*: any*/),
      (v21/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "extendedBiddingEndAt",
        "storageKey": null
      },
      (v10/*: any*/),
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
      (v19/*: any*/)
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "SaleArtwork",
    "kind": "LinkedField",
    "name": "saleArtwork",
    "plural": false,
    "selections": [
      (v34/*: any*/),
      (v19/*: any*/)
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "AttributionClass",
    "kind": "LinkedField",
    "name": "attributionClass",
    "plural": false,
    "selections": (v35/*: any*/),
    "storageKey": null
  },
  {
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
        "selections": (v35/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  (v17/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "Image",
    "kind": "LinkedField",
    "name": "image",
    "plural": false,
    "selections": [
      {
        "alias": "src",
        "args": [
          (v36/*: any*/)
        ],
        "kind": "ScalarField",
        "name": "url",
        "storageKey": "url(version:[\"larger\",\"large\"])"
      },
      (v15/*: any*/),
      (v16/*: any*/)
    ],
    "storageKey": null
  },
  (v19/*: any*/)
],
v38 = {
  "kind": "Literal",
  "name": "aggregations",
  "value": [
    "TOTAL"
  ]
},
v39 = {
  "kind": "Literal",
  "name": "includeArtworksByFollowedArtists",
  "value": true
},
v40 = {
  "kind": "Variable",
  "name": "saleSlug",
  "variableName": "slug"
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "auctionRoutes_TopLevelQuery",
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
              (v2/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "AuctionApp_me"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AuctionApp_sale"
          }
        ],
        "storageKey": null
      },
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
                "name": "isLoggedIn",
                "variableName": "isLoggedIn"
              },
              (v2/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "AuctionApp_viewer"
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
    "name": "auctionRoutes_TopLevelQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          {
            "alias": null,
            "args": (v6/*: any*/),
            "concreteType": "LotStanding",
            "kind": "LinkedField",
            "name": "lotStandings",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isHighestBidder",
                "storageKey": null
              },
              {
                "alias": null,
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
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "bidderPositions",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SaleArtworkCurrentBid",
                    "kind": "LinkedField",
                    "name": "currentBid",
                    "plural": false,
                    "selections": (v9/*: any*/),
                    "storageKey": null
                  },
                  (v10/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "artwork",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v11/*: any*/),
                      (v12/*: any*/),
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
                                "value": 100
                              },
                              {
                                "kind": "Literal",
                                "name": "version",
                                "value": "medium"
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 100
                              }
                            ],
                            "concreteType": "ResizedImageUrl",
                            "kind": "LinkedField",
                            "name": "resized",
                            "plural": false,
                            "selections": [
                              (v13/*: any*/),
                              (v14/*: any*/),
                              (v15/*: any*/),
                              (v16/*: any*/)
                            ],
                            "storageKey": "resized(height:100,version:\"medium\",width:100)"
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "imageUrl",
                        "storageKey": null
                      },
                      (v17/*: any*/),
                      (v18/*: any*/),
                      (v19/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v18/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "reserveStatus",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "saleID",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SaleArtworkHighestBid",
                    "kind": "LinkedField",
                    "name": "highestBid",
                    "plural": false,
                    "selections": (v9/*: any*/),
                    "storageKey": null
                  },
                  (v20/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Sale",
                    "kind": "LinkedField",
                    "name": "sale",
                    "plural": false,
                    "selections": [
                      (v18/*: any*/),
                      (v21/*: any*/),
                      (v22/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isLiveOpenHappened",
                        "storageKey": null
                      },
                      (v23/*: any*/),
                      (v19/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v19/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isIdentityVerified",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasCreditCards",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "IdentityVerification",
            "kind": "LinkedField",
            "name": "pendingIdentityVerification",
            "plural": false,
            "selections": (v24/*: any*/),
            "storageKey": null
          },
          {
            "alias": "showActiveBids",
            "args": (v6/*: any*/),
            "concreteType": "LotStanding",
            "kind": "LinkedField",
            "name": "lotStandings",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "BidderPosition",
                "kind": "LinkedField",
                "name": "activeBid",
                "plural": false,
                "selections": (v24/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v19/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Sale",
        "kind": "LinkedField",
        "name": "sale",
        "plural": false,
        "selections": [
          (v25/*: any*/),
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "HTML"
              }
            ],
            "kind": "ScalarField",
            "name": "description",
            "storageKey": "description(format:\"HTML\")"
          },
          (v18/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "coverImage",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": [
                      "wide",
                      "source",
                      "large_rectangle"
                    ]
                  }
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:[\"wide\",\"source\",\"large_rectangle\"])"
              },
              {
                "alias": "signupImage",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": "main"
                  }
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:\"main\")"
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "aspectRatio",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "blurhash",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Sale",
            "kind": "LinkedField",
            "name": "associatedSale",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "coverImage",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "height",
                        "value": 250
                      },
                      (v26/*: any*/)
                    ],
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": (v27/*: any*/),
                    "storageKey": "cropped(height:250,width:445)"
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "displayTimelyAt",
                "storageKey": null
              },
              (v28/*: any*/),
              (v18/*: any*/),
              (v25/*: any*/),
              (v19/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Sale",
            "kind": "LinkedField",
            "name": "promotedSale",
            "plural": false,
            "selections": [
              (v28/*: any*/),
              (v4/*: any*/),
              (v25/*: any*/),
              {
                "alias": null,
                "args": [
                  (v29/*: any*/)
                ],
                "concreteType": "SaleArtworkConnection",
                "kind": "LinkedField",
                "name": "saleArtworksConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SaleArtworkEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "SaleArtwork",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Artwork",
                            "kind": "LinkedField",
                            "name": "artwork",
                            "plural": false,
                            "selections": (v37/*: any*/),
                            "storageKey": null
                          },
                          (v19/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "saleArtworksConnection(first:30)"
              },
              (v19/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Bidder",
            "kind": "LinkedField",
            "name": "bidder",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "qualifiedForBidding",
                "storageKey": null
              },
              (v19/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isAuction",
            "storageKey": null
          },
          (v23/*: any*/),
          (v22/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isPreview",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isRegistrationClosed",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "liveURLIfOpen",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "requireIdentityVerification",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Bidder",
            "kind": "LinkedField",
            "name": "registrationStatus",
            "plural": false,
            "selections": (v24/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "status",
            "storageKey": null
          },
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "liveStartAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hideTotal",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Money",
            "kind": "LinkedField",
            "name": "totalRaised",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "minor",
                "storageKey": null
              },
              (v8/*: any*/)
            ],
            "storageKey": null
          },
          (v21/*: any*/),
          (v20/*: any*/),
          (v33/*: any*/),
          (v28/*: any*/),
          (v31/*: any*/),
          (v32/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "eligibleSaleArtworksCount",
            "storageKey": null
          },
          {
            "alias": "showAssociatedSale",
            "args": null,
            "concreteType": "Sale",
            "kind": "LinkedField",
            "name": "associatedSale",
            "plural": false,
            "selections": (v24/*: any*/),
            "storageKey": null
          },
          {
            "alias": "showBuyNowTab",
            "args": null,
            "concreteType": "Sale",
            "kind": "LinkedField",
            "name": "promotedSale",
            "plural": false,
            "selections": (v24/*: any*/),
            "storageKey": null
          },
          (v19/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "condition": "isLoggedIn",
            "kind": "Condition",
            "passingValue": true,
            "selections": [
              {
                "alias": null,
                "args": [
                  (v38/*: any*/),
                  (v29/*: any*/),
                  (v39/*: any*/),
                  (v40/*: any*/)
                ],
                "concreteType": "SaleArtworksConnection",
                "kind": "LinkedField",
                "name": "saleArtworksConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SaleArtwork",
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
                        "selections": (v37/*: any*/),
                        "storageKey": null
                      },
                      (v19/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": "showFollowedArtistsTab",
                "args": [
                  (v38/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 1
                  },
                  (v39/*: any*/),
                  (v40/*: any*/)
                ],
                "concreteType": "SaleArtworksConnection",
                "kind": "LinkedField",
                "name": "saleArtworksConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SaleArtwork",
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
                        "selections": (v24/*: any*/),
                        "storageKey": null
                      },
                      (v19/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ]
          },
          {
            "alias": null,
            "args": [
              (v29/*: any*/),
              (v5/*: any*/),
              {
                "kind": "Literal",
                "name": "published",
                "value": true
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "LICENSED_TIMELY_AT_NAME_DESC"
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
                      (v25/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "formattedStartDateTime",
                        "storageKey": null
                      },
                      (v28/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "coverImage",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 334
                              },
                              (v36/*: any*/),
                              (v26/*: any*/)
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": (v27/*: any*/),
                            "storageKey": "cropped(height:334,version:[\"larger\",\"large\"],width:445)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v19/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "salesConnection(first:30,live:true,published:true,sort:\"LICENSED_TIMELY_AT_NAME_DESC\")"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "97ff24cf5d4181b53481671175d33bb8",
    "id": null,
    "metadata": {},
    "name": "auctionRoutes_TopLevelQuery",
    "operationKind": "query",
    "text": "query auctionRoutes_TopLevelQuery(\n  $slug: String!\n  $isLoggedIn: Boolean!\n) {\n  me {\n    ...AuctionApp_me_96HcF\n    id\n  }\n  sale(id: $slug) @principalField {\n    ...AuctionApp_sale\n    id\n  }\n  viewer {\n    ...AuctionApp_viewer_1PBNVF\n  }\n}\n\nfragment AuctionActiveBids_me_96HcF on Me {\n  internalID\n  lotStandings(saleID: $slug, live: true) {\n    isHighestBidder\n    saleArtwork {\n      ...AuctionLotInfo_saleArtwork_4oTW5x\n      counts {\n        bidderPositions\n      }\n      currentBid {\n        display\n      }\n      slug\n      lotLabel\n      reserveStatus\n      saleID\n      highestBid {\n        display\n      }\n      endedAt\n      sale {\n        slug\n        endAt\n        isLiveOpen\n        isLiveOpenHappened\n        isClosed\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment AuctionApp_me_96HcF on Me {\n  ...AuctionActiveBids_me_96HcF\n  ...AuctionDetails_me\n  internalID\n  showActiveBids: lotStandings(saleID: $slug, live: true) {\n    activeBid {\n      internalID\n      id\n    }\n  }\n}\n\nfragment AuctionApp_sale on Sale {\n  ...AuctionMeta_sale\n  ...AuctionAssociatedSale_sale\n  ...AuctionBuyNowRail_sale\n  ...AuctionDetails_sale\n  ...CascadingEndTimesBanner_sale\n  internalID\n  slug\n  isClosed\n  eligibleSaleArtworksCount\n  coverImage {\n    url(version: [\"wide\", \"source\", \"large_rectangle\"])\n  }\n  showAssociatedSale: associatedSale {\n    internalID\n    id\n  }\n  showBuyNowTab: promotedSale {\n    internalID\n    id\n  }\n  cascadingEndTimeIntervalMinutes\n  extendedBiddingIntervalMinutes\n  status\n}\n\nfragment AuctionApp_viewer_1PBNVF on Viewer {\n  ...AuctionWorksByFollowedArtistsRail_viewer_96HcF @include(if: $isLoggedIn)\n  showFollowedArtistsTab: saleArtworksConnection(first: 1, aggregations: [TOTAL], saleSlug: $slug, includeArtworksByFollowedArtists: true) @include(if: $isLoggedIn) {\n    edges {\n      node {\n        internalID\n        id\n      }\n      id\n    }\n  }\n  ...AuctionCurrentAuctionsRail_viewer\n}\n\nfragment AuctionAssociatedSale_sale on Sale {\n  associatedSale {\n    coverImage {\n      cropped(width: 445, height: 250) {\n        src\n        srcSet\n      }\n    }\n    displayTimelyAt\n    href\n    slug\n    name\n    id\n  }\n}\n\nfragment AuctionBuyNowRail_sale on Sale {\n  promotedSale {\n    href\n    internalID\n    name\n    saleArtworksConnection(first: 30) {\n      edges {\n        node {\n          artwork {\n            ...ShelfArtwork_artwork\n            id\n          }\n          id\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment AuctionCurrentAuctionsRail_viewer on Viewer {\n  salesConnection(first: 30, published: true, live: true, sort: LICENSED_TIMELY_AT_NAME_DESC) {\n    edges {\n      node {\n        ...CellSale_sale\n        id\n      }\n    }\n  }\n}\n\nfragment AuctionDetails_me on Me {\n  ...RegisterButton_me\n}\n\nfragment AuctionDetails_sale on Sale {\n  ...RegisterButton_sale\n  ...AuctionInfoSidebar_sale\n  ...SaleDetailTimer_sale\n  internalID\n  name\n  slug\n  liveStartAt\n  startAt\n  endAt\n  description(format: HTML)\n  href\n  isClosed\n  cascadingEndTimeIntervalMinutes\n}\n\nfragment AuctionInfoSidebar_sale on Sale {\n  internalID\n  liveStartAt\n  hideTotal\n  totalRaised {\n    minor\n    display\n  }\n}\n\nfragment AuctionLotInfo_saleArtwork_4oTW5x on SaleArtwork {\n  counts {\n    bidderPositions\n  }\n  lotLabel\n  currentBid {\n    display\n  }\n  formattedEndDateTime\n  artwork {\n    internalID\n    date\n    title\n    image {\n      resized(width: 100, height: 100, version: \"medium\") {\n        src\n        srcSet\n        width\n        height\n      }\n    }\n    imageUrl\n    artistNames\n    slug\n    id\n  }\n}\n\nfragment AuctionMeta_sale on Sale {\n  name\n  description(format: HTML)\n  slug\n  coverImage {\n    url(version: [\"wide\", \"source\", \"large_rectangle\"])\n  }\n}\n\nfragment AuctionWorksByFollowedArtistsRail_viewer_96HcF on Viewer {\n  saleArtworksConnection(first: 30, aggregations: [TOTAL], saleSlug: $slug, includeArtworksByFollowedArtists: true) {\n    edges {\n      node {\n        ...ShelfArtwork_artwork\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment BidTimerLine_artwork on Artwork {\n  saleArtwork {\n    lotID\n    id\n  }\n  collectorSignals {\n    auction {\n      lotClosesAt\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n}\n\nfragment CascadingEndTimesBanner_sale on Sale {\n  isClosed\n  cascadingEndTimeIntervalMinutes\n  extendedBiddingIntervalMinutes\n}\n\nfragment CellSale_sale on Sale {\n  name\n  formattedStartDateTime\n  href\n  coverImage {\n    cropped(width: 445, height: 334, version: [\"larger\", \"large\"]) {\n      src\n      srcSet\n    }\n  }\n}\n\nfragment Details_artwork on Artwork {\n  internalID\n  href\n  title\n  date\n  collectorSignals {\n    primaryLabel\n    auction {\n      bidCount\n      lotClosesAt\n      liveBiddingStarted\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...PrimaryLabelLine_artwork\n  ...BidTimerLine_artwork\n  ...HoverDetails_artwork\n}\n\nfragment ExclusiveAccessBadge_artwork on Artwork {\n  isUnlisted\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n  sale {\n    isOpen\n    id\n  }\n}\n\nfragment PrimaryLabelLine_artwork on Artwork {\n  internalID\n  collectorSignals {\n    primaryLabel\n    partnerOffer {\n      endAt\n      priceWithDiscount {\n        display\n      }\n      id\n    }\n  }\n}\n\nfragment RegisterButton_me on Me {\n  internalID\n  isIdentityVerified\n  hasCreditCards\n  pendingIdentityVerification {\n    internalID\n    id\n  }\n}\n\nfragment RegisterButton_sale on Sale {\n  bidder {\n    qualifiedForBidding\n    id\n  }\n  coverImage {\n    signupImage: url(version: \"main\")\n    aspectRatio\n    blurhash\n  }\n  isAuction\n  isClosed\n  isLiveOpen\n  isPreview\n  isRegistrationClosed\n  liveURLIfOpen\n  requireIdentityVerification\n  registrationStatus {\n    internalID\n    id\n  }\n  slug\n  status\n}\n\nfragment SaleDetailTimer_sale on Sale {\n  endAt\n  endedAt\n  startAt\n}\n\nfragment ShelfArtwork_artwork on Artwork {\n  ...ExclusiveAccessBadge_artwork\n  ...Metadata_artwork\n  title\n  href\n  artistNames\n  isUnlisted\n  image {\n    src: url(version: [\"larger\", \"large\"])\n    width\n    height\n  }\n}\n"
  }
};
})();

(node as any).hash = "5ed522ee071e65c5430f5e51e5a54c06";

export default node;
