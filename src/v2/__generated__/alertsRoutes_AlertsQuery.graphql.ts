/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type alertsRoutes_AlertsQueryVariables = {};
export type alertsRoutes_AlertsQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"AlertsRoute_me">;
    } | null;
};
export type alertsRoutes_AlertsQuery = {
    readonly response: alertsRoutes_AlertsQueryResponse;
    readonly variables: alertsRoutes_AlertsQueryVariables;
};



/*
query alertsRoutes_AlertsQuery {
  me {
    ...AlertsRoute_me
    id
  }
}

fragment AlertsRoute_me on Me {
  name
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "alertsRoutes_AlertsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AlertsRoute_me"
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
    "name": "alertsRoutes_AlertsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
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
    "id": null,
    "metadata": {},
    "name": "alertsRoutes_AlertsQuery",
    "operationKind": "query",
    "text": "query alertsRoutes_AlertsQuery {\n  me {\n    ...AlertsRoute_me\n    id\n  }\n}\n\nfragment AlertsRoute_me on Me {\n  name\n}\n"
  }
};
(node as any).hash = 'cb0c7b00b061de9d0034b9074c49abf8';
export default node;
