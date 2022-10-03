/**
 * @generated SignedSource<<bc2f4be184e924401503a052eb148628>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type jobsRoutes_JobQuery$variables = {
  id: string;
};
export type jobsRoutes_JobQuery$data = {
  readonly job: {
    readonly " $fragmentSpreads": FragmentRefs<"JobApp_job">;
  };
};
export type jobsRoutes_JobQuery = {
  response: jobsRoutes_JobQuery$data;
  variables: jobsRoutes_JobQuery$variables;
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
    "name": "jobsRoutes_JobQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Job",
        "kind": "LinkedField",
        "name": "job",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "JobApp_job"
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
    "name": "jobsRoutes_JobQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Job",
        "kind": "LinkedField",
        "name": "job",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
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
            "name": "location",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "content",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "externalURL",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "646177746f397889f1a859a0421bb753",
    "id": null,
    "metadata": {},
    "name": "jobsRoutes_JobQuery",
    "operationKind": "query",
    "text": "query jobsRoutes_JobQuery(\n  $id: ID!\n) {\n  job(id: $id) {\n    ...JobApp_job\n    id\n  }\n}\n\nfragment JobApp_job on Job {\n  id\n  title\n  location\n  content\n  externalURL\n}\n"
  }
};
})();

(node as any).hash = "3aefeefbfece4cf8b909d34539893c96";

export default node;
