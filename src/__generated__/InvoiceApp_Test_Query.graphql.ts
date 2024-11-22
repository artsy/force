/**
 * @generated SignedSource<<28bc7f4494df0f64bf31e344f4b7f36b>>
 * @relayHash 1bbb66e2db377dd3c64d29b523e35b13
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 1bbb66e2db377dd3c64d29b523e35b13

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InvoiceApp_Test_Query$variables = Record<PropertyKey, never>;
export type InvoiceApp_Test_Query$data = {
  readonly invoice: {
    readonly " $fragmentSpreads": FragmentRefs<"InvoiceApp_invoice">;
  } | null | undefined;
};
export type InvoiceApp_Test_Query = {
  response: InvoiceApp_Test_Query$data;
  variables: InvoiceApp_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "token",
    "value": "cool-token"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "InvoiceApp_Test_Query",
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
            "name": "InvoiceApp_invoice"
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
    "name": "InvoiceApp_Test_Query",
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
        "storageKey": "invoice(token:\"cool-token\")"
      }
    ]
  },
  "params": {
    "id": "1bbb66e2db377dd3c64d29b523e35b13",
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "invoice": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Invoice"
        },
        "invoice.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "invoice.number": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "String"
        },
        "invoice.readyAt": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        }
      }
    },
    "name": "InvoiceApp_Test_Query",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "1c75fd9fc98b3ce46ba9d33c5f68aae2";

export default node;
