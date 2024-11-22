/**
 * @generated SignedSource<<ac18e63761bf6e2d9e574e878fe348a1>>
 * @relayHash 9550b3c56002c636c161cfadb608925a
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 9550b3c56002c636c161cfadb608925a

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SmsSecondFactorRefetchQuery$variables = Record<PropertyKey, never>;
export type SmsSecondFactorRefetchQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"SmsSecondFactor_me">;
  } | null | undefined;
};
export type SmsSecondFactorRefetchQuery = {
  response: SmsSecondFactorRefetchQuery$data;
  variables: SmsSecondFactorRefetchQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SmsSecondFactorRefetchQuery",
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
            "name": "SmsSecondFactor_me"
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
    "name": "SmsSecondFactorRefetchQuery",
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
            "name": "email",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasSecondFactorEnabled",
            "storageKey": null
          },
          {
            "alias": "smsSecondFactors",
            "args": [
              {
                "kind": "Literal",
                "name": "kinds",
                "value": [
                  "sms"
                ]
              }
            ],
            "concreteType": null,
            "kind": "LinkedField",
            "name": "secondFactors",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "internalID",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "formattedPhoneNumber",
                    "storageKey": null
                  }
                ],
                "type": "SmsSecondFactor",
                "abstractKey": null
              }
            ],
            "storageKey": "secondFactors(kinds:[\"sms\"])"
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
    "id": "9550b3c56002c636c161cfadb608925a",
    "metadata": {},
    "name": "SmsSecondFactorRefetchQuery",
    "operationKind": "query",
    "text": null
  }
};

(node as any).hash = "bb3f464bd834c3a55e0098e887384d50";

export default node;
