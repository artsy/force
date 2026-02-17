/**
 * @generated SignedSource<<f53094ba5e01cd0cfe2b005231d0c4e9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsOrders_Test_Query$variables = Record<PropertyKey, never>;
export type SettingsOrders_Test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SettingsOrders_me">;
  } | null | undefined;
};
export type SettingsOrders_Test_Query = {
  response: SettingsOrders_Test_Query$data;
  variables: SettingsOrders_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v2 = [
  (v0/*: any*/),
  (v1/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
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
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v6 = [
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
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v9 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v12 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v13 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PageCursor"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsOrders_Test_Query",
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
            "name": "SettingsOrders_me"
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
    "name": "SettingsOrders_Test_Query",
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
            "args": [
              {
                "kind": "Literal",
                "name": "buyerState",
                "value": [
                  "SUBMITTED",
                  "OFFER_RECEIVED",
                  "PAYMENT_FAILED",
                  "PROCESSING_PAYMENT",
                  "PROCESSING_OFFLINE_PAYMENT",
                  "APPROVED",
                  "SHIPPED",
                  "COMPLETED",
                  "CANCELED",
                  "REFUNDED",
                  "DECLINED_BY_SELLER",
                  "DECLINED_BY_BUYER"
                ]
              },
              {
                "kind": "Literal",
                "name": "first",
                "value": 10
              },
              {
                "kind": "Literal",
                "name": "page",
                "value": 1
              }
            ],
            "concreteType": "MeOrdersConnection",
            "kind": "LinkedField",
            "name": "ordersConnection",
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
                    "name": "hasPreviousPage",
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
                    "selections": (v2/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "first",
                    "plural": false,
                    "selections": (v2/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "last",
                    "plural": false,
                    "selections": (v2/*: any*/),
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
                      (v0/*: any*/),
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "MeOrdersEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Order",
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
                        "name": "source",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "code",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "buyerState",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "createdAt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "creditCardWalletType",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "DisplayTexts",
                        "kind": "LinkedField",
                        "name": "displayTexts",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "stateName",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "actionPrompt",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "DeliveryInfo",
                        "kind": "LinkedField",
                        "name": "deliveryInfo",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "trackingURL",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "FulfillmentOption",
                        "kind": "LinkedField",
                        "name": "selectedFulfillmentOption",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "type",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "pricingBreakdownLines",
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
                                "name": "displayName",
                                "storageKey": null
                              }
                            ],
                            "type": "ShippingLine",
                            "abstractKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "paymentMethodDetails",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
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
                              (v4/*: any*/)
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
                              (v4/*: any*/)
                            ],
                            "type": "BankAccount",
                            "abstractKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "buyerTotal",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "display",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "LineItem",
                        "kind": "LinkedField",
                        "name": "lineItems",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Artwork",
                            "kind": "LinkedField",
                            "name": "artwork",
                            "plural": false,
                            "selections": [
                              (v5/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Partner",
                                "kind": "LinkedField",
                                "name": "partner",
                                "plural": false,
                                "selections": [
                                  (v5/*: any*/),
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
                                    "name": "name",
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
                                        "name": "icon",
                                        "plural": false,
                                        "selections": (v6/*: any*/),
                                        "storageKey": null
                                      },
                                      (v4/*: any*/)
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
                                  (v5/*: any*/),
                                  (v4/*: any*/)
                                ],
                                "storageKey": "artists(shallow:true)"
                              },
                              (v4/*: any*/)
                            ],
                            "storageKey": null
                          },
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
                                "selections": (v6/*: any*/),
                                "storageKey": null
                              },
                              (v4/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v4/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "ordersConnection(buyerState:[\"SUBMITTED\",\"OFFER_RECEIVED\",\"PAYMENT_FAILED\",\"PROCESSING_PAYMENT\",\"PROCESSING_OFFLINE_PAYMENT\",\"APPROVED\",\"SHIPPED\",\"COMPLETED\",\"CANCELED\",\"REFUNDED\",\"DECLINED_BY_SELLER\",\"DECLINED_BY_BUYER\"],first:10,page:1)"
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f368b94fa8d3904898286e6ba11d54f8",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v7/*: any*/),
        "me.ordersConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MeOrdersConnection"
        },
        "me.ordersConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "MeOrdersEdge"
        },
        "me.ordersConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Order"
        },
        "me.ordersConnection.edges.node.buyerState": {
          "enumValues": [
            "APPROVED",
            "CANCELED",
            "COMPLETED",
            "DECLINED_BY_BUYER",
            "DECLINED_BY_SELLER",
            "INCOMPLETE",
            "OFFER_RECEIVED",
            "PAYMENT_FAILED",
            "PROCESSING_OFFLINE_PAYMENT",
            "PROCESSING_PAYMENT",
            "REFUNDED",
            "SHIPPED",
            "SUBMITTED",
            "UNKNOWN"
          ],
          "nullable": true,
          "plural": false,
          "type": "OrderBuyerStateEnum"
        },
        "me.ordersConnection.edges.node.buyerTotal": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "me.ordersConnection.edges.node.buyerTotal.display": (v8/*: any*/),
        "me.ordersConnection.edges.node.code": (v9/*: any*/),
        "me.ordersConnection.edges.node.createdAt": (v8/*: any*/),
        "me.ordersConnection.edges.node.creditCardWalletType": {
          "enumValues": [
            "APPLE_PAY",
            "GOOGLE_PAY"
          ],
          "nullable": true,
          "plural": false,
          "type": "OrderCreditCardWalletTypeEnum"
        },
        "me.ordersConnection.edges.node.deliveryInfo": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "DeliveryInfo"
        },
        "me.ordersConnection.edges.node.deliveryInfo.trackingURL": (v8/*: any*/),
        "me.ordersConnection.edges.node.displayTexts": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "DisplayTexts"
        },
        "me.ordersConnection.edges.node.displayTexts.actionPrompt": (v8/*: any*/),
        "me.ordersConnection.edges.node.displayTexts.stateName": (v9/*: any*/),
        "me.ordersConnection.edges.node.id": (v7/*: any*/),
        "me.ordersConnection.edges.node.internalID": (v7/*: any*/),
        "me.ordersConnection.edges.node.lineItems": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "LineItem"
        },
        "me.ordersConnection.edges.node.lineItems.artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "me.ordersConnection.edges.node.lineItems.artwork.artistNames": (v8/*: any*/),
        "me.ordersConnection.edges.node.lineItems.artwork.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "me.ordersConnection.edges.node.lineItems.artwork.artists.href": (v8/*: any*/),
        "me.ordersConnection.edges.node.lineItems.artwork.artists.id": (v7/*: any*/),
        "me.ordersConnection.edges.node.lineItems.artwork.href": (v8/*: any*/),
        "me.ordersConnection.edges.node.lineItems.artwork.id": (v7/*: any*/),
        "me.ordersConnection.edges.node.lineItems.artwork.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "me.ordersConnection.edges.node.lineItems.artwork.partner.href": (v8/*: any*/),
        "me.ordersConnection.edges.node.lineItems.artwork.partner.id": (v7/*: any*/),
        "me.ordersConnection.edges.node.lineItems.artwork.partner.initials": (v8/*: any*/),
        "me.ordersConnection.edges.node.lineItems.artwork.partner.name": (v8/*: any*/),
        "me.ordersConnection.edges.node.lineItems.artwork.partner.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "me.ordersConnection.edges.node.lineItems.artwork.partner.profile.icon": (v10/*: any*/),
        "me.ordersConnection.edges.node.lineItems.artwork.partner.profile.icon.cropped": (v11/*: any*/),
        "me.ordersConnection.edges.node.lineItems.artwork.partner.profile.icon.cropped.src": (v9/*: any*/),
        "me.ordersConnection.edges.node.lineItems.artwork.partner.profile.icon.cropped.srcSet": (v9/*: any*/),
        "me.ordersConnection.edges.node.lineItems.artwork.partner.profile.id": (v7/*: any*/),
        "me.ordersConnection.edges.node.lineItems.artwork.shippingOrigin": (v8/*: any*/),
        "me.ordersConnection.edges.node.lineItems.artwork.title": (v8/*: any*/),
        "me.ordersConnection.edges.node.lineItems.artworkVersion": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkVersion"
        },
        "me.ordersConnection.edges.node.lineItems.artworkVersion.id": (v7/*: any*/),
        "me.ordersConnection.edges.node.lineItems.artworkVersion.image": (v10/*: any*/),
        "me.ordersConnection.edges.node.lineItems.artworkVersion.image.cropped": (v11/*: any*/),
        "me.ordersConnection.edges.node.lineItems.artworkVersion.image.cropped.src": (v9/*: any*/),
        "me.ordersConnection.edges.node.lineItems.artworkVersion.image.cropped.srcSet": (v9/*: any*/),
        "me.ordersConnection.edges.node.lineItems.id": (v7/*: any*/),
        "me.ordersConnection.edges.node.paymentMethodDetails": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PaymentMethodUnion"
        },
        "me.ordersConnection.edges.node.paymentMethodDetails.__typename": (v9/*: any*/),
        "me.ordersConnection.edges.node.paymentMethodDetails.id": (v7/*: any*/),
        "me.ordersConnection.edges.node.paymentMethodDetails.last4": (v9/*: any*/),
        "me.ordersConnection.edges.node.paymentMethodDetails.lastDigits": (v9/*: any*/),
        "me.ordersConnection.edges.node.pricingBreakdownLines": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "PricingBreakdownLineUnion"
        },
        "me.ordersConnection.edges.node.pricingBreakdownLines.__typename": (v9/*: any*/),
        "me.ordersConnection.edges.node.pricingBreakdownLines.displayName": (v9/*: any*/),
        "me.ordersConnection.edges.node.selectedFulfillmentOption": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FulfillmentOption"
        },
        "me.ordersConnection.edges.node.selectedFulfillmentOption.type": {
          "enumValues": [
            "ARTSY_EXPRESS",
            "ARTSY_STANDARD",
            "ARTSY_WHITE_GLOVE",
            "DOMESTIC_FLAT",
            "INTERNATIONAL_FLAT",
            "PICKUP",
            "SHIPPING_TBD"
          ],
          "nullable": false,
          "plural": false,
          "type": "FulfillmentOptionTypeEnum"
        },
        "me.ordersConnection.edges.node.source": {
          "enumValues": [
            "ARTWORK_PAGE",
            "INQUIRY",
            "PARTNER_OFFER",
            "PRIVATE_SALE"
          ],
          "nullable": false,
          "plural": false,
          "type": "OrderSourceEnum"
        },
        "me.ordersConnection.pageCursors": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageCursors"
        },
        "me.ordersConnection.pageCursors.around": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "PageCursor"
        },
        "me.ordersConnection.pageCursors.around.cursor": (v9/*: any*/),
        "me.ordersConnection.pageCursors.around.isCurrent": (v12/*: any*/),
        "me.ordersConnection.pageCursors.around.page": (v13/*: any*/),
        "me.ordersConnection.pageCursors.first": (v14/*: any*/),
        "me.ordersConnection.pageCursors.first.cursor": (v9/*: any*/),
        "me.ordersConnection.pageCursors.first.isCurrent": (v12/*: any*/),
        "me.ordersConnection.pageCursors.first.page": (v13/*: any*/),
        "me.ordersConnection.pageCursors.last": (v14/*: any*/),
        "me.ordersConnection.pageCursors.last.cursor": (v9/*: any*/),
        "me.ordersConnection.pageCursors.last.isCurrent": (v12/*: any*/),
        "me.ordersConnection.pageCursors.last.page": (v13/*: any*/),
        "me.ordersConnection.pageCursors.previous": (v14/*: any*/),
        "me.ordersConnection.pageCursors.previous.cursor": (v9/*: any*/),
        "me.ordersConnection.pageCursors.previous.page": (v13/*: any*/),
        "me.ordersConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "me.ordersConnection.pageInfo.hasNextPage": (v12/*: any*/),
        "me.ordersConnection.pageInfo.hasPreviousPage": (v12/*: any*/)
      }
    },
    "name": "SettingsOrders_Test_Query",
    "operationKind": "query",
    "text": "query SettingsOrders_Test_Query {\n  me {\n    ...SettingsOrders_me\n    id\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment SettingsOrdersRow_order on Order {\n  source\n  internalID\n  code\n  buyerState\n  createdAt\n  creditCardWalletType\n  displayTexts {\n    stateName\n    actionPrompt\n  }\n  deliveryInfo {\n    trackingURL\n  }\n  selectedFulfillmentOption {\n    type\n  }\n  pricingBreakdownLines {\n    __typename\n    ... on ShippingLine {\n      displayName\n    }\n  }\n  paymentMethodDetails {\n    __typename\n    ... on CreditCard {\n      lastDigits\n      id\n    }\n    ... on BankAccount {\n      last4\n      id\n    }\n    ... on WireTransfer {\n      __typename\n    }\n  }\n  buyerTotal {\n    display\n  }\n  lineItems {\n    artwork {\n      href\n      partner {\n        href\n        initials\n        name\n        profile {\n          icon {\n            cropped(width: 45, height: 45) {\n              src\n              srcSet\n            }\n          }\n          id\n        }\n        id\n      }\n      shippingOrigin\n      title\n      artistNames\n      artists(shallow: true) {\n        href\n        id\n      }\n      id\n    }\n    artworkVersion {\n      image {\n        cropped(width: 45, height: 45) {\n          src\n          srcSet\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment SettingsOrders_me on Me {\n  ordersConnection(first: 10, page: 1, buyerState: [SUBMITTED, OFFER_RECEIVED, PAYMENT_FAILED, PROCESSING_PAYMENT, PROCESSING_OFFLINE_PAYMENT, APPROVED, SHIPPED, COMPLETED, CANCELED, REFUNDED, DECLINED_BY_SELLER, DECLINED_BY_BUYER]) {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        internalID\n        ...SettingsOrdersRow_order\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "05b99d699252894e894960b4619689e1";

export default node;
