/**
 * @generated SignedSource<<036651e2d5a9dadc3ed9acc8ee563e38>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsPurchases_Test_Query$variables = {};
export type SettingsPurchases_Test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SettingsPurchases_me">;
  } | null;
};
export type SettingsPurchases_Test_Query = {
  response: SettingsPurchases_Test_Query$data;
  variables: SettingsPurchases_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "CommercePageInfo",
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
  "concreteType": "CommercePageCursors",
  "kind": "LinkedField",
  "name": "pageCursors",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CommercePageCursor",
      "kind": "LinkedField",
      "name": "around",
      "plural": true,
      "selections": (v5/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CommercePageCursor",
      "kind": "LinkedField",
      "name": "first",
      "plural": false,
      "selections": (v5/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CommercePageCursor",
      "kind": "LinkedField",
      "name": "last",
      "plural": false,
      "selections": (v5/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CommercePageCursor",
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
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "code",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "source",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v12 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "height",
        "value": 45
      },
      {
        "kind": "Literal",
        "name": "width",
        "value": 45
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
        "name": "src",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "srcSet",
        "storageKey": null
      }
    ],
    "storageKey": "cropped(height:45,width:45)"
  }
],
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "CommerceLineItemEdge",
  "kind": "LinkedField",
  "name": "edges",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CommerceLineItem",
      "kind": "LinkedField",
      "name": "node",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtworkVersion",
          "kind": "LinkedField",
          "name": "artworkVersion",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Image",
              "kind": "LinkedField",
              "name": "image",
              "plural": false,
              "selections": (v12/*: any*/),
              "storageKey": null
            },
            (v11/*: any*/)
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Artwork",
          "kind": "LinkedField",
          "name": "artwork",
          "plural": false,
          "selections": [
            (v13/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "Partner",
              "kind": "LinkedField",
              "name": "partner",
              "plural": false,
              "selections": [
                (v13/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "initials",
                  "storageKey": null
                },
                (v0/*: any*/),
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
                      "selections": (v12/*: any*/),
                      "storageKey": null
                    },
                    (v11/*: any*/)
                  ],
                  "storageKey": null
                },
                (v11/*: any*/)
              ],
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
              "name": "title",
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
              "concreteType": "Artist",
              "kind": "LinkedField",
              "name": "artists",
              "plural": true,
              "selections": [
                (v13/*: any*/),
                (v11/*: any*/)
              ],
              "storageKey": null
            },
            (v11/*: any*/)
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 1
            }
          ],
          "concreteType": "CommerceFulfillmentConnection",
          "kind": "LinkedField",
          "name": "fulfillments",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "CommerceFulfillmentEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "CommerceFulfillment",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "trackingId",
                      "storageKey": null
                    },
                    (v11/*: any*/)
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": "fulfillments(first:1)"
        },
        (v11/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v15 = {
  "kind": "TypeDiscriminator",
  "abstractKey": "__isCommerceOrder"
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayState",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "requestedFulfillment",
  "plural": false,
  "selections": [
    (v7/*: any*/)
  ],
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "paymentMethodDetails",
  "plural": false,
  "selections": [
    (v7/*: any*/),
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "lastDigits",
          "storageKey": null
        },
        (v11/*: any*/)
      ],
      "type": "CreditCard",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "last4",
          "storageKey": null
        },
        (v11/*: any*/)
      ],
      "type": "BankAccount",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isManualPayment",
          "storageKey": null
        }
      ],
      "type": "WireTransfer",
      "abstractKey": null
    }
  ],
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "precision",
      "value": 2
    }
  ],
  "kind": "ScalarField",
  "name": "buyerTotal",
  "storageKey": "buyerTotal(precision:2)"
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currencyCode",
  "storageKey": null
},
v23 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v24 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v25 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommerceOrderConnectionWithTotalCount"
},
v26 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "CommerceOrderEdge"
},
v27 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommerceOrder"
},
v28 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v29 = {
  "enumValues": [
    "ABANDONED",
    "APPROVED",
    "CANCELED",
    "FULFILLED",
    "IN_TRANSIT",
    "PENDING",
    "PROCESSING",
    "PROCESSING_APPROVAL",
    "REFUNDED",
    "SUBMITTED"
  ],
  "nullable": false,
  "plural": false,
  "type": "CommerceOrderDisplayStateEnum"
},
v30 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommerceLineItemConnection"
},
v31 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "CommerceLineItemEdge"
},
v32 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommerceLineItem"
},
v33 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artwork"
},
v34 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "Artist"
},
v35 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Partner"
},
v36 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Profile"
},
v37 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v38 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v39 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkVersion"
},
v40 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommerceFulfillmentConnection"
},
v41 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "CommerceFulfillmentEdge"
},
v42 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommerceFulfillment"
},
v43 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PaymentMethodUnion"
},
v44 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v45 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommerceRequestedFulfillmentUnion"
},
v46 = {
  "enumValues": [
    "artwork_page",
    "inquiry",
    "private_sale"
  ],
  "nullable": false,
  "plural": false,
  "type": "CommerceOrderSourceEnum"
},
v47 = {
  "enumValues": [
    "ABANDONED",
    "APPROVED",
    "CANCELED",
    "FULFILLED",
    "IN_REVIEW",
    "PENDING",
    "PROCESSING_APPROVAL",
    "REFUNDED",
    "SUBMITTED"
  ],
  "nullable": false,
  "plural": false,
  "type": "CommerceOrderStateEnum"
},
v48 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommercePageCursors"
},
v49 = {
  "enumValues": null,
  "nullable": false,
  "plural": true,
  "type": "CommercePageCursor"
},
v50 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v51 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommercePageCursor"
},
v52 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "CommercePageInfo"
},
v53 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsPurchases_Test_Query",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "SettingsPurchases_me"
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
    "name": "SettingsPurchases_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "alias": "pendingOrders",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 100
              },
              {
                "kind": "Literal",
                "name": "states",
                "value": [
                  "PENDING"
                ]
              }
            ],
            "concreteType": "CommerceOrderConnectionWithTotalCount",
            "kind": "LinkedField",
            "name": "orders",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceOrderEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CommerceLineItemConnection",
                        "kind": "LinkedField",
                        "name": "lineItems",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "CommerceLineItem",
                            "kind": "LinkedField",
                            "name": "nodes",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "artworkId",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "editionSetId",
                                "storageKey": null
                              },
                              (v11/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v14/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v15/*: any*/),
                      (v16/*: any*/),
                      (v17/*: any*/),
                      (v18/*: any*/),
                      (v19/*: any*/),
                      (v20/*: any*/),
                      (v21/*: any*/),
                      (v22/*: any*/),
                      (v11/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "orders(first:100,states:[\"PENDING\"])"
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 10
              },
              {
                "kind": "Literal",
                "name": "states",
                "value": [
                  "APPROVED",
                  "CANCELED",
                  "FULFILLED",
                  "REFUNDED",
                  "SUBMITTED",
                  "PROCESSING_APPROVAL"
                ]
              }
            ],
            "concreteType": "CommerceOrderConnectionWithTotalCount",
            "kind": "LinkedField",
            "name": "orders",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v2/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceOrderEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
                      (v8/*: any*/),
                      (v15/*: any*/),
                      (v9/*: any*/),
                      (v16/*: any*/),
                      (v17/*: any*/),
                      (v18/*: any*/),
                      (v19/*: any*/),
                      (v20/*: any*/),
                      (v21/*: any*/),
                      (v10/*: any*/),
                      (v22/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CommerceLineItemConnection",
                        "kind": "LinkedField",
                        "name": "lineItems",
                        "plural": false,
                        "selections": [
                          (v14/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v11/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "orders(first:10,states:[\"APPROVED\",\"CANCELED\",\"FULFILLED\",\"REFUNDED\",\"SUBMITTED\",\"PROCESSING_APPROVAL\"])"
          },
          (v11/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a026c92109a56440c0d778db4b4002f0",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v23/*: any*/),
        "me.name": (v24/*: any*/),
        "me.orders": (v25/*: any*/),
        "me.orders.edges": (v26/*: any*/),
        "me.orders.edges.node": (v27/*: any*/),
        "me.orders.edges.node.__isCommerceOrder": (v28/*: any*/),
        "me.orders.edges.node.__typename": (v28/*: any*/),
        "me.orders.edges.node.buyerTotal": (v24/*: any*/),
        "me.orders.edges.node.code": (v28/*: any*/),
        "me.orders.edges.node.createdAt": (v28/*: any*/),
        "me.orders.edges.node.currencyCode": (v28/*: any*/),
        "me.orders.edges.node.displayState": (v29/*: any*/),
        "me.orders.edges.node.id": (v23/*: any*/),
        "me.orders.edges.node.internalID": (v23/*: any*/),
        "me.orders.edges.node.lineItems": (v30/*: any*/),
        "me.orders.edges.node.lineItems.edges": (v31/*: any*/),
        "me.orders.edges.node.lineItems.edges.node": (v32/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork": (v33/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.artistNames": (v24/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.artists": (v34/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.artists.href": (v24/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.artists.id": (v23/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.href": (v24/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.id": (v23/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.partner": (v35/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.partner.href": (v24/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.partner.id": (v23/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.partner.initials": (v24/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.partner.name": (v24/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.partner.profile": (v36/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.partner.profile.icon": (v37/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.partner.profile.icon.cropped": (v38/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.partner.profile.icon.cropped.src": (v28/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.partner.profile.icon.cropped.srcSet": (v28/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.partner.profile.id": (v23/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.shippingOrigin": (v24/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artwork.title": (v24/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artworkVersion": (v39/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artworkVersion.id": (v23/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artworkVersion.image": (v37/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artworkVersion.image.cropped": (v38/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artworkVersion.image.cropped.src": (v28/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.artworkVersion.image.cropped.srcSet": (v28/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.fulfillments": (v40/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.fulfillments.edges": (v41/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.fulfillments.edges.node": (v42/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.fulfillments.edges.node.id": (v23/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.fulfillments.edges.node.trackingId": (v24/*: any*/),
        "me.orders.edges.node.lineItems.edges.node.id": (v23/*: any*/),
        "me.orders.edges.node.paymentMethodDetails": (v43/*: any*/),
        "me.orders.edges.node.paymentMethodDetails.__typename": (v28/*: any*/),
        "me.orders.edges.node.paymentMethodDetails.id": (v23/*: any*/),
        "me.orders.edges.node.paymentMethodDetails.isManualPayment": (v44/*: any*/),
        "me.orders.edges.node.paymentMethodDetails.last4": (v28/*: any*/),
        "me.orders.edges.node.paymentMethodDetails.lastDigits": (v28/*: any*/),
        "me.orders.edges.node.requestedFulfillment": (v45/*: any*/),
        "me.orders.edges.node.requestedFulfillment.__typename": (v28/*: any*/),
        "me.orders.edges.node.source": (v46/*: any*/),
        "me.orders.edges.node.state": (v47/*: any*/),
        "me.orders.pageCursors": (v48/*: any*/),
        "me.orders.pageCursors.around": (v49/*: any*/),
        "me.orders.pageCursors.around.cursor": (v28/*: any*/),
        "me.orders.pageCursors.around.isCurrent": (v44/*: any*/),
        "me.orders.pageCursors.around.page": (v50/*: any*/),
        "me.orders.pageCursors.first": (v51/*: any*/),
        "me.orders.pageCursors.first.cursor": (v28/*: any*/),
        "me.orders.pageCursors.first.isCurrent": (v44/*: any*/),
        "me.orders.pageCursors.first.page": (v50/*: any*/),
        "me.orders.pageCursors.last": (v51/*: any*/),
        "me.orders.pageCursors.last.cursor": (v28/*: any*/),
        "me.orders.pageCursors.last.isCurrent": (v44/*: any*/),
        "me.orders.pageCursors.last.page": (v50/*: any*/),
        "me.orders.pageCursors.previous": (v51/*: any*/),
        "me.orders.pageCursors.previous.cursor": (v28/*: any*/),
        "me.orders.pageCursors.previous.page": (v50/*: any*/),
        "me.orders.pageInfo": (v52/*: any*/),
        "me.orders.pageInfo.endCursor": (v24/*: any*/),
        "me.orders.pageInfo.hasNextPage": (v44/*: any*/),
        "me.orders.totalCount": (v53/*: any*/),
        "me.pendingOrders": (v25/*: any*/),
        "me.pendingOrders.edges": (v26/*: any*/),
        "me.pendingOrders.edges.node": (v27/*: any*/),
        "me.pendingOrders.edges.node.__isCommerceOrder": (v28/*: any*/),
        "me.pendingOrders.edges.node.__typename": (v28/*: any*/),
        "me.pendingOrders.edges.node.buyerTotal": (v24/*: any*/),
        "me.pendingOrders.edges.node.code": (v28/*: any*/),
        "me.pendingOrders.edges.node.createdAt": (v28/*: any*/),
        "me.pendingOrders.edges.node.currencyCode": (v28/*: any*/),
        "me.pendingOrders.edges.node.displayState": (v29/*: any*/),
        "me.pendingOrders.edges.node.id": (v23/*: any*/),
        "me.pendingOrders.edges.node.internalID": (v23/*: any*/),
        "me.pendingOrders.edges.node.lineItems": (v30/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges": (v31/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node": (v32/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.artwork": (v33/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.artwork.artistNames": (v24/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.artwork.artists": (v34/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.artwork.artists.href": (v24/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.artwork.artists.id": (v23/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.artwork.href": (v24/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.artwork.id": (v23/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.artwork.partner": (v35/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.artwork.partner.href": (v24/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.artwork.partner.id": (v23/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.artwork.partner.initials": (v24/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.artwork.partner.name": (v24/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.artwork.partner.profile": (v36/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.artwork.partner.profile.icon": (v37/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.artwork.partner.profile.icon.cropped": (v38/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.artwork.partner.profile.icon.cropped.src": (v28/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.artwork.partner.profile.icon.cropped.srcSet": (v28/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.artwork.partner.profile.id": (v23/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.artwork.shippingOrigin": (v24/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.artwork.title": (v24/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.artworkVersion": (v39/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.artworkVersion.id": (v23/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.artworkVersion.image": (v37/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.artworkVersion.image.cropped": (v38/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.artworkVersion.image.cropped.src": (v28/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.artworkVersion.image.cropped.srcSet": (v28/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.fulfillments": (v40/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.fulfillments.edges": (v41/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.fulfillments.edges.node": (v42/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.fulfillments.edges.node.id": (v23/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.fulfillments.edges.node.trackingId": (v24/*: any*/),
        "me.pendingOrders.edges.node.lineItems.edges.node.id": (v23/*: any*/),
        "me.pendingOrders.edges.node.lineItems.nodes": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CommerceLineItem"
        },
        "me.pendingOrders.edges.node.lineItems.nodes.artworkId": (v28/*: any*/),
        "me.pendingOrders.edges.node.lineItems.nodes.editionSetId": (v24/*: any*/),
        "me.pendingOrders.edges.node.lineItems.nodes.id": (v23/*: any*/),
        "me.pendingOrders.edges.node.paymentMethodDetails": (v43/*: any*/),
        "me.pendingOrders.edges.node.paymentMethodDetails.__typename": (v28/*: any*/),
        "me.pendingOrders.edges.node.paymentMethodDetails.id": (v23/*: any*/),
        "me.pendingOrders.edges.node.paymentMethodDetails.isManualPayment": (v44/*: any*/),
        "me.pendingOrders.edges.node.paymentMethodDetails.last4": (v28/*: any*/),
        "me.pendingOrders.edges.node.paymentMethodDetails.lastDigits": (v28/*: any*/),
        "me.pendingOrders.edges.node.requestedFulfillment": (v45/*: any*/),
        "me.pendingOrders.edges.node.requestedFulfillment.__typename": (v28/*: any*/),
        "me.pendingOrders.edges.node.source": (v46/*: any*/),
        "me.pendingOrders.edges.node.state": (v47/*: any*/),
        "me.pendingOrders.pageCursors": (v48/*: any*/),
        "me.pendingOrders.pageCursors.around": (v49/*: any*/),
        "me.pendingOrders.pageCursors.around.cursor": (v28/*: any*/),
        "me.pendingOrders.pageCursors.around.isCurrent": (v44/*: any*/),
        "me.pendingOrders.pageCursors.around.page": (v50/*: any*/),
        "me.pendingOrders.pageCursors.first": (v51/*: any*/),
        "me.pendingOrders.pageCursors.first.cursor": (v28/*: any*/),
        "me.pendingOrders.pageCursors.first.isCurrent": (v44/*: any*/),
        "me.pendingOrders.pageCursors.first.page": (v50/*: any*/),
        "me.pendingOrders.pageCursors.last": (v51/*: any*/),
        "me.pendingOrders.pageCursors.last.cursor": (v28/*: any*/),
        "me.pendingOrders.pageCursors.last.isCurrent": (v44/*: any*/),
        "me.pendingOrders.pageCursors.last.page": (v50/*: any*/),
        "me.pendingOrders.pageCursors.previous": (v51/*: any*/),
        "me.pendingOrders.pageCursors.previous.cursor": (v28/*: any*/),
        "me.pendingOrders.pageCursors.previous.page": (v50/*: any*/),
        "me.pendingOrders.pageInfo": (v52/*: any*/),
        "me.pendingOrders.pageInfo.endCursor": (v24/*: any*/),
        "me.pendingOrders.pageInfo.hasNextPage": (v44/*: any*/),
        "me.pendingOrders.totalCount": (v53/*: any*/)
      }
    },
    "name": "SettingsPurchases_Test_Query",
    "operationKind": "query",
    "text": "query SettingsPurchases_Test_Query {\n  me {\n    ...SettingsPurchases_me\n    id\n  }\n}\n\nfragment CommercePagination_pageCursors on CommercePageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment SettingsPurchasesRow_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  source\n  internalID\n  code\n  displayState\n  state\n  requestedFulfillment {\n    __typename\n  }\n  paymentMethodDetails {\n    __typename\n    ... on CreditCard {\n      lastDigits\n      id\n    }\n    ... on BankAccount {\n      last4\n      id\n    }\n    ... on WireTransfer {\n      isManualPayment\n    }\n  }\n  buyerTotal(precision: 2)\n  createdAt\n  currencyCode\n  lineItems {\n    edges {\n      node {\n        artworkVersion {\n          image {\n            cropped(width: 45, height: 45) {\n              src\n              srcSet\n            }\n          }\n          id\n        }\n        artwork {\n          href\n          partner {\n            href\n            initials\n            name\n            profile {\n              icon {\n                cropped(width: 45, height: 45) {\n                  src\n                  srcSet\n                }\n              }\n              id\n            }\n            id\n          }\n          shippingOrigin\n          title\n          artistNames\n          artists {\n            href\n            id\n          }\n          id\n        }\n        fulfillments(first: 1) {\n          edges {\n            node {\n              trackingId\n              id\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment SettingsPurchases_me on Me {\n  name\n  pendingOrders: orders(states: [PENDING], first: 100) {\n    totalCount\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...CommercePagination_pageCursors\n    }\n    edges {\n      node {\n        __typename\n        code\n        source\n        createdAt\n        lineItems {\n          nodes {\n            artworkId\n            editionSetId\n            id\n          }\n        }\n        ...SettingsPurchasesRow_order\n        id\n      }\n    }\n  }\n  orders(states: [APPROVED, CANCELED, FULFILLED, REFUNDED, SUBMITTED, PROCESSING_APPROVAL], first: 10) {\n    totalCount\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...CommercePagination_pageCursors\n    }\n    edges {\n      node {\n        __typename\n        code\n        ...SettingsPurchasesRow_order\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7e82d547b04a31df6bc41f4aea8f71aa";

export default node;
