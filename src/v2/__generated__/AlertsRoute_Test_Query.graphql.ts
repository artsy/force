/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AlertsRoute_Test_QueryVariables = {};
export type AlertsRoute_Test_QueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"AlertsRoute_me">;
    } | null;
};
export type AlertsRoute_Test_Query = {
    readonly response: AlertsRoute_Test_QueryResponse;
    readonly variables: AlertsRoute_Test_QueryVariables;
};



/*
query AlertsRoute_Test_Query {
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
    "name": "AlertsRoute_Test_Query",
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
    "name": "AlertsRoute_Test_Query",
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
    "name": "AlertsRoute_Test_Query",
    "operationKind": "query",
    "text": "query AlertsRoute_Test_Query {\n  me {\n    ...AlertsRoute_me\n    id\n  }\n}\n\nfragment AlertsRoute_me on Me {\n  name\n}\n"
  }
};
(node as any).hash = '636ef42d66ed18f2064452311ae8b55e';
export default node;
