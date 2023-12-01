/**
 * @generated SignedSource<<5a1959329e349e4c284908b87b34ceef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerCategoryType = "GALLERY" | "INSTITUTION" | "%future added value";
export type PartnersRailsQuery$variables = {
  categoryType?: PartnerCategoryType | null | undefined;
};
export type PartnersRailsQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"PartnersRails_viewer">;
  } | null | undefined;
};
export type PartnersRailsQuery = {
  response: PartnersRailsQuery$data;
  variables: PartnersRailsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "categoryType"
  }
],
v1 = {
  "kind": "Variable",
  "name": "categoryType",
  "variableName": "categoryType"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PartnersRailsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": [
              (v1/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "PartnersRails_viewer"
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
    "name": "PartnersRailsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              (v1/*: any*/),
              {
                "kind": "Literal",
                "name": "internal",
                "value": false
              },
              {
                "kind": "Literal",
                "name": "size",
                "value": 50
              }
            ],
            "concreteType": "PartnerCategory",
            "kind": "LinkedField",
            "name": "partnerCategories",
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
                "kind": "ScalarField",
                "name": "slug",
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
    "cacheID": "4d2797ae375b363622de696ec0ae85ed",
    "id": null,
    "metadata": {},
    "name": "PartnersRailsQuery",
    "operationKind": "query",
    "text": "query PartnersRailsQuery(\n  $categoryType: PartnerCategoryType\n) {\n  viewer {\n    ...PartnersRails_viewer_49b74Z\n  }\n}\n\nfragment PartnersRails_viewer_49b74Z on Viewer {\n  partnerCategories(categoryType: $categoryType, size: 50, internal: false) {\n    name\n    slug\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "7b013d601ea22772058d07e8c83b4fde";

export default node;
