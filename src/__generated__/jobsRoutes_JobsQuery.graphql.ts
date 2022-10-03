/**
 * @generated SignedSource<<8eae37ed3d058512bda744f0ab0ab632>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type jobsRoutes_JobsQuery$variables = {};
export type jobsRoutes_JobsQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"JobsApp_viewer">;
  } | null;
};
export type jobsRoutes_JobsQuery = {
  variables: jobsRoutes_JobsQuery$variables;
  response: jobsRoutes_JobsQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "concreteType": "Job",
  "kind": "LinkedField",
  "name": "jobs",
  "plural": true,
  "selections": [
    (v0/*: any*/),
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
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "jobsRoutes_JobsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "JobsApp_viewer"
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
    "name": "jobsRoutes_JobsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Department",
            "kind": "LinkedField",
            "name": "departments",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b30414b05e340d2dee080de602d47be7",
    "id": null,
    "metadata": {},
    "name": "jobsRoutes_JobsQuery",
    "operationKind": "query",
    "text": "query jobsRoutes_JobsQuery {\n  viewer {\n    ...JobsApp_viewer\n  }\n}\n\nfragment JobLink_job on Job {\n  id\n  title\n  location\n}\n\nfragment JobsApp_viewer on Viewer {\n  ...JobsFilter_viewer\n}\n\nfragment JobsFilter_viewer on Viewer {\n  jobs {\n    ...JobLink_job\n    id\n    location\n  }\n  departments {\n    id\n    name\n    jobs {\n      ...JobLink_job\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "12575517b4d2656d8cc49a592a3d093a";

export default node;
