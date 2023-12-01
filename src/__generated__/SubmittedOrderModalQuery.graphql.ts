/**
 * @generated SignedSource<<0067fe9e7424226a409d65d9ce7c645a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SubmittedOrderModalQuery$variables = {
  orderId: string;
};
export type SubmittedOrderModalQuery$data = {
  readonly submittedOrder: {
    readonly " $fragmentSpreads": FragmentRefs<"SubmittedOrderModal_submittedOrder">;
  } | null | undefined;
};
export type SubmittedOrderModalQuery = {
  response: SubmittedOrderModalQuery$data;
  variables: SubmittedOrderModalQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "orderId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "orderId"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SubmittedOrderModalQuery",
    "selections": [
      {
        "alias": "submittedOrder",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "commerceOrder",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SubmittedOrderModal_submittedOrder"
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
    "name": "SubmittedOrderModalQuery",
    "selections": [
      {
        "alias": "submittedOrder",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "commerceOrder",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "kind": "TypeDiscriminator",
            "abstractKey": "__isCommerceOrder"
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "MMM D"
              }
            ],
            "kind": "ScalarField",
            "name": "stateExpiresAt",
            "storageKey": "stateExpiresAt(format:\"MMM D\")"
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
    "cacheID": "cbe9dd80a69d5b0f4bbe57cf87a31c04",
    "id": null,
    "metadata": {},
    "name": "SubmittedOrderModalQuery",
    "operationKind": "query",
    "text": "query SubmittedOrderModalQuery(\n  $orderId: ID!\n) {\n  submittedOrder: commerceOrder(id: $orderId) {\n    __typename\n    ...SubmittedOrderModal_submittedOrder\n    id\n  }\n}\n\nfragment SubmittedOrderModal_submittedOrder on CommerceOrder {\n  __isCommerceOrder: __typename\n  stateExpiresAt(format: \"MMM D\")\n}\n"
  }
};
})();

(node as any).hash = "cca4549f309c54f7c8f3655e1c6ca730";

export default node;
