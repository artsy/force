/**
 * @generated SignedSource<<1421321f86349da4506cac136ea65894>>
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
  acquireable?: boolean | null;
  additionalGeneIDs?: ReadonlyArray<string | null> | null;
  artistIDs?: ReadonlyArray<string | null> | null;
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
export type SavedSearchAlertNameInputQuery$variables = {
  attributes: PreviewSavedSearchAttributes;
};
export type SavedSearchAlertNameInputQuery$data = {
  readonly viewer: {
    readonly previewSavedSearch: {
      readonly " $fragmentSpreads": FragmentRefs<"SavedSearchAlertNameInput_previewSavedSearch">;
    } | null;
  } | null;
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
