/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PriceOptions_Test_QueryVariables = {};
export type PriceOptions_Test_QueryResponse = {
    readonly me: {
        readonly orders: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly " $fragmentRefs": FragmentRefs<"PriceOptions_order">;
                } | null;
            } | null> | null;
        } | null;
    } | null;
};
export type PriceOptions_Test_Query = {
    readonly response: PriceOptions_Test_QueryResponse;
    readonly variables: PriceOptions_Test_QueryVariables;
};



/*
query PriceOptions_Test_Query {
  me {
    orders(first: 10) {
      edges {
        node {
          __typename
          ...PriceOptions_order
          id
        }
      }
    }
    id
  }
}

fragment PriceOptions_order on CommerceOrder {
  __isCommerceOrder: __typename
  internalID
  currencyCode
  lineItems {
    edges {
      node {
        artworkOrEditionSet {
          __typename
          ... on Artwork {
            displayPriceRange
            listPrice {
              __typename
              ... on Money {
                major
              }
              ... on PriceRange {
                maxPrice {
                  major
                }
                minPrice {
                  major
                }
              }
            }
          }
          ... on EditionSet {
            internalID
            price
            displayPriceRange
            listPrice {
              __typename
              ... on Money {
                major
              }
              ... on PriceRange {
                maxPrice {
                  major
                }
                minPrice {
                  major
                }
              }
            }
            id
          }
          ... on Node {
            __isNode: __typename
            id
          }
        }
        id
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
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
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayPriceRange",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "major",
    "storageKey": null
  }
],
v5 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "listPrice",
  "plural": false,
  "selections": [
    (v1/*: any*/),
    {
      "kind": "InlineFragment",
      "selections": (v4/*: any*/),
      "type": "Money",
      "abstractKey": null
    },
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
    }
  ],
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PriceOptions_Test_Query",
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
            "concreteType": "CommerceOrderConnectionWithTotalCount",
            "kind": "LinkedField",
            "name": "orders",
            "plural": false,
            "selections": [
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
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "PriceOptions_order"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "orders(first:10)"
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
    "name": "PriceOptions_Test_Query",
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
            "concreteType": "CommerceOrderConnectionWithTotalCount",
            "kind": "LinkedField",
            "name": "orders",
            "plural": false,
            "selections": [
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
                      (v1/*: any*/),
                      {
                        "kind": "TypeDiscriminator",
                        "abstractKey": "__isCommerceOrder"
                      },
                      (v2/*: any*/),
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
                        "concreteType": "CommerceLineItemConnection",
                        "kind": "LinkedField",
                        "name": "lineItems",
                        "plural": false,
                        "selections": [
                          {
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
                                    "concreteType": null,
                                    "kind": "LinkedField",
                                    "name": "artworkOrEditionSet",
                                    "plural": false,
                                    "selections": [
                                      (v1/*: any*/),
                                      {
                                        "kind": "InlineFragment",
                                        "selections": [
                                          (v3/*: any*/),
                                          (v5/*: any*/)
                                        ],
                                        "type": "Artwork",
                                        "abstractKey": null
                                      },
                                      {
                                        "kind": "InlineFragment",
                                        "selections": [
                                          (v2/*: any*/),
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "price",
                                            "storageKey": null
                                          },
                                          (v3/*: any*/),
                                          (v5/*: any*/),
                                          (v6/*: any*/)
                                        ],
                                        "type": "EditionSet",
                                        "abstractKey": null
                                      },
                                      {
                                        "kind": "InlineFragment",
                                        "selections": [
                                          (v6/*: any*/)
                                        ],
                                        "type": "Node",
                                        "abstractKey": "__isNode"
                                      }
                                    ],
                                    "storageKey": null
                                  },
                                  (v6/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "orders(first:10)"
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6bc1f658deaf9767241632c100a69e30",
    "id": null,
    "metadata": {},
    "name": "PriceOptions_Test_Query",
    "operationKind": "query",
    "text": "query PriceOptions_Test_Query {\n  me {\n    orders(first: 10) {\n      edges {\n        node {\n          __typename\n          ...PriceOptions_order\n          id\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment PriceOptions_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  internalID\n  currencyCode\n  lineItems {\n    edges {\n      node {\n        artworkOrEditionSet {\n          __typename\n          ... on Artwork {\n            displayPriceRange\n            listPrice {\n              __typename\n              ... on Money {\n                major\n              }\n              ... on PriceRange {\n                maxPrice {\n                  major\n                }\n                minPrice {\n                  major\n                }\n              }\n            }\n          }\n          ... on EditionSet {\n            internalID\n            price\n            displayPriceRange\n            listPrice {\n              __typename\n              ... on Money {\n                major\n              }\n              ... on PriceRange {\n                maxPrice {\n                  major\n                }\n                minPrice {\n                  major\n                }\n              }\n            }\n            id\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '2d8cd1b4b540fd0b89ac825ef1f2a6fd';
export default node;
