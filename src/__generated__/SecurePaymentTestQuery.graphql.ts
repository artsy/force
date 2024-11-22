/**
 * @generated SignedSource<<fadf107361993ad69665c0ba0e652a1d>>
 * @relayHash a6174e5f4a3c77e88f3c06d269b84758
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID a6174e5f4a3c77e88f3c06d269b84758

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SecurePaymentTestQuery$variables = Record<PropertyKey, never>;
export type SecurePaymentTestQuery$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"SecurePayment_artwork">;
  } | null | undefined;
};
export type SecurePaymentTestQuery = {
  response: SecurePaymentTestQuery$data;
  variables: SecurePaymentTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "whatevs"
  }
],
v1 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SecurePaymentTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SecurePayment_artwork"
          }
        ],
        "storageKey": "artwork(id:\"whatevs\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SecurePaymentTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": "is_acquireable",
            "args": null,
            "kind": "ScalarField",
            "name": "isAcquireable",
            "storageKey": null
          },
          {
            "alias": "is_offerable",
            "args": null,
            "kind": "ScalarField",
            "name": "isOfferable",
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
        "storageKey": "artwork(id:\"whatevs\")"
      }
    ]
  },
  "params": {
    "id": "a6174e5f4a3c77e88f3c06d269b84758",
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "artwork.is_acquireable": (v1/*: any*/),
        "artwork.is_offerable": (v1/*: any*/)
      }
    },
    "name": "SecurePaymentTestQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "aea04d3bc45239212a2e4d66598b5aa3";

export default node;
