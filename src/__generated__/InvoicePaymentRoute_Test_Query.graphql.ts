/**
 * @generated SignedSource<<6e4a08707ca49822cea97da1643b02de>>
 * @relayHash 3b81fa065528467cbabdd1b3753a042e
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 3b81fa065528467cbabdd1b3753a042e

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InvoicePaymentRoute_Test_Query$variables = Record<PropertyKey, never>;
export type InvoicePaymentRoute_Test_Query$data = {
  readonly invoice: {
    readonly " $fragmentSpreads": FragmentRefs<"InvoicePaymentRoute_invoice">;
  } | null | undefined;
};
export type InvoicePaymentRoute_Test_Query = {
  response: InvoicePaymentRoute_Test_Query$data;
  variables: InvoicePaymentRoute_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "token",
    "value": "cool-token"
  }
],
v1 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "InvoicePaymentRoute_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
        "storageKey": "invoice(token:\"cool-token\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "InvoicePaymentRoute_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
        "storageKey": "invoice(token:\"cool-token\")"
      }
    ]
  },
  "params": {
    "id": "3b81fa065528467cbabdd1b3753a042e",
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "invoice": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Invoice"
        },
        "invoice.id": (v1/*: any*/),
        "invoice.internalID": (v1/*: any*/),
        "invoice.remaining": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "invoice.remainingMinor": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Int"
        }
      }
    },
    "name": "InvoicePaymentRoute_Test_Query",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "55f9e9d239d503c19654091d3a139422";

export default node;
