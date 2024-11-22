/**
 * @generated SignedSource<<ab7dcfcd11275f9e251f91137f5da1ca>>
 * @relayHash b9dfc52cb7de077506bad5551d2554da
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID b9dfc52cb7de077506bad5551d2554da

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkAppTestQuery$variables = Record<PropertyKey, never>;
export type ArtworkAppTestQuery$data = {
  readonly artworkResult: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkApp_artworkResult">;
  } | null | undefined;
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkApp_me">;
  } | null | undefined;
};
export type ArtworkAppTestQuery = {
  response: ArtworkAppTestQuery$data;
  variables: ArtworkAppTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "artwork-id"
  }
],
v1 = {
  "kind": "Literal",
  "name": "loadSidebar",
  "value": true
},
v2 = {
  "kind": "Literal",
  "name": "artworkID",
  "value": "artwork-id"
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
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
  "name": "major",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currencyCode",
  "storageKey": null
},
v7 = [
  (v5/*: any*/),
  (v6/*: any*/)
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v12 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "height",
        "value": 640
      },
      {
        "kind": "Literal",
        "name": "version",
        "value": [
          "large",
          "medium",
          "tall"
        ]
      },
      {
        "kind": "Literal",
        "name": "width",
        "value": 640
      }
    ],
    "concreteType": "ResizedImageUrl",
    "kind": "LinkedField",
    "name": "resized",
    "plural": false,
    "selections": [
      (v9/*: any*/),
      (v10/*: any*/),
      (v11/*: any*/)
    ],
    "storageKey": "resized(height:640,version:[\"large\",\"medium\",\"tall\"],width:640)"
  }
],
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v15 = [
  (v11/*: any*/)
],
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isInquireable",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "in",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cm",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isAcquireable",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isOfferable",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cents",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startAt",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "extendedBiddingIntervalMinutes",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endedAt",
  "storageKey": null
},
v29 = [
  (v8/*: any*/)
],
v30 = {
  "kind": "InlineFragment",
  "selections": [
    (v16/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v31 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v32 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v33 = {
  "kind": "Literal",
  "name": "format",
  "value": "HTML"
},
v34 = [
  {
    "kind": "Literal",
    "name": "includeAll",
    "value": false
  }
],
v35 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isDefault",
  "storageKey": null
},
v36 = {
  "kind": "Literal",
  "name": "height",
  "value": 800
},
v37 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
    "normalized",
    "larger",
    "large"
  ]
},
v38 = {
  "kind": "Literal",
  "name": "width",
  "value": 800
},
v39 = [
  (v36/*: any*/),
  {
    "kind": "Literal",
    "name": "quality",
    "value": 85
  },
  (v37/*: any*/),
  (v38/*: any*/)
],
v40 = [
  (v9/*: any*/),
  (v10/*: any*/),
  (v31/*: any*/),
  (v32/*: any*/)
],
v41 = {
  "alias": "type",
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v42 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "details",
  "storageKey": null
},
v43 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "label",
  "storageKey": null
},
v44 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "editionOf",
  "storageKey": null
},
v45 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "saleMessage",
  "storageKey": null
},
v46 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayText",
  "storageKey": null
},
v47 = [
  (v43/*: any*/),
  (v42/*: any*/)
],
v48 = [
  (v33/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtworkAppTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "artworkResult",
        "plural": false,
        "selections": [
          {
            "args": [
              (v1/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "ArtworkApp_artworkResult"
          }
        ],
        "storageKey": "artworkResult(id:\"artwork-id\")"
      },
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
              (v2/*: any*/),
              (v1/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "ArtworkApp_me"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtworkAppTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "artworkResult",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "kind": "TypeDiscriminator",
            "abstractKey": "__isArtworkResult"
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "date",
                "storageKey": null
              },
              {
                "alias": "is_price_hidden",
                "args": null,
                "kind": "ScalarField",
                "name": "isPriceHidden",
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
                  (v3/*: any*/),
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
                        "selections": (v7/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "maxPrice",
                        "plural": false,
                        "selections": (v7/*: any*/),
                        "storageKey": null
                      },
                      (v8/*: any*/)
                    ],
                    "type": "PriceRange",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v8/*: any*/)
                    ],
                    "type": "Money",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": "meta_image",
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "image",
                "plural": false,
                "selections": (v12/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtworkMeta",
                "kind": "LinkedField",
                "name": "meta",
                "plural": false,
                "selections": [
                  (v13/*: any*/),
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "limit",
                        "value": 155
                      }
                    ],
                    "kind": "ScalarField",
                    "name": "description",
                    "storageKey": "description(limit:155)"
                  },
                  {
                    "alias": "longDescription",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "limit",
                        "value": 200
                      }
                    ],
                    "kind": "ScalarField",
                    "name": "description",
                    "storageKey": "description(limit:200)"
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Partner",
                "kind": "LinkedField",
                "name": "partner",
                "plural": false,
                "selections": [
                  (v14/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "type",
                    "storageKey": null
                  },
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
                        "name": "image",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "height",
                                "value": 320
                              },
                              {
                                "kind": "Literal",
                                "name": "version",
                                "value": [
                                  "medium"
                                ]
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 320
                              }
                            ],
                            "concreteType": "ResizedImageUrl",
                            "kind": "LinkedField",
                            "name": "resized",
                            "plural": false,
                            "selections": (v15/*: any*/),
                            "storageKey": "resized(height:320,version:[\"medium\"],width:320)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v16/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "icon",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "version",
                                "value": "square140"
                              }
                            ],
                            "kind": "ScalarField",
                            "name": "url",
                            "storageKey": "url(version:\"square140\")"
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isPubliclyVisible",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cities",
                    "storageKey": null
                  },
                  (v18/*: any*/),
                  (v19/*: any*/),
                  (v3/*: any*/)
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "availability",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "category",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "dimensions",
                "kind": "LinkedField",
                "name": "dimensions",
                "plural": false,
                "selections": [
                  (v20/*: any*/),
                  (v21/*: any*/)
                ],
                "storageKey": null
              },
              (v22/*: any*/),
              (v18/*: any*/),
              (v23/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isInAuction",
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
                    "kind": "ScalarField",
                    "name": "currency",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SaleArtworkOpeningBid",
                    "kind": "LinkedField",
                    "name": "openingBid",
                    "plural": false,
                    "selections": [
                      (v24/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v16/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "estimate",
                    "storageKey": null
                  },
                  (v25/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "formattedStartDateTime",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "extendedBiddingEndAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "lotID",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Sale",
                    "kind": "LinkedField",
                    "name": "sale",
                    "plural": false,
                    "selections": [
                      (v26/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "extendedBiddingPeriodMinutes",
                        "storageKey": null
                      },
                      (v27/*: any*/),
                      (v19/*: any*/),
                      (v16/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v28/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SaleArtworkCurrentBid",
                    "kind": "LinkedField",
                    "name": "currentBid",
                    "plural": false,
                    "selections": (v29/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "lotLabel",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v19/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isShareable",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isUnlisted",
                "storageKey": null
              },
              {
                "alias": "metaImage",
                "args": null,
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "image",
                "plural": false,
                "selections": (v12/*: any*/),
                "storageKey": null
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
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isAuction",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isBenefit",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isGalleryAuction",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Image",
                    "kind": "LinkedField",
                    "name": "coverImage",
                    "plural": false,
                    "selections": (v15/*: any*/),
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
                    "name": "isRegistrationClosed",
                    "storageKey": null
                  },
                  (v16/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isClosed",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isLiveOpen",
                    "storageKey": null
                  },
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
                    "concreteType": "Bidder",
                    "kind": "LinkedField",
                    "name": "registrationStatus",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "qualifiedForBidding",
                        "storageKey": null
                      },
                      (v16/*: any*/),
                      {
                        "alias": "qualified_for_bidding",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "qualifiedForBidding",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v17/*: any*/),
                  (v14/*: any*/),
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cascadingEndTimeIntervalMinutes",
                    "storageKey": null
                  },
                  (v25/*: any*/),
                  (v26/*: any*/),
                  {
                    "alias": "is_closed",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isClosed",
                    "storageKey": null
                  },
                  {
                    "alias": "is_live_open",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isLiveOpen",
                    "storageKey": null
                  },
                  (v19/*: any*/),
                  {
                    "alias": "is_with_buyers_premium",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isWithBuyersPremium",
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
                    "alias": "is_open",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isOpen",
                    "storageKey": null
                  },
                  {
                    "alias": "is_registration_closed",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isRegistrationClosed",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "requireIdentityVerification",
                    "storageKey": null
                  },
                  (v3/*: any*/),
                  (v27/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "context",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v14/*: any*/),
                      (v4/*: any*/)
                    ],
                    "type": "Sale",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v14/*: any*/),
                      (v4/*: any*/),
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
                            "selections": (v15/*: any*/),
                            "storageKey": null
                          },
                          (v16/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "type": "Fair",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v14/*: any*/),
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "status",
                        "storageKey": null
                      },
                      {
                        "alias": "thumbnail",
                        "args": null,
                        "concreteType": "Image",
                        "kind": "LinkedField",
                        "name": "coverImage",
                        "plural": false,
                        "selections": (v15/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "type": "Show",
                    "abstractKey": null
                  },
                  (v30/*: any*/)
                ],
                "storageKey": null
              },
              (v16/*: any*/),
              (v17/*: any*/),
              (v13/*: any*/),
              {
                "alias": "preview",
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
                        "name": "version",
                        "value": "square"
                      }
                    ],
                    "kind": "ScalarField",
                    "name": "url",
                    "storageKey": "url(version:\"square\")"
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isSavedToAnyList",
                "storageKey": null
              },
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
                    "concreteType": "AuctionCollectorSignals",
                    "kind": "LinkedField",
                    "name": "auction",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "lotWatcherCount",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "bidCount",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "ignore",
                        "value": [
                          "PARTNER_OFFER"
                        ]
                      }
                    ],
                    "kind": "ScalarField",
                    "name": "primaryLabel",
                    "storageKey": "primaryLabel(ignore:[\"PARTNER_OFFER\"])"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Show",
                    "kind": "LinkedField",
                    "name": "runningShow",
                    "plural": false,
                    "selections": [
                      (v14/*: any*/),
                      (v4/*: any*/),
                      (v26/*: any*/),
                      (v25/*: any*/),
                      (v16/*: any*/)
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
                "name": "downloadableImageUrl",
                "storageKey": null
              },
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "shallow",
                    "value": true
                  }
                ],
                "concreteType": "Artist",
                "kind": "LinkedField",
                "name": "artists",
                "plural": true,
                "selections": [
                  (v14/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v19/*: any*/),
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
                      },
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
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "initials",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "formattedNationalityAndBirthday",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "coverArtwork",
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
                                "name": "height",
                                "value": 145
                              },
                              {
                                "kind": "Literal",
                                "name": "width",
                                "value": 145
                              }
                            ],
                            "concreteType": "CroppedImageUrl",
                            "kind": "LinkedField",
                            "name": "cropped",
                            "plural": false,
                            "selections": [
                              (v31/*: any*/),
                              (v32/*: any*/)
                            ],
                            "storageKey": "cropped(height:145,width:145)"
                          }
                        ],
                        "storageKey": null
                      },
                      (v16/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": [
                      (v33/*: any*/),
                      {
                        "kind": "Literal",
                        "name": "partnerBio",
                        "value": false
                      }
                    ],
                    "concreteType": "ArtistBlurb",
                    "kind": "LinkedField",
                    "name": "biographyBlurb",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "text",
                        "storageKey": null
                      }
                    ],
                    "storageKey": "biographyBlurb(format:\"HTML\",partnerBio:false)"
                  }
                ],
                "storageKey": "artists(shallow:true)"
              },
              {
                "alias": null,
                "args": (v34/*: any*/),
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "images",
                "plural": true,
                "selections": [
                  (v11/*: any*/),
                  (v19/*: any*/),
                  (v35/*: any*/),
                  {
                    "alias": "placeholder",
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "version",
                        "value": [
                          "small",
                          "medium"
                        ]
                      }
                    ],
                    "kind": "ScalarField",
                    "name": "url",
                    "storageKey": "url(version:[\"small\",\"medium\"])"
                  },
                  {
                    "alias": "fallback",
                    "args": (v39/*: any*/),
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": (v40/*: any*/),
                    "storageKey": "cropped(height:800,quality:85,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:800)"
                  },
                  {
                    "alias": null,
                    "args": (v39/*: any*/),
                    "concreteType": "ResizedImageUrl",
                    "kind": "LinkedField",
                    "name": "resized",
                    "plural": false,
                    "selections": (v40/*: any*/),
                    "storageKey": "resized(height:800,quality:85,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:800)"
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "versions",
                    "storageKey": null
                  }
                ],
                "storageKey": "images(includeAll:false)"
              },
              {
                "alias": "artworkMeta",
                "args": null,
                "concreteType": "ArtworkMeta",
                "kind": "LinkedField",
                "name": "meta",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "share",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "widthCm",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "heightCm",
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
                      (v36/*: any*/),
                      (v37/*: any*/),
                      (v38/*: any*/)
                    ],
                    "concreteType": "ResizedImageUrl",
                    "kind": "LinkedField",
                    "name": "resized",
                    "plural": false,
                    "selections": [
                      (v31/*: any*/),
                      (v32/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/)
                    ],
                    "storageKey": "resized(height:800,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:800)"
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isDownloadable",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isHangable",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "formattedMetadata",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v34/*: any*/),
                "concreteType": null,
                "kind": "LinkedField",
                "name": "figures",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "playerUrl",
                        "storageKey": null
                      },
                      {
                        "alias": "videoWidth",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "width",
                        "storageKey": null
                      },
                      {
                        "alias": "videoHeight",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "height",
                        "storageKey": null
                      },
                      (v16/*: any*/),
                      (v41/*: any*/)
                    ],
                    "type": "Video",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "DeepZoom",
                        "kind": "LinkedField",
                        "name": "deepZoom",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "DeepZoomImage",
                            "kind": "LinkedField",
                            "name": "Image",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "xmlns",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "Url",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "Format",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "TileSize",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "Overlap",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "DeepZoomImageSize",
                                "kind": "LinkedField",
                                "name": "Size",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "Width",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "Height",
                                    "storageKey": null
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
                      (v19/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isZoomable",
                        "storageKey": null
                      },
                      (v41/*: any*/),
                      (v35/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/)
                    ],
                    "type": "Image",
                    "abstractKey": null
                  }
                ],
                "storageKey": "figures(includeAll:false)"
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isSetVideoAsCover",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "culturalMaker",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "medium",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtworkInfoRow",
                "kind": "LinkedField",
                "name": "framed",
                "plural": false,
                "selections": [
                  (v42/*: any*/),
                  (v43/*: any*/)
                ],
                "storageKey": null
              },
              (v44/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isEdition",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "EditionSet",
                "kind": "LinkedField",
                "name": "editionSets",
                "plural": true,
                "selections": [
                  (v19/*: any*/),
                  (v16/*: any*/),
                  (v23/*: any*/),
                  (v22/*: any*/),
                  (v45/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "dimensions",
                    "kind": "LinkedField",
                    "name": "dimensions",
                    "plural": false,
                    "selections": [
                      (v21/*: any*/),
                      (v20/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v44/*: any*/)
                    ],
                    "type": "Sellable",
                    "abstractKey": "__isSellable"
                  }
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
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "shortArrayDescription",
                    "storageKey": null
                  },
                  (v16/*: any*/),
                  (v19/*: any*/),
                  (v14/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasCertificateOfAuthenticity",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isBiddable",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isEligibleToCreateAlert",
                "storageKey": null
              },
              (v45/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isSold",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "priceListedDisplay",
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
                    "selections": [
                      (v17/*: any*/),
                      (v16/*: any*/),
                      (v14/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v3/*: any*/),
                  (v14/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "longDescription",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "priceIncludesTaxDisplay",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "shippingOrigin",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "shippingInfo",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "TaxInfo",
                "kind": "LinkedField",
                "name": "taxInfo",
                "plural": false,
                "selections": [
                  (v46/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "TaxMoreInfo",
                    "kind": "LinkedField",
                    "name": "moreInfo",
                    "plural": false,
                    "selections": [
                      (v46/*: any*/),
                      (v11/*: any*/)
                    ],
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
                    "alias": "is_with_reserve",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isWithReserve",
                    "storageKey": null
                  },
                  {
                    "alias": "reserve_message",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "reserveMessage",
                    "storageKey": null
                  },
                  {
                    "alias": "reserve_status",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "reserveStatus",
                    "storageKey": null
                  },
                  (v28/*: any*/),
                  {
                    "alias": "current_bid",
                    "args": null,
                    "concreteType": "SaleArtworkCurrentBid",
                    "kind": "LinkedField",
                    "name": "currentBid",
                    "plural": false,
                    "selections": (v29/*: any*/),
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
                  (v16/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "BidIncrementsFormatted",
                    "kind": "LinkedField",
                    "name": "increments",
                    "plural": true,
                    "selections": [
                      (v24/*: any*/),
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "live",
                    "value": true
                  }
                ],
                "concreteType": "LotStanding",
                "kind": "LinkedField",
                "name": "myLotStanding",
                "plural": true,
                "selections": [
                  {
                    "alias": "active_bid",
                    "args": null,
                    "concreteType": "BidderPosition",
                    "kind": "LinkedField",
                    "name": "activeBid",
                    "plural": false,
                    "selections": [
                      {
                        "alias": "is_winning",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isWinning",
                        "storageKey": null
                      },
                      (v16/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": "most_recent_bid",
                    "args": null,
                    "concreteType": "BidderPosition",
                    "kind": "LinkedField",
                    "name": "mostRecentBid",
                    "plural": false,
                    "selections": [
                      {
                        "alias": "max_bid",
                        "args": null,
                        "concreteType": "BidderPositionMaxBid",
                        "kind": "LinkedField",
                        "name": "maxBid",
                        "plural": false,
                        "selections": [
                          (v8/*: any*/),
                          (v24/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v16/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "myLotStanding(live:true)"
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "additionalInformation",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "series",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "publisher",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "manufacturer",
                "storageKey": null
              },
              {
                "alias": "image_rights",
                "args": null,
                "kind": "ScalarField",
                "name": "imageRights",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "canRequestLotConditionsReport",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtworkInfoRow",
                "kind": "LinkedField",
                "name": "signatureInfo",
                "plural": false,
                "selections": (v47/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtworkInfoRow",
                "kind": "LinkedField",
                "name": "conditionDescription",
                "plural": false,
                "selections": (v47/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtworkInfoRow",
                "kind": "LinkedField",
                "name": "certificateOfAuthenticity",
                "plural": false,
                "selections": (v47/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isEligibleForArtsyGuarantee",
                "storageKey": null
              },
              {
                "alias": "myLotStandingManageAlerts",
                "args": null,
                "concreteType": "LotStanding",
                "kind": "LinkedField",
                "name": "myLotStanding",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isHighestBidder",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": "additionalInformationHTML",
                "args": (v48/*: any*/),
                "kind": "ScalarField",
                "name": "additionalInformation",
                "storageKey": "additionalInformation(format:\"HTML\")"
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "displayArtistBio",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v48/*: any*/),
                "kind": "ScalarField",
                "name": "provenance",
                "storageKey": "provenance(format:\"HTML\")"
              },
              {
                "alias": null,
                "args": (v48/*: any*/),
                "kind": "ScalarField",
                "name": "exhibitionHistory",
                "storageKey": "exhibitionHistory(format:\"HTML\")"
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "published",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "visibilityLevel",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isPurchasable",
                "storageKey": null
              }
            ],
            "type": "Artwork",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PartialArtwork",
                "kind": "LinkedField",
                "name": "artwork",
                "plural": false,
                "selections": [
                  (v17/*: any*/),
                  (v16/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "RequestError",
                "kind": "LinkedField",
                "name": "requestError",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "statusCode",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "ArtworkError",
            "abstractKey": null
          },
          (v30/*: any*/)
        ],
        "storageKey": "artworkResult(id:\"artwork-id\")"
      },
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
            "kind": "ScalarField",
            "name": "isIdentityVerified",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "IdentityVerification",
            "kind": "LinkedField",
            "name": "pendingIdentityVerification",
            "plural": false,
            "selections": [
              (v19/*: any*/),
              (v16/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              (v2/*: any*/),
              {
                "kind": "Literal",
                "name": "first",
                "value": 1
              }
            ],
            "concreteType": "PartnerOfferToCollectorConnection",
            "kind": "LinkedField",
            "name": "partnerOffersConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PartnerOfferToCollectorEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PartnerOfferToCollector",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v25/*: any*/),
                      (v19/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isAvailable",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "note",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "priceWithDiscount",
                        "plural": false,
                        "selections": (v29/*: any*/),
                        "storageKey": null
                      },
                      (v16/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isActive",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "partnerOffersConnection(artworkID:\"artwork-id\",first:1)"
          },
          (v16/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "b9dfc52cb7de077506bad5551d2554da",
    "metadata": {},
    "name": "ArtworkAppTestQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "db6988bd80b1ff7094e0d0a8497e2dd9";

export default node;
