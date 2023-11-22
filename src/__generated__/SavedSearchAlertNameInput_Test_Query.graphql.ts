/**
 * @generated SignedSource<<37d86eea05d4747af8b6fe54711edd25>>
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
export type SavedSearchAlertNameInput_Test_Query$variables = {
  attributes: PreviewSavedSearchAttributes;
};
export type SavedSearchAlertNameInput_Test_Query$data = {
  readonly viewer: {
    readonly previewSavedSearch: {
      readonly displayName: string;
    } | null | undefined;
  } | null | undefined;
};
export type SavedSearchAlertNameInput_Test_Query = {
  response: SavedSearchAlertNameInput_Test_Query$data;
  variables: SavedSearchAlertNameInput_Test_Query$variables;
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
    "name": "SavedSearchAlertNameInput_Test_Query",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SavedSearchAlertNameInput_Test_Query",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6256da5b9e01982d8f7ae0d745076923",
    "id": null,
    "metadata": {},
    "name": "SavedSearchAlertNameInput_Test_Query",
    "operationKind": "query",
    "text": "query SavedSearchAlertNameInput_Test_Query(\n  $attributes: PreviewSavedSearchAttributes!\n) {\n  viewer {\n    previewSavedSearch(attributes: $attributes) {\n      displayName\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "cfbfeb2a6a52be89399b432ce61b72bc";

export default node;
