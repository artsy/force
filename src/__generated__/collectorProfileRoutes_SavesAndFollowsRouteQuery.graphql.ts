/**
 * @generated SignedSource<<4a77cdea89ca6539ed2a9579895764e1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type collectorProfileRoutes_SavesAndFollowsRouteQuery$variables = {};
export type collectorProfileRoutes_SavesAndFollowsRouteQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileSavesAndFollowsRoute_me">;
  } | null;
};
export type collectorProfileRoutes_SavesAndFollowsRouteQuery = {
  response: collectorProfileRoutes_SavesAndFollowsRouteQuery$data;
  variables: collectorProfileRoutes_SavesAndFollowsRouteQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "collectorProfileRoutes_SavesAndFollowsRouteQuery",
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
            "name": "CollectorProfileSavesAndFollowsRoute_me"
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
    "name": "collectorProfileRoutes_SavesAndFollowsRouteQuery",
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
    "cacheID": "bba9de1ea104af9c9384e5ccf4abe793",
    "id": null,
    "metadata": {},
    "name": "collectorProfileRoutes_SavesAndFollowsRouteQuery",
    "operationKind": "query",
    "text": "query collectorProfileRoutes_SavesAndFollowsRouteQuery {\n  me {\n    ...CollectorProfileSavesAndFollowsRoute_me\n    id\n  }\n}\n\nfragment CollectorProfileSavesAndFollowsRoute_me on Me {\n  name\n}\n"
  }
};

(node as any).hash = "f0e0b1013ccf061a1e794c0e3952d8e7";

export default node;
