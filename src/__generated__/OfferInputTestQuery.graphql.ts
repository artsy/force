/**
 * @generated SignedSource<<012d8468ced90c56e644deac59b0b8a5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OfferInputTestQuery$variables = Record<PropertyKey, never>;
export type OfferInputTestQuery$data = {
  readonly me: {
    readonly order: {
      readonly " $fragmentSpreads": FragmentRefs<"OfferInput_order">;
    } | null | undefined;
  } | null | undefined;
};
export type OfferInputTestQuery = {
  response: OfferInputTestQuery$data;
  variables: OfferInputTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "test"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
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
    "name": "OfferInputTestQuery",
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
            "args": (v0/*: any*/),
            "concreteType": "Order",
            "kind": "LinkedField",
            "name": "order",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "OfferInput_order"
              }
            ],
            "storageKey": "order(id:\"test\")"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "OfferInputTestQuery",
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
            "args": (v0/*: any*/),
            "concreteType": "Order",
            "kind": "LinkedField",
            "name": "order",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "currencySymbol",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": "order(id:\"test\")"
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2435111f146ce4a12d2c82394871f5f2",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v2/*: any*/),
        "me.order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Order"
        },
        "me.order.currencySymbol": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "String"
        },
        "me.order.id": (v2/*: any*/)
      }
    },
    "name": "OfferInputTestQuery",
    "operationKind": "query",
    "text": "query OfferInputTestQuery {\n  me {\n    order(id: \"test\") {\n      ...OfferInput_order\n      id\n    }\n    id\n  }\n}\n\nfragment OfferInput_order on Order {\n  currencySymbol\n}\n"
  }
};
})();

(node as any).hash = "e0fd4963df21005f042d35486fc52ed1";

export default node;
