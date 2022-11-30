/**
 * @generated SignedSource<<bcefbe36198fe7c0bc19d6e929b2d84b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type collectorProfileRoutes_CollectorProfileQuery$variables = {};
export type collectorProfileRoutes_CollectorProfileQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileApp_me">;
  } | null;
};
export type collectorProfileRoutes_CollectorProfileQuery = {
  response: collectorProfileRoutes_CollectorProfileQuery$data;
  variables: collectorProfileRoutes_CollectorProfileQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "collectorProfileRoutes_CollectorProfileQuery",
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
            "name": "CollectorProfileApp_me"
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
    "name": "collectorProfileRoutes_CollectorProfileQuery",
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
    "cacheID": "3829bd5a70014f5cec713a860c286b6c",
    "id": null,
    "metadata": {},
    "name": "collectorProfileRoutes_CollectorProfileQuery",
    "operationKind": "query",
    "text": "query collectorProfileRoutes_CollectorProfileQuery {\n  me {\n    ...CollectorProfileApp_me\n    id\n  }\n}\n\nfragment CollectorProfileApp_me on Me {\n  name\n}\n"
  }
};

(node as any).hash = "a741e51fd09181fa3f4498d97579e413";

export default node;
