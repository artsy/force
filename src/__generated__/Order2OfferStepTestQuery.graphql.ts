/**
<<<<<<< HEAD
 * @generated SignedSource<<bc8dda9256c775ea955bdddda215188b>>
=======
 * @generated SignedSource<<61de7536de0a6c267816049726834c5a>>
>>>>>>> 7b867dfcae (consolidate some sorting logic, refactor offer step)
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
  "name": "internalID",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
<<<<<<< HEAD
  "name": "__typename",
=======
  "name": "id",
>>>>>>> 7b867dfcae (consolidate some sorting logic, refactor offer step)
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "major",
    "storageKey": null
  }
],
v4 = {
<<<<<<< HEAD
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "maxPrice",
      "plural": false,
      "selections": (v3/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Money",
      "kind": "LinkedField",
      "name": "minPrice",
      "plural": false,
      "selections": (v3/*: any*/),
      "storageKey": null
    }
  ],
  "type": "PriceRange",
  "abstractKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "listPrice",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v4/*: any*/)
  ],
  "storageKey": null
},
v8 = {
=======
>>>>>>> 7b867dfcae (consolidate some sorting logic, refactor offer step)
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
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
  "type": "Boolean"
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
},
<<<<<<< HEAD
v14 = {
=======
v9 = {
>>>>>>> 7b867dfcae (consolidate some sorting logic, refactor offer step)
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
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
                  (v1/*: any*/),
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
                    "name": "currencyCode",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Offer",
                    "kind": "LinkedField",
                    "name": "offers",
                    "plural": true,
                    "selections": [
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
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "note",
                        "storageKey": null
                      },
                      (v2/*: any*/)
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
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "priceDisplay",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isPriceRange",
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
                              (v2/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": (v3/*: any*/),
                                "type": "Money",
                                "abstractKey": null
                              },
<<<<<<< HEAD
                              (v4/*: any*/)
=======
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Money",
                                    "kind": "LinkedField",
                                    "name": "maxPrice",
                                    "plural": false,
                                    "selections": (v3/*: any*/),
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Money",
                                    "kind": "LinkedField",
                                    "name": "minPrice",
                                    "plural": false,
                                    "selections": (v3/*: any*/),
                                    "storageKey": null
                                  }
                                ],
                                "type": "PriceRange",
                                "abstractKey": null
                              }
>>>>>>> 7b867dfcae (consolidate some sorting logic, refactor offer step)
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
                              (v1/*: any*/),
<<<<<<< HEAD
                              (v5/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Money",
                        "kind": "LinkedField",
                        "name": "listPrice",
                        "plural": false,
                        "selections": (v3/*: any*/),
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
                          (v2/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v6/*: any*/),
                              (v7/*: any*/)
                            ],
                            "type": "Artwork",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v6/*: any*/),
                              (v7/*: any*/),
                              (v5/*: any*/)
                            ],
                            "type": "EditionSet",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v5/*: any*/)
                            ],
                            "type": "Node",
                            "abstractKey": "__isNode"
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v5/*: any*/)
                ],
                "storageKey": "order(id:\"order-id\")"
              },
              (v5/*: any*/)
=======
                              (v2/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "price",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
                "storageKey": "order(id:\"order-id\")"
              },
              (v2/*: any*/)
>>>>>>> 7b867dfcae (consolidate some sorting logic, refactor offer step)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
<<<<<<< HEAD
    "cacheID": "ba4f290ec6bb3353a74af3da4146f009",
=======
    "cacheID": "df4b3932cbefd9465ba224043449d02c",
>>>>>>> 7b867dfcae (consolidate some sorting logic, refactor offer step)
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
        "viewer.me.order.currencyCode": (v9/*: any*/),
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
        "viewer.me.order.lineItems.artwork.isPriceHidden": (v10/*: any*/),
        "viewer.me.order.lineItems.artwork.isPriceRange": (v10/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice": (v11/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice.__typename": (v9/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice.major": (v12/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice.maxPrice": (v13/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice.maxPrice.major": (v12/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice.minPrice": (v13/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice.minPrice.major": (v12/*: any*/),
        "viewer.me.order.lineItems.artwork.priceDisplay": (v14/*: any*/),
        "viewer.me.order.lineItems.artwork.slug": (v8/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkOrEditionSetType"
        },
<<<<<<< HEAD
        "viewer.me.order.lineItems.artworkOrEditionSet.__isNode": (v9/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.__typename": (v9/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.id": (v8/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.listPrice": (v11/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.listPrice.__typename": (v9/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.listPrice.maxPrice": (v13/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.listPrice.maxPrice.major": (v12/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.listPrice.minPrice": (v13/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.listPrice.minPrice.major": (v12/*: any*/),
        "viewer.me.order.lineItems.artworkOrEditionSet.price": (v14/*: any*/),
        "viewer.me.order.lineItems.id": (v8/*: any*/),
        "viewer.me.order.lineItems.listPrice": (v13/*: any*/),
        "viewer.me.order.lineItems.listPrice.major": (v12/*: any*/),
=======
        "viewer.me.order.lineItems.artwork.listPrice.__typename": (v5/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice.major": (v7/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice.maxPrice": (v8/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice.maxPrice.major": (v7/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice.minPrice": (v8/*: any*/),
        "viewer.me.order.lineItems.artwork.listPrice.minPrice.major": (v7/*: any*/),
        "viewer.me.order.lineItems.artwork.price": (v9/*: any*/),
        "viewer.me.order.lineItems.artwork.slug": (v4/*: any*/),
        "viewer.me.order.lineItems.id": (v4/*: any*/),
>>>>>>> 7b867dfcae (consolidate some sorting logic, refactor offer step)
        "viewer.me.order.mode": {
          "enumValues": [
            "BUY",
            "OFFER"
          ],
          "nullable": false,
          "plural": false,
          "type": "OrderModeEnum"
        },
        "viewer.me.order.offers": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Offer"
        },
        "viewer.me.order.offers.amount": (v8/*: any*/),
        "viewer.me.order.offers.amount.display": (v9/*: any*/),
        "viewer.me.order.offers.amount.minor": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Long"
        },
        "viewer.me.order.offers.createdAt": (v9/*: any*/),
        "viewer.me.order.offers.id": (v4/*: any*/),
        "viewer.me.order.offers.note": (v9/*: any*/),
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
<<<<<<< HEAD
    "text": "query Order2OfferStepTestQuery {\n  viewer {\n    me {\n      order(id: \"order-id\") {\n        ...Order2OfferStep_order\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment Order2ExactPriceOfferForm_order on Order {\n  currencyCode\n  lineItems {\n    listPrice {\n      major\n    }\n    id\n  }\n}\n\nfragment Order2OfferCompletedView_order on Order {\n  currencyCode\n}\n\nfragment Order2OfferStep_order on Order {\n  internalID\n  mode\n  source\n  currencyCode\n  lineItems {\n    artwork {\n      slug\n      priceDisplay\n      isPriceRange\n      isPriceHidden\n      listPrice {\n        __typename\n        ... on Money {\n          major\n        }\n        ... on PriceRange {\n          maxPrice {\n            major\n          }\n          minPrice {\n            major\n          }\n        }\n      }\n      editionSets {\n        internalID\n        id\n      }\n      id\n    }\n    id\n  }\n  ...Order2ExactPriceOfferForm_order\n  ...Order2PriceRangeOfferForm_order\n  ...Order2OfferCompletedView_order\n}\n\nfragment Order2PriceRangeOfferForm_order on Order {\n  currencyCode\n  lineItems {\n    artworkOrEditionSet {\n      __typename\n      ... on Artwork {\n        price\n        listPrice {\n          __typename\n          ... on PriceRange {\n            maxPrice {\n              major\n            }\n            minPrice {\n              major\n            }\n          }\n        }\n      }\n      ... on EditionSet {\n        price\n        listPrice {\n          __typename\n          ... on PriceRange {\n            maxPrice {\n              major\n            }\n            minPrice {\n              major\n            }\n          }\n        }\n        id\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    id\n  }\n}\n"
=======
    "text": "query Order2OfferStepTestQuery {\n  viewer {\n    me {\n      order(id: \"order-id\") {\n        ...Order2OfferStep_order\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment Order2ExactPriceOfferForm_order on Order {\n  currencyCode\n  lineItems {\n    artwork {\n      price\n      listPrice {\n        __typename\n        ... on Money {\n          major\n        }\n        ... on PriceRange {\n          maxPrice {\n            major\n          }\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment Order2OfferCompletedView_order on Order {\n  currencyCode\n  offers {\n    createdAt\n    note\n    amount {\n      display\n    }\n    id\n  }\n}\n\nfragment Order2OfferStep_order on Order {\n  internalID\n  mode\n  source\n  currencyCode\n  offers {\n    createdAt\n    amount {\n      minor\n    }\n    note\n    id\n  }\n  lineItems {\n    artwork {\n      slug\n      isPriceRange\n      isPriceHidden\n      listPrice {\n        __typename\n        ... on Money {\n          major\n        }\n        ... on PriceRange {\n          maxPrice {\n            major\n          }\n          minPrice {\n            major\n          }\n        }\n      }\n      editionSets {\n        internalID\n        id\n      }\n      id\n    }\n    id\n  }\n  ...Order2ExactPriceOfferForm_order\n  ...Order2PriceRangeOfferForm_order\n  ...Order2OfferCompletedView_order\n}\n\nfragment Order2PriceRangeOfferForm_order on Order {\n  currencyCode\n  lineItems {\n    artwork {\n      price\n      isPriceRange\n      listPrice {\n        __typename\n        ... on PriceRange {\n          maxPrice {\n            major\n          }\n          minPrice {\n            major\n          }\n        }\n      }\n      id\n    }\n    id\n  }\n}\n"
>>>>>>> 7b867dfcae (consolidate some sorting logic, refactor offer step)
  }
};
})();

(node as any).hash = "d01a4aaea0debfbe0dbb59c35918b70b";

export default node;
