/**
 * @generated SignedSource<<1a84c2823c5fa79210018e82e989bdc0>>
 * @relayHash 37da86cc057552e5bc68d8f8f554a780
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 37da86cc057552e5bc68d8f8f554a780

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useRefreshUserDataQuery$variables = Record<PropertyKey, never>;
export type useRefreshUserDataQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"AuctionBidRoute_me">;
  } | null | undefined;
};
export type useRefreshUserDataQuery = {
  response: useRefreshUserDataQuery$data;
  variables: useRefreshUserDataQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "useRefreshUserDataQuery",
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
            "name": "AuctionBidRoute_me"
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
    "name": "useRefreshUserDataQuery",
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
            "name": "internalID",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasQualifiedCreditCards",
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
    "id": "37da86cc057552e5bc68d8f8f554a780",
    "metadata": {},
    "name": "useRefreshUserDataQuery",
    "operationKind": "query",
    "text": null
  }
};

(node as any).hash = "43aae92130e1a27bccb0a9451b12d83b";

export default node;
