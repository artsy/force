/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type unsubscribeRoutes_UnsubscribeQueryVariables = {};
export type unsubscribeRoutes_UnsubscribeQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"UnsubscribeApp_me">;
    } | null;
};
export type unsubscribeRoutes_UnsubscribeQuery = {
    readonly response: unsubscribeRoutes_UnsubscribeQueryResponse;
    readonly variables: unsubscribeRoutes_UnsubscribeQueryVariables;
};



/*
query unsubscribeRoutes_UnsubscribeQuery {
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
    "name": "unsubscribeRoutes_UnsubscribeQuery",
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
    "name": "unsubscribeRoutes_UnsubscribeQuery",
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
    "cacheID": "7cbc2ae0befd73ef4616dae9210c91d9",
    "id": null,
    "metadata": {},
    "name": "unsubscribeRoutes_UnsubscribeQuery",
    "operationKind": "query",
    "text": "query unsubscribeRoutes_UnsubscribeQuery {\n  me {\n    ...UnsubscribeApp_me\n    id\n  }\n}\n\nfragment UnsubscribeApp_me on Me {\n  ...UnsubscribeLoggedIn_me\n}\n\nfragment UnsubscribeLoggedIn_me on Me {\n  id\n  emailFrequency\n}\n"
  }
};
(node as any).hash = '0c7935c24a710e89165e60586cb072dc';
export default node;
