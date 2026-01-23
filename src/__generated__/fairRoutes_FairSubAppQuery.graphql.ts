/**
 * @generated SignedSource<<7788f2944a509e98168f5146f4dc0515>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type fairRoutes_FairSubAppQuery$variables = {
  slug: string;
};
export type fairRoutes_FairSubAppQuery$data = {
  readonly fair: {
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"FairSubApp_fair">;
  } | null | undefined;
};
export type fairRoutes_FairSubAppQuery = {
  response: fairRoutes_FairSubAppQuery$data;
  variables: fairRoutes_FairSubAppQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "fairRoutes_FairSubAppQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FairSubApp_fair"
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
    "name": "fairRoutes_FairSubAppQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
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
            "name": "href",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Profile",
            "kind": "LinkedField",
            "name": "profile",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "19115c0fcf3d5c266b65dffe769d6903",
    "id": null,
    "metadata": {},
    "name": "fairRoutes_FairSubAppQuery",
    "operationKind": "query",
    "text": "query fairRoutes_FairSubAppQuery(\n  $slug: String!\n) @cacheable {\n  fair(id: $slug) @principalField {\n    slug\n    ...FairSubApp_fair\n    id\n  }\n}\n\nfragment FairSubApp_fair on Fair {\n  id\n  name\n  href\n  profile {\n    __typename\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "1fd0578d3fb6dd0c16aee940244f5c95";

export default node;
