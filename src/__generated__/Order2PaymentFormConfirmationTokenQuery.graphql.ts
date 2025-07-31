/**
 * @generated SignedSource<<d0ea0465a6e81e2e46ec5ed710c25b63>>
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
        readonly displayBrand?: string;
        readonly last4?: string;
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
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "kind": "InlineFragment",
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
  "type": "Card",
  "abstractKey": null
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
          {
            "alias": null,
            "args": (v1/*: any*/),
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
                  (v2/*: any*/)
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
          {
            "alias": null,
            "args": (v1/*: any*/),
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
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
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
    "cacheID": "9bfe3f723794ec6378dd5497e2f32fef",
    "id": null,
    "metadata": {},
    "name": "Order2PaymentFormConfirmationTokenQuery",
    "operationKind": "query",
    "text": "query Order2PaymentFormConfirmationTokenQuery(\n  $id: String!\n) {\n  me {\n    confirmationToken(id: $id) {\n      paymentMethodPreview {\n        __typename\n        ... on Card {\n          displayBrand\n          last4\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "bce4cdbd879db7d252d391b8c075448e";

export default node;
