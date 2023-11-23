/**
 * @generated SignedSource<<bf438376693b03fd025ab161b431bc01>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ArtworkSizes = "LARGE" | "MEDIUM" | "SMALL" | "%future added value";
export type PreviewSavedSearchAttributes = {
  acquireable?: boolean | null;
  additionalGeneIDs?: ReadonlyArray<string | null> | null;
  artistIDs?: ReadonlyArray<string | null> | null;
  artistSeriesIDs?: ReadonlyArray<string | null> | null;
  atAuction?: boolean | null;
  attributionClass?: ReadonlyArray<string | null> | null;
  colors?: ReadonlyArray<string | null> | null;
  height?: string | null;
  inquireableOnly?: boolean | null;
  locationCities?: ReadonlyArray<string | null> | null;
  majorPeriods?: ReadonlyArray<string | null> | null;
  materialsTerms?: ReadonlyArray<string | null> | null;
  offerable?: boolean | null;
  partnerIDs?: ReadonlyArray<string | null> | null;
  priceRange?: string | null;
  sizes?: ReadonlyArray<ArtworkSizes | null> | null;
  width?: string | null;
};
export type AlertProviderPreviewQuery$variables = {
  attributes?: PreviewSavedSearchAttributes | null;
};
export type AlertProviderPreviewQuery$data = {
  readonly viewer: {
    readonly previewSavedSearch: {
      readonly displayName: string;
      readonly labels: ReadonlyArray<{
        readonly displayValue: string;
        readonly field: string;
        readonly value: string;
      } | null>;
    } | null;
  } | null;
};
export type AlertProviderPreviewQuery = {
  response: AlertProviderPreviewQuery$data;
  variables: AlertProviderPreviewQuery$variables;
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
            "kind": "ScalarField",
            "name": "displayName",
            "storageKey": null
          },
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
                "name": "value",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AlertProviderPreviewQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AlertProviderPreviewQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "07c7e1e6af4c9f5a132c8efaad8c16d0",
    "id": null,
    "metadata": {},
    "name": "AlertProviderPreviewQuery",
    "operationKind": "query",
    "text": "query AlertProviderPreviewQuery(\n  $attributes: PreviewSavedSearchAttributes\n) {\n  viewer {\n    previewSavedSearch(attributes: $attributes) {\n      displayName\n      labels {\n        displayValue\n        field\n        value\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "77c3d48b13f44a144f4dcca7575a9701";

export default node;
