/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerCategoryType = "GALLERY" | "INSTITUTION" | "%future added value";
export type PartnerClassification = "AUCTION" | "BRAND" | "DEMO" | "GALLERY" | "INSTITUTION" | "INSTITUTIONAL_SELLER" | "PRIVATE_COLLECTOR" | "PRIVATE_DEALER" | "%future added value";
export type PartnersRailsQueryVariables = {
    categoryType?: PartnerCategoryType | null;
    type?: Array<PartnerClassification | null> | null;
};
export type PartnersRailsQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"PartnersRails_viewer">;
    } | null;
};
export type PartnersRailsQuery = {
    readonly response: PartnersRailsQueryResponse;
    readonly variables: PartnersRailsQueryVariables;
};



/*
query PartnersRailsQuery(
  $categoryType: PartnerCategoryType
) {
  viewer {
    ...PartnersRails_viewer_1Wcb23
  }
}

fragment PartnersRails_viewer_1Wcb23 on Viewer {
  partnerCategories(categoryType: $categoryType, size: 50, internal: false) {
    name
    slug
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "categoryType"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "type"
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
              (v1/*: any*/),
              {
                "kind": "Variable",
                "name": "type",
                "variableName": "type"
              }
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
    "cacheID": "824a432bc4eb9b356294979c5f584129",
    "id": null,
    "metadata": {},
    "name": "PartnersRailsQuery",
    "operationKind": "query",
    "text": "query PartnersRailsQuery(\n  $categoryType: PartnerCategoryType\n) {\n  viewer {\n    ...PartnersRails_viewer_1Wcb23\n  }\n}\n\nfragment PartnersRails_viewer_1Wcb23 on Viewer {\n  partnerCategories(categoryType: $categoryType, size: 50, internal: false) {\n    name\n    slug\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '52f4cc94a03d9e88e14d1600fee8a203';
export default node;
