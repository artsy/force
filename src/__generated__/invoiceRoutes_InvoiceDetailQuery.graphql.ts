/**
 * @generated SignedSource<<0b41f5a8009ef80ff10534646a5e2e0b>>
 * @relayHash 2b9ce39a17afe7ac05b3615cf29c85b3
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 2b9ce39a17afe7ac05b3615cf29c85b3

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type invoiceRoutes_InvoiceDetailQuery$variables = {
  token: string;
};
export type invoiceRoutes_InvoiceDetailQuery$data = {
  readonly invoice: {
    readonly " $fragmentSpreads": FragmentRefs<"InvoiceDetailRoute_invoice">;
  } | null | undefined;
};
export type invoiceRoutes_InvoiceDetailQuery = {
  response: invoiceRoutes_InvoiceDetailQuery$data;
  variables: invoiceRoutes_InvoiceDetailQuery$variables;
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
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2
  }
],
v4 = {
  "alias": null,
  "args": (v3/*: any*/),
  "kind": "ScalarField",
  "name": "amount",
  "storageKey": "amount(precision:2)"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "invoiceRoutes_InvoiceDetailQuery",
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
            "name": "InvoiceDetailRoute_invoice"
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
    "name": "invoiceRoutes_InvoiceDetailQuery",
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
              (v2/*: any*/),
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
              (v4/*: any*/),
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
            "name": "externalNote",
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v3/*: any*/),
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
              (v4/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "2b9ce39a17afe7ac05b3615cf29c85b3",
    "metadata": {},
    "name": "invoiceRoutes_InvoiceDetailQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "ee553be3d159a34d9753a955455a4a23";

export default node;
