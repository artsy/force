/**
 * @generated SignedSource<<3b9fe5a7ede6ab68fee8152b8d356d3c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
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
    "cacheID": "342fb5e595a8161a3ed3308adb7b6916",
    "id": null,
    "metadata": {},
    "name": "invoiceRoutes_InvoicePaymentQuery",
    "operationKind": "query",
    "text": "query invoiceRoutes_InvoicePaymentQuery(\n  $token: String!\n) {\n  invoice(token: $token) {\n    ...InvoicePaymentRoute_invoice\n    id\n  }\n}\n\nfragment InvoicePaymentRoute_invoice on Invoice {\n  remaining(precision: 2)\n  internalID\n  remainingMinor\n}\n"
  }
};
})();

(node as any).hash = "46da36776fb731441a3efcef9a8190ec";

export default node;
