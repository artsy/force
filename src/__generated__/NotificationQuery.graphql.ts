/**
 * @generated SignedSource<<86c4655b4a392e5be86f40dcd65d64f7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NotificationTypesEnum = "ARTICLE_FEATURED_ARTIST" | "ARTWORK_ALERT" | "ARTWORK_PUBLISHED" | "PARTNER_OFFER_CREATED" | "PARTNER_SHOW_OPENED" | "VIEWING_ROOM_PUBLISHED" | "%future added value";
export type NotificationQuery$variables = {
  internalID: string;
};
export type NotificationQuery$data = {
  readonly me: {
    readonly notification: {
      readonly id: string;
      readonly internalID: string;
      readonly notificationType: NotificationTypesEnum;
      readonly targetHref: string;
      readonly " $fragmentSpreads": FragmentRefs<"AlertNotification_notification" | "ArticleFeaturedArtistNotification_notification" | "ArtworkPublishedNotification_notification" | "PartnerOfferCreatedNotification_notification" | "PartnerShowOpenedNotification_notification" | "ViewingRoomPublishedNotification_notification">;
    } | null | undefined;
  } | null | undefined;
};
export type NotificationQuery = {
  response: NotificationQuery$data;
  variables: NotificationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "internalID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "internalID"
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
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "notificationType",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "targetHref",
  "storageKey": null
},
v6 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "artistNames",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v9 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "larger",
    "large"
  ]
},
v10 = [
  (v9/*: any*/)
],
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "image",
  "plural": false,
  "selections": [
    {
      "alias": "src",
      "args": (v10/*: any*/),
      "kind": "ScalarField",
      "name": "url",
      "storageKey": "url(version:[\"larger\",\"large\"])"
    },
    (v11/*: any*/),
    (v12/*: any*/)
  ],
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "visibilityLevel",
  "storageKey": null
},
v17 = {
  "alias": "sale_message",
  "args": null,
  "kind": "ScalarField",
  "name": "saleMessage",
  "storageKey": null
},
v18 = {
  "alias": "cultural_maker",
  "args": null,
  "kind": "ScalarField",
  "name": "culturalMaker",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
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
    (v2/*: any*/)
  ],
  "storageKey": null
},
v20 = {
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
v21 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": (v21/*: any*/),
  "concreteType": "Artist",
  "kind": "LinkedField",
  "name": "artists",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    (v8/*: any*/),
    (v22/*: any*/)
  ],
  "storageKey": "artists(shallow:true)"
},
v24 = {
  "alias": "collecting_institution",
  "args": null,
  "kind": "ScalarField",
  "name": "collectingInstitution",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": (v21/*: any*/),
  "concreteType": "Partner",
  "kind": "LinkedField",
  "name": "partner",
  "plural": false,
  "selections": [
    (v22/*: any*/),
    (v8/*: any*/),
    (v2/*: any*/)
  ],
  "storageKey": "partner(shallow:true)"
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cascadingEndTimeIntervalMinutes",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "extendedBiddingIntervalMinutes",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startAt",
  "storageKey": null
},
v30 = {
  "alias": "is_auction",
  "args": null,
  "kind": "ScalarField",
  "name": "isAuction",
  "storageKey": null
},
v31 = {
  "alias": "is_closed",
  "args": null,
  "kind": "ScalarField",
  "name": "isClosed",
  "storageKey": null
},
v32 = {
  "alias": null,
  "args": null,
  "concreteType": "Sale",
  "kind": "LinkedField",
  "name": "sale",
  "plural": false,
  "selections": [
    (v26/*: any*/),
    (v27/*: any*/),
    (v28/*: any*/),
    (v29/*: any*/),
    (v30/*: any*/),
    (v31/*: any*/),
    (v2/*: any*/)
  ],
  "storageKey": null
},
v33 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotID",
  "storageKey": null
},
v34 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "extendedBiddingEndAt",
  "storageKey": null
},
v35 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v36 = {
  "alias": "sale_artwork",
  "args": null,
  "concreteType": "SaleArtwork",
  "kind": "LinkedField",
  "name": "saleArtwork",
  "plural": false,
  "selections": [
    (v33/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lotLabel",
      "storageKey": null
    },
    (v26/*: any*/),
    (v34/*: any*/),
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
      "selections": (v35/*: any*/),
      "storageKey": null
    },
    {
      "alias": "opening_bid",
      "args": null,
      "concreteType": "SaleArtworkOpeningBid",
      "kind": "LinkedField",
      "name": "openingBid",
      "plural": false,
      "selections": (v35/*: any*/),
      "storageKey": null
    },
    (v2/*: any*/)
  ],
  "storageKey": null
},
v37 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v38 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isSaved",
  "storageKey": null
},
v39 = {
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
v40 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isSavedToList",
  "storageKey": null
},
v41 = [
  (v22/*: any*/),
  (v2/*: any*/)
],
v42 = {
  "alias": null,
  "args": null,
  "concreteType": "AttributionClass",
  "kind": "LinkedField",
  "name": "attributionClass",
  "plural": false,
  "selections": (v41/*: any*/),
  "storageKey": null
},
v43 = {
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
      "selections": (v41/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
},
v44 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v45 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v46 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "MMMM D"
  }
],
v47 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "src",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "srcSet",
    "storageKey": null
  },
  (v11/*: any*/),
  (v12/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NotificationQuery",
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
            "args": (v1/*: any*/),
            "concreteType": "Notification",
            "kind": "LinkedField",
            "name": "notification",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "AlertNotification_notification"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ArtworkPublishedNotification_notification"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ArticleFeaturedArtistNotification_notification"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "PartnerOfferCreatedNotification_notification"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "PartnerShowOpenedNotification_notification"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ViewingRoomPublishedNotification_notification"
              }
            ],
            "storageKey": null
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
    "name": "NotificationQuery",
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
            "args": (v1/*: any*/),
            "concreteType": "Notification",
            "kind": "LinkedField",
            "name": "notification",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "alias": null,
                "args": (v6/*: any*/),
                "concreteType": "ArtworkConnection",
                "kind": "LinkedField",
                "name": "artworksConnection",
                "plural": false,
                "selections": [
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
                          (v7/*: any*/),
                          (v8/*: any*/),
                          (v13/*: any*/),
                          (v14/*: any*/),
                          (v3/*: any*/),
                          (v15/*: any*/),
                          (v16/*: any*/),
                          (v17/*: any*/),
                          (v18/*: any*/),
                          (v19/*: any*/),
                          (v20/*: any*/),
                          (v23/*: any*/),
                          (v24/*: any*/),
                          (v25/*: any*/),
                          (v32/*: any*/),
                          (v36/*: any*/),
                          (v2/*: any*/),
                          (v37/*: any*/),
                          (v38/*: any*/),
                          (v39/*: any*/),
                          (v40/*: any*/),
                          (v42/*: any*/),
                          (v43/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v44/*: any*/)
                ],
                "storageKey": "artworksConnection(first:10)"
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "headline",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "item",
                "plural": false,
                "selections": [
                  (v45/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Alert",
                        "kind": "LinkedField",
                        "name": "alert",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Artist",
                            "kind": "LinkedField",
                            "name": "artists",
                            "plural": true,
                            "selections": [
                              (v22/*: any*/),
                              (v37/*: any*/),
                              (v2/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "SearchCriteriaLabel",
                            "kind": "LinkedField",
                            "name": "labels",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "displayValue",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "type": "AlertNotificationItem",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "available",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "expiresAt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PartnerOffer",
                        "kind": "LinkedField",
                        "name": "partnerOffer",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          (v26/*: any*/),
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
                            "selections": (v35/*: any*/),
                            "storageKey": null
                          },
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "type": "PartnerOfferCreatedNotificationItem",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ShowConnection",
                        "kind": "LinkedField",
                        "name": "showsConnection",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ShowEdge",
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Show",
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": (v46/*: any*/),
                                    "kind": "ScalarField",
                                    "name": "startAt",
                                    "storageKey": "startAt(format:\"MMMM D\")"
                                  },
                                  {
                                    "alias": null,
                                    "args": (v46/*: any*/),
                                    "kind": "ScalarField",
                                    "name": "endAt",
                                    "storageKey": "endAt(format:\"MMMM D\")"
                                  },
                                  (v2/*: any*/),
                                  {
                                    "alias": null,
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "first",
                                        "value": 2
                                      }
                                    ],
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
                                              (v45/*: any*/),
                                              {
                                                "alias": null,
                                                "args": null,
                                                "concreteType": "Artwork",
                                                "kind": "LinkedField",
                                                "name": "node",
                                                "plural": false,
                                                "selections": [
                                                  (v2/*: any*/),
                                                  (v37/*: any*/),
                                                  (v8/*: any*/),
                                                  (v3/*: any*/),
                                                  {
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
                                                      (v3/*: any*/),
                                                      {
                                                        "alias": null,
                                                        "args": null,
                                                        "kind": "ScalarField",
                                                        "name": "placeholder",
                                                        "storageKey": null
                                                      },
                                                      {
                                                        "alias": null,
                                                        "args": (v10/*: any*/),
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
                                                        "args": null,
                                                        "kind": "ScalarField",
                                                        "name": "blurhashDataURL",
                                                        "storageKey": null
                                                      },
                                                      {
                                                        "alias": null,
                                                        "args": [
                                                          (v9/*: any*/),
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
                                                        "selections": (v47/*: any*/),
                                                        "storageKey": "resized(version:[\"larger\",\"large\"],width:445)"
                                                      }
                                                    ],
                                                    "storageKey": "image(includeAll:false)"
                                                  },
                                                  (v14/*: any*/),
                                                  {
                                                    "alias": null,
                                                    "args": null,
                                                    "kind": "ScalarField",
                                                    "name": "imageTitle",
                                                    "storageKey": null
                                                  },
                                                  (v7/*: any*/),
                                                  (v15/*: any*/),
                                                  (v16/*: any*/),
                                                  (v17/*: any*/),
                                                  (v18/*: any*/),
                                                  (v19/*: any*/),
                                                  (v20/*: any*/),
                                                  (v23/*: any*/),
                                                  (v24/*: any*/),
                                                  (v25/*: any*/),
                                                  {
                                                    "alias": null,
                                                    "args": null,
                                                    "concreteType": "Sale",
                                                    "kind": "LinkedField",
                                                    "name": "sale",
                                                    "plural": false,
                                                    "selections": [
                                                      (v26/*: any*/),
                                                      (v27/*: any*/),
                                                      (v28/*: any*/),
                                                      (v29/*: any*/),
                                                      (v30/*: any*/),
                                                      (v31/*: any*/),
                                                      (v2/*: any*/),
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
                                                  (v36/*: any*/),
                                                  (v38/*: any*/),
                                                  (v39/*: any*/),
                                                  (v40/*: any*/),
                                                  (v42/*: any*/),
                                                  (v43/*: any*/),
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
                                                    "concreteType": "SaleArtwork",
                                                    "kind": "LinkedField",
                                                    "name": "saleArtwork",
                                                    "plural": false,
                                                    "selections": [
                                                      (v26/*: any*/),
                                                      (v34/*: any*/),
                                                      (v33/*: any*/),
                                                      (v2/*: any*/)
                                                    ],
                                                    "storageKey": null
                                                  },
                                                  {
                                                    "alias": "image_title",
                                                    "args": null,
                                                    "kind": "ScalarField",
                                                    "name": "imageTitle",
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
                                      },
                                      (v44/*: any*/)
                                    ],
                                    "storageKey": "artworksConnection(first:2)"
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
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v8/*: any*/),
                          (v22/*: any*/),
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "type": "ShowOpenedNotificationItem",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artist",
                        "kind": "LinkedField",
                        "name": "artists",
                        "plural": true,
                        "selections": [
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isFollowed",
                            "storageKey": null
                          },
                          (v22/*: any*/),
                          (v37/*: any*/),
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "type": "ArtworkPublishedNotificationItem",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Article",
                        "kind": "LinkedField",
                        "name": "article",
                        "plural": false,
                        "selections": [
                          (v8/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "thumbnailTitle",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "byline",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "format",
                                "value": "MMM D, YYYY"
                              }
                            ],
                            "kind": "ScalarField",
                            "name": "publishedAt",
                            "storageKey": "publishedAt(format:\"MMM D, YYYY\")"
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
                                    "value": 607
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 910
                                  }
                                ],
                                "concreteType": "CroppedImageUrl",
                                "kind": "LinkedField",
                                "name": "cropped",
                                "plural": false,
                                "selections": (v47/*: any*/),
                                "storageKey": "cropped(height:607,width:910)"
                              }
                            ],
                            "storageKey": null
                          },
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v6/*: any*/),
                        "concreteType": "ArtistConnection",
                        "kind": "LinkedField",
                        "name": "artistsConnection",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ArtistEdge",
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Artist",
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  (v22/*: any*/),
                                  (v37/*: any*/),
                                  (v3/*: any*/),
                                  (v8/*: any*/),
                                  (v2/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": "artistsConnection(first:10)"
                      }
                    ],
                    "type": "ArticleFeaturedArtistNotificationItem",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v22/*: any*/),
                          (v8/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Profile",
                            "kind": "LinkedField",
                            "name": "profile",
                            "plural": false,
                            "selections": [
                              (v3/*: any*/),
                              (v2/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": (v6/*: any*/),
                        "concreteType": "ViewingRoomsConnection",
                        "kind": "LinkedField",
                        "name": "viewingRoomsConnection",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ViewingRoomsEdge",
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ViewingRoom",
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  (v14/*: any*/),
                                  (v8/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "introStatement",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "ARImage",
                                    "kind": "LinkedField",
                                    "name": "image",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "ImageURLs",
                                        "kind": "LinkedField",
                                        "name": "imageURLs",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "normalized",
                                            "storageKey": null
                                          }
                                        ],
                                        "storageKey": null
                                      },
                                      (v11/*: any*/),
                                      (v12/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  (v3/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": "viewingRoomsConnection(first:10)"
                      }
                    ],
                    "type": "ViewingRoomPublishedNotificationItem",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "format",
                    "value": "RELATIVE"
                  }
                ],
                "kind": "ScalarField",
                "name": "publishedAt",
                "storageKey": "publishedAt(format:\"RELATIVE\")"
              },
              {
                "alias": "offerArtworksConnection",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 1
                  }
                ],
                "concreteType": "ArtworkConnection",
                "kind": "LinkedField",
                "name": "artworksConnection",
                "plural": false,
                "selections": [
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
                          (v8/*: any*/),
                          (v14/*: any*/),
                          (v7/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "price",
                            "storageKey": null
                          },
                          (v13/*: any*/),
                          (v3/*: any*/),
                          (v15/*: any*/),
                          (v16/*: any*/),
                          (v17/*: any*/),
                          (v18/*: any*/),
                          (v19/*: any*/),
                          (v20/*: any*/),
                          (v23/*: any*/),
                          (v24/*: any*/),
                          (v25/*: any*/),
                          (v32/*: any*/),
                          (v36/*: any*/),
                          (v2/*: any*/),
                          (v37/*: any*/),
                          (v38/*: any*/),
                          (v39/*: any*/),
                          (v40/*: any*/),
                          (v42/*: any*/),
                          (v43/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "artworksConnection(first:1)"
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0f8dd76839570896b5766ff8dbd006da",
    "id": null,
    "metadata": {},
    "name": "NotificationQuery",
    "operationKind": "query",
    "text": "query NotificationQuery(\n  $internalID: String!\n) {\n  me {\n    notification(id: $internalID) {\n      id\n      internalID\n      notificationType\n      targetHref\n      ...AlertNotification_notification\n      ...ArtworkPublishedNotification_notification\n      ...ArticleFeaturedArtistNotification_notification\n      ...PartnerOfferCreatedNotification_notification\n      ...PartnerShowOpenedNotification_notification\n      ...ViewingRoomPublishedNotification_notification\n    }\n    id\n  }\n}\n\nfragment AlertNotification_notification on Notification {\n  artworksConnection(first: 10) {\n    ...NotificationArtworkList_artworksConnection\n    totalCount\n  }\n  headline\n  item {\n    __typename\n    ... on AlertNotificationItem {\n      alert {\n        internalID\n        artists {\n          name\n          slug\n          id\n        }\n        labels {\n          displayValue\n        }\n        id\n      }\n    }\n  }\n  notificationType\n  ...NotificationTypeLabel_notification\n}\n\nfragment ArticleFeaturedArtistNotification_notification on Notification {\n  headline\n  item {\n    __typename\n    ... on ArticleFeaturedArtistNotificationItem {\n      article {\n        href\n        thumbnailTitle\n        byline\n        publishedAt(format: \"MMM D, YYYY\")\n        thumbnailImage {\n          cropped(width: 910, height: 607) {\n            src\n            srcSet\n            width\n            height\n          }\n        }\n        id\n      }\n      artistsConnection(first: 10) {\n        edges {\n          node {\n            name\n            slug\n            internalID\n            href\n            id\n          }\n        }\n      }\n    }\n  }\n  notificationType\n  ...NotificationTypeLabel_notification\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnectionInterface {\n  __isArtworkConnectionInterface: __typename\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      internalID\n      image(includeAll: false) {\n        aspectRatio\n      }\n      ...GridItem_artwork\n      ...FlatGridItem_artwork\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment ArtworkPublishedNotification_notification on Notification {\n  artworksConnection(first: 10) {\n    ...NotificationArtworkList_artworksConnection\n    totalCount\n  }\n  headline\n  item {\n    __typename\n    ... on ArtworkPublishedNotificationItem {\n      artists {\n        internalID\n        isFollowed\n        name\n        slug\n        id\n      }\n    }\n  }\n  notificationType\n  ...NotificationTypeLabel_notification\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment DeprecatedSaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  isSaved\n  title\n}\n\nfragment Details_artwork on Artwork {\n  internalID\n  href\n  title\n  date\n  visibilityLevel\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...SaveButton_artwork\n  ...SaveArtworkToListsButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment FlatGridItem_artwork on Artwork {\n  ...Metadata_artwork\n  ...DeprecatedSaveButton_artwork\n  sale {\n    extendedBiddingPeriodMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    id\n  }\n  saleArtwork {\n    endAt\n    extendedBiddingEndAt\n    lotID\n    id\n  }\n  internalID\n  title\n  image_title: imageTitle\n  image(includeAll: false) {\n    resized(width: 445, version: [\"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n    blurhashDataURL\n  }\n  artistNames\n  href\n  isSaved\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  imageTitle\n  image(includeAll: false) {\n    internalID\n    placeholder\n    url(version: [\"larger\", \"large\"])\n    aspectRatio\n    versions\n    blurhashDataURL\n  }\n  artistNames\n  href\n  ...Metadata_artwork\n  ...Badge_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n}\n\nfragment NotificationArtworkList_artworksConnection on ArtworkConnection {\n  edges {\n    node {\n      ...NotificationArtwork_artwork\n      internalID\n      id\n    }\n  }\n}\n\nfragment NotificationArtwork_artwork on Artwork {\n  artistNames\n  href\n  image {\n    src: url(version: [\"larger\", \"large\"])\n    width\n    height\n  }\n  title\n  ...Metadata_artwork\n}\n\nfragment NotificationTypeLabel_notification on Notification {\n  notificationType\n  publishedAt(format: \"RELATIVE\")\n  item {\n    __typename\n    ... on PartnerOfferCreatedNotificationItem {\n      available\n      expiresAt\n    }\n    ... on ShowOpenedNotificationItem {\n      showsConnection {\n        edges {\n          node {\n            startAt(format: \"MMMM D\")\n            endAt(format: \"MMMM D\")\n            id\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment NotificationViewingRoom_viewingRoom on ViewingRoom {\n  title\n  href\n  introStatement\n  image {\n    imageURLs {\n      normalized\n    }\n    width\n    height\n  }\n}\n\nfragment NotificationViewingRoomsList_viewingRoomsConnection on ViewingRoomsConnection {\n  edges {\n    node {\n      ...NotificationViewingRoom_viewingRoom\n      internalID\n    }\n  }\n}\n\nfragment PartnerOfferArtwork_artwork on Artwork {\n  href\n  title\n  artistNames\n  price\n  image {\n    src: url(version: [\"larger\", \"large\"])\n    width\n    height\n  }\n  ...Metadata_artwork\n}\n\nfragment PartnerOfferCreatedNotification_notification on Notification {\n  headline\n  targetHref\n  item {\n    __typename\n    ... on PartnerOfferCreatedNotificationItem {\n      partnerOffer {\n        internalID\n        endAt\n        isAvailable\n        note\n        priceWithDiscount {\n          display\n        }\n        id\n      }\n    }\n  }\n  offerArtworksConnection: artworksConnection(first: 1) {\n    edges {\n      node {\n        ...PartnerOfferArtwork_artwork\n        id\n      }\n    }\n  }\n}\n\nfragment PartnerShowOpenedNotification_notification on Notification {\n  headline\n  item {\n    __typename\n    ... on ShowOpenedNotificationItem {\n      partner {\n        href\n        name\n        id\n      }\n      showsConnection {\n        edges {\n          node {\n            artworksConnection(first: 2) {\n              ...ArtworkGrid_artworks\n              totalCount\n            }\n            id\n          }\n        }\n      }\n    }\n  }\n  notificationType\n  targetHref\n  ...NotificationTypeLabel_notification\n}\n\nfragment SaveArtworkToListsButton_artwork on Artwork {\n  id\n  internalID\n  isSaved\n  slug\n  title\n  date\n  artistNames\n  preview: image {\n    url(version: \"square\")\n  }\n  isSavedToList\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  isSaved\n  title\n}\n\nfragment ViewingRoomPublishedNotification_notification on Notification {\n  headline\n  item {\n    __typename\n    ... on ViewingRoomPublishedNotificationItem {\n      partner {\n        name\n        href\n        profile {\n          internalID\n          id\n        }\n        id\n      }\n      viewingRoomsConnection(first: 10) {\n        ...NotificationViewingRoomsList_viewingRoomsConnection\n      }\n    }\n  }\n  notificationType\n  ...NotificationTypeLabel_notification\n}\n"
  }
};
})();

(node as any).hash = "aaafe26bcd649db8006ecac2999dbc1e";

export default node;
