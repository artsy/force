/**
 * @generated SignedSource<<661dd0f07fdc83cfd9be3639c67fddde>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type orderRoutes_DetailsQuery$variables = {
  orderID: string;
};
export type orderRoutes_DetailsQuery$data = {
  readonly order: {
    readonly " $fragmentSpreads": FragmentRefs<"Details_order">;
  } | null | undefined;
};
export type orderRoutes_DetailsQuery = {
  response: orderRoutes_DetailsQuery$data;
  variables: orderRoutes_DetailsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "orderID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "orderID"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "orderRoutes_DetailsQuery",
    "selections": [
      {
        "alias": "order",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "commerceOrder",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Details_order"
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
    "name": "orderRoutes_DetailsQuery",
    "selections": [
      {
        "alias": "order",
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
            "args": null,
            "kind": "ScalarField",
            "name": "internalID",
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
    "cacheID": "cc26ff8ca7252347964b4940cc398349",
    "id": null,
    "metadata": {},
    "name": "orderRoutes_DetailsQuery",
    "operationKind": "query",
    "text": "query orderRoutes_DetailsQuery(\n  $orderID: ID!\n) {\n  order: commerceOrder(id: $orderID) {\n    __typename\n    ...Details_order\n    id\n  }\n}\n\nfragment Details_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  internalID\n}\n"
  }
};
})();

(node as any).hash = "f7e4f565fb8baad391688a1f3f203f8f";

export default node;
