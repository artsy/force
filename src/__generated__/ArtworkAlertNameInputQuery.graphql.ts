/**
 * @generated SignedSource<<56a3e167fdc3b064582972105e27f8f7>>
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
export type ArtworkAlertNameInputQuery$variables = {
  attributes: PreviewSavedSearchAttributes;
};
export type ArtworkAlertNameInputQuery$data = {
  readonly viewer: {
    readonly previewSavedSearch: {
      readonly " $fragmentSpreads": FragmentRefs<"ArtworkAlertNameInput_previewSavedSearch">;
    } | null;
  } | null;
};
export type ArtworkAlertNameInputQuery = {
  response: ArtworkAlertNameInputQuery$data;
  variables: ArtworkAlertNameInputQuery$variables;
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
    "name": "ArtworkAlertNameInputQuery",
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
                "name": "ArtworkAlertNameInput_previewSavedSearch"
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
    "name": "ArtworkAlertNameInputQuery",
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
    "cacheID": "5147c77e45b5f1c88080c2bf84190711",
    "id": null,
    "metadata": {},
    "name": "ArtworkAlertNameInputQuery",
    "operationKind": "query",
    "text": "query ArtworkAlertNameInputQuery(\n  $attributes: PreviewSavedSearchAttributes!\n) {\n  viewer {\n    previewSavedSearch(attributes: $attributes) {\n      ...ArtworkAlertNameInput_previewSavedSearch\n    }\n  }\n}\n\nfragment ArtworkAlertNameInput_previewSavedSearch on PreviewSavedSearch {\n  displayName\n}\n"
  }
};
})();

(node as any).hash = "065cd1ab04c2dd344f0a8c5aa700d502";

export default node;
