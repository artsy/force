/**
 * @generated SignedSource<<7c25a631f33ee3ba5490e438c4333505>>
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
export type AlertNameInputQuery$variables = {
  attributes: PreviewSavedSearchAttributes;
};
export type AlertNameInputQuery$data = {
  readonly viewer: {
    readonly previewSavedSearch: {
      readonly " $fragmentSpreads": FragmentRefs<"AlertNameInput_previewSavedSearch">;
    } | null;
  } | null;
};
export type AlertNameInputQuery = {
  response: AlertNameInputQuery$data;
  variables: AlertNameInputQuery$variables;
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
    "name": "AlertNameInputQuery",
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
                "name": "AlertNameInput_previewSavedSearch"
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
    "name": "AlertNameInputQuery",
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
    "cacheID": "84d8e683de609dd49f0eaa446157a55e",
    "id": null,
    "metadata": {},
    "name": "AlertNameInputQuery",
    "operationKind": "query",
    "text": "query AlertNameInputQuery(\n  $attributes: PreviewSavedSearchAttributes!\n) {\n  viewer {\n    previewSavedSearch(attributes: $attributes) {\n      ...AlertNameInput_previewSavedSearch\n    }\n  }\n}\n\nfragment AlertNameInput_previewSavedSearch on PreviewSavedSearch {\n  displayName\n}\n"
  }
};
})();

(node as any).hash = "3595ad95792df28280423269f3658575";

export default node;
