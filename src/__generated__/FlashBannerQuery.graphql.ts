/**
 * @generated SignedSource<<7bd1c47e39cfdba82dd3f2c2724f89e9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FlashBannerQuery$variables = Record<PropertyKey, never>;
export type FlashBannerQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"FlashBanner_me">;
  } | null | undefined;
};
export type FlashBannerQuery = {
  response: FlashBannerQuery$data;
  variables: FlashBannerQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FlashBannerQuery",
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
            "name": "FlashBanner_me"
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
    "name": "FlashBannerQuery",
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
            "name": "canRequestEmailConfirmation",
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
    "cacheID": "b5fe0374f99d3248a4f2ce3468c2ce71",
    "id": null,
    "metadata": {},
    "name": "FlashBannerQuery",
    "operationKind": "query",
    "text": "query FlashBannerQuery {\n  me {\n    ...FlashBanner_me\n    id\n  }\n}\n\nfragment FlashBanner_me on Me {\n  canRequestEmailConfirmation\n}\n"
  }
};

(node as any).hash = "80d5e50618c947db10b2ada290fdf74b";

export default node;
