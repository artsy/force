/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type BankAccountPickerTestQueryVariables = {};
export type BankAccountPickerTestQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"BankAccountPicker_me">;
    } | null;
    readonly order: {
        readonly " $fragmentRefs": FragmentRefs<"BankAccountPicker_order">;
    } | null;
};
export type BankAccountPickerTestQueryRawResponse = {
    readonly me: ({
        readonly bankAccounts: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly internalID: string;
                    readonly last4: string;
                    readonly id: string;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly id: string;
    }) | null;
    readonly order: ({
        readonly __typename: string;
        readonly __isCommerceOrder: string;
        readonly internalID: string;
        readonly mode: CommerceOrderModeEnum | null;
        readonly bankAccountId: string | null;
        readonly id: string;
    }) | null;
};
export type BankAccountPickerTestQuery = {
    readonly response: BankAccountPickerTestQueryResponse;
    readonly variables: BankAccountPickerTestQueryVariables;
    readonly rawResponse: BankAccountPickerTestQueryRawResponse;
};



/*
query BankAccountPickerTestQuery {
  me {
    ...BankAccountPicker_me
    id
  }
  order: commerceOrder(id: "unused") {
    __typename
    ...BankAccountPicker_order
    id
  }
}

fragment BankAccountPicker_me on Me {
  bankAccounts(first: 100) {
    edges {
      node {
        internalID
        last4
        id
      }
    }
  }
}

fragment BankAccountPicker_order on CommerceOrder {
  __isCommerceOrder: __typename
  internalID
  mode
  bankAccountId
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "unused"
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
  "name": "id",
  "storageKey": null
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "BankAccountPickerTestQuery",
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
            "name": "BankAccountPicker_me"
          }
        ],
        "storageKey": null
      },
      {
        "alias": "order",
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "commerceOrder",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "BankAccountPicker_order"
          }
        ],
        "storageKey": "commerceOrder(id:\"unused\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "BankAccountPickerTestQuery",
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
                "value": 100
              }
            ],
            "concreteType": "BankAccountConnection",
            "kind": "LinkedField",
            "name": "bankAccounts",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "BankAccountEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "BankAccount",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "last4",
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "bankAccounts(first:100)"
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": "order",
        "args": (v0/*: any*/),
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
            "kind": "TypeDiscriminator",
            "abstractKey": "__isCommerceOrder"
          },
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
            "name": "bankAccountId",
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "commerceOrder(id:\"unused\")"
      }
    ]
  },
  "params": {
    "cacheID": "7430acaab389eeb0b3e622920770849b",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.bankAccounts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "BankAccountConnection"
        },
        "me.bankAccounts.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "BankAccountEdge"
        },
        "me.bankAccounts.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "BankAccount"
        },
        "me.bankAccounts.edges.node.id": (v3/*: any*/),
        "me.bankAccounts.edges.node.internalID": (v3/*: any*/),
        "me.bankAccounts.edges.node.last4": (v4/*: any*/),
        "me.id": (v3/*: any*/),
        "order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrder"
        },
        "order.__isCommerceOrder": (v4/*: any*/),
        "order.__typename": (v4/*: any*/),
        "order.bankAccountId": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "order.id": (v3/*: any*/),
        "order.internalID": (v3/*: any*/),
        "order.mode": {
          "enumValues": [
            "BUY",
            "OFFER"
          ],
          "nullable": true,
          "plural": false,
          "type": "CommerceOrderModeEnum"
        }
      }
    },
    "name": "BankAccountPickerTestQuery",
    "operationKind": "query",
    "text": "query BankAccountPickerTestQuery {\n  me {\n    ...BankAccountPicker_me\n    id\n  }\n  order: commerceOrder(id: \"unused\") {\n    __typename\n    ...BankAccountPicker_order\n    id\n  }\n}\n\nfragment BankAccountPicker_me on Me {\n  bankAccounts(first: 100) {\n    edges {\n      node {\n        internalID\n        last4\n        id\n      }\n    }\n  }\n}\n\nfragment BankAccountPicker_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  internalID\n  mode\n  bankAccountId\n}\n"
  }
};
})();
(node as any).hash = '984e3467ab35b04ff9fff3adc200b65e';
export default node;
