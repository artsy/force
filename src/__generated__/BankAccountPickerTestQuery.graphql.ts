/**
 * @generated SignedSource<<4a4de0accc2ec062710c2fee16bef2b5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type BankAccountPickerTestQuery$variables = Record<PropertyKey, never>;
export type BankAccountPickerTestQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"BankAccountPicker_me">;
  } | null | undefined;
  readonly order: {
    readonly " $fragmentSpreads": FragmentRefs<"BankAccountPicker_order">;
  } | null | undefined;
};
export type BankAccountPickerTestQuery$rawResponse = {
  readonly me: {
    readonly bankAccounts: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
          readonly internalID: string;
          readonly last4: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
    readonly id: string;
  } | null | undefined;
  readonly order: {
    readonly __typename: string;
    readonly __isCommerceOrder: string;
    readonly bankAccountId: string | null | undefined;
    readonly id: string;
    readonly internalID: string;
    readonly mode: CommerceOrderModeEnum | null | undefined;
    readonly paymentMethodDetails: {
      readonly __typename: "BankAccount";
      readonly id: string;
      readonly internalID: string;
      readonly last4: string;
    } | {
      readonly __typename: "CreditCard";
      readonly id: string;
    } | {
      readonly __typename: string;
    } | null | undefined;
  } | null | undefined;
};
export type BankAccountPickerTestQuery = {
  rawResponse: BankAccountPickerTestQuery$rawResponse;
  response: BankAccountPickerTestQuery$data;
  variables: BankAccountPickerTestQuery$variables;
};

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
v3 = [
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
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v6 = {
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
                    "selections": (v3/*: any*/),
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
          (v4/*: any*/),
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
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "paymentMethodDetails",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v3/*: any*/),
                "type": "BankAccount",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/)
                ],
                "type": "CreditCard",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": "commerceOrder(id:\"unused\")"
      }
    ]
  },
  "params": {
    "cacheID": "73b4c158b3681732cd8e24e16a98f301",
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
        "me.bankAccounts.edges.node.id": (v5/*: any*/),
        "me.bankAccounts.edges.node.internalID": (v5/*: any*/),
        "me.bankAccounts.edges.node.last4": (v6/*: any*/),
        "me.id": (v5/*: any*/),
        "order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrder"
        },
        "order.__isCommerceOrder": (v6/*: any*/),
        "order.__typename": (v6/*: any*/),
        "order.bankAccountId": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "order.id": (v5/*: any*/),
        "order.internalID": (v5/*: any*/),
        "order.mode": {
          "enumValues": [
            "BUY",
            "OFFER"
          ],
          "nullable": true,
          "plural": false,
          "type": "CommerceOrderModeEnum"
        },
        "order.paymentMethodDetails": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PaymentMethodUnion"
        },
        "order.paymentMethodDetails.__typename": (v6/*: any*/),
        "order.paymentMethodDetails.id": (v5/*: any*/),
        "order.paymentMethodDetails.internalID": (v5/*: any*/),
        "order.paymentMethodDetails.last4": (v6/*: any*/)
      }
    },
    "name": "BankAccountPickerTestQuery",
    "operationKind": "query",
    "text": "query BankAccountPickerTestQuery {\n  me {\n    ...BankAccountPicker_me\n    id\n  }\n  order: commerceOrder(id: \"unused\") {\n    __typename\n    ...BankAccountPicker_order\n    id\n  }\n}\n\nfragment BankAccountPicker_me on Me {\n  bankAccounts(first: 100) {\n    edges {\n      node {\n        internalID\n        last4\n        id\n      }\n    }\n  }\n}\n\nfragment BankAccountPicker_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  internalID\n  mode\n  bankAccountId\n  paymentMethodDetails {\n    __typename\n    ... on BankAccount {\n      internalID\n      last4\n      id\n    }\n    ... on CreditCard {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "984e3467ab35b04ff9fff3adc200b65e";

export default node;
