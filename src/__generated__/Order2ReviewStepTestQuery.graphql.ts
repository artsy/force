/**
 * @generated SignedSource<<9cff24d0b558c64d448fe716323836a3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2ReviewStepTestQuery$variables = Record<PropertyKey, never>;
export type Order2ReviewStepTestQuery$data = {
  readonly me: {
    readonly order: {
      readonly __typename: "Order";
      readonly " $fragmentSpreads": FragmentRefs<"Order2ReviewStep_order">;
    } | null | undefined;
  } | null | undefined;
};
export type Order2ReviewStepTestQuery = {
  response: Order2ReviewStepTestQuery$data;
  variables: Order2ReviewStepTestQuery$variables;
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
  "name": "__typename",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayName",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amountFallbackText",
  "storageKey": null
},
v4 = {
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
v5 = [
  (v2/*: any*/),
  (v3/*: any*/),
  (v4/*: any*/)
],
v6 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v7 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "pricingBreakdownLines",
  "plural": true,
  "selections": [
    (v1/*: any*/),
    {
      "kind": "InlineFragment",
      "selections": (v5/*: any*/),
      "type": "ShippingLine",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v5/*: any*/),
      "type": "TaxLine",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v2/*: any*/),
        (v4/*: any*/)
      ],
      "type": "SubtotalLine",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v2/*: any*/),
        (v3/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "amount",
          "plural": false,
          "selections": (v6/*: any*/),
          "storageKey": null
        }
      ],
      "type": "TotalLine",
      "abstractKey": null
    }
  ],
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v11 = {
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
v12 = [
  (v8/*: any*/)
],
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
v15 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v16 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v18 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Money"
},
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
},
v20 = {
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
    "name": "Order2ReviewStepTestQuery",
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
              (v1/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Order2ReviewStep_order"
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
    "name": "Order2ReviewStepTestQuery",
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
              (v1/*: any*/),
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
                "kind": "ScalarField",
                "name": "buyerStateExpiresAt",
                "storageKey": null
              },
              (v7/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Offer",
                "kind": "LinkedField",
                "name": "pendingOffer",
                "plural": false,
                "selections": [
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/)
                ],
                "storageKey": null
              },
              (v9/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "stripeConfirmationToken",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "paymentMethod",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "buyerTotal",
                "plural": false,
                "selections": (v6/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "itemsTotal",
                "plural": false,
                "selections": (v6/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "shippingTotal",
                "plural": false,
                "selections": (v6/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Money",
                "kind": "LinkedField",
                "name": "taxTotal",
                "plural": false,
                "selections": (v6/*: any*/),
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
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "artworkOrEditionSet",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v10/*: any*/),
                          (v11/*: any*/)
                        ],
                        "type": "Artwork",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v10/*: any*/),
                          (v11/*: any*/),
                          (v8/*: any*/)
                        ],
                        "type": "EditionSet",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v12/*: any*/),
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
                          (v8/*: any*/)
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
                      (v8/*: any*/)
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
                      (v9/*: any*/),
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
                          (v1/*: any*/),
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
                            "selections": (v12/*: any*/),
                            "type": "Video",
                            "abstractKey": null
                          }
                        ],
                        "storageKey": "figures(includeAll:false)"
                      },
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v8/*: any*/)
                ],
                "storageKey": null
              },
              (v8/*: any*/)
            ],
            "storageKey": "order(id:\"order-id\")"
          },
          (v8/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "11d89e2db502993b63cd7f8473ef8524",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v15/*: any*/),
        "me.order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Order"
        },
        "me.order.__typename": (v16/*: any*/),
        "me.order.buyerStateExpiresAt": (v17/*: any*/),
        "me.order.buyerTotal": (v18/*: any*/),
        "me.order.buyerTotal.display": (v17/*: any*/),
        "me.order.id": (v15/*: any*/),
        "me.order.internalID": (v15/*: any*/),
        "me.order.itemsTotal": (v18/*: any*/),
        "me.order.itemsTotal.display": (v17/*: any*/),
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
        "me.order.lineItems.artwork.figures.__typename": (v16/*: any*/),
        "me.order.lineItems.artwork.figures.id": (v15/*: any*/),
        "me.order.lineItems.artwork.figures.resized": (v19/*: any*/),
        "me.order.lineItems.artwork.figures.resized.url": (v16/*: any*/),
        "me.order.lineItems.artwork.id": (v15/*: any*/),
        "me.order.lineItems.artwork.internalID": (v15/*: any*/),
        "me.order.lineItems.artworkOrEditionSet": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkOrEditionSetType"
        },
        "me.order.lineItems.artworkOrEditionSet.__isNode": (v16/*: any*/),
        "me.order.lineItems.artworkOrEditionSet.__typename": (v16/*: any*/),
        "me.order.lineItems.artworkOrEditionSet.dimensions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "dimensions"
        },
        "me.order.lineItems.artworkOrEditionSet.dimensions.cm": (v17/*: any*/),
        "me.order.lineItems.artworkOrEditionSet.dimensions.in": (v17/*: any*/),
        "me.order.lineItems.artworkOrEditionSet.id": (v15/*: any*/),
        "me.order.lineItems.artworkOrEditionSet.price": (v17/*: any*/),
        "me.order.lineItems.artworkVersion": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkVersion"
        },
        "me.order.lineItems.artworkVersion.artistNames": (v17/*: any*/),
        "me.order.lineItems.artworkVersion.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "me.order.lineItems.artworkVersion.attributionClass.id": (v15/*: any*/),
        "me.order.lineItems.artworkVersion.attributionClass.shortDescription": (v17/*: any*/),
        "me.order.lineItems.artworkVersion.date": (v17/*: any*/),
        "me.order.lineItems.artworkVersion.id": (v15/*: any*/),
        "me.order.lineItems.artworkVersion.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "me.order.lineItems.artworkVersion.image.resized": (v19/*: any*/),
        "me.order.lineItems.artworkVersion.image.resized.url": (v16/*: any*/),
        "me.order.lineItems.artworkVersion.image.url": (v17/*: any*/),
        "me.order.lineItems.artworkVersion.title": (v17/*: any*/),
        "me.order.lineItems.id": (v15/*: any*/),
        "me.order.mode": {
          "enumValues": [
            "BUY",
            "OFFER"
          ],
          "nullable": false,
          "plural": false,
          "type": "OrderModeEnum"
        },
        "me.order.paymentMethod": {
          "enumValues": [
            "CREDIT_CARD",
            "SEPA_DEBIT",
            "US_BANK_ACCOUNT",
            "WIRE_TRANSFER"
          ],
          "nullable": true,
          "plural": false,
          "type": "OrderPaymentMethodEnum"
        },
        "me.order.pendingOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Offer"
        },
        "me.order.pendingOffer.id": (v15/*: any*/),
        "me.order.pendingOffer.internalID": (v15/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines": (v20/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.__typename": (v16/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.amount": (v18/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.amount.amount": (v17/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.amount.currencySymbol": (v17/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.amount.display": (v17/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.amountFallbackText": (v17/*: any*/),
        "me.order.pendingOffer.pricingBreakdownLines.displayName": (v16/*: any*/),
        "me.order.pricingBreakdownLines": (v20/*: any*/),
        "me.order.pricingBreakdownLines.__typename": (v16/*: any*/),
        "me.order.pricingBreakdownLines.amount": (v18/*: any*/),
        "me.order.pricingBreakdownLines.amount.amount": (v17/*: any*/),
        "me.order.pricingBreakdownLines.amount.currencySymbol": (v17/*: any*/),
        "me.order.pricingBreakdownLines.amount.display": (v17/*: any*/),
        "me.order.pricingBreakdownLines.amountFallbackText": (v17/*: any*/),
        "me.order.pricingBreakdownLines.displayName": (v16/*: any*/),
        "me.order.shippingTotal": (v18/*: any*/),
        "me.order.shippingTotal.display": (v17/*: any*/),
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
        },
        "me.order.stripeConfirmationToken": (v17/*: any*/),
        "me.order.taxTotal": (v18/*: any*/),
        "me.order.taxTotal.display": (v17/*: any*/)
      }
    },
    "name": "Order2ReviewStepTestQuery",
    "operationKind": "query",
    "text": "query Order2ReviewStepTestQuery {\n  me {\n    order(id: \"order-id\") {\n      __typename\n      ...Order2ReviewStep_order\n      id\n    }\n    id\n  }\n}\n\nfragment Order2CheckoutPricingBreakdown_order on Order {\n  source\n  mode\n  buyerStateExpiresAt\n  pricingBreakdownLines {\n    __typename\n    ... on ShippingLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TaxLine {\n      displayName\n      amountFallbackText\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on SubtotalLine {\n      displayName\n      amount {\n        amount\n        currencySymbol\n      }\n    }\n    ... on TotalLine {\n      displayName\n      amountFallbackText\n      amount {\n        display\n      }\n    }\n  }\n  pendingOffer {\n    pricingBreakdownLines {\n      __typename\n      ... on ShippingLine {\n        displayName\n        amountFallbackText\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on TaxLine {\n        displayName\n        amountFallbackText\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on SubtotalLine {\n        displayName\n        amount {\n          amount\n          currencySymbol\n        }\n      }\n      ... on TotalLine {\n        displayName\n        amountFallbackText\n        amount {\n          display\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment Order2ReviewStep_order on Order {\n  ...Order2CheckoutPricingBreakdown_order\n  internalID\n  mode\n  source\n  stripeConfirmationToken\n  paymentMethod\n  buyerTotal {\n    display\n  }\n  itemsTotal {\n    display\n  }\n  shippingTotal {\n    display\n  }\n  taxTotal {\n    display\n  }\n  lineItems {\n    artworkOrEditionSet {\n      __typename\n      ... on Artwork {\n        price\n        dimensions {\n          in\n          cm\n        }\n      }\n      ... on EditionSet {\n        price\n        dimensions {\n          in\n          cm\n        }\n        id\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    artworkVersion {\n      title\n      artistNames\n      date\n      attributionClass {\n        shortDescription\n        id\n      }\n      image {\n        url\n        resized(width: 185, height: 138) {\n          url\n        }\n      }\n      id\n    }\n    artwork {\n      internalID\n      figures(includeAll: false) {\n        __typename\n        ... on Image {\n          resized(width: 185, height: 138) {\n            url\n          }\n        }\n        ... on Video {\n          id\n        }\n      }\n      id\n    }\n    id\n  }\n  pendingOffer {\n    internalID\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "4a387b49b63fce975175d8f9ce25ca3f";

export default node;
