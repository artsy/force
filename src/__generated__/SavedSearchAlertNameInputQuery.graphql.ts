/**
 * @generated SignedSource<<62e1597db72a9a15e87057020914d96a>>
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
  readonly previewSavedSearch: {
    readonly displayName: string;
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SavedSearchAlertNameInputQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SavedSearchAlertNameInputQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "de53c207480e7620a54434f8120b3596",
    "id": null,
    "metadata": {},
    "name": "SavedSearchAlertNameInputQuery",
    "operationKind": "query",
    "text": "query SavedSearchAlertNameInputQuery(\n  $attributes: PreviewSavedSearchAttributes!\n) {\n  previewSavedSearch(attributes: $attributes) {\n    displayName\n  }\n}\n"
  }
};
})();

(node as any).hash = "1fff36175ac490e3c795e516f2f2c5b2";

export default node;
