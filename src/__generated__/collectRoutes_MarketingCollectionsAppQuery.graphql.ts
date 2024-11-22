/**
 * @generated SignedSource<<4440eb7349c68fda24db86a7ab612f01>>
 * @relayHash 2ce39f1a77768173826ade0cceba2503
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 2ce39f1a77768173826ade0cceba2503

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type collectRoutes_MarketingCollectionsAppQuery$variables = Record<PropertyKey, never>;
export type collectRoutes_MarketingCollectionsAppQuery$data = {
  readonly marketingCategories: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"Collections_marketingCategories">;
  }>;
};
export type collectRoutes_MarketingCollectionsAppQuery = {
  response: collectRoutes_MarketingCollectionsAppQuery$data;
  variables: collectRoutes_MarketingCollectionsAppQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "collectRoutes_MarketingCollectionsAppQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "MarketingCollectionCategory",
        "kind": "LinkedField",
        "name": "marketingCategories",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Collections_marketingCategories"
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
    "name": "collectRoutes_MarketingCollectionsAppQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "MarketingCollectionCategory",
        "kind": "LinkedField",
        "name": "marketingCategories",
        "plural": true,
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
            "concreteType": "MarketingCollection",
            "kind": "LinkedField",
            "name": "collections",
            "plural": true,
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
                "name": "slug",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "headerImage",
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "2ce39f1a77768173826ade0cceba2503",
    "metadata": {},
    "name": "collectRoutes_MarketingCollectionsAppQuery",
    "operationKind": "query",
    "text": null
  }
};

(node as any).hash = "fef524f8337c800a5308955689bca0b6";

export default node;
