/**
 * @generated SignedSource<<38f26a84a2b1635a70a389410674df2d>>
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
        readonly __typename: "SEPADebit";
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
        },
        {
          "kind": "InlineFragment",
          "selections": [
            (v1/*: any*/)
          ],
          "type": "SEPADebit",
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
    "cacheID": "124d56783c8bd7949569c29427146323",
    "id": null,
    "metadata": {},
    "name": "confirmationTokenUtilsQuery",
    "operationKind": "query",
    "text": "query confirmationTokenUtilsQuery(\n  $id: String!\n) {\n  me {\n    confirmationToken(id: $id) {\n      paymentMethodPreview {\n        __typename\n        ... on Card {\n          displayBrand\n          last4\n        }\n        ... on USBankAccount {\n          bankName\n          last4\n        }\n        ... on SEPADebit {\n          last4\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "daed8edc36a5b03b2ac69ee236a0b6c2";

export default node;
