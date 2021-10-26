/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnerClassification = "AUCTION" | "BRAND" | "DEMO" | "GALLERY" | "INSTITUTION" | "INSTITUTIONAL_SELLER" | "PRIVATE_COLLECTOR" | "PRIVATE_DEALER" | "%future added value";
export type PartnersSpecialtyAutocompleteQueryVariables = {
    near?: string | null;
    type?: Array<PartnerClassification | null> | null;
};
export type PartnersSpecialtyAutocompleteQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"PartnersSpecialtyAutocomplete_viewer">;
    } | null;
};
export type PartnersSpecialtyAutocompleteQuery = {
    readonly response: PartnersSpecialtyAutocompleteQueryResponse;
    readonly variables: PartnersSpecialtyAutocompleteQueryVariables;
};



/*
query PartnersSpecialtyAutocompleteQuery(
  $near: String
  $type: [PartnerClassification]
) {
  viewer {
    ...PartnersSpecialtyAutocomplete_viewer_2yvayw
  }
}

fragment PartnersSpecialtyAutocomplete_viewer_2yvayw on Viewer {
  filterPartners(aggregations: [CATEGORY, TOTAL], defaultProfilePublic: true, eligibleForListing: true, near: $near, size: 0, type: $type) {
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
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "near",
    "type": "String"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "type",
    "type": "[PartnerClassification]"
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
    "type": "Query"
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
              (v1/*: any*/),
              {
                "kind": "Literal",
                "name": "size",
                "value": 0
              },
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
              {
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
    "id": null,
    "metadata": {},
    "name": "PartnersSpecialtyAutocompleteQuery",
    "operationKind": "query",
    "text": "query PartnersSpecialtyAutocompleteQuery(\n  $near: String\n  $type: [PartnerClassification]\n) {\n  viewer {\n    ...PartnersSpecialtyAutocomplete_viewer_2yvayw\n  }\n}\n\nfragment PartnersSpecialtyAutocomplete_viewer_2yvayw on Viewer {\n  filterPartners(aggregations: [CATEGORY, TOTAL], defaultProfilePublic: true, eligibleForListing: true, near: $near, size: 0, type: $type) {\n    total\n    aggregations {\n      counts {\n        text: name\n        value\n        count\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'bc2d5370c1045a66641603a51525afc7';
export default node;
