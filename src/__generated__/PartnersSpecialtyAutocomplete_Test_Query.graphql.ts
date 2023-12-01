/**
 * @generated SignedSource<<9da2cc395475214b6cdb407af8969afc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnersSpecialtyAutocomplete_Test_Query$variables = Record<PropertyKey, never>;
export type PartnersSpecialtyAutocomplete_Test_Query$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"PartnersSpecialtyAutocomplete_viewer">;
  } | null | undefined;
};
export type PartnersSpecialtyAutocomplete_Test_Query = {
  response: PartnersSpecialtyAutocomplete_Test_Query$data;
  variables: PartnersSpecialtyAutocomplete_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "Literal",
  "name": "defaultProfilePublic",
  "value": true
},
v1 = {
  "kind": "Literal",
  "name": "eligibleForListing",
  "value": true
},
v2 = {
  "kind": "Literal",
  "name": "size",
  "value": 0
},
v3 = {
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
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FilterPartners"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "PartnersAggregationResults"
},
v6 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "AggregationCount"
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PartnersSpecialtyAutocomplete_Test_Query",
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
            "args": null,
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PartnersSpecialtyAutocomplete_Test_Query",
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
              (v0/*: any*/),
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "concreteType": "FilterPartners",
            "kind": "LinkedField",
            "name": "filterPartners",
            "plural": false,
            "selections": [
              (v3/*: any*/)
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
              (v0/*: any*/),
              (v1/*: any*/),
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
              (v3/*: any*/)
            ],
            "storageKey": "filterPartners(aggregations:[\"CATEGORY\",\"TOTAL\"],defaultProfilePublic:true,eligibleForListing:true,size:0)"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c453652cf50ad24c7da6508942566537",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.allOptions": (v4/*: any*/),
        "viewer.allOptions.aggregations": (v5/*: any*/),
        "viewer.allOptions.aggregations.counts": (v6/*: any*/),
        "viewer.allOptions.aggregations.counts.count": (v7/*: any*/),
        "viewer.allOptions.aggregations.counts.text": (v8/*: any*/),
        "viewer.allOptions.aggregations.counts.value": (v8/*: any*/),
        "viewer.filterPartners": (v4/*: any*/),
        "viewer.filterPartners.aggregations": (v5/*: any*/),
        "viewer.filterPartners.aggregations.counts": (v6/*: any*/),
        "viewer.filterPartners.aggregations.counts.count": (v7/*: any*/),
        "viewer.filterPartners.aggregations.counts.text": (v8/*: any*/),
        "viewer.filterPartners.aggregations.counts.value": (v8/*: any*/),
        "viewer.filterPartners.total": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        }
      }
    },
    "name": "PartnersSpecialtyAutocomplete_Test_Query",
    "operationKind": "query",
    "text": "query PartnersSpecialtyAutocomplete_Test_Query {\n  viewer {\n    ...PartnersSpecialtyAutocomplete_viewer\n  }\n}\n\nfragment PartnersSpecialtyAutocomplete_viewer on Viewer {\n  allOptions: filterPartners(aggregations: [CATEGORY], defaultProfilePublic: true, eligibleForListing: true, size: 0) {\n    aggregations {\n      counts {\n        text: name\n        value\n        count\n      }\n    }\n  }\n  filterPartners(aggregations: [CATEGORY, TOTAL], defaultProfilePublic: true, eligibleForListing: true, size: 0) {\n    total\n    aggregations {\n      counts {\n        text: name\n        value\n        count\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ca2bb8fe0eb8a309e237fa2875cfe2d7";

export default node;
