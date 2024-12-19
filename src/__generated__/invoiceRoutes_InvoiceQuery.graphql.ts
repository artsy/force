/**
 * @generated SignedSource<<917441daa44f6221a6e6d417da47735d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type invoiceRoutes_InvoiceQuery$variables = {
  token: string;
};
export type invoiceRoutes_InvoiceQuery$data = {
  readonly invoice: {
    readonly " $fragmentSpreads": FragmentRefs<"InvoiceApp_invoice">;
  } | null | undefined;
};
export type invoiceRoutes_InvoiceQuery = {
  response: invoiceRoutes_InvoiceQuery$data;
  variables: invoiceRoutes_InvoiceQuery$variables;
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
    "name": "invoiceRoutes_InvoiceQuery",
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
            "name": "InvoiceApp_invoice"
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
    "name": "invoiceRoutes_InvoiceQuery",
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
            "args": null,
            "kind": "ScalarField",
            "name": "number",
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "MMM D, YYYY"
              }
            ],
            "kind": "ScalarField",
            "name": "readyAt",
            "storageKey": "readyAt(format:\"MMM D, YYYY\")"
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
    "cacheID": "b34dab2604f8f34105035285a3dc36ad",
    "id": null,
    "metadata": {},
    "name": "invoiceRoutes_InvoiceQuery",
    "operationKind": "query",
    "text": "query invoiceRoutes_InvoiceQuery(\n  $token: String!\n) {\n  invoice(token: $token) {\n    ...InvoiceApp_invoice\n    id\n  }\n}\n\nfragment InvoiceApp_invoice on Invoice {\n  number\n  readyAt(format: \"MMM D, YYYY\")\n}\n"
  }
};
})();

(node as any).hash = "22f7db6b7486ac49dafcd58802edaf42";

export default node;
