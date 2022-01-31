/**
 * @generated SignedSource<<b19bdcefa5870110c2ca8d6c284ebdaf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type unsubscribeRoutes_UnsubscribeQuery$variables = {};
export type unsubscribeRoutes_UnsubscribeQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"UnsubscribeApp_me">;
  } | null;
};
export type unsubscribeRoutes_UnsubscribeQuery = {
  variables: unsubscribeRoutes_UnsubscribeQuery$variables;
  response: unsubscribeRoutes_UnsubscribeQuery$data;
};

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

(node as any).hash = "0c7935c24a710e89165e60586cb072dc";

export default node;
