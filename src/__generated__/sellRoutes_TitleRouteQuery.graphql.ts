/**
 * @generated SignedSource<<f61dd91914332ee2a09f26aaeb136cd3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type sellRoutes_TitleRouteQuery$variables = {
  id: string;
};
export type sellRoutes_TitleRouteQuery$data = {
  readonly submission: {
    readonly " $fragmentSpreads": FragmentRefs<"TitleRoute_submission">;
  } | null | undefined;
};
export type sellRoutes_TitleRouteQuery = {
  response: sellRoutes_TitleRouteQuery$data;
  variables: sellRoutes_TitleRouteQuery$variables;
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
    "name": "sellRoutes_TitleRouteQuery",
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
            "name": "TitleRoute_submission"
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
    "name": "sellRoutes_TitleRouteQuery",
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
            "name": "title",
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
    "cacheID": "79f544700c80545b27ca01cc56af7d17",
    "id": null,
    "metadata": {},
    "name": "sellRoutes_TitleRouteQuery",
    "operationKind": "query",
    "text": "query sellRoutes_TitleRouteQuery(\n  $id: ID!\n) {\n  submission(id: $id) @principalField {\n    ...TitleRoute_submission\n    id\n  }\n}\n\nfragment TitleRoute_submission on ConsignmentSubmission {\n  title\n}\n"
  }
};
})();

(node as any).hash = "90ebd56d298e56d80ee2fd9d3b311149";

export default node;
