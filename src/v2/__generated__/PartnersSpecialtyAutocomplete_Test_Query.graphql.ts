/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnersSpecialtyAutocomplete_Test_QueryVariables = {};
export type PartnersSpecialtyAutocomplete_Test_QueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"PartnersSpecialtyAutocomplete_viewer">;
    } | null;
};
export type PartnersSpecialtyAutocomplete_Test_Query = {
    readonly response: PartnersSpecialtyAutocomplete_Test_QueryResponse;
    readonly variables: PartnersSpecialtyAutocomplete_Test_QueryVariables;
};



/*
query PartnersSpecialtyAutocomplete_Test_Query {
  viewer {
    ...PartnersSpecialtyAutocomplete_viewer
  }
}

fragment PartnersSpecialtyAutocomplete_viewer on Viewer {
  allOptions: filterPartners(aggregations: [CATEGORY], defaultProfilePublic: true, eligibleForListing: true, size: 0) {
    aggregations {
      counts {
        text: name
        value
        count
      }
    }
  }
  filterPartners(aggregations: [CATEGORY, TOTAL], defaultProfilePublic: true, eligibleForListing: true, size: 0) {
    total
    aggregations {
      counts {
        text: name
        value
        count
      }
    }
  }
}
*/

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
    "type": "Query"
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
    "id": null,
    "metadata": {},
    "name": "PartnersSpecialtyAutocomplete_Test_Query",
    "operationKind": "query",
    "text": "query PartnersSpecialtyAutocomplete_Test_Query {\n  viewer {\n    ...PartnersSpecialtyAutocomplete_viewer\n  }\n}\n\nfragment PartnersSpecialtyAutocomplete_viewer on Viewer {\n  allOptions: filterPartners(aggregations: [CATEGORY], defaultProfilePublic: true, eligibleForListing: true, size: 0) {\n    aggregations {\n      counts {\n        text: name\n        value\n        count\n      }\n    }\n  }\n  filterPartners(aggregations: [CATEGORY, TOTAL], defaultProfilePublic: true, eligibleForListing: true, size: 0) {\n    total\n    aggregations {\n      counts {\n        text: name\n        value\n        count\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '229934365b6d20de56170f3618ecd104';
export default node;
