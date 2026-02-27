/**
 * @generated SignedSource<<a496213fc1b8bb638ddcc4357daf5df9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2OfferStepTestQuery$variables = Record<PropertyKey, never>;
export type Order2OfferStepTestQuery$data = {
  readonly viewer: {
    readonly me: {
      readonly order: {
        readonly " $fragmentSpreads": FragmentRefs<"Order2OfferStep_order">;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type Order2OfferStepTestQuery = {
  response: Order2OfferStepTestQuery$data;
  variables: Order2OfferStepTestQuery$variables;
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
  "name": "major",
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
  "name": "__typename",
  "storageKey": null
},
v4 = [
  (v1/*: any*/)
],
v5 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "maxPrice",
      "plural": false,
      "selections": (v4/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "minPrice",
      "plural": false,
      "selections": (v4/*: any*/),
      "storageKey": null
    }
  ],
  "type": "PriceRange",
  "abstractKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "listPrice",
  "plural": false,
  "selections": [
    (v3/*: any*/),
    (v5/*: any*/)
  ],
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v10 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ListPrice"
},
v12 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Float"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Money"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "Order2OfferStepTestQuery",
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
                "args": (v0/*: any*/),
                "concreteType": "Order",
                "kind": "LinkedField",
                "name": "order",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "Order2OfferStep_order"
                  }
                ],
                "storageKey": "order(id:\"order-id\")"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "Order2OfferStepTestQuery",
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
                    "name": "mode",
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
                        "name": "amount",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "minor",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "display",
                            "storageKey": null
                          },
                          (v1/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "currencySymbol",
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
                    "kind": "ScalarField",
                    "name": "currencyCode",
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
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "listPrice",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          (v1/*: any*/)
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
                          (v3/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v6/*: any*/)
                            ],
                            "type": "Artwork",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v6/*: any*/),
                              (v2/*: any*/)
                            ],
                            "type": "EditionSet",
                            "abstractKey": null
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
                      },
                      (v2/*: any*/),
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
                            "name": "isPriceHidden",
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
                                "selections": (v4/*: any*/),
                                "type": "Money",
                                "abstractKey": null
                              },
                              (v5/*: any*/)
                            ],
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
                              (v7/*: any*/),
                              (v2/*: any*/)
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
                  (v7/*: any*/),
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
                  (v2/*: any*/)
                ],
                "storageKey": "order(id:\"order-id\")"
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8f915a8590b4c395149f912a664f2085",
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
        "viewer.me.id": (v8/*: any*/),
        "viewer.me.order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Order"
        },
        "viewer.me.order.buyerStateExpiresAt": (v9/*: any*/),
        "viewer.me.order.currencyCode": (v10/*: any*/),
        "viewer.me.order.currencySymbol": (v10/*: any*/),
        "viewer.me.order.id": (v8/*: any*/),
        "viewer.me.order.internalID": (v8/*: any*/),
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
        "viewer.me.order.lineItems.artwork.editionSets": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "EditionSet"
        },
        "viewer.me.order.lineItems.artwork.editionSets.id": (v8/*: any*/),
        "viewer.me.order.lineItems.artwork.editionSets.internalID": (v8/*: any*/),
        "viewer.me.order.lineItems.artwork.id": (v8/*: any*/),
        "viewer.me.order.lineItems.artwork.isPriceHidden": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "viewer.me.order.lineItems.artwork.listPrice": (v11/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice.__typename": (v10/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice.major": (v12/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice.maxPrice": (v13/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice.maxPrice.major": (v12/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice.minPrice": (v13/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice.minPrice.major": (v12/*: any*/),
        "viewer.me.order.lineItems.artwork.slug": (v8/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkOrEditionSetType"
        },
        "viewer.me.order.lineItems.artworkOrEditionSet.__isNode": (v10/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.__typename": (v10/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.id": (v8/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.listPrice": (v11/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.listPrice.__typename": (v10/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.listPrice.maxPrice": (v13/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.listPrice.maxPrice.major": (v12/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.listPrice.minPrice": (v13/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.listPrice.minPrice.major": (v12/*: any*/),
        "viewer.me.order.lineItems.id": (v8/*: any*/),
        "viewer.me.order.lineItems.listPrice": (v13/*: any*/),
        "viewer.me.order.lineItems.listPrice.__typename": (v10/*: any*/),
        "viewer.me.order.lineItems.listPrice.major": (v12/*: any*/),
        "viewer.me.order.mode": {
          "enumValues": [
            "BUY",
            "OFFER"
          ],
          "nullable": false,
          "plural": false,
          "type": "OrderModeEnum"
        },
        "viewer.me.order.pendingOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Offer"
        },
        "viewer.me.order.pendingOffer.amount": (v13/*: any*/),
        "viewer.me.order.pendingOffer.amount.display": (v9/*: any*/),
        "viewer.me.order.pendingOffer.amount.major": (v12/*: any*/),
        "viewer.me.order.pendingOffer.amount.minor": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Long"
        },
        "viewer.me.order.pendingOffer.id": (v8/*: any*/),
        "viewer.me.order.pendingOffer.note": (v9/*: any*/),
        "viewer.me.order.selectedFulfillmentOption": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FulfillmentOption"
        },
        "viewer.me.order.selectedFulfillmentOption.type": {
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
        }
      }
    },
    "name": "Order2OfferStepTestQuery",
    "operationKind": "query",
    "text": "query Order2OfferStepTestQuery {\n  viewer {\n    me {\n      order(id: \"order-id\") {\n        ...Order2OfferStep_order\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment OfferInput_order on Order {\n  currencySymbol\n}\n\nfragment Order2OfferOptions_order on Order {\n  ...OfferInput_order\n  source\n  buyerStateExpiresAt\n  currencyCode\n  lineItems {\n    listPrice {\n      __typename\n      major\n    }\n    artworkOrEditionSet {\n      __typename\n      ... on Artwork {\n        listPrice {\n          __typename\n          ... on PriceRange {\n            maxPrice {\n              major\n            }\n            minPrice {\n              major\n            }\n          }\n        }\n      }\n      ... on EditionSet {\n        listPrice {\n          __typename\n          ... on PriceRange {\n            maxPrice {\n              major\n            }\n            minPrice {\n              major\n            }\n          }\n        }\n        id\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    id\n  }\n}\n\nfragment Order2OfferStep_order on Order {\n  ...useCompleteOfferData_order\n  ...Order2OfferOptions_order\n  ...OfferInput_order\n  internalID\n  mode\n  source\n  currencyCode\n  selectedFulfillmentOption {\n    type\n  }\n  pendingOffer {\n    amount {\n      display\n      major\n    }\n    note\n    id\n  }\n  lineItems {\n    artwork {\n      slug\n      isPriceHidden\n      listPrice {\n        __typename\n        ... on Money {\n          major\n        }\n        ... on PriceRange {\n          maxPrice {\n            major\n          }\n          minPrice {\n            major\n          }\n        }\n      }\n      editionSets {\n        internalID\n        id\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment useCompleteOfferData_order on Order {\n  mode\n  pendingOffer {\n    note\n    amount {\n      minor\n      display\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "d01a4aaea0debfbe0dbb59c35918b70b";

export default node;
