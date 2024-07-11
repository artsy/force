/**
 * @generated SignedSource<<761d9e1179410f465eeb4196e1b5569f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type sellRoutes_ShippingLocationRouteQuery$variables = {
  id: string;
};
export type sellRoutes_ShippingLocationRouteQuery$data = {
  readonly submission: {
    readonly " $fragmentSpreads": FragmentRefs<"ShippingLocationRoute_submission">;
  } | null | undefined;
};
export type sellRoutes_ShippingLocationRouteQuery = {
  response: sellRoutes_ShippingLocationRouteQuery$data;
  variables: sellRoutes_ShippingLocationRouteQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "sellRoutes_ShippingLocationRouteQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ConsignmentSubmission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ShippingLocationRoute_submission"
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
    "name": "sellRoutes_ShippingLocationRouteQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ConsignmentSubmission",
        "kind": "LinkedField",
        "name": "submission",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "locationCity",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "locationCountry",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "locationPostalCode",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "locationState",
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
    "cacheID": "9f73bf5b8284a78b3dc63d5ab65da2e8",
    "id": null,
    "metadata": {},
    "name": "sellRoutes_ShippingLocationRouteQuery",
    "operationKind": "query",
    "text": "query sellRoutes_ShippingLocationRouteQuery(\n  $id: ID!\n) {\n  submission(id: $id) @principalField {\n    ...ShippingLocationRoute_submission\n    id\n  }\n}\n\nfragment ShippingLocationRoute_submission on ConsignmentSubmission {\n  locationCity\n  locationCountry\n  locationPostalCode\n  locationState\n}\n"
  }
};
})();

(node as any).hash = "8028137f341642db49408b8f25e7590d";

export default node;
