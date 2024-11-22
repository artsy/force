/**
 * @generated SignedSource<<fb34adb6ea15bc797f872d915eff00de>>
 * @relayHash 783024d105874317d3ecb8558837ad73
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 783024d105874317d3ecb8558837ad73

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InvoiceDetailRoute_Test_Query$variables = Record<PropertyKey, never>;
export type InvoiceDetailRoute_Test_Query$data = {
  readonly invoice: {
    readonly " $fragmentSpreads": FragmentRefs<"InvoiceDetailRoute_invoice">;
  } | null | undefined;
};
export type InvoiceDetailRoute_Test_Query = {
  response: InvoiceDetailRoute_Test_Query$data;
  variables: InvoiceDetailRoute_Test_Query$variables;
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2
  }
],
v3 = {
  "alias": null,
  "args": (v2/*: any*/),
  "kind": "ScalarField",
  "name": "amount",
  "storageKey": "amount(precision:2)"
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "InvoiceDetailRoute_Test_Query",
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
            "name": "InvoiceDetailRoute_invoice"
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
    "name": "InvoiceDetailRoute_Test_Query",
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
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "state",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "InvoicePayment",
            "kind": "LinkedField",
            "name": "payments",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "successful",
                "storageKey": null
              },
              (v1/*: any*/),
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
                "name": "createdAt",
                "storageKey": "createdAt(format:\"MMM D, YYYY\")"
              },
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "CreditCard",
                "kind": "LinkedField",
                "name": "creditCard",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "brand",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "lastDigits",
                    "storageKey": null
                  },
                  (v1/*: any*/)
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
            "name": "externalNote",
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "kind": "ScalarField",
            "name": "remaining",
            "storageKey": "remaining(precision:2)"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "InvoiceLineItem",
            "kind": "LinkedField",
            "name": "lineItems",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
                "storageKey": null
              },
              (v3/*: any*/),
              (v1/*: any*/)
            ],
            "storageKey": null
          },
          (v1/*: any*/)
        ],
        "storageKey": "invoice(token:\"cool-token\")"
      }
    ]
  },
  "params": {
    "id": "783024d105874317d3ecb8558837ad73",
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "invoice": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Invoice"
        },
        "invoice.email": (v4/*: any*/),
        "invoice.externalNote": (v4/*: any*/),
        "invoice.id": (v5/*: any*/),
        "invoice.lineItems": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "InvoiceLineItem"
        },
        "invoice.lineItems.amount": (v4/*: any*/),
        "invoice.lineItems.description": (v6/*: any*/),
        "invoice.lineItems.id": (v5/*: any*/),
        "invoice.name": (v4/*: any*/),
        "invoice.payments": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "InvoicePayment"
        },
        "invoice.payments.amount": (v4/*: any*/),
        "invoice.payments.createdAt": (v4/*: any*/),
        "invoice.payments.creditCard": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CreditCard"
        },
        "invoice.payments.creditCard.brand": (v6/*: any*/),
        "invoice.payments.creditCard.id": (v5/*: any*/),
        "invoice.payments.creditCard.lastDigits": (v6/*: any*/),
        "invoice.payments.id": (v5/*: any*/),
        "invoice.payments.successful": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "invoice.remaining": (v4/*: any*/),
        "invoice.state": {
          "enumValues": [
            "CANCELED",
            "DRAFT",
            "PAID",
            "READY"
          ],
          "nullable": false,
          "plural": false,
          "type": "InvoiceState"
        }
      }
    },
    "name": "InvoiceDetailRoute_Test_Query",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "acf9e316b8575ae4a98540ab941968be";

export default node;
