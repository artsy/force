/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
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
export type usePreviewPillsQueryVariables = {
    attributes?: PreviewSavedSearchAttributes | null;
};
export type usePreviewPillsQueryResponse = {
    readonly previewSavedSearch: {
        readonly labels: ReadonlyArray<{
            readonly field: string;
            readonly displayValue: string;
            readonly value: string;
        } | null>;
    } | null;
};
export type usePreviewPillsQuery = {
    readonly response: usePreviewPillsQueryResponse;
    readonly variables: usePreviewPillsQueryVariables;
};



/*
query usePreviewPillsQuery(
  $attributes: PreviewSavedSearchAttributes
) {
  previewSavedSearch(attributes: $attributes) {
    labels {
      field
      displayValue
      value
    }
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "attributes",
        "variableName": "attributes"
      }
    ],
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "usePreviewPillsQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "usePreviewPillsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "380b2a3f2936e6f982ee28be90340a82",
    "id": null,
    "metadata": {},
    "name": "usePreviewPillsQuery",
    "operationKind": "query",
    "text": "query usePreviewPillsQuery(\n  $attributes: PreviewSavedSearchAttributes\n) {\n  previewSavedSearch(attributes: $attributes) {\n    labels {\n      field\n      displayValue\n      value\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd2be3a6caa7c794c0b835a8628e5646c';
export default node;
