/**
 * @generated SignedSource<<a0c8e8cb1857a781d643ba13ebb5f9b3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type collectorProfileRoutes_FollowsRouteQuery$variables = {};
export type collectorProfileRoutes_FollowsRouteQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileFollowsRoute_me">;
  } | null;
};
export type collectorProfileRoutes_FollowsRouteQuery = {
  response: collectorProfileRoutes_FollowsRouteQuery$data;
  variables: collectorProfileRoutes_FollowsRouteQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "collectorProfileRoutes_FollowsRouteQuery",
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
            "name": "CollectorProfileFollowsRoute_me"
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
    "name": "collectorProfileRoutes_FollowsRouteQuery",
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
    "cacheID": "7ec596ec88a16a32550a0c39b95019b5",
    "id": null,
    "metadata": {},
    "name": "collectorProfileRoutes_FollowsRouteQuery",
    "operationKind": "query",
    "text": "query collectorProfileRoutes_FollowsRouteQuery {\n  me {\n    ...CollectorProfileFollowsRoute_me\n    id\n  }\n}\n\nfragment CollectorProfileFollowsRoute_me on Me {\n  name\n}\n"
  }
};

(node as any).hash = "444066e0f5dc4599653fadb37ab89991";

export default node;
