/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSizes = "LARGE" | "MEDIUM" | "SMALL" | "%future added value";
export type PreviewSavedSearchAttributes = {
    acquireable?: boolean | null;
    additionalGeneIDs?: Array<string | null> | null;
    artistIDs?: Array<string | null> | null;
    atAuction?: boolean | null;
    attributionClass?: Array<string | null> | null;
    colors?: Array<string | null> | null;
    height?: string | null;
    inquireableOnly?: boolean | null;
    locationCities?: Array<string | null> | null;
    majorPeriods?: Array<string | null> | null;
    materialsTerms?: Array<string | null> | null;
    offerable?: boolean | null;
    partnerIDs?: Array<string | null> | null;
    priceRange?: string | null;
    sizes?: Array<ArtworkSizes | null> | null;
    width?: string | null;
};
export type SavedSearchPreviewPillsQueryVariables = {
    attributes?: PreviewSavedSearchAttributes | null;
};
export type SavedSearchPreviewPillsQueryResponse = {
    readonly previewSavedSearch: {
        readonly " $fragmentRefs": FragmentRefs<"SavedSearchPreviewPills_previewSavedSearch">;
    } | null;
};
export type SavedSearchPreviewPillsQuery = {
    readonly response: SavedSearchPreviewPillsQueryResponse;
    readonly variables: SavedSearchPreviewPillsQueryVariables;
};



/*
query SavedSearchPreviewPillsQuery(
  $attributes: PreviewSavedSearchAttributes
) {
  previewSavedSearch(attributes: $attributes) {
    ...SavedSearchPreviewPills_previewSavedSearch
  }
}

fragment SavedSearchPreviewPills_previewSavedSearch on PreviewSavedSearch {
  labels {
    field
    displayValue
    value
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "attributes"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "attributes",
    "variableName": "attributes"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SavedSearchPreviewPillsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "PreviewSavedSearch",
        "kind": "LinkedField",
        "name": "previewSavedSearch",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SavedSearchPreviewPills_previewSavedSearch"
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
    "name": "SavedSearchPreviewPillsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "PreviewSavedSearch",
        "kind": "LinkedField",
        "name": "previewSavedSearch",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "SearchCriteriaLabel",
            "kind": "LinkedField",
            "name": "labels",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "field",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "displayValue",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "value",
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
    "cacheID": "bc7afa6c7d5c1a589bb2cbd284cf3670",
    "id": null,
    "metadata": {},
    "name": "SavedSearchPreviewPillsQuery",
    "operationKind": "query",
    "text": "query SavedSearchPreviewPillsQuery(\n  $attributes: PreviewSavedSearchAttributes\n) {\n  previewSavedSearch(attributes: $attributes) {\n    ...SavedSearchPreviewPills_previewSavedSearch\n  }\n}\n\nfragment SavedSearchPreviewPills_previewSavedSearch on PreviewSavedSearch {\n  labels {\n    field\n    displayValue\n    value\n  }\n}\n"
  }
};
})();
(node as any).hash = '85a364a11a08b6889bf9157b9ce5220f';
export default node;
