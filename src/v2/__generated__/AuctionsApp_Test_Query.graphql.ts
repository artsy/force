/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionsApp_Test_QueryVariables = {};
export type AuctionsApp_Test_QueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"AuctionsApp_me">;
    } | null;
};
export type AuctionsApp_Test_Query = {
    readonly response: AuctionsApp_Test_QueryResponse;
    readonly variables: AuctionsApp_Test_QueryVariables;
};



/*
query AuctionsApp_Test_Query {
  me {
    ...AuctionsApp_me
    id
  }
}

fragment AuctionsApp_me on Me {
  id
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AuctionsApp_Test_Query",
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
            "name": "AuctionsApp_me"
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
    "name": "AuctionsApp_Test_Query",
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
    "name": "AuctionsApp_Test_Query",
    "operationKind": "query",
    "text": "query AuctionsApp_Test_Query {\n  me {\n    ...AuctionsApp_me\n    id\n  }\n}\n\nfragment AuctionsApp_me on Me {\n  id\n}\n"
  }
};
(node as any).hash = '4f48b8bb1de251e24790a11e8a2ae2ad';
export default node;
