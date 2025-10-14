/**
 * @generated SignedSource<<55a248ca85ee8f82a165b2b41220b357>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsOrdersRow_Test_Query$variables = Record<PropertyKey, never>;
export type SettingsOrdersRow_Test_Query$data = {
  readonly me: {
    readonly order: {
      readonly " $fragmentSpreads": FragmentRefs<"SettingsOrdersRow_order">;
    } | null | undefined;
  } | null | undefined;
};
export type SettingsOrdersRow_Test_Query = {
  response: SettingsOrdersRow_Test_Query$data;
  variables: SettingsOrdersRow_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "test-id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v3 = [
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
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsOrdersRow_Test_Query",
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
            "args": (v0/*: any*/),
            "concreteType": "Order",
            "kind": "LinkedField",
            "name": "order",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "SettingsOrdersRow_order"
              }
            ],
            "storageKey": "order(id:\"test-id\")"
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
    "name": "SettingsOrdersRow_Test_Query",
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
            "args": (v0/*: any*/),
            "concreteType": "Order",
            "kind": "LinkedField",
            "name": "order",
            "plural": false,
            "selections": [
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
                "name": "internalID",
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
                "name": "paymentMethodDetails",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  },
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
                      (v1/*: any*/)
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
                      (v1/*: any*/)
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
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
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
                                "selections": (v3/*: any*/),
                                "storageKey": null
                              },
                              (v1/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v1/*: any*/)
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
                          (v2/*: any*/),
                          (v1/*: any*/)
                        ],
                        "storageKey": "artists(shallow:true)"
                      },
                      (v1/*: any*/)
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
                        "selections": (v3/*: any*/),
                        "storageKey": null
                      },
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v1/*: any*/)
                ],
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": "order(id:\"test-id\")"
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "eff629be63877369d866df4eca2ecc57",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v4/*: any*/),
        "me.order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Order"
        },
        "me.order.buyerState": {
          "enumValues": [
            "APPROVED",
            "CANCELLED",
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
        "me.order.buyerTotal": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "me.order.buyerTotal.display": (v5/*: any*/),
        "me.order.code": (v6/*: any*/),
        "me.order.createdAt": (v5/*: any*/),
        "me.order.creditCardWalletType": {
          "enumValues": [
            "APPLE_PAY",
            "GOOGLE_PAY"
          ],
          "nullable": true,
          "plural": false,
          "type": "OrderCreditCardWalletTypeEnum"
        },
        "me.order.deliveryInfo": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "DeliveryInfo"
        },
        "me.order.deliveryInfo.trackingURL": (v5/*: any*/),
        "me.order.displayTexts": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "DisplayTexts"
        },
        "me.order.displayTexts.actionPrompt": (v5/*: any*/),
        "me.order.displayTexts.stateName": (v6/*: any*/),
        "me.order.id": (v4/*: any*/),
        "me.order.internalID": (v4/*: any*/),
        "me.order.lineItems": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "LineItem"
        },
        "me.order.lineItems.artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "me.order.lineItems.artwork.artistNames": (v5/*: any*/),
        "me.order.lineItems.artwork.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "me.order.lineItems.artwork.artists.href": (v5/*: any*/),
        "me.order.lineItems.artwork.artists.id": (v4/*: any*/),
        "me.order.lineItems.artwork.href": (v5/*: any*/),
        "me.order.lineItems.artwork.id": (v4/*: any*/),
        "me.order.lineItems.artwork.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "me.order.lineItems.artwork.partner.href": (v5/*: any*/),
        "me.order.lineItems.artwork.partner.id": (v4/*: any*/),
        "me.order.lineItems.artwork.partner.initials": (v5/*: any*/),
        "me.order.lineItems.artwork.partner.name": (v5/*: any*/),
        "me.order.lineItems.artwork.partner.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "me.order.lineItems.artwork.partner.profile.icon": (v7/*: any*/),
        "me.order.lineItems.artwork.partner.profile.icon.cropped": (v8/*: any*/),
        "me.order.lineItems.artwork.partner.profile.icon.cropped.src": (v6/*: any*/),
        "me.order.lineItems.artwork.partner.profile.icon.cropped.srcSet": (v6/*: any*/),
        "me.order.lineItems.artwork.partner.profile.id": (v4/*: any*/),
        "me.order.lineItems.artwork.shippingOrigin": (v5/*: any*/),
        "me.order.lineItems.artwork.title": (v5/*: any*/),
        "me.order.lineItems.artworkVersion": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkVersion"
        },
        "me.order.lineItems.artworkVersion.id": (v4/*: any*/),
        "me.order.lineItems.artworkVersion.image": (v7/*: any*/),
        "me.order.lineItems.artworkVersion.image.cropped": (v8/*: any*/),
        "me.order.lineItems.artworkVersion.image.cropped.src": (v6/*: any*/),
        "me.order.lineItems.artworkVersion.image.cropped.srcSet": (v6/*: any*/),
        "me.order.lineItems.id": (v4/*: any*/),
        "me.order.paymentMethodDetails": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PaymentMethodUnion"
        },
        "me.order.paymentMethodDetails.__typename": (v6/*: any*/),
        "me.order.paymentMethodDetails.id": (v4/*: any*/),
        "me.order.paymentMethodDetails.isManualPayment": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "me.order.paymentMethodDetails.last4": (v6/*: any*/),
        "me.order.paymentMethodDetails.lastDigits": (v6/*: any*/),
        "me.order.selectedFulfillmentOption": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FulfillmentOption"
        },
        "me.order.selectedFulfillmentOption.type": {
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
        "me.order.source": {
          "enumValues": [
            "ARTWORK_PAGE",
            "INQUIRY",
            "PARTNER_OFFER",
            "PRIVATE_SALE"
          ],
          "nullable": false,
          "plural": false,
          "type": "OrderSourceEnum"
        }
      }
    },
    "name": "SettingsOrdersRow_Test_Query",
    "operationKind": "query",
    "text": "query SettingsOrdersRow_Test_Query {\n  me {\n    order(id: \"test-id\") {\n      ...SettingsOrdersRow_order\n      id\n    }\n    id\n  }\n}\n\nfragment SettingsOrdersRow_order on Order {\n  source\n  internalID\n  code\n  buyerState\n  createdAt\n  creditCardWalletType\n  displayTexts {\n    stateName\n    actionPrompt\n  }\n  deliveryInfo {\n    trackingURL\n  }\n  selectedFulfillmentOption {\n    type\n  }\n  paymentMethodDetails {\n    __typename\n    ... on CreditCard {\n      lastDigits\n      id\n    }\n    ... on BankAccount {\n      last4\n      id\n    }\n    ... on WireTransfer {\n      isManualPayment\n    }\n  }\n  buyerTotal {\n    display\n  }\n  lineItems {\n    artwork {\n      href\n      partner {\n        href\n        initials\n        name\n        profile {\n          icon {\n            cropped(width: 45, height: 45) {\n              src\n              srcSet\n            }\n          }\n          id\n        }\n        id\n      }\n      shippingOrigin\n      title\n      artistNames\n      artists(shallow: true) {\n        href\n        id\n      }\n      id\n    }\n    artworkVersion {\n      image {\n        cropped(width: 45, height: 45) {\n          src\n          srcSet\n        }\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "b78a04ba1b5f325994246a33b5a84497";

export default node;
