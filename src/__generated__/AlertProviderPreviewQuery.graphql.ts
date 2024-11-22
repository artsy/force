/**
 * @generated SignedSource<<769e14c4ac33a13c247e20d7bc7d11d4>>
 * @relayHash c37038e6282d87be348b8ee47f551631
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID c37038e6282d87be348b8ee47f551631

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
export type AlertProviderPreviewQuery$variables = {
  attributes?: PreviewSavedSearchAttributes | null | undefined;
};
export type AlertProviderPreviewQuery$data = {
  readonly viewer: {
    readonly previewSavedSearch: {
      readonly labels: ReadonlyArray<{
        readonly displayValue: string;
        readonly field: string;
        readonly value: string;
      } | null | undefined>;
    } | null | undefined;
  } | null | undefined;
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
    "id": "c37038e6282d87be348b8ee47f551631",
    "metadata": {},
    "name": "AlertProviderPreviewQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "9b25c03b791f0b61fccd20104d20e3e3";

export default node;
