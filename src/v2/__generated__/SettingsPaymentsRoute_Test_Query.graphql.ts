/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

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

fragment SettingsPaymentsMethod_method on CreditCard {
  internalID
  name
  brand
  lastDigits
  expirationYear
  expirationMonth
}

fragment SettingsPaymentsMethods_me on Me {
  creditCards(first: 50) {
    edges {
      node {
        internalID
        ...SettingsPaymentsMethod_method
        id
      }
    }
  }
}

fragment SettingsPaymentsRoute_me on Me {
  ...SettingsPaymentsMethods_me
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
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v2 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
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
    "type": "Query",
    "abstractKey": null
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
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 50
              }
            ],
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "internalID",
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
                      (v0/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "creditCards(first:50)"
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2d2697a9f4da55a32e1fbb21966f5fd7",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.creditCards": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CreditCardConnection"
        },
        "me.creditCards.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CreditCardEdge"
        },
        "me.creditCards.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CreditCard"
        },
        "me.creditCards.edges.node.brand": (v1/*: any*/),
        "me.creditCards.edges.node.expirationMonth": (v2/*: any*/),
        "me.creditCards.edges.node.expirationYear": (v2/*: any*/),
        "me.creditCards.edges.node.id": (v3/*: any*/),
        "me.creditCards.edges.node.internalID": (v3/*: any*/),
        "me.creditCards.edges.node.lastDigits": (v1/*: any*/),
        "me.creditCards.edges.node.name": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "me.id": (v3/*: any*/)
      }
    },
    "name": "SettingsPaymentsRoute_Test_Query",
    "operationKind": "query",
    "text": "query SettingsPaymentsRoute_Test_Query {\n  me {\n    ...SettingsPaymentsRoute_me\n    id\n  }\n}\n\nfragment SettingsPaymentsMethod_method on CreditCard {\n  internalID\n  name\n  brand\n  lastDigits\n  expirationYear\n  expirationMonth\n}\n\nfragment SettingsPaymentsMethods_me on Me {\n  creditCards(first: 50) {\n    edges {\n      node {\n        internalID\n        ...SettingsPaymentsMethod_method\n        id\n      }\n    }\n  }\n}\n\nfragment SettingsPaymentsRoute_me on Me {\n  ...SettingsPaymentsMethods_me\n}\n"
  }
};
})();
(node as any).hash = '73b60cd9c1fbcbb4eb7a82a9168985d9';
export default node;
