/**
 * @generated SignedSource<<e2c36693edae5e9bdd1115f253747720>>
 * @relayHash 69e06ee9bf32121c0703aff518686263
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 69e06ee9bf32121c0703aff518686263

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerClassification = "AUCTION" | "BRAND" | "DEMO" | "GALLERY" | "INSTITUTION" | "INSTITUTIONAL_SELLER" | "PRIVATE_COLLECTOR" | "PRIVATE_DEALER" | "%future added value";
export type PartnersSpecialtyAutocompleteQuery$variables = {
  near?: string | null | undefined;
  type?: ReadonlyArray<PartnerClassification | null | undefined> | null | undefined;
};
export type PartnersSpecialtyAutocompleteQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"PartnersSpecialtyAutocomplete_viewer">;
  } | null | undefined;
};
export type PartnersSpecialtyAutocompleteQuery = {
  response: PartnersSpecialtyAutocompleteQuery$data;
  variables: PartnersSpecialtyAutocompleteQuery$variables;
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
    "name": "type"
  }
],
v1 = {
  "kind": "Variable",
  "name": "near",
  "variableName": "near"
},
v2 = {
  "kind": "Variable",
  "name": "type",
  "variableName": "type"
},
v3 = {
  "kind": "Literal",
  "name": "defaultProfilePublic",
  "value": true
},
v4 = {
  "kind": "Literal",
  "name": "eligibleForListing",
  "value": true
},
v5 = {
  "kind": "Literal",
  "name": "size",
  "value": 0
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "PartnersAggregationResults",
  "kind": "LinkedField",
  "name": "aggregations",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AggregationCount",
      "kind": "LinkedField",
      "name": "counts",
      "plural": true,
      "selections": [
        {
          "alias": "text",
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "value",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "count",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PartnersSpecialtyAutocompleteQuery",
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
              (v2/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "PartnersSpecialtyAutocomplete_viewer"
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
    "name": "PartnersSpecialtyAutocompleteQuery",
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
            "alias": "allOptions",
            "args": [
              {
                "kind": "Literal",
                "name": "aggregations",
                "value": [
                  "CATEGORY"
                ]
              },
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/)
            ],
            "concreteType": "FilterPartners",
            "kind": "LinkedField",
            "name": "filterPartners",
            "plural": false,
            "selections": [
              (v6/*: any*/)
            ],
            "storageKey": "filterPartners(aggregations:[\"CATEGORY\"],defaultProfilePublic:true,eligibleForListing:true,size:0)"
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "aggregations",
                "value": [
                  "CATEGORY",
                  "TOTAL"
                ]
              },
              (v3/*: any*/),
              (v4/*: any*/),
              (v1/*: any*/),
              (v5/*: any*/),
              (v2/*: any*/)
            ],
            "concreteType": "FilterPartners",
            "kind": "LinkedField",
            "name": "filterPartners",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "total",
                "storageKey": null
              },
              (v6/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "69e06ee9bf32121c0703aff518686263",
    "metadata": {},
    "name": "PartnersSpecialtyAutocompleteQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "bc2d5370c1045a66641603a51525afc7";

export default node;
