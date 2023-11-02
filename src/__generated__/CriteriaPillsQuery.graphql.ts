/**
 * @generated SignedSource<<2fb99288bcbb7bc2fa0a5c14a1c67a54>>
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
export type CriteriaPillsQuery$variables = {
  attributes?: PreviewSavedSearchAttributes | null;
};
export type CriteriaPillsQuery$data = {
  readonly viewer: {
    readonly previewSavedSearch: {
      readonly " $fragmentSpreads": FragmentRefs<"CriteriaPills_previewSavedSearch">;
    } | null;
  } | null;
};
export type CriteriaPillsQuery = {
  response: CriteriaPillsQuery$data;
  variables: CriteriaPillsQuery$variables;
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
    "name": "CriteriaPillsQuery",
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
                "name": "CriteriaPills_previewSavedSearch"
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
    "name": "CriteriaPillsQuery",
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
    ]
  },
  "params": {
    "cacheID": "5699763c7ab54e6adb874aaee3d540d2",
    "id": null,
    "metadata": {},
    "name": "CriteriaPillsQuery",
    "operationKind": "query",
    "text": "query CriteriaPillsQuery(\n  $attributes: PreviewSavedSearchAttributes\n) {\n  viewer {\n    previewSavedSearch(attributes: $attributes) {\n      ...CriteriaPills_previewSavedSearch\n    }\n  }\n}\n\nfragment CriteriaPills_previewSavedSearch on PreviewSavedSearch {\n  labels {\n    displayValue\n    field\n    value\n  }\n}\n"
  }
};
})();

(node as any).hash = "ded7682a89d9a2359de0f25bdd9e4f36";

export default node;
