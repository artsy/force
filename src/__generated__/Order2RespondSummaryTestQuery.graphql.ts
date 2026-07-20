/**
 * @generated SignedSource<<8fa0b08889c70057a0f6b9667c4055ee>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2RespondSummaryTestQuery$variables = Record<PropertyKey, never>;
export type Order2RespondSummaryTestQuery$data = {
  readonly me: {
    readonly order: {
      readonly " $fragmentSpreads": FragmentRefs<"Order2RespondContext_order" | "Order2RespondForm_order" | "Order2RespondSummary_order">;
    } | null | undefined;
  } | null | undefined;
};
export type Order2RespondSummaryTestQuery = {
  response: Order2RespondSummaryTestQuery$data;
  variables: Order2RespondSummaryTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "order-id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
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
  "name": "major",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currencySymbol",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amount",
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
  "name": "displayName",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amountFallbackText",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "Money",
  "kind": "LinkedField",
  "name": "amount",
  "plural": false,
  "selections": [
    (v6/*: any*/),
    (v5/*: any*/)
  ],
  "storageKey": null
},
v11 = [
  (v8/*: any*/),
  (v9/*: any*/),
  (v10/*: any*/)
],
v12 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "pricingBreakdownLines",
  "plural": true,
  "selections": [
    (v7/*: any*/),
    {
      "kind": "InlineFragment",
      "selections": (v11/*: any*/),
      "type": "ShippingLine",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v11/*: any*/),
      "type": "TaxLine",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v8/*: any*/),
        (v10/*: any*/)
      ],
      "type": "SubtotalLine",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v8/*: any*/),
        (v9/*: any*/),
        {
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
              "name": "display",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "type": "TotalLine",
      "abstractKey": null
    }
  ],
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v14 = {
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
  "selections": [
    (v13/*: any*/)
  ],
  "storageKey": "resized(height:138,width:185)"
},
v15 = [
  (v2/*: any*/)
],
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v17 = [
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
v18 = {
  "alias": null,
  "args": null,
  "concreteType": "dimensions",
  "kind": "LinkedField",
  "name": "dimensions",
  "plural": false,
  "selections": (v17/*: any*/),
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "concreteType": "dimensions",
  "kind": "LinkedField",
  "name": "framedDimensions",
  "plural": false,
  "selections": (v17/*: any*/),
  "storageKey": null
},
v20 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v21 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v22 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Offer"
},
v23 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Money"
},
v24 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v25 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Float"
},
v26 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
},
v27 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "dimensions"
},
v28 = {
  "enumValues": null,
  "nullable": false,
  "plural": true,
  "type": "PricingBreakdownLineUnion"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "Order2RespondSummaryTestQuery",
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
                "name": "Order2RespondContext_order"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Order2RespondForm_order"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Order2RespondSummary_order"
              }
            ],
            "storageKey": "order(id:\"order-id\")"
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
    "name": "Order2RespondSummaryTestQuery",
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
                "name": "mode",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Offer",
                "kind": "LinkedField",
                "name": "lastSubmittedOffer",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "amount",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "currencyCode",
                        "storageKey": null
                      },
                      (v5/*: any*/),
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Offer",
                "kind": "LinkedField",
                "name": "pendingOffer",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Money",
                    "kind": "LinkedField",
                    "name": "amount",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v12/*: any*/),
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
                      (v2/*: any*/),
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Partner",
                        "kind": "LinkedField",
                        "name": "partner",
                        "plural": false,
                        "selections": [
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
                            "kind": "ScalarField",
                            "name": "href",
                            "storageKey": null
                          },
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "includeAll",
                            "value": false
                          }
                        ],
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "figures",
                        "plural": true,
                        "selections": [
                          (v7/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v14/*: any*/)
                            ],
                            "type": "Image",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v15/*: any*/),
                            "type": "Video",
                            "abstractKey": null
                          }
                        ],
                        "storageKey": "figures(includeAll:false)"
                      }
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "artworkOrEditionSet",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v16/*: any*/),
                          (v18/*: any*/),
                          (v19/*: any*/)
                        ],
                        "type": "Artwork",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v16/*: any*/),
                          (v18/*: any*/),
                          (v19/*: any*/),
                          (v2/*: any*/)
                        ],
                        "type": "EditionSet",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v15/*: any*/),
                        "type": "Node",
                        "abstractKey": "__isNode"
                      }
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
                          (v2/*: any*/)
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
                          (v13/*: any*/),
                          (v14/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v3/*: any*/),
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
                "name": "buyerStateExpiresAt",
                "storageKey": null
              },
              (v12/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": "order(id:\"order-id\")"
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e93166bfd8e26be07d77d025cf1e848a",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v20/*: any*/),
        "me.order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Order"
        },
        "me.order.buyerState": {
          "enumValues": [
            "APPROVED",
            "CANCELED",
            "COMPLETED",
            "COUNTEROFFER_SENT",
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
        "me.order.buyerStateExpiresAt": (v21/*: any*/),
        "me.order.id": (v20/*: any*/),
        "me.order.internalID": (v20/*: any*/),
        "me.order.lastSubmittedOffer": (v22/*: any*/),
        "me.order.lastSubmittedOffer.amount": (v23/*: any*/),
        "me.order.lastSubmittedOffer.amount.amount": (v21/*: any*/),
        "me.order.lastSubmittedOffer.amount.currencyCode": (v24/*: any*/),
        "me.order.lastSubmittedOffer.amount.currencySymbol": (v21/*: any*/),
        "me.order.lastSubmittedOffer.amount.major": (v25/*: any*/),
        "me.order.lastSubmittedOffer.createdAt": (v21/*: any*/),
        "me.order.lastSubmittedOffer.id": (v20/*: any*/),
        "me.order.lastSubmittedOffer.internalID": (v20/*: any*/),
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
        "me.order.lineItems.artwork.figures": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArtworkFigures"
        },
        "me.order.lineItems.artwork.figures.__typename": (v24/*: any*/),
        "me.order.lineItems.artwork.figures.id": (v20/*: any*/),
        "me.order.lineItems.artwork.figures.resized": (v26/*: any*/),
        "me.order.lineItems.artwork.figures.resized.url": (v24/*: any*/),
        "me.order.lineItems.artwork.id": (v20/*: any*/),
        "me.order.lineItems.artwork.internalID": (v20/*: any*/),
        "me.order.lineItems.artwork.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "me.order.lineItems.artwork.partner.href": (v21/*: any*/),
        "me.order.lineItems.artwork.partner.id": (v20/*: any*/),
        "me.order.lineItems.artwork.partner.name": (v21/*: any*/),
        "me.order.lineItems.artwork.slug": (v20/*: any*/),
        "me.order.lineItems.artworkOrEditionSet": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkOrEditionSetType"
        },
        "me.order.lineItems.artworkOrEditionSet.__isNode": (v24/*: any*/),
        "me.order.lineItems.artworkOrEditionSet.__typename": (v24/*: any*/),
        "me.order.lineItems.artworkOrEditionSet.dimensions": (v27/*: any*/),
        "me.order.lineItems.artworkOrEditionSet.dimensions.cm": (v21/*: any*/),
        "me.order.lineItems.artworkOrEditionSet.dimensions.in": (v21/*: any*/),
        "me.order.lineItems.artworkOrEditionSet.framedDimensions": (v27/*: any*/),
        "me.order.lineItems.artworkOrEditionSet.framedDimensions.cm": (v21/*: any*/),
        "me.order.lineItems.artworkOrEditionSet.framedDimensions.in": (v21/*: any*/),
        "me.order.lineItems.artworkOrEditionSet.id": (v20/*: any*/),
        "me.order.lineItems.artworkOrEditionSet.price": (v21/*: any*/),
        "me.order.lineItems.artworkVersion": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkVersion"
        },
        "me.order.lineItems.artworkVersion.artistNames": (v21/*: any*/),
        "me.order.lineItems.artworkVersion.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "me.order.lineItems.artworkVersion.attributionClass.id": (v20/*: any*/),
        "me.order.lineItems.artworkVersion.attributionClass.shortDescription": (v21/*: any*/),
        "me.order.lineItems.artworkVersion.date": (v21/*: any*/),
        "me.order.lineItems.artworkVersion.id": (v20/*: any*/),
        "me.order.lineItems.artworkVersion.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "me.order.lineItems.artworkVersion.image.resized": (v26/*: any*/),
        "me.order.lineItems.artworkVersion.image.resized.url": (v24/*: any*/),
        "me.order.lineItems.artworkVersion.image.url": (v21/*: any*/),
        "me.order.lineItems.artworkVersion.title": (v21/*: any*/),
        "me.order.lineItems.id": (v20/*: any*/),
        "me.order.mode": {
          "enumValues": [
            "BUY",
            "OFFER"
          ],
          "nullable": false,
          "plural": false,
          "type": "OrderModeEnum"
        },
        "me.order.pendingOffer": (v22/*: any*/),
        "me.order.pendingOffer.amount": (v23/*: any*/),
        "me.order.pendingOffer.amount.major": (v25/*: any*/),
        "me.order.pendingOffer.createdAt": (v21/*: any*/),
        "me.order.pendingOffer.id": (v20/*: any*/),
        "me.order.pendingOffer.internalID": (v20/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines": (v28/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.__typename": (v24/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.amount": (v23/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.amount.amount": (v21/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.amount.currencySymbol": (v21/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.amount.display": (v21/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.amountFallbackText": (v21/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.displayName": (v24/*: any*/),
        "me.order.pricingBreakdownLines": (v28/*: any*/),
        "me.order.pricingBreakdownLines.__typename": (v24/*: any*/),
        "me.order.pricingBreakdownLines.amount": (v23/*: any*/),
        "me.order.pricingBreakdownLines.amount.amount": (v21/*: any*/),
        "me.order.pricingBreakdownLines.amount.currencySymbol": (v21/*: any*/),
        "me.order.pricingBreakdownLines.amount.display": (v21/*: any*/),
        "me.order.pricingBreakdownLines.amountFallbackText": (v21/*: any*/),
        "me.order.pricingBreakdownLines.displayName": (v24/*: any*/),
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
    "name": "Order2RespondSummaryTestQuery",
    "operationKind": "query",
    "text": "query Order2RespondSummaryTestQuery {\n  me {\n    order(id: \"order-id\") {\n      ...Order2RespondContext_order\n      ...Order2RespondForm_order\n      ...Order2RespondSummary_order\n      id\n    }\n    id\n  }\n}\n\nfragment Order2OrderSummary_order on Order {\n  ...Order2PricingBreakdown_order\n}\n\nfragment Order2PricingBreakdown_order on Order {\n  source\n  mode\n  buyerState\n  buyerStateExpiresAt\n  pricingBreakdownLines {\n    __typename\n    ... on ShippingLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TaxLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on SubtotalLine {\n      displayName\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TotalLine {\n      displayName\n      amountFallbackText\n      amount {\n        display\n      }\n    }\n  }\n  pendingOffer {\n    pricingBreakdownLines {\n      __typename\n      ... on ShippingLine {\n        displayName\n        amountFallbackText\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on TaxLine {\n        displayName\n        amountFallbackText\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on SubtotalLine {\n        displayName\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on TotalLine {\n        displayName\n        amountFallbackText\n        amount {\n          display\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment Order2RespondContext_order on Order {\n  source\n  mode\n  lastSubmittedOffer {\n    createdAt\n    id\n  }\n  pendingOffer {\n    createdAt\n    id\n  }\n  lineItems {\n    artwork {\n      slug\n      id\n    }\n    id\n  }\n}\n\nfragment Order2RespondForm_order on Order {\n  internalID\n  lastSubmittedOffer {\n    internalID\n    amount {\n      major\n      currencyCode\n      currencySymbol\n      amount\n    }\n    id\n  }\n  pendingOffer {\n    amount {\n      major\n    }\n    id\n  }\n  ...Order2RespondOfferDetails_order\n}\n\nfragment Order2RespondOfferDetails_order on Order {\n  ...Order2PricingBreakdown_order\n}\n\nfragment Order2RespondSummary_order on Order {\n  ...Order2OrderSummary_order\n  internalID\n  lastSubmittedOffer {\n    internalID\n    id\n  }\n  pendingOffer {\n    internalID\n    id\n  }\n  lineItems {\n    ...useOrder2LineItemData_lineItem\n    id\n  }\n}\n\nfragment useOrder2LineItemData_lineItem on LineItem {\n  artworkOrEditionSet {\n    __typename\n    ... on Artwork {\n      price\n      dimensions {\n        in\n        cm\n      }\n      framedDimensions {\n        in\n        cm\n      }\n    }\n    ... on EditionSet {\n      price\n      dimensions {\n        in\n        cm\n      }\n      framedDimensions {\n        in\n        cm\n      }\n      id\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n  artworkVersion {\n    title\n    artistNames\n    date\n    attributionClass {\n      shortDescription\n      id\n    }\n    image {\n      url\n      resized(width: 185, height: 138) {\n        url\n      }\n    }\n    id\n  }\n  artwork {\n    internalID\n    partner {\n      name\n      href\n      id\n    }\n    figures(includeAll: false) {\n      __typename\n      ... on Image {\n        resized(width: 185, height: 138) {\n          url\n        }\n      }\n      ... on Video {\n        id\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "4c38851b904ac59cc6e500024d7168f1";

export default node;
