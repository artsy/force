/**
 * @generated SignedSource<<bbdda568c2d48ae5e42ad7f621bca813>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type Order2PaymentFormConfirmationTokenQuery$variables = {
  id: string;
};
export type Order2PaymentFormConfirmationTokenQuery$data = {
  readonly me: {
    readonly confirmationToken: {
      readonly paymentMethodPreview: {
        readonly card: {
          readonly displayBrand: string;
          readonly last4: string;
        } | null | undefined;
      };
    } | null | undefined;
  } | null | undefined;
};
export type Order2PaymentFormConfirmationTokenQuery = {
  response: Order2PaymentFormConfirmationTokenQuery$data;
  variables: Order2PaymentFormConfirmationTokenQuery$variables;
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
      "concreteType": "PaymentMethodPreview",
      "kind": "LinkedField",
      "name": "paymentMethodPreview",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Card",
          "kind": "LinkedField",
          "name": "card",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "displayBrand",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "last4",
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "Order2PaymentFormConfirmationTokenQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v1/*: any*/)
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
    "name": "Order2PaymentFormConfirmationTokenQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v1/*: any*/),
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
    "cacheID": "d4612ed23a1d13ad49bb05124b7324b3",
    "id": null,
    "metadata": {},
    "name": "Order2PaymentFormConfirmationTokenQuery",
    "operationKind": "query",
    "text": "query Order2PaymentFormConfirmationTokenQuery(\n  $id: String!\n) {\n  me {\n    confirmationToken(id: $id) {\n      paymentMethodPreview {\n        card {\n          displayBrand\n          last4\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "e9f951dc045909eead43c783c98cddd6";

export default node;
