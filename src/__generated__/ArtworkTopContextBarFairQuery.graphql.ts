/**
 * @generated SignedSource<<c67700a804bd2e5f6a21c84e12a099d1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkTopContextBarFairQuery$variables = {
  id: string;
};
export type ArtworkTopContextBarFairQuery$data = {
  readonly fair: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtworkTopContextBarFair_fair">;
  } | null | undefined;
};
export type ArtworkTopContextBarFairQuery = {
  response: ArtworkTopContextBarFairQuery$data;
  variables: ArtworkTopContextBarFairQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
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
    "name": "ArtworkTopContextBarFairQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtworkTopContextBarFair_fair"
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
    "name": "ArtworkTopContextBarFairQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Fair",
        "kind": "LinkedField",
        "name": "fair",
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
                "concreteType": "Image",
                "kind": "LinkedField",
                "name": "icon",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "url",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ff09adeafa46d0afd3009258d2e7ef9d",
    "id": null,
    "metadata": {},
    "name": "ArtworkTopContextBarFairQuery",
    "operationKind": "query",
    "text": "query ArtworkTopContextBarFairQuery(\n  $id: String!\n) {\n  fair(id: $id) {\n    ...ArtworkTopContextBarFair_fair\n    id\n  }\n}\n\nfragment ArtworkTopContextBarFair_fair on Fair {\n  name\n  href\n  profile {\n    icon {\n      url\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "c0422e1319ab86ba8baaf6e73c6ecc3c";

export default node;
