/**
 * @generated SignedSource<<8afc64dc684d2226b9cf544a343808aa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type PartnerClassification = "AUCTION" | "BRAND" | "DEMO" | "GALLERY" | "INSTITUTION" | "INSTITUTIONAL_SELLER" | "PRIVATE_COLLECTOR" | "PRIVATE_DEALER" | "%future added value";
export type PartnersSearchQuery$variables = {
  near?: string | null | undefined;
  partnerCategories?: ReadonlyArray<string | null | undefined> | null | undefined;
  term?: string | null | undefined;
  type?: ReadonlyArray<PartnerClassification | null | undefined> | null | undefined;
};
export type PartnersSearchQuery$data = {
  readonly filterPartners: {
    readonly hits: ReadonlyArray<{
      readonly text: string | null | undefined;
      readonly value: string;
    } | null | undefined> | null | undefined;
    readonly total: number | null | undefined;
  } | null | undefined;
};
export type PartnersSearchQuery = {
  response: PartnersSearchQuery$data;
  variables: PartnersSearchQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "near"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "partnerCategories"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "term"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "type"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "aggregations",
    "value": [
      "TOTAL"
    ]
  },
  {
    "kind": "Literal",
    "name": "defaultProfilePublic",
    "value": true
  },
  {
    "kind": "Literal",
    "name": "eligibleForListing",
    "value": true
  },
  {
    "kind": "Variable",
    "name": "near",
    "variableName": "near"
  },
  {
    "kind": "Variable",
    "name": "partnerCategories",
    "variableName": "partnerCategories"
  },
  {
    "kind": "Literal",
    "name": "size",
    "value": 9
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "RANDOM_SCORE_DESC"
  },
  {
    "kind": "Variable",
    "name": "term",
    "variableName": "term"
  },
  {
    "kind": "Variable",
    "name": "type",
    "variableName": "type"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "total",
  "storageKey": null
},
v3 = {
  "alias": "text",
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": "value",
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PartnersSearchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FilterPartners",
        "kind": "LinkedField",
        "name": "filterPartners",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "hits",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
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
    "name": "PartnersSearchQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "FilterPartners",
        "kind": "LinkedField",
        "name": "filterPartners",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "hits",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
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
    "cacheID": "ae0dd24054f0bb323a02c978f9f32965",
    "id": null,
    "metadata": {},
    "name": "PartnersSearchQuery",
    "operationKind": "query",
    "text": "query PartnersSearchQuery(\n  $near: String\n  $partnerCategories: [String]\n  $term: String\n  $type: [PartnerClassification]\n) {\n  filterPartners(aggregations: [TOTAL], defaultProfilePublic: true, eligibleForListing: true, near: $near, partnerCategories: $partnerCategories, size: 9, sort: RANDOM_SCORE_DESC, term: $term, type: $type) {\n    total\n    hits {\n      text: name\n      value: slug\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "dfcfa9f59c8ea96091be4c5343625c5a";

export default node;
