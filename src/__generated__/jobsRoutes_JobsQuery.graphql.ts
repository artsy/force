/**
 * @generated SignedSource<<bf6e96278898468c72b54bba3000d0dc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type jobsRoutes_JobsQuery$variables = Record<PropertyKey, never>;
export type jobsRoutes_JobsQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"JobsApp_viewer">;
  } | null | undefined;
};
export type jobsRoutes_JobsQuery = {
  response: jobsRoutes_JobsQuery$data;
  variables: jobsRoutes_JobsQuery$variables;
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
    "cacheID": "e6485e2c892b1917180aa09814990f2c",
    "id": null,
    "metadata": {},
    "name": "jobsRoutes_JobsQuery",
    "operationKind": "query",
    "text": "query jobsRoutes_JobsQuery @cacheable {\n  viewer {\n    ...JobsApp_viewer\n  }\n}\n\nfragment JobLink_job on Job {\n  id\n  title\n  location\n}\n\nfragment JobsApp_viewer on Viewer {\n  ...JobsFilter_viewer\n}\n\nfragment JobsFilter_viewer on Viewer {\n  jobs {\n    ...JobLink_job\n    id\n    location\n  }\n  departments {\n    id\n    name\n    jobs {\n      ...JobLink_job\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f111bf42d552fb795ffe2d669568297c";

export default node;
