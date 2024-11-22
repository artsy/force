/**
 * @generated SignedSource<<333d15f124056ae16c489516904cab1c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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
v31 = [
  {
    "kind": "Literal",
    "name": "includeAll",
    "value": false
  }
],
v32 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isDefault",
  "storageKey": null
},
v33 = {
  "kind": "Literal",
  "name": "height",
  "value": 800
},
v34 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
    "normalized",
    "larger",
    "large"
  ]
},
v35 = {
  "kind": "Literal",
  "name": "width",
  "value": 800
},
v36 = [
  (v33/*: any*/),
  {
    "kind": "Literal",
    "name": "quality",
    "value": 85
  },
  (v34/*: any*/),
  (v35/*: any*/)
],
v37 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v38 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v39 = [
  (v9/*: any*/),
  (v10/*: any*/),
  (v37/*: any*/),
  (v38/*: any*/)
],
v40 = {
  "alias": "type",
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v41 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "details",
  "storageKey": null
},
v42 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "label",
  "storageKey": null
},
v43 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "editionOf",
  "storageKey": null
},
v44 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "saleMessage",
  "storageKey": null
},
v45 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayText",
  "storageKey": null
},
v46 = [
  (v42/*: any*/),
  (v41/*: any*/)
],
v47 = {
  "kind": "Literal",
  "name": "format",
  "value": "HTML"
},
v48 = [
  (v47/*: any*/)
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
                  (v19/*: any*/)
                ],
                "storageKey": "artists(shallow:true)"
              },
              {
                "alias": null,
                "args": (v31/*: any*/),
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "images",
                "plural": true,
                "selections": [
                  (v11/*: any*/),
                  (v19/*: any*/),
                  (v32/*: any*/),
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
                    "args": (v36/*: any*/),
                    "concreteType": "CroppedImageUrl",
                    "kind": "LinkedField",
                    "name": "cropped",
                    "plural": false,
                    "selections": (v39/*: any*/),
                    "storageKey": "cropped(height:800,quality:85,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:800)"
                  },
                  {
                    "alias": null,
                    "args": (v36/*: any*/),
                    "concreteType": "ResizedImageUrl",
                    "kind": "LinkedField",
                    "name": "resized",
                    "plural": false,
                    "selections": (v39/*: any*/),
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
                      (v33/*: any*/),
                      (v34/*: any*/),
                      (v35/*: any*/)
                    ],
                    "concreteType": "ResizedImageUrl",
                    "kind": "LinkedField",
                    "name": "resized",
                    "plural": false,
                    "selections": [
                      (v37/*: any*/),
                      (v38/*: any*/),
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
                "args": (v31/*: any*/),
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
                      (v40/*: any*/)
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
                      (v40/*: any*/),
                      (v32/*: any*/),
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
                  (v41/*: any*/),
                  (v42/*: any*/)
                ],
                "storageKey": null
              },
              (v43/*: any*/),
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
                  (v44/*: any*/),
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
                      (v43/*: any*/)
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
              (v44/*: any*/),
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
                  (v45/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "TaxMoreInfo",
                    "kind": "LinkedField",
                    "name": "moreInfo",
                    "plural": false,
                    "selections": [
                      (v45/*: any*/),
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
                "selections": (v46/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtworkInfoRow",
                "kind": "LinkedField",
                "name": "conditionDescription",
                "plural": false,
                "selections": (v46/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtworkInfoRow",
                "kind": "LinkedField",
                "name": "certificateOfAuthenticity",
                "plural": false,
                "selections": (v46/*: any*/),
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
                "alias": "privateArtists",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "shallow",
                    "value": false
                  }
                ],
                "concreteType": "Artist",
                "kind": "LinkedField",
                "name": "artists",
                "plural": true,
                "selections": [
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v14/*: any*/),
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
                              (v37/*: any*/),
                              (v38/*: any*/)
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
                      (v47/*: any*/),
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
                "storageKey": "artists(shallow:false)"
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
    "cacheID": "1429d65b75106bfaf972f036be1268bf",
    "id": null,
    "metadata": {},
    "name": "ArtworkAppTestQuery",
    "operationKind": "query",
    "text": "query ArtworkAppTestQuery {\n  artworkResult(id: \"artwork-id\") {\n    __typename\n    ...ArtworkApp_artworkResult_3eglH\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  me {\n    ...ArtworkApp_me_1liwfq\n    id\n  }\n}\n\nfragment ArtworkActionsSaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  title\n  date\n  artistNames\n  preview: image {\n    url(version: \"square\")\n  }\n  isInAuction\n  isSavedToAnyList\n  sale {\n    isAuction\n    isClosed\n    id\n  }\n  collectorSignals {\n    auction {\n      lotWatcherCount\n    }\n  }\n  ...ArtworkActionsWatchLotButton_artwork\n}\n\nfragment ArtworkActionsWatchLotButton_artwork on Artwork {\n  sale {\n    isLiveOpen\n    isRegistrationClosed\n    liveStartAt\n    registrationStatus {\n      qualifiedForBidding\n      id\n    }\n    id\n  }\n  ...ArtworkAuctionRegistrationPanel_artwork\n}\n\nfragment ArtworkActions_artwork_FOvjt on Artwork {\n  ...ArtworkActionsSaveButton_artwork\n  ...ArtworkDownloadButton_artwork\n  ...ArtworkSharePanel_artwork_FOvjt\n  ...ViewInRoom_artwork\n  isUnlisted\n  slug\n  downloadableImageUrl\n  isDownloadable\n  isHangable\n  partner {\n    slug\n    id\n  }\n}\n\nfragment ArtworkApp_artworkResult_3eglH on ArtworkResult {\n  __isArtworkResult: __typename\n  __typename\n  ...ArtworkApp_artwork_3eglH\n  ...ArtworkErrorApp_artworkError\n}\n\nfragment ArtworkApp_artwork_3eglH on Artwork {\n  ...ArtworkMeta_artwork\n  ...ArtworkTopContextBar_artwork\n  ...ArtworkImageBrowser_artwork\n  ...ArtworkSidebar_artwork\n  ...ArtworkAuctionCreateAlertHeader_artwork\n  ...PrivateArtworkDetails_artwork\n  ...ArtworkPageBanner_artwork\n  attributionClass {\n    internalID\n    id\n  }\n  slug\n  internalID\n  isAcquireable\n  isOfferable\n  published\n  availability\n  mediumType {\n    filterGene {\n      slug\n      id\n    }\n  }\n  visibilityLevel\n  isUnlisted\n  listPrice {\n    __typename\n    ... on PriceRange {\n      display\n    }\n    ... on Money {\n      display\n    }\n  }\n  partner {\n    __typename\n    id\n  }\n  isInAuction\n  sale {\n    internalID\n    slug\n    extendedBiddingIntervalMinutes\n    id\n  }\n  saleMessage\n  artists(shallow: true) {\n    id\n    internalID\n    slug\n  }\n}\n\nfragment ArtworkApp_me_1liwfq on Me {\n  ...ArtworkSidebar_me_39o6UP\n  ...ArtworkPageBanner_me_39o6UP\n}\n\nfragment ArtworkAuctionCreateAlertHeader_artwork on Artwork {\n  slug\n  internalID\n  title\n  isEligibleToCreateAlert\n  isInAuction\n  artistNames\n  artists(shallow: true) {\n    internalID\n    name\n    slug\n    id\n  }\n  sale {\n    startAt\n    isClosed\n    id\n  }\n  saleArtwork {\n    extendedBiddingEndAt\n    endAt\n    endedAt\n    id\n  }\n  attributionClass {\n    internalID\n    id\n  }\n  mediumType {\n    filterGene {\n      slug\n      name\n      id\n    }\n  }\n  myLotStandingManageAlerts: myLotStanding {\n    isHighestBidder\n  }\n}\n\nfragment ArtworkAuctionRegistrationPanel_artwork on Artwork {\n  sale {\n    slug\n    registrationEndsAt\n    isRegistrationClosed\n    id\n  }\n}\n\nfragment ArtworkChatBubble_artwork on Artwork {\n  isAcquireable\n  isInquireable\n  isOfferable\n  isInAuction\n  listPrice {\n    __typename\n    ... on Money {\n      currencyCode\n      major\n    }\n    ... on PriceRange {\n      maxPrice {\n        currencyCode\n        major\n      }\n    }\n  }\n  saleArtwork {\n    currency\n    openingBid {\n      cents\n    }\n    id\n  }\n}\n\nfragment ArtworkDetailsAdditionalInfo_artwork on Artwork {\n  category\n  series\n  publisher\n  manufacturer\n  image_rights: imageRights\n  canRequestLotConditionsReport\n  internalID\n  isUnlisted\n  framed {\n    label\n    details\n  }\n  signatureInfo {\n    label\n    details\n  }\n  conditionDescription {\n    label\n    details\n  }\n  certificateOfAuthenticity {\n    label\n    details\n  }\n  mediumType {\n    __typename\n  }\n  dimensions {\n    in\n    cm\n  }\n  attributionClass {\n    name\n    id\n  }\n  medium\n  ...ArtworkDetailsMediumModal_artwork\n}\n\nfragment ArtworkDetailsMediumModal_artwork on Artwork {\n  mediumType {\n    name\n    longDescription\n  }\n}\n\nfragment ArtworkDownloadButton_artwork on Artwork {\n  title\n  date\n  downloadableImageUrl\n  artists(shallow: true) {\n    name\n    id\n  }\n}\n\nfragment ArtworkErrorApp_artworkError on ArtworkError {\n  artwork {\n    slug\n    id\n  }\n  requestError {\n    statusCode\n  }\n}\n\nfragment ArtworkImageBrowserLarge_artwork_FOvjt on Artwork {\n  ...ArtworkLightbox_artwork_FOvjt\n  ...ArtworkVideoPlayer_artwork_FOvjt\n  isSetVideoAsCover\n  figures(includeAll: false) {\n    __typename\n    ... on Image {\n      ...DeepZoom_image\n      __typename\n      internalID\n      isZoomable\n    }\n    ... on Video {\n      __typename\n      id\n    }\n  }\n}\n\nfragment ArtworkImageBrowserSmall_artwork_FOvjt on Artwork {\n  ...ArtworkLightbox_artwork_FOvjt\n  ...ArtworkVideoPlayer_artwork_FOvjt\n  isSetVideoAsCover\n  figures(includeAll: false) {\n    __typename\n    ... on Image {\n      ...DeepZoom_image\n      internalID\n      isZoomable\n      type: __typename\n    }\n    ... on Video {\n      type: __typename\n      id\n    }\n  }\n}\n\nfragment ArtworkImageBrowser_artwork on Artwork {\n  ...ArtworkActions_artwork_FOvjt\n  ...ArtworkImageBrowserSmall_artwork_FOvjt\n  ...ArtworkImageBrowserLarge_artwork_FOvjt\n  internalID\n  figures(includeAll: false) {\n    __typename\n    ... on Image {\n      isDefault\n      width\n      height\n    }\n    ... on Video {\n      videoWidth: width\n      videoHeight: height\n      id\n    }\n  }\n}\n\nfragment ArtworkLightbox_artwork_FOvjt on Artwork {\n  formattedMetadata\n  images(includeAll: false) {\n    internalID\n    isDefault\n    placeholder: url(version: [\"small\", \"medium\"])\n    fallback: cropped(quality: 85, width: 800, height: 800, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      width\n      height\n      src\n      srcSet\n    }\n    resized(quality: 85, width: 800, height: 800, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      width\n      height\n      src\n      srcSet\n    }\n    versions\n  }\n}\n\nfragment ArtworkMeta_artwork on Artwork {\n  ...SeoDataForArtwork_artwork\n  ...ArtworkChatBubble_artwork\n  href\n  internalID\n  isShareable\n  isUnlisted\n  metaImage: image {\n    resized(width: 640, height: 640, version: [\"large\", \"medium\", \"tall\"]) {\n      width\n      height\n      url\n    }\n  }\n  meta {\n    title\n    description(limit: 155)\n    longDescription: description(limit: 200)\n  }\n}\n\nfragment ArtworkPageBanner_artwork on Artwork {\n  published\n  visibilityLevel\n  isPurchasable\n  sale {\n    __typename\n    ...CascadingEndTimesBanner_sale\n    id\n  }\n}\n\nfragment ArtworkPageBanner_me_39o6UP on Me {\n  partnerOffersConnection(artworkID: \"artwork-id\", first: 1) {\n    edges {\n      node {\n        internalID\n        isActive\n        id\n      }\n    }\n  }\n}\n\nfragment ArtworkSharePanel_artwork_FOvjt on Artwork {\n  href\n  images(includeAll: false) {\n    url\n  }\n  artworkMeta: meta {\n    share\n  }\n}\n\nfragment ArtworkSidebarArtists_artwork on Artwork {\n  culturalMaker\n  artists(shallow: true) {\n    slug\n    name\n    id\n  }\n}\n\nfragment ArtworkSidebarArtsyGuarantee_artwork on Artwork {\n  isUnlisted\n}\n\nfragment ArtworkSidebarArtworkTitle_artwork on Artwork {\n  date\n  title\n}\n\nfragment ArtworkSidebarAuctionInfoPolling_artwork on Artwork {\n  internalID\n  sale {\n    isClosed\n    id\n  }\n  saleArtwork {\n    currentBid {\n      display\n    }\n    id\n  }\n  ...ArtworkSidebarCurrentBidInfo_artwork\n  ...ArtworkSidebarBidAction_artwork\n}\n\nfragment ArtworkSidebarAuctionInfoPolling_me on Me {\n  ...ArtworkSidebarBidAction_me\n}\n\nfragment ArtworkSidebarAuctionTimer_artwork on Artwork {\n  internalID\n  sale {\n    cascadingEndTimeIntervalMinutes\n    isClosed\n    ...AuctionTimer_sale\n    startAt\n    id\n  }\n  saleArtwork {\n    ...LotTimer_saleArtwork\n    endAt\n    endedAt\n    id\n  }\n}\n\nfragment ArtworkSidebarAuthenticityCertificate_artwork on Artwork {\n  hasCertificateOfAuthenticity\n  isBiddable\n}\n\nfragment ArtworkSidebarBidAction_artwork on Artwork {\n  myLotStanding(live: true) {\n    most_recent_bid: mostRecentBid {\n      max_bid: maxBid {\n        cents\n      }\n      id\n    }\n  }\n  slug\n  internalID\n  sale {\n    slug\n    registrationStatus {\n      qualified_for_bidding: qualifiedForBidding\n      id\n    }\n    is_preview: isPreview\n    is_open: isOpen\n    is_live_open: isLiveOpen\n    is_closed: isClosed\n    is_registration_closed: isRegistrationClosed\n    requireIdentityVerification\n    id\n  }\n  sale_artwork: saleArtwork {\n    increments {\n      cents\n      display\n    }\n    endedAt\n    id\n  }\n  collectorSignals {\n    auction {\n      bidCount\n      lotWatcherCount\n    }\n  }\n}\n\nfragment ArtworkSidebarBidAction_me on Me {\n  isIdentityVerified\n  pendingIdentityVerification {\n    internalID\n    id\n  }\n}\n\nfragment ArtworkSidebarBiddingClosedMessage_artwork on Artwork {\n  isEligibleToCreateAlert\n  artists(shallow: true) {\n    internalID\n    id\n  }\n  attributionClass {\n    internalID\n    id\n  }\n  mediumType {\n    filterGene {\n      slug\n      id\n    }\n  }\n}\n\nfragment ArtworkSidebarClassification_artwork on Artwork {\n  attributionClass {\n    shortArrayDescription\n    id\n  }\n}\n\nfragment ArtworkSidebarCollectorSignal_artwork on Artwork {\n  collectorSignals {\n    primaryLabel(ignore: [PARTNER_OFFER])\n    runningShow {\n      name\n      href\n      startAt\n      endAt\n      id\n    }\n  }\n}\n\nfragment ArtworkSidebarCommercialButtons_artwork on Artwork {\n  ...ArtworkSidebarEditionSets_artwork\n  isEligibleToCreateAlert\n  artists(shallow: true) {\n    internalID\n    id\n  }\n  attributionClass {\n    internalID\n    id\n  }\n  internalID\n  slug\n  saleMessage\n  isInquireable\n  isAcquireable\n  isOfferable\n  isSold\n  priceListedDisplay\n  listPrice {\n    __typename\n    ... on PriceRange {\n      display\n    }\n    ... on Money {\n      display\n    }\n  }\n  mediumType {\n    filterGene {\n      slug\n      id\n    }\n  }\n  editionSets {\n    id\n    internalID\n    isAcquireable\n    isOfferable\n    saleMessage\n    dimensions {\n      in\n      cm\n    }\n  }\n  partner {\n    profile {\n      icon {\n        url(version: \"square140\")\n      }\n      id\n    }\n    id\n  }\n  collectorSignals {\n    primaryLabel(ignore: [PARTNER_OFFER])\n  }\n}\n\nfragment ArtworkSidebarCommercialButtons_me_39o6UP on Me {\n  partnerOffersConnection(artworkID: \"artwork-id\", first: 1) {\n    edges {\n      node {\n        endAt\n        internalID\n        isAvailable\n        note\n        priceWithDiscount {\n          display\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment ArtworkSidebarCreateAlert_artwork on Artwork {\n  isEligibleToCreateAlert\n}\n\nfragment ArtworkSidebarCurrentBidInfo_artwork on Artwork {\n  sale {\n    is_closed: isClosed\n    is_live_open: isLiveOpen\n    internalID\n    is_with_buyers_premium: isWithBuyersPremium\n    id\n  }\n  sale_artwork: saleArtwork {\n    is_with_reserve: isWithReserve\n    reserve_message: reserveMessage\n    reserve_status: reserveStatus\n    endedAt\n    current_bid: currentBid {\n      display\n    }\n    counts {\n      bidder_positions: bidderPositions\n    }\n    id\n  }\n  myLotStanding(live: true) {\n    active_bid: activeBid {\n      is_winning: isWinning\n      id\n    }\n    most_recent_bid: mostRecentBid {\n      max_bid: maxBid {\n        display\n      }\n      id\n    }\n  }\n  collectorSignals {\n    auction {\n      lotWatcherCount\n    }\n  }\n  ...ArtworkSidebarBiddingClosedMessage_artwork\n}\n\nfragment ArtworkSidebarDetails_artwork on Artwork {\n  isUnlisted\n  medium\n  dimensions {\n    in\n    cm\n  }\n  framed {\n    details\n  }\n  editionOf\n  isEdition\n  editionSets {\n    internalID\n    id\n  }\n  ...ArtworkSidebarClassification_artwork\n  ...ArtworkSidebarAuthenticityCertificate_artwork\n  ...ArtworkSidebarCollectorSignal_artwork\n}\n\nfragment ArtworkSidebarEditionSets_artwork on Artwork {\n  isInquireable\n  isOfferable\n  isAcquireable\n  editionSets {\n    id\n    internalID\n    isOfferable\n    isAcquireable\n    saleMessage\n    dimensions {\n      cm\n      in\n    }\n    ...ArtworkSidebarSizeInfo_piece\n  }\n}\n\nfragment ArtworkSidebarEstimatedValue_artwork on Artwork {\n  saleArtwork {\n    estimate\n    id\n  }\n  sale {\n    isClosed\n    id\n  }\n}\n\nfragment ArtworkSidebarLinks_artwork on Artwork {\n  isInAuction\n  isUnlisted\n  sale {\n    isClosed\n    id\n  }\n}\n\nfragment ArtworkSidebarPartnerInfo_artwork on Artwork {\n  internalID\n  slug\n  isInquireable\n  isUnlisted\n  partner {\n    name\n    href\n    cities\n    isInquireable\n    id\n  }\n  sale {\n    name\n    href\n    id\n  }\n  collectorSignals {\n    primaryLabel(ignore: [PARTNER_OFFER])\n  }\n}\n\nfragment ArtworkSidebarPrivateArtwork_artwork on Artwork {\n  partner {\n    name\n    slug\n    profile {\n      isPubliclyVisible\n      id\n    }\n    id\n  }\n  isUnlisted\n  additionalInformation\n}\n\nfragment ArtworkSidebarShippingInformation_artwork on Artwork {\n  isUnlisted\n  priceIncludesTaxDisplay\n  shippingOrigin\n  shippingInfo\n  taxInfo {\n    displayText\n    moreInfo {\n      displayText\n      url\n    }\n  }\n}\n\nfragment ArtworkSidebarSizeInfo_piece on Sellable {\n  __isSellable: __typename\n  dimensions {\n    in\n    cm\n  }\n  editionOf\n}\n\nfragment ArtworkSidebar_artwork on Artwork {\n  ...ArtworkSidebarArtworkTitle_artwork\n  ...ArtworkSidebarArtists_artwork\n  ...ArtworkSidebarDetails_artwork\n  ...ArtworkSidebarCommercialButtons_artwork\n  ...ArtworkSidebarShippingInformation_artwork\n  ...ArtworkSidebarPartnerInfo_artwork\n  ...ArtworkSidebarCreateAlert_artwork\n  ...ArtworkSidebarLinks_artwork\n  ...ArtworkSidebarEstimatedValue_artwork\n  ...ArtworkSidebarBiddingClosedMessage_artwork\n  ...ArtworkSidebarAuctionTimer_artwork\n  ...ArtworkSidebarAuctionInfoPolling_artwork\n  ...ArtworkSidebarPrivateArtwork_artwork\n  ...ArtworkSidebarArtsyGuarantee_artwork\n  ...PrivateArtworkAdditionalInfo_artwork\n  slug\n  isSold\n  isAcquireable\n  isOfferable\n  isInAuction\n  saleMessage\n  isBiddable\n  isEligibleForArtsyGuarantee\n  isEligibleToCreateAlert\n  partner {\n    internalID\n    id\n  }\n  sale {\n    endAt\n    startAt\n    isClosed\n    isAuction\n    id\n  }\n  saleArtwork {\n    lotID\n    lotLabel\n    extendedBiddingEndAt\n    endAt\n    endedAt\n    id\n  }\n  artists(shallow: true) {\n    internalID\n    id\n  }\n  isUnlisted\n}\n\nfragment ArtworkSidebar_me_39o6UP on Me {\n  ...ArtworkSidebarAuctionInfoPolling_me\n  ...ArtworkSidebarCommercialButtons_me_39o6UP\n}\n\nfragment ArtworkTopContextBar_artwork on Artwork {\n  partner {\n    name\n    id\n  }\n  sale {\n    isAuction\n    isBenefit\n    isGalleryAuction\n    coverImage {\n      url\n    }\n    ...RegistrationAuctionTimer_sale\n    id\n  }\n  context {\n    __typename\n    ... on Sale {\n      name\n      href\n    }\n    ... on Fair {\n      name\n      href\n      profile {\n        icon {\n          url\n        }\n        id\n      }\n    }\n    ... on Show {\n      name\n      href\n      status\n      thumbnail: coverImage {\n        url\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment ArtworkVideoPlayer_artwork_FOvjt on Artwork {\n  internalID\n  slug\n  figures(includeAll: false) {\n    __typename\n    ... on Video {\n      __typename\n      playerUrl\n      videoWidth: width\n      videoHeight: height\n      id\n    }\n  }\n}\n\nfragment AuctionTimer_sale on Sale {\n  liveStartAt\n  endAt\n}\n\nfragment CascadingEndTimesBanner_sale on Sale {\n  isClosed\n  cascadingEndTimeIntervalMinutes\n  extendedBiddingIntervalMinutes\n}\n\nfragment DeepZoom_image on Image {\n  deepZoom {\n    Image {\n      xmlns\n      Url\n      Format\n      TileSize\n      Overlap\n      Size {\n        Width\n        Height\n      }\n    }\n  }\n}\n\nfragment FollowArtistButton_artist on Artist {\n  id\n  slug\n  name\n  internalID\n  counts {\n    follows\n  }\n}\n\nfragment LotTimer_saleArtwork on SaleArtwork {\n  endAt\n  formattedStartDateTime\n  extendedBiddingEndAt\n  lotID\n  sale {\n    startAt\n    extendedBiddingPeriodMinutes\n    extendedBiddingIntervalMinutes\n    internalID\n    id\n  }\n}\n\nfragment PrivateArtworkAboutArtist_artwork on Artwork {\n  displayArtistBio\n  slug\n  privateArtists: artists(shallow: false) {\n    ...FollowArtistButton_artist\n    internalID\n    href\n    slug\n    name\n    initials\n    formattedNationalityAndBirthday\n    counts {\n      artworks\n      forSaleArtworks\n      follows\n    }\n    coverArtwork {\n      image {\n        cropped(width: 145, height: 145) {\n          src\n          srcSet\n        }\n      }\n      id\n    }\n    biographyBlurb(format: HTML, partnerBio: false) {\n      text\n    }\n    id\n  }\n}\n\nfragment PrivateArtworkAboutWork_artwork on Artwork {\n  additionalInformationHTML: additionalInformation(format: HTML)\n}\n\nfragment PrivateArtworkAdditionalInfo_artwork on Artwork {\n  category\n  series\n  publisher\n  manufacturer\n  image_rights: imageRights\n  canRequestLotConditionsReport\n  internalID\n  isUnlisted\n  framed {\n    label\n    details\n  }\n  signatureInfo {\n    label\n    details\n  }\n  conditionDescription {\n    label\n    details\n  }\n  certificateOfAuthenticity {\n    label\n    details\n  }\n  mediumType {\n    __typename\n  }\n  dimensions {\n    in\n    cm\n  }\n  attributionClass {\n    name\n    id\n  }\n  medium\n  ...ArtworkDetailsMediumModal_artwork\n}\n\nfragment PrivateArtworkDetails_artwork on Artwork {\n  ...PrivateArtworkAboutWork_artwork\n  ...PrivateArtworkAboutArtist_artwork\n  ...PrivateArtworkMetadata_artwork\n}\n\nfragment PrivateArtworkMetadata_artwork on Artwork {\n  ...ArtworkDetailsAdditionalInfo_artwork\n  conditionDescription {\n    details\n  }\n  provenance(format: HTML)\n  exhibitionHistory(format: HTML)\n}\n\nfragment RegistrationAuctionTimer_sale on Sale {\n  registrationEndsAt\n  isRegistrationClosed\n}\n\nfragment SeoDataForArtwork_artwork on Artwork {\n  href\n  date\n  is_price_hidden: isPriceHidden\n  is_price_range: isPriceRange\n  listPrice {\n    __typename\n    ... on PriceRange {\n      minPrice {\n        major\n        currencyCode\n      }\n      maxPrice {\n        major\n      }\n    }\n    ... on Money {\n      major\n      currencyCode\n    }\n  }\n  meta_image: image {\n    resized(width: 640, height: 640, version: [\"large\", \"medium\", \"tall\"]) {\n      width\n      height\n      url\n    }\n  }\n  meta {\n    title\n    description(limit: 155)\n  }\n  partner {\n    name\n    type\n    profile {\n      image {\n        resized(width: 320, height: 320, version: [\"medium\"]) {\n          url\n        }\n      }\n      id\n    }\n    id\n  }\n  artistNames\n  availability\n  category\n  dimensions {\n    in\n  }\n}\n\nfragment ViewInRoomArtwork_artwork on Artwork {\n  widthCm\n  heightCm\n  image {\n    resized(width: 800, height: 800, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n}\n\nfragment ViewInRoom_artwork on Artwork {\n  ...ViewInRoomArtwork_artwork\n}\n"
  }
};
})();

(node as any).hash = "db6988bd80b1ff7094e0d0a8497e2dd9";

export default node;
