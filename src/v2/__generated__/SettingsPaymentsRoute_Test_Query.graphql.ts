/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsPaymentsRoute_Test_QueryVariables = {};
export type SettingsPaymentsRoute_Test_QueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"SettingsPaymentsRoute_me">;
    } | null;
};
export type SettingsPaymentsRoute_Test_Query = {
    readonly response: SettingsPaymentsRoute_Test_QueryResponse;
    readonly variables: SettingsPaymentsRoute_Test_QueryVariables;
};



/*
query SettingsPaymentsRoute_Test_Query {
  me {
    ...SettingsPaymentsRoute_me
    id
  }
}

fragment PaymentSection_me on Me {
  id
  internalID
  creditCards(first: 100) {
    edges {
      node {
        id
        internalID
        brand
        lastDigits
        expirationYear
        expirationMonth
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}

fragment SettingsPaymentsRoute_me on Me {
  ...PaymentSection_me
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 100
  }
],
v3 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v4 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v5 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": false
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SettingsPaymentsRoute_Test_Query",
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
            "name": "SettingsPaymentsRoute_me"
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
    "name": "SettingsPaymentsRoute_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "CreditCardConnection",
            "kind": "LinkedField",
            "name": "creditCards",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CreditCardEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CreditCard",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/),
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "brand",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "lastDigits",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "expirationYear",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "expirationMonth",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "creditCards(first:100)"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "filters": [],
            "handle": "connection",
            "key": "PaymentSection_creditCards",
            "kind": "LinkedHandle",
            "name": "creditCards"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "type": "Me",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.id": (v3/*: any*/),
        "me.internalID": (v3/*: any*/),
        "me.creditCards": {
          "type": "CreditCardConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.creditCards.edges": {
          "type": "CreditCardEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "me.creditCards.pageInfo": {
          "type": "PageInfo",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "me.creditCards.edges.node": {
          "type": "CreditCard",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.creditCards.edges.node.id": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.creditCards.edges.cursor": (v4/*: any*/),
        "me.creditCards.pageInfo.endCursor": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.creditCards.pageInfo.hasNextPage": {
          "type": "Boolean",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "me.creditCards.edges.node.internalID": (v3/*: any*/),
        "me.creditCards.edges.node.brand": (v4/*: any*/),
        "me.creditCards.edges.node.lastDigits": (v4/*: any*/),
        "me.creditCards.edges.node.expirationYear": (v5/*: any*/),
        "me.creditCards.edges.node.expirationMonth": (v5/*: any*/),
        "me.creditCards.edges.node.__typename": (v4/*: any*/)
      }
    },
    "name": "SettingsPaymentsRoute_Test_Query",
    "operationKind": "query",
    "text": "query SettingsPaymentsRoute_Test_Query {\n  me {\n    ...SettingsPaymentsRoute_me\n    id\n  }\n}\n\nfragment PaymentSection_me on Me {\n  id\n  internalID\n  creditCards(first: 100) {\n    edges {\n      node {\n        id\n        internalID\n        brand\n        lastDigits\n        expirationYear\n        expirationMonth\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment SettingsPaymentsRoute_me on Me {\n  ...PaymentSection_me\n}\n"
  }
};
})();
(node as any).hash = '73b60cd9c1fbcbb4eb7a82a9168985d9';
export default node;
