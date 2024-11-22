/**
 * @generated SignedSource<<b9a8688c60968a801f5b86d358102cbd>>
 * @relayHash 342fb5e595a8161a3ed3308adb7b6916
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 342fb5e595a8161a3ed3308adb7b6916

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type invoiceRoutes_InvoicePaymentQuery$variables = {
  token: string;
};
export type invoiceRoutes_InvoicePaymentQuery$data = {
  readonly invoice: {
    readonly " $fragmentSpreads": FragmentRefs<"InvoicePaymentRoute_invoice">;
  } | null | undefined;
};
export type invoiceRoutes_InvoicePaymentQuery = {
  response: invoiceRoutes_InvoicePaymentQuery$data;
  variables: invoiceRoutes_InvoicePaymentQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "token"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "token",
    "variableName": "token"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "invoiceRoutes_InvoicePaymentQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Invoice",
        "kind": "LinkedField",
        "name": "invoice",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "InvoicePaymentRoute_invoice"
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
    "name": "invoiceRoutes_InvoicePaymentQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Invoice",
        "kind": "LinkedField",
        "name": "invoice",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "precision",
                "value": 2
              }
            ],
            "kind": "ScalarField",
            "name": "remaining",
            "storageKey": "remaining(precision:2)"
          },
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
            "name": "remainingMinor",
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
    "id": "342fb5e595a8161a3ed3308adb7b6916",
    "metadata": {},
    "name": "invoiceRoutes_InvoicePaymentQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "46da36776fb731441a3efcef9a8190ec";

export default node;
