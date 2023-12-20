/**
 * @generated SignedSource<<c335d5d81aef8b972e5b5f470f27e542>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type AlertSourceType = "ARTIST" | "ARTWORK" | "%future added value";
export type ArtworkSizes = "LARGE" | "MEDIUM" | "SMALL" | "%future added value";
export type AlertSource = {
  id?: string | null | undefined;
  type?: AlertSourceType | null | undefined;
};
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
  source?: AlertSource | null | undefined;
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
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "attributes"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "source"
},
v2 = [
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
        "args": [
          {
            "kind": "Variable",
            "name": "source",
            "variableName": "source"
          }
        ],
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SuggestedFiltersFetchQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "SuggestedFiltersFetchQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "55f3243863662916e0b9a80153e66417",
    "id": null,
    "metadata": {},
    "name": "SuggestedFiltersFetchQuery",
    "operationKind": "query",
    "text": "query SuggestedFiltersFetchQuery(\n  $source: AlertSource\n  $attributes: PreviewSavedSearchAttributes!\n) {\n  previewSavedSearch(attributes: $attributes) {\n    suggestedFilters(source: $source) {\n      displayValue\n      field\n      name\n      value\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ce25b26f74071154884ace1ba36f703e";

export default node;
