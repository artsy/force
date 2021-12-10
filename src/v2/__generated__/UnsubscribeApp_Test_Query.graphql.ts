/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UnsubscribeApp_Test_QueryVariables = {};
export type UnsubscribeApp_Test_QueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"UnsubscribeApp_me">;
    } | null;
};
export type UnsubscribeApp_Test_Query = {
    readonly response: UnsubscribeApp_Test_QueryResponse;
    readonly variables: UnsubscribeApp_Test_QueryVariables;
};



/*
query UnsubscribeApp_Test_Query {
  me {
    ...UnsubscribeApp_me
    id
  }
}

fragment UnsubscribeApp_me on Me {
  ...UnsubscribeLoggedIn_me
}

fragment UnsubscribeLoggedIn_me on Me {
  id
  emailFrequency
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UnsubscribeApp_Test_Query",
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
            "name": "UnsubscribeApp_me"
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
    "name": "UnsubscribeApp_Test_Query",
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "emailFrequency",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d8eb6f0d7b8d2c7ac0d6d79525737d24",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.emailFrequency": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "me.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        }
      }
    },
    "name": "UnsubscribeApp_Test_Query",
    "operationKind": "query",
    "text": "query UnsubscribeApp_Test_Query {\n  me {\n    ...UnsubscribeApp_me\n    id\n  }\n}\n\nfragment UnsubscribeApp_me on Me {\n  ...UnsubscribeLoggedIn_me\n}\n\nfragment UnsubscribeLoggedIn_me on Me {\n  id\n  emailFrequency\n}\n"
  }
};
(node as any).hash = '8062596be132af33f33306cf29ffd748';
export default node;
