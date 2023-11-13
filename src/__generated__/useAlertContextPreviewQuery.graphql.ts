/**
 * @generated SignedSource<<cb5c3716c68b21b09a2545f849f44cb0>>
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
export type useAlertContextPreviewQuery$variables = {
  attributes?: PreviewSavedSearchAttributes | null;
};
export type useAlertContextPreviewQuery$data = {
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
export type useAlertContextPreviewQuery = {
  response: useAlertContextPreviewQuery$data;
  variables: useAlertContextPreviewQuery$variables;
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
    "name": "useAlertContextPreviewQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useAlertContextPreviewQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e5288d07d58057ca184f2ee652db8f08",
    "id": null,
    "metadata": {},
    "name": "useAlertContextPreviewQuery",
    "operationKind": "query",
    "text": "query useAlertContextPreviewQuery(\n  $attributes: PreviewSavedSearchAttributes\n) {\n  viewer {\n    previewSavedSearch(attributes: $attributes) {\n      displayName\n      labels {\n        displayValue\n        field\n        value\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7ebca4e74038b60d54f1fc2c445e211c";

export default node;
