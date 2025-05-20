/**
 * @generated SignedSource<<b430e365851f23e759f08c112671c82e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type Order2PaymentStepConfirmationTokenQuery$variables = {
  tokenID: string;
};
export type Order2PaymentStepConfirmationTokenQuery$data = {
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
export type Order2PaymentStepConfirmationTokenQuery = {
  response: Order2PaymentStepConfirmationTokenQuery$data;
  variables: Order2PaymentStepConfirmationTokenQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "tokenID"
  }
],
v1 = {
  "alias": null,
  "args": [
    {
      "kind": "Variable",
      "name": "id",
      "variableName": "tokenID"
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
    "name": "Order2PaymentStepConfirmationTokenQuery",
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
    "name": "Order2PaymentStepConfirmationTokenQuery",
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
    "cacheID": "3de8be41de1805110eb41cb9ae3a6ca4",
    "id": null,
    "metadata": {},
    "name": "Order2PaymentStepConfirmationTokenQuery",
    "operationKind": "query",
    "text": "query Order2PaymentStepConfirmationTokenQuery(\n  $tokenID: String!\n) {\n  me {\n    confirmationToken(id: $tokenID) {\n      paymentMethodPreview {\n        card {\n          displayBrand\n          last4\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "bcf09397e93a5aa868ad9223f7579fe1";

export default node;
