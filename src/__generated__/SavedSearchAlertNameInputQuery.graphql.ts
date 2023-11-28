/**
 * @generated SignedSource<<660634f9cfc5fb5a98f39f8e3ff83e8f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
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
export type SavedSearchAlertNameInputQuery$variables = {
  attributes: PreviewSavedSearchAttributes;
};
export type SavedSearchAlertNameInputQuery$data = {
  readonly viewer: {
    readonly previewSavedSearch: {
      readonly " $fragmentSpreads": FragmentRefs<"SavedSearchAlertNameInput_previewSavedSearch">;
    } | null | undefined;
  } | null | undefined;
};
export type SavedSearchAlertNameInputQuery = {
  response: SavedSearchAlertNameInputQuery$data;
  variables: SavedSearchAlertNameInputQuery$variables;
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
    "name": "SavedSearchAlertNameInputQuery",
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
            "args": (v1/*: any*/),
            "concreteType": "PreviewSavedSearch",
            "kind": "LinkedField",
            "name": "previewSavedSearch",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "SavedSearchAlertNameInput_previewSavedSearch"
              }
            ],
            "storageKey": null
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
    "name": "SavedSearchAlertNameInputQuery",
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
            "args": (v1/*: any*/),
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
    "cacheID": "77f96e974094f5bcc19f2294877ad861",
    "id": null,
    "metadata": {},
    "name": "SavedSearchAlertNameInputQuery",
    "operationKind": "query",
    "text": "query SavedSearchAlertNameInputQuery(\n  $attributes: PreviewSavedSearchAttributes!\n) {\n  viewer {\n    previewSavedSearch(attributes: $attributes) {\n      ...SavedSearchAlertNameInput_previewSavedSearch\n    }\n  }\n}\n\nfragment SavedSearchAlertNameInput_previewSavedSearch on PreviewSavedSearch {\n  displayName\n}\n"
  }
};
})();

(node as any).hash = "55f1e043586d42fa286585a27e62a01e";

export default node;
