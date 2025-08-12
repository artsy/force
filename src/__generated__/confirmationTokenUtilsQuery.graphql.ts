/**
 * @generated SignedSource<<e08762de4f4ffa9a2a63f9a9a0909955>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type confirmationTokenUtilsQuery$variables = {
  id: string;
};
export type confirmationTokenUtilsQuery$data = {
  readonly me: {
    readonly confirmationToken: {
      readonly paymentMethodPreview: {
        readonly __typename: "Card";
        readonly displayBrand: string;
        readonly last4: string;
      } | {
        readonly __typename: "USBankAccount";
        readonly bankName: string;
        readonly last4: string;
      } | {
        // This will never be '%other', but we need some
        // value in case none of the concrete values match.
        readonly __typename: "%other";
      };
    } | null | undefined;
  } | null | undefined;
};
export type confirmationTokenUtilsQuery = {
  response: confirmationTokenUtilsQuery$data;
  variables: confirmationTokenUtilsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "last4",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": [
    {
      "kind": "Variable",
      "name": "id",
      "variableName": "id"
    }
  ],
  "concreteType": "ConfirmationToken",
  "kind": "LinkedField",
  "name": "confirmationToken",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "paymentMethodPreview",
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
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "displayBrand",
              "storageKey": null
            },
            (v1/*: any*/)
          ],
          "type": "Card",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "bankName",
              "storageKey": null
            },
            (v1/*: any*/)
          ],
          "type": "USBankAccount",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "confirmationTokenUtilsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "confirmationTokenUtilsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7d67e528f4f52208c0460141ec1558bc",
    "id": null,
    "metadata": {},
    "name": "confirmationTokenUtilsQuery",
    "operationKind": "query",
    "text": "query confirmationTokenUtilsQuery(\n  $id: String!\n) {\n  me {\n    confirmationToken(id: $id) {\n      paymentMethodPreview {\n        __typename\n        ... on Card {\n          displayBrand\n          last4\n        }\n        ... on USBankAccount {\n          bankName\n          last4\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "7d8bbaaf9d63595431765b294e9e60a0";

export default node;
