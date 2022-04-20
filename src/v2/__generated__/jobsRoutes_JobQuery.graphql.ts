/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type jobsRoutes_JobQueryVariables = {
    id: string;
};
export type jobsRoutes_JobQueryResponse = {
    readonly job: {
        readonly " $fragmentRefs": FragmentRefs<"JobApp_job">;
    };
};
export type jobsRoutes_JobQuery = {
    readonly response: jobsRoutes_JobQueryResponse;
    readonly variables: jobsRoutes_JobQueryVariables;
};



/*
query jobsRoutes_JobQuery(
  $id: ID!
) {
  job(id: $id) {
    ...JobApp_job
    id
  }
}

fragment JobApp_job on Job {
  id
  title
  location
  content
  externalURL
}
*/

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
(node as any).hash = '3aefeefbfece4cf8b909d34539893c96';
export default node;
