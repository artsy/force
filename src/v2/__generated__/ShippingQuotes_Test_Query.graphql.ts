/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShippingQuotes_Test_QueryVariables = {};
export type ShippingQuotes_Test_QueryResponse = {
    readonly order: {
        readonly lineItems: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly shippingQuoteOptions: {
                        readonly edges: ReadonlyArray<{
                            readonly " $fragmentRefs": FragmentRefs<"ShippingQuotes_shippingQuotes">;
                        } | null> | null;
                    } | null;
                } | null;
            } | null> | null;
        } | null;
    } | null;
};
export type ShippingQuotes_Test_QueryRawResponse = {
    readonly order: ({
        readonly __typename: string | null;
        readonly lineItems: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly shippingQuoteOptions: ({
                        readonly edges: ReadonlyArray<({
                            readonly node: ({
                                readonly id: string;
                                readonly tier: string;
                                readonly name: string | null;
                                readonly isSelected: boolean;
                                readonly price: string | null;
                            }) | null;
                        }) | null> | null;
                    }) | null;
                    readonly id: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type ShippingQuotes_Test_Query = {
    readonly response: ShippingQuotes_Test_QueryResponse;
    readonly variables: ShippingQuotes_Test_QueryVariables;
    readonly rawResponse: ShippingQuotes_Test_QueryRawResponse;
};



/*
query ShippingQuotes_Test_Query {
  order: commerceOrder {
    __typename
    lineItems {
      edges {
        node {
          shippingQuoteOptions {
            edges {
              ...ShippingQuotes_shippingQuotes
            }
          }
          id
        }
      }
    }
    id
  }
}

fragment ShippingQuotes_shippingQuotes on CommerceShippingQuoteEdge {
  node {
    id
    tier
    name
    isSelected
    price(precision: 2)
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
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
    "name": "ShippingQuotes_Test_Query",
    "selections": [
      {
        "alias": "order",
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "commerceOrder",
        "plural": false,
        "selections": [
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
                        "concreteType": "CommerceShippingQuoteConnection",
                        "kind": "LinkedField",
                        "name": "shippingQuoteOptions",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "CommerceShippingQuoteEdge",
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              {
                                "args": null,
                                "kind": "FragmentSpread",
                                "name": "ShippingQuotes_shippingQuotes"
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ShippingQuotes_Test_Query",
    "selections": [
      {
        "alias": "order",
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "commerceOrder",
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
                        "concreteType": "CommerceShippingQuoteConnection",
                        "kind": "LinkedField",
                        "name": "shippingQuoteOptions",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "CommerceShippingQuoteEdge",
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "CommerceShippingQuote",
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  (v0/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "tier",
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
                                    "kind": "ScalarField",
                                    "name": "isSelected",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "precision",
                                        "value": 2
                                      }
                                    ],
                                    "kind": "ScalarField",
                                    "name": "price",
                                    "storageKey": "price(precision:2)"
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
                      (v0/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ShippingQuotes_Test_Query",
    "operationKind": "query",
    "text": "query ShippingQuotes_Test_Query {\n  order: commerceOrder {\n    __typename\n    lineItems {\n      edges {\n        node {\n          shippingQuoteOptions {\n            edges {\n              ...ShippingQuotes_shippingQuotes\n            }\n          }\n          id\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment ShippingQuotes_shippingQuotes on CommerceShippingQuoteEdge {\n  node {\n    id\n    tier\n    name\n    isSelected\n    price(precision: 2)\n  }\n}\n"
  }
};
})();
(node as any).hash = '4dac5e210a9086537685cd4c7fb167e1';
export default node;
