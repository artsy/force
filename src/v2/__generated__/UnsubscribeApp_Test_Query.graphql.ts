/**
 * @generated SignedSource<<43bd8ae87cedebd50724ce8e4eb42cbd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UnsubscribeApp_Test_Query$variables = {};
export type UnsubscribeApp_Test_Query$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"UnsubscribeApp_me">;
  } | null;
};
export type UnsubscribeApp_Test_Query = {
  variables: UnsubscribeApp_Test_Query$variables;
  response: UnsubscribeApp_Test_Query$data;
};

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

(node as any).hash = "8062596be132af33f33306cf29ffd748";

export default node;
