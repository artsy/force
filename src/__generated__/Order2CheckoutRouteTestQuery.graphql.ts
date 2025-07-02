/**
 * @generated SignedSource<<57b1e93fb9dbd63a42de0eb98d2211c4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2CheckoutRouteTestQuery$variables = Record<PropertyKey, never>;
export type Order2CheckoutRouteTestQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"Order2CheckoutRoute_viewer">;
  } | null | undefined;
};
export type Order2CheckoutRouteTestQuery = {
  response: Order2CheckoutRouteTestQuery$data;
  variables: Order2CheckoutRouteTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "Money",
  "kind": "LinkedField",
  "name": "amount",
  "plural": false,
  "selections": [
    (v2/*: any*/)
  ],
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "dimensions",
  "kind": "LinkedField",
  "name": "dimensions",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "in",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "cm",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v9 = {
  "kind": "InlineFragment",
  "selections": [
    (v4/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "minor",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currencyCode",
  "storageKey": null
},
v12 = [
  (v10/*: any*/),
  (v11/*: any*/),
  (v2/*: any*/)
],
v13 = [
  (v10/*: any*/),
  (v2/*: any*/)
],
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayName",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amountFallbackText",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "concreteType": "Money",
  "kind": "LinkedField",
  "name": "amount",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "amount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currencySymbol",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v17 = [
  (v14/*: any*/),
  (v15/*: any*/),
  (v16/*: any*/)
],
v18 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v20 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Money"
},
v21 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v22 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Long"
},
v23 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v24 = {
  "enumValues": [
    "DOMESTIC_FLAT",
    "INTERNATIONAL_FLAT",
    "PICKUP",
    "SHIPPING_TBD"
  ],
  "nullable": false,
  "plural": false,
  "type": "FulfillmentOptionTypeEnum"
},
v25 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v26 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "Order2CheckoutRouteTestQuery",
    "selections": [
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
                "kind": "Literal",
                "name": "orderID",
                "value": "order-id"
              }
            ],
            "kind": "FragmentSpread",
            "name": "Order2CheckoutRoute_viewer"
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
    "name": "Order2CheckoutRouteTestQuery",
    "selections": [
      {
        "alias": null,
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
                "args": [
                  {
                    "kind": "Literal",
                    "name": "id",
                    "value": "order-id"
                  }
                ],
                "concreteType": "Order",
                "kind": "LinkedField",
                "name": "order",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "mode",
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
                    "name": "buyerStateExpiresAt",
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
                      (v1/*: any*/),
                      (v3/*: any*/)
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
                        "concreteType": "ArtworkVersion",
                        "kind": "LinkedField",
                        "name": "artworkVersion",
                        "plural": false,
                        "selections": [
                          (v0/*: any*/),
                          (v4/*: any*/),
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
                            "kind": "ScalarField",
                            "name": "date",
                            "storageKey": null
                          },
                          {
                            "alias": "thumbnail",
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
                                    "value": 200
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "version",
                                    "value": [
                                      "square"
                                    ]
                                  }
                                ],
                                "concreteType": "ResizedImageUrl",
                                "kind": "LinkedField",
                                "name": "resized",
                                "plural": false,
                                "selections": (v5/*: any*/),
                                "storageKey": "resized(height:200,version:[\"square\"])"
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
                                "name": "shortDescription",
                                "storageKey": null
                              },
                              (v4/*: any*/)
                            ],
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
                                  {
                                    "kind": "Literal",
                                    "name": "height",
                                    "value": 138
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 185
                                  }
                                ],
                                "concreteType": "ResizedImageUrl",
                                "kind": "LinkedField",
                                "name": "resized",
                                "plural": false,
                                "selections": (v5/*: any*/),
                                "storageKey": "resized(height:138,width:185)"
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "kind": "LinkedField",
                        "name": "artwork",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "slug",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isFixedShippingFeeOnly",
                            "storageKey": null
                          },
                          (v4/*: any*/),
                          (v0/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "artworkOrEditionSet",
                        "plural": false,
                        "selections": [
                          (v6/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v7/*: any*/),
                              (v8/*: any*/)
                            ],
                            "type": "Artwork",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v7/*: any*/),
                              (v8/*: any*/),
                              (v4/*: any*/)
                            ],
                            "type": "EditionSet",
                            "abstractKey": null
                          },
                          (v9/*: any*/)
                        ],
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
                    "name": "fulfillmentOptions",
                    "plural": true,
                    "selections": [
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "amount",
                        "plural": false,
                        "selections": [
                          (v10/*: any*/),
                          (v11/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "selected",
                        "storageKey": null
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
                    "selections": (v12/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "itemsTotal",
                    "plural": false,
                    "selections": (v12/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "shippingTotal",
                    "plural": false,
                    "selections": (v13/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "taxTotal",
                    "plural": false,
                    "selections": (v13/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "availableShippingCountries",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "FulfillmentDetails",
                    "kind": "LinkedField",
                    "name": "fulfillmentDetails",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "addressLine1",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "addressLine2",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "city",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "postalCode",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "region",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "country",
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
                        "concreteType": "PhoneNumberType",
                        "kind": "LinkedField",
                        "name": "phoneNumber",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "countryCode",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "regionCode",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "originalNumber",
                            "storageKey": null
                          },
                          (v2/*: any*/)
                        ],
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
                    "name": "seller",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "PartnerMerchantAccount",
                            "kind": "LinkedField",
                            "name": "merchantAccount",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "externalId",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "Partner",
                        "abstractKey": null
                      },
                      (v9/*: any*/)
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
                      (v6/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": (v17/*: any*/),
                        "type": "ShippingLine",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v17/*: any*/),
                        "type": "TaxLine",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v14/*: any*/),
                          (v16/*: any*/)
                        ],
                        "type": "SubtotalLine",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v14/*: any*/),
                          (v15/*: any*/),
                          (v3/*: any*/)
                        ],
                        "type": "TotalLine",
                        "abstractKey": null
                      }
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
                  (v4/*: any*/)
                ],
                "storageKey": "order(id:\"order-id\")"
              },
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 10
                  }
                ],
                "concreteType": "UserAddressConnection",
                "kind": "LinkedField",
                "name": "addressConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserAddressEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "UserAddress",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v0/*: any*/),
                          (v4/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "addressConnection(first:10)"
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "88d85b74c34d55da7a10530b5269270e",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "viewer.me.addressConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "UserAddressConnection"
        },
        "viewer.me.addressConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "UserAddressEdge"
        },
        "viewer.me.addressConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "UserAddress"
        },
        "viewer.me.addressConnection.edges.node.id": (v18/*: any*/),
        "viewer.me.addressConnection.edges.node.internalID": (v18/*: any*/),
        "viewer.me.id": (v18/*: any*/),
        "viewer.me.order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Order"
        },
        "viewer.me.order.availableShippingCountries": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "String"
        },
        "viewer.me.order.buyerStateExpiresAt": (v19/*: any*/),
        "viewer.me.order.buyerTotal": (v20/*: any*/),
        "viewer.me.order.buyerTotal.currencyCode": (v21/*: any*/),
        "viewer.me.order.buyerTotal.display": (v19/*: any*/),
        "viewer.me.order.buyerTotal.minor": (v22/*: any*/),
        "viewer.me.order.fulfillmentDetails": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FulfillmentDetails"
        },
        "viewer.me.order.fulfillmentDetails.addressLine1": (v19/*: any*/),
        "viewer.me.order.fulfillmentDetails.addressLine2": (v19/*: any*/),
        "viewer.me.order.fulfillmentDetails.city": (v19/*: any*/),
        "viewer.me.order.fulfillmentDetails.country": (v19/*: any*/),
        "viewer.me.order.fulfillmentDetails.name": (v19/*: any*/),
        "viewer.me.order.fulfillmentDetails.phoneNumber": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PhoneNumberType"
        },
        "viewer.me.order.fulfillmentDetails.phoneNumber.countryCode": (v19/*: any*/),
        "viewer.me.order.fulfillmentDetails.phoneNumber.display": (v19/*: any*/),
        "viewer.me.order.fulfillmentDetails.phoneNumber.originalNumber": (v19/*: any*/),
        "viewer.me.order.fulfillmentDetails.phoneNumber.regionCode": (v19/*: any*/),
        "viewer.me.order.fulfillmentDetails.postalCode": (v19/*: any*/),
        "viewer.me.order.fulfillmentDetails.region": (v19/*: any*/),
        "viewer.me.order.fulfillmentOptions": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "FulfillmentOption"
        },
        "viewer.me.order.fulfillmentOptions.amount": (v20/*: any*/),
        "viewer.me.order.fulfillmentOptions.amount.currencyCode": (v21/*: any*/),
        "viewer.me.order.fulfillmentOptions.amount.minor": (v22/*: any*/),
        "viewer.me.order.fulfillmentOptions.selected": (v23/*: any*/),
        "viewer.me.order.fulfillmentOptions.type": (v24/*: any*/),
        "viewer.me.order.id": (v18/*: any*/),
        "viewer.me.order.internalID": (v18/*: any*/),
        "viewer.me.order.itemsTotal": (v20/*: any*/),
        "viewer.me.order.itemsTotal.currencyCode": (v21/*: any*/),
        "viewer.me.order.itemsTotal.display": (v19/*: any*/),
        "viewer.me.order.itemsTotal.minor": (v22/*: any*/),
        "viewer.me.order.lineItems": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "LineItem"
        },
        "viewer.me.order.lineItems.artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "viewer.me.order.lineItems.artwork.id": (v18/*: any*/),
        "viewer.me.order.lineItems.artwork.internalID": (v18/*: any*/),
        "viewer.me.order.lineItems.artwork.isFixedShippingFeeOnly": (v23/*: any*/),
        "viewer.me.order.lineItems.artwork.slug": (v18/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkOrEditionSetType"
        },
        "viewer.me.order.lineItems.artworkOrEditionSet.__isNode": (v21/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.__typename": (v21/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.dimensions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "dimensions"
        },
        "viewer.me.order.lineItems.artworkOrEditionSet.dimensions.cm": (v19/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.dimensions.in": (v19/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.id": (v18/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.price": (v19/*: any*/),
        "viewer.me.order.lineItems.artworkVersion": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkVersion"
        },
        "viewer.me.order.lineItems.artworkVersion.artistNames": (v19/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "viewer.me.order.lineItems.artworkVersion.attributionClass.id": (v18/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.attributionClass.shortDescription": (v19/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.date": (v19/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.id": (v18/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.image": (v25/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.image.resized": (v26/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.image.resized.url": (v21/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.internalID": (v18/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.thumbnail": (v25/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.thumbnail.resized": (v26/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.thumbnail.resized.url": (v21/*: any*/),
        "viewer.me.order.lineItems.artworkVersion.title": (v19/*: any*/),
        "viewer.me.order.lineItems.id": (v18/*: any*/),
        "viewer.me.order.mode": {
          "enumValues": [
            "BUY",
            "OFFER"
          ],
          "nullable": false,
          "plural": false,
          "type": "OrderModeEnum"
        },
        "viewer.me.order.pricingBreakdownLines": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "PricingBreakdownLineUnion"
        },
        "viewer.me.order.pricingBreakdownLines.__typename": (v21/*: any*/),
        "viewer.me.order.pricingBreakdownLines.amount": (v20/*: any*/),
        "viewer.me.order.pricingBreakdownLines.amount.amount": (v19/*: any*/),
        "viewer.me.order.pricingBreakdownLines.amount.currencySymbol": (v19/*: any*/),
        "viewer.me.order.pricingBreakdownLines.amount.display": (v19/*: any*/),
        "viewer.me.order.pricingBreakdownLines.amountFallbackText": (v19/*: any*/),
        "viewer.me.order.pricingBreakdownLines.displayName": (v21/*: any*/),
        "viewer.me.order.selectedFulfillmentOption": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FulfillmentOption"
        },
        "viewer.me.order.selectedFulfillmentOption.amount": (v20/*: any*/),
        "viewer.me.order.selectedFulfillmentOption.amount.display": (v19/*: any*/),
        "viewer.me.order.selectedFulfillmentOption.type": (v24/*: any*/),
        "viewer.me.order.seller": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SellerType"
        },
        "viewer.me.order.seller.__isNode": (v21/*: any*/),
        "viewer.me.order.seller.__typename": (v21/*: any*/),
        "viewer.me.order.seller.id": (v18/*: any*/),
        "viewer.me.order.seller.merchantAccount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerMerchantAccount"
        },
        "viewer.me.order.seller.merchantAccount.externalId": (v21/*: any*/),
        "viewer.me.order.shippingOrigin": (v19/*: any*/),
        "viewer.me.order.shippingTotal": (v20/*: any*/),
        "viewer.me.order.shippingTotal.display": (v19/*: any*/),
        "viewer.me.order.shippingTotal.minor": (v22/*: any*/),
        "viewer.me.order.source": {
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
        "viewer.me.order.taxTotal": (v20/*: any*/),
        "viewer.me.order.taxTotal.display": (v19/*: any*/),
        "viewer.me.order.taxTotal.minor": (v22/*: any*/)
      }
    },
    "name": "Order2CheckoutRouteTestQuery",
    "operationKind": "query",
    "text": "query Order2CheckoutRouteTestQuery {\n  viewer {\n    ...Order2CheckoutRoute_viewer_oauVf\n  }\n}\n\nfragment Order2CheckoutApp_order on Order {\n  internalID\n  fulfillmentOptions {\n    type\n  }\n  mode\n  lineItems {\n    artwork {\n      slug\n      isFixedShippingFeeOnly\n      id\n    }\n    id\n  }\n  ...Order2ExpressCheckout_order\n  ...Order2CollapsibleOrderSummary_order\n  ...Order2FulfillmentDetailsStep_order\n  ...Order2DeliveryOptionsStep_order\n  ...Order2PaymentStep_order\n  ...Order2ReviewStep_order\n  ...Order2CheckoutLoadingSkeleton_order\n  ...Order2HelpLinks_order\n}\n\nfragment Order2CheckoutContext_order on Order {\n  internalID\n  mode\n  source\n  buyerStateExpiresAt\n  selectedFulfillmentOption {\n    type\n  }\n  lineItems {\n    artworkVersion {\n      internalID\n      id\n    }\n    id\n  }\n}\n\nfragment Order2CheckoutLoadingSkeleton_order on Order {\n  buyerTotal {\n    display\n  }\n  itemsTotal {\n    display\n  }\n  lineItems {\n    artworkVersion {\n      title\n      artistNames\n      date\n      id\n    }\n    id\n  }\n}\n\nfragment Order2CheckoutPricingBreakdown_order on Order {\n  source\n  buyerStateExpiresAt\n  pricingBreakdownLines {\n    __typename\n    ... on ShippingLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TaxLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on SubtotalLine {\n      displayName\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TotalLine {\n      displayName\n      amountFallbackText\n      amount {\n        display\n      }\n    }\n  }\n}\n\nfragment Order2CheckoutRoute_viewer_oauVf on Viewer {\n  me {\n    order(id: \"order-id\") {\n      internalID\n      ...Order2CheckoutContext_order\n      ...Order2CheckoutApp_order\n      id\n    }\n    addressConnection(first: 10) {\n      edges {\n        node {\n          internalID\n          id\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment Order2CollapsibleOrderSummary_order on Order {\n  ...Order2CheckoutPricingBreakdown_order\n  source\n  buyerTotal {\n    display\n  }\n  itemsTotal {\n    display\n  }\n  shippingTotal {\n    display\n  }\n  taxTotal {\n    display\n  }\n  lineItems {\n    artwork {\n      slug\n      id\n    }\n    artworkVersion {\n      title\n      artistNames\n      date\n      thumbnail: image {\n        resized(height: 200, version: [\"square\"]) {\n          url\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment Order2DeliveryForm_order on Order {\n  internalID\n}\n\nfragment Order2DeliveryOptionsStep_order on Order {\n  internalID\n  selectedFulfillmentOption {\n    type\n    amount {\n      display\n    }\n  }\n}\n\nfragment Order2ExpressCheckoutUI_order on Order {\n  internalID\n  source\n  mode\n  buyerTotal {\n    minor\n    currencyCode\n  }\n  itemsTotal {\n    minor\n  }\n  shippingTotal {\n    minor\n  }\n  taxTotal {\n    minor\n  }\n  availableShippingCountries\n  fulfillmentOptions {\n    type\n    amount {\n      minor\n      currencyCode\n    }\n    selected\n  }\n  fulfillmentDetails {\n    addressLine1\n    addressLine2\n    city\n    postalCode\n    region\n    country\n    name\n  }\n  lineItems {\n    artwork {\n      internalID\n      slug\n      id\n    }\n    id\n  }\n}\n\nfragment Order2ExpressCheckout_order on Order {\n  ...Order2ExpressCheckoutUI_order\n  availableShippingCountries\n  buyerTotal {\n    minor\n    currencyCode\n  }\n  itemsTotal {\n    minor\n    currencyCode\n  }\n  seller {\n    __typename\n    ... on Partner {\n      merchantAccount {\n        externalId\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment Order2FulfillmentDetailsCompletedView_order on Order {\n  fulfillmentDetails {\n    addressLine1\n    addressLine2\n    city\n    country\n    name\n    postalCode\n    region\n    phoneNumber {\n      display\n    }\n  }\n  selectedFulfillmentOption {\n    type\n  }\n  shippingOrigin\n}\n\nfragment Order2FulfillmentDetailsStep_order on Order {\n  ...Order2PickupForm_order\n  ...Order2DeliveryForm_order\n  ...Order2FulfillmentDetailsCompletedView_order\n  id\n  fulfillmentDetails {\n    phoneNumber {\n      countryCode\n      regionCode\n      originalNumber\n    }\n    addressLine1\n    addressLine2\n    city\n    country\n    name\n    postalCode\n    region\n  }\n  selectedFulfillmentOption {\n    type\n  }\n  fulfillmentOptions {\n    type\n    selected\n  }\n}\n\nfragment Order2HelpLinks_order on Order {\n  internalID\n  mode\n  source\n}\n\nfragment Order2PaymentForm_order on Order {\n  mode\n  source\n  internalID\n  itemsTotal {\n    minor\n    currencyCode\n  }\n  seller {\n    __typename\n    ... on Partner {\n      merchantAccount {\n        externalId\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment Order2PaymentStep_order on Order {\n  ...Order2PaymentForm_order\n  internalID\n  buyerTotal {\n    minor\n    currencyCode\n  }\n  itemsTotal {\n    minor\n    currencyCode\n  }\n  shippingTotal {\n    minor\n  }\n  taxTotal {\n    minor\n  }\n  seller {\n    __typename\n    ... on Partner {\n      merchantAccount {\n        externalId\n      }\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment Order2PickupForm_order on Order {\n  internalID\n  fulfillmentOptions {\n    type\n  }\n  selectedFulfillmentOption {\n    type\n  }\n  fulfillmentDetails {\n    phoneNumber {\n      countryCode\n      regionCode\n      originalNumber\n    }\n  }\n}\n\nfragment Order2ReviewStep_order on Order {\n  ...Order2CheckoutPricingBreakdown_order\n  internalID\n  mode\n  source\n  buyerTotal {\n    display\n  }\n  itemsTotal {\n    display\n  }\n  shippingTotal {\n    display\n  }\n  taxTotal {\n    display\n  }\n  lineItems {\n    artwork {\n      slug\n      id\n    }\n    artworkOrEditionSet {\n      __typename\n      ... on Artwork {\n        price\n        dimensions {\n          in\n          cm\n        }\n      }\n      ... on EditionSet {\n        price\n        dimensions {\n          in\n          cm\n        }\n        id\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    artworkVersion {\n      title\n      artistNames\n      date\n      attributionClass {\n        shortDescription\n        id\n      }\n      image {\n        resized(width: 185, height: 138) {\n          url\n        }\n      }\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "3e89dbf0c313ecb53327bf9900bf4641";

export default node;
