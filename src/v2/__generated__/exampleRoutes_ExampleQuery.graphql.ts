/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type exampleRoutes_ExampleQueryVariables = {};
export type exampleRoutes_ExampleQueryResponse = {
    readonly system: {
        readonly " $fragmentRefs": FragmentRefs<"ExampleApp_system">;
    } | null;
};
export type exampleRoutes_ExampleQuery = {
    readonly response: exampleRoutes_ExampleQueryResponse;
    readonly variables: exampleRoutes_ExampleQueryVariables;
};



/*
query exampleRoutes_ExampleQuery {
  system {
    ...ExampleApp_system
  }
}

fragment ExampleApp_system on System {
  time {
    day
    month
    year
  }
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "exampleRoutes_ExampleQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "System",
        "kind": "LinkedField",
        "name": "system",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ExampleApp_system"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "exampleRoutes_ExampleQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "System",
        "kind": "LinkedField",
        "name": "system",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SystemTime",
            "kind": "LinkedField",
            "name": "time",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "day",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "month",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "year",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "exampleRoutes_ExampleQuery",
    "operationKind": "query",
    "text": "query exampleRoutes_ExampleQuery {\n  system {\n    ...ExampleApp_system\n  }\n}\n\nfragment ExampleApp_system on System {\n  time {\n    day\n    month\n    year\n  }\n}\n"
  }
};
(node as any).hash = '5878a11299e2592a0669ac8089848737';
export default node;
