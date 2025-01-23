/**
 * @generated SignedSource<<e7f6f9e5ca5154c3b82ea03fdc09ea1e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FollowMarketingCollectionButtonQuery$variables = {
  id: string;
  isLoggedIn: boolean;
};
export type FollowMarketingCollectionButtonQuery$data = {
  readonly marketingCollection: {
    readonly " $fragmentSpreads": FragmentRefs<"FollowMarketingCollectionButton_marketingCollection">;
  } | null | undefined;
};
export type FollowMarketingCollectionButtonQuery = {
  response: FollowMarketingCollectionButtonQuery$data;
  variables: FollowMarketingCollectionButtonQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "isLoggedIn"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "id"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FollowMarketingCollectionButtonQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MarketingCollection",
        "kind": "LinkedField",
        "name": "marketingCollection",
        "plural": false,
        "selections": [
          {
            "args": [
              {
                "kind": "Variable",
                "name": "isLoggedIn",
                "variableName": "isLoggedIn"
              }
            ],
            "kind": "FragmentSpread",
            "name": "FollowMarketingCollectionButton_marketingCollection"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FollowMarketingCollectionButtonQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MarketingCollection",
        "kind": "LinkedField",
        "name": "marketingCollection",
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
            "name": "internalID",
            "storageKey": null
          },
          {
            "condition": "isLoggedIn",
            "kind": "Condition",
            "passingValue": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isFollowed",
                "storageKey": null
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "13487775aa8b2dcdc605af60fda09935",
    "id": null,
    "metadata": {},
    "name": "FollowMarketingCollectionButtonQuery",
    "operationKind": "query",
    "text": "query FollowMarketingCollectionButtonQuery(\n  $id: String!\n  $isLoggedIn: Boolean!\n) {\n  marketingCollection(slug: $id) {\n    ...FollowMarketingCollectionButton_marketingCollection_4dcqWc\n    id\n  }\n}\n\nfragment FollowMarketingCollectionButton_marketingCollection_4dcqWc on MarketingCollection {\n  id\n  slug\n  title\n  internalID\n  isFollowed @include(if: $isLoggedIn)\n}\n"
  }
};
})();

(node as any).hash = "5ed68e9e22014ff84dbf24947bc6f39d";

export default node;
