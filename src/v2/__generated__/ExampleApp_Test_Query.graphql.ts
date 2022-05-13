/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ExampleApp_Test_QueryVariables = {};
export type ExampleApp_Test_QueryResponse = {
    readonly system: {
        readonly " $fragmentRefs": FragmentRefs<"ExampleApp_system">;
    } | null;
};
export type ExampleApp_Test_Query = {
    readonly response: ExampleApp_Test_QueryResponse;
    readonly variables: ExampleApp_Test_QueryVariables;
};



/*
query ExampleApp_Test_Query {
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

const node: ConcreteRequest = (function(){
var v0 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ExampleApp_Test_Query",
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
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ExampleApp_Test_Query",
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
    "cacheID": "4dff6c5e7269421ed28bf8fd13e16494",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "system": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "System"
        },
        "system.time": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SystemTime"
        },
        "system.time.day": (v0/*: any*/),
        "system.time.month": (v0/*: any*/),
        "system.time.year": (v0/*: any*/)
      }
    },
    "name": "ExampleApp_Test_Query",
    "operationKind": "query",
    "text": "query ExampleApp_Test_Query {\n  system {\n    ...ExampleApp_system\n  }\n}\n\nfragment ExampleApp_system on System {\n  time {\n    day\n    month\n    year\n  }\n}\n"
  }
};
})();
(node as any).hash = 'af3e76f998957f3bd27bf5aecb96111a';
export default node;
