/**
 * @generated SignedSource<<a10d7cd670a4463c5b6ab0c47ead96f9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ArtworkSizes = "LARGE" | "MEDIUM" | "SMALL" | "%future added value";
export type PreviewSavedSearchAttributes = {
  acquireable?: boolean | null | undefined;
  additionalGeneIDs?: ReadonlyArray<string | null | undefined> | null | undefined;
  artistIDs?: ReadonlyArray<string | null | undefined> | null | undefined;
  artistSeriesIDs?: ReadonlyArray<string | null | undefined> | null | undefined;
  atAuction?: boolean | null | undefined;
  attributionClass?: ReadonlyArray<string | null | undefined> | null | undefined;
  colors?: ReadonlyArray<string | null | undefined> | null | undefined;
  height?: string | null | undefined;
  inquireableOnly?: boolean | null | undefined;
  locationCities?: ReadonlyArray<string | null | undefined> | null | undefined;
  majorPeriods?: ReadonlyArray<string | null | undefined> | null | undefined;
  materialsTerms?: ReadonlyArray<string | null | undefined> | null | undefined;
  offerable?: boolean | null | undefined;
  partnerIDs?: ReadonlyArray<string | null | undefined> | null | undefined;
  priceRange?: string | null | undefined;
  sizes?: ReadonlyArray<ArtworkSizes | null | undefined> | null | undefined;
  width?: string | null | undefined;
};
export type SuggestedFiltersFetchQuery$variables = {
  attributes: PreviewSavedSearchAttributes;
};
export type SuggestedFiltersFetchQuery$data = {
  readonly previewSavedSearch: {
    readonly suggestedFilters: ReadonlyArray<{
      readonly displayValue: string;
      readonly field: string;
      readonly name: string;
      readonly value: string;
    }>;
  } | null | undefined;
};
export type SuggestedFiltersFetchQuery = {
  response: SuggestedFiltersFetchQuery$data;
  variables: SuggestedFiltersFetchQuery$variables;
};

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
        "name": "suggestedFilters",
        "plural": true,
        "selections": [
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
            "name": "field",
            "storageKey": null
          },
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
    "name": "SuggestedFiltersFetchQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SuggestedFiltersFetchQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "97c50a13547a4c48ddcad4109ad833f8",
    "id": null,
    "metadata": {},
    "name": "SuggestedFiltersFetchQuery",
    "operationKind": "query",
    "text": "query SuggestedFiltersFetchQuery(\n  $attributes: PreviewSavedSearchAttributes!\n) {\n  previewSavedSearch(attributes: $attributes) {\n    suggestedFilters {\n      displayValue\n      field\n      name\n      value\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1e2ed90cb17c1db86c1e273c94d1dde0";

export default node;
