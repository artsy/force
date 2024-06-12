/**
 * @generated SignedSource<<a1d6c7081475bf0cb04872f6adf55ce2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type sellRoutes_DetailsRouteQuery$variables = {
  id: string;
};
export type sellRoutes_DetailsRouteQuery$data = {
  readonly submission: {
    readonly " $fragmentSpreads": FragmentRefs<"DetailsRoute_submission">;
  } | null | undefined;
};
export type sellRoutes_DetailsRouteQuery = {
  response: sellRoutes_DetailsRouteQuery$data;
  variables: sellRoutes_DetailsRouteQuery$variables;
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
    "name": "sellRoutes_DetailsRouteQuery",
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
            "name": "DetailsRoute_submission"
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
    "name": "sellRoutes_DetailsRouteQuery",
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
            "name": "year",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "category",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "medium",
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
    "cacheID": "c9f8d2ac30568fc47c4830f31f57721b",
    "id": null,
    "metadata": {},
    "name": "sellRoutes_DetailsRouteQuery",
    "operationKind": "query",
    "text": "query sellRoutes_DetailsRouteQuery(\n  $id: ID!\n) {\n  submission(id: $id) @principalField {\n    ...DetailsRoute_submission\n    id\n  }\n}\n\nfragment DetailsRoute_submission on ConsignmentSubmission {\n  year\n  category\n  medium\n}\n"
  }
};
})();

(node as any).hash = "2d7114d35f4ddfea13f371185dc55c93";

export default node;
