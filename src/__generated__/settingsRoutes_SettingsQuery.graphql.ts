/**
 * @generated SignedSource<<2f602fc0c5c5def5f7f243cf22706b23>>
 * @relayHash 47bbe2aace6d693bae79702c711df3a4
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 47bbe2aace6d693bae79702c711df3a4

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type settingsRoutes_SettingsQuery$variables = Record<PropertyKey, never>;
export type settingsRoutes_SettingsQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SettingsApp_me">;
  } | null | undefined;
};
export type settingsRoutes_SettingsQuery = {
  response: settingsRoutes_SettingsQuery$data;
  variables: settingsRoutes_SettingsQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "settingsRoutes_SettingsQuery",
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
            "name": "SettingsApp_me"
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
    "name": "settingsRoutes_SettingsQuery",
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
    "id": "47bbe2aace6d693bae79702c711df3a4",
    "metadata": {},
    "name": "settingsRoutes_SettingsQuery",
    "operationKind": "query",
    "text": null
  }
};

(node as any).hash = "2110a4436f8f780bd8c2218f9081f92f";

export default node;
