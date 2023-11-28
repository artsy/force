/**
 * @generated SignedSource<<8ab1d2fb3107f506cfd17b62dd65c727>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FlashBanner_Test_Query$variables = Record<PropertyKey, never>;
export type FlashBanner_Test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"FlashBanner_me">;
  } | null | undefined;
};
export type FlashBanner_Test_Query = {
  response: FlashBanner_Test_Query$data;
  variables: FlashBanner_Test_Query$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FlashBanner_Test_Query",
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
    "name": "FlashBanner_Test_Query",
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
    "cacheID": "fd71c996171594405049406011bd0adc",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.canRequestEmailConfirmation": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "me.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        }
      }
    },
    "name": "FlashBanner_Test_Query",
    "operationKind": "query",
    "text": "query FlashBanner_Test_Query {\n  me {\n    ...FlashBanner_me\n    id\n  }\n}\n\nfragment FlashBanner_me on Me {\n  canRequestEmailConfirmation\n}\n"
  }
};

(node as any).hash = "f95a8001e9ae9786494d2b3996791315";

export default node;
