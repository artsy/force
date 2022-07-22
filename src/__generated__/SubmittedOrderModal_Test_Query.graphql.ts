/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SubmittedOrderModal_Test_QueryVariables = {};
export type SubmittedOrderModal_Test_QueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"SubmittedOrderModal_me">;
    } | null;
};
export type SubmittedOrderModal_Test_Query = {
    readonly response: SubmittedOrderModal_Test_QueryResponse;
    readonly variables: SubmittedOrderModal_Test_QueryVariables;
};



/*
query SubmittedOrderModal_Test_Query {
  me {
    ...SubmittedOrderModal_me
    id
  }
}

fragment SubmittedOrderModal_me on Me {
  orders(states: [SUBMITTED], mode: OFFER, first: 1, sort: UPDATED_AT_DESC) {
    edges {
      node {
        __typename
        stateExpiresAt(format: "MMM D")
        lineItems {
          edges {
            node {
              artwork {
                slug
                id
              }
              id
            }
          }
        }
        id
      }
    }
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
    "name": "SubmittedOrderModal_Test_Query",
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
            "name": "SubmittedOrderModal_me"
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
    "name": "SubmittedOrderModal_Test_Query",
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
                "name": "first",
                "value": 1
              },
              {
                "kind": "Literal",
                "name": "mode",
                "value": "OFFER"
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "UPDATED_AT_DESC"
              },
              {
                "kind": "Literal",
                "name": "states",
                "value": [
                  "SUBMITTED"
                ]
              }
            ],
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
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "format",
                            "value": "MMM D"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "stateExpiresAt",
                        "storageKey": "stateExpiresAt(format:\"MMM D\")"
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
                                      (v0/*: any*/)
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
                ],
                "storageKey": null
              }
            ],
            "storageKey": "orders(first:1,mode:\"OFFER\",sort:\"UPDATED_AT_DESC\",states:[\"SUBMITTED\"])"
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "81d3b590206adef98199c9443c1eb666",
    "id": null,
    "metadata": {},
    "name": "SubmittedOrderModal_Test_Query",
    "operationKind": "query",
    "text": "query SubmittedOrderModal_Test_Query {\n  me {\n    ...SubmittedOrderModal_me\n    id\n  }\n}\n\nfragment SubmittedOrderModal_me on Me {\n  orders(states: [SUBMITTED], mode: OFFER, first: 1, sort: UPDATED_AT_DESC) {\n    edges {\n      node {\n        __typename\n        stateExpiresAt(format: \"MMM D\")\n        lineItems {\n          edges {\n            node {\n              artwork {\n                slug\n                id\n              }\n              id\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '5123f11edbc981c9aa0d45575fb866ab';
export default node;
