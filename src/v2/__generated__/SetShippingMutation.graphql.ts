/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderFulfillmentTypeEnum = "PICKUP" | "SHIP" | "SHIP_ARTA" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type CommerceSetShippingInput = {
    clientMutationId?: string | null;
    fulfillmentType: CommerceOrderFulfillmentTypeEnum;
    id: string;
    phoneNumber?: string | null;
    shipping?: CommerceShippingAttributes | null;
};
export type CommerceShippingAttributes = {
    addressLine1?: string | null;
    addressLine2?: string | null;
    city?: string | null;
    country?: string | null;
    name?: string | null;
    phoneNumber?: string | null;
    postalCode?: string | null;
    region?: string | null;
};
export type SetShippingMutationVariables = {
    input: CommerceSetShippingInput;
};
export type SetShippingMutationResponse = {
    readonly commerceSetShipping: {
        readonly orderOrError: {
            readonly __typename: "CommerceOrderWithMutationSuccess";
            readonly order?: {
                readonly internalID: string;
                readonly state: CommerceOrderStateEnum;
                readonly requestedFulfillment: ({
                    readonly __typename: "CommerceShip";
                    readonly name: string | null;
                    readonly addressLine1: string | null;
                    readonly addressLine2: string | null;
                    readonly city: string | null;
                    readonly region: string | null;
                    readonly country: string | null;
                    readonly postalCode: string | null;
                    readonly phoneNumber: string | null;
                } | {
                    readonly __typename: "CommerceShipArta";
                    readonly name: string | null;
                    readonly addressLine1: string | null;
                    readonly addressLine2: string | null;
                    readonly city: string | null;
                    readonly region: string | null;
                    readonly country: string | null;
                    readonly postalCode: string | null;
                    readonly phoneNumber: string | null;
                } | {
                    /*This will never be '%other', but we need some
                    value in case none of the concrete values match.*/
                    readonly __typename: "%other";
                }) | null;
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
            };
            readonly error?: {
                readonly type: string;
                readonly code: string;
                readonly data: string | null;
            };
        };
    } | null;
};
export type SetShippingMutation = {
    readonly response: SetShippingMutationResponse;
    readonly variables: SetShippingMutationVariables;
};



/*
mutation SetShippingMutation(
  $input: CommerceSetShippingInput!
) {
  commerceSetShipping(input: $input) {
    orderOrError {
      __typename
      ... on CommerceOrderWithMutationSuccess {
        __typename
        order {
          __typename
          internalID
          state
          requestedFulfillment {
            __typename
            ... on CommerceShip {
              name
              addressLine1
              addressLine2
              city
              region
              country
              postalCode
              phoneNumber
            }
            ... on CommerceShipArta {
              name
              addressLine1
              addressLine2
              city
              region
              country
              postalCode
              phoneNumber
            }
          }
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
      ... on CommerceOrderWithMutationFailure {
        error {
          type
          code
          data
        }
      }
    }
  }
}

fragment ShippingQuotes_shippingQuotes on CommerceShippingQuoteEdge {
  node {
    id
    isSelected
    price(precision: 2)
    priceCents
    typeName
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
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
  "name": "state",
  "storageKey": null
},
v5 = [
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
    "name": "postalCode",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "phoneNumber",
    "storageKey": null
  }
],
v6 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "requestedFulfillment",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    {
      "kind": "InlineFragment",
      "selections": (v5/*: any*/),
      "type": "CommerceShip",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v5/*: any*/),
      "type": "CommerceShipArta",
      "abstractKey": null
    }
  ],
  "storageKey": null
},
v7 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CommerceApplicationError",
      "kind": "LinkedField",
      "name": "error",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "type",
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
          "name": "data",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CommerceOrderWithMutationFailure",
  "abstractKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SetShippingMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceSetShippingPayload",
        "kind": "LinkedField",
        "name": "commerceSetShipping",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "orderOrError",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "order",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v6/*: any*/),
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
                "type": "CommerceOrderWithMutationSuccess",
                "abstractKey": null
              },
              (v7/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SetShippingMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceSetShippingPayload",
        "kind": "LinkedField",
        "name": "commerceSetShipping",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "orderOrError",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "order",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v6/*: any*/),
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
                                              (v8/*: any*/),
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
                                              },
                                              {
                                                "alias": null,
                                                "args": null,
                                                "kind": "ScalarField",
                                                "name": "priceCents",
                                                "storageKey": null
                                              },
                                              {
                                                "alias": null,
                                                "args": null,
                                                "kind": "ScalarField",
                                                "name": "typeName",
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
                                  },
                                  (v8/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "CommerceOrderWithMutationSuccess",
                "abstractKey": null
              },
              (v7/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "62a32d99e6cab8f40c665305a1f4d041",
    "id": null,
    "metadata": {},
    "name": "SetShippingMutation",
    "operationKind": "mutation",
    "text": "mutation SetShippingMutation(\n  $input: CommerceSetShippingInput!\n) {\n  commerceSetShipping(input: $input) {\n    orderOrError {\n      __typename\n      ... on CommerceOrderWithMutationSuccess {\n        __typename\n        order {\n          __typename\n          internalID\n          state\n          requestedFulfillment {\n            __typename\n            ... on CommerceShip {\n              name\n              addressLine1\n              addressLine2\n              city\n              region\n              country\n              postalCode\n              phoneNumber\n            }\n            ... on CommerceShipArta {\n              name\n              addressLine1\n              addressLine2\n              city\n              region\n              country\n              postalCode\n              phoneNumber\n            }\n          }\n          lineItems {\n            edges {\n              node {\n                shippingQuoteOptions {\n                  edges {\n                    ...ShippingQuotes_shippingQuotes\n                  }\n                }\n                id\n              }\n            }\n          }\n          id\n        }\n      }\n      ... on CommerceOrderWithMutationFailure {\n        error {\n          type\n          code\n          data\n        }\n      }\n    }\n  }\n}\n\nfragment ShippingQuotes_shippingQuotes on CommerceShippingQuoteEdge {\n  node {\n    id\n    isSelected\n    price(precision: 2)\n    priceCents\n    typeName\n  }\n}\n"
  }
};
})();
(node as any).hash = '7278954f3f024afafd026b74cb1fa65e';
export default node;
