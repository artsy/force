/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnersSpecialtyAutocomplete_viewer = {
    readonly filterPartners: {
        readonly total: number | null;
        readonly aggregations: ReadonlyArray<{
            readonly counts: ReadonlyArray<{
                readonly text: string;
                readonly value: string;
                readonly count: number;
            } | null> | null;
        } | null> | null;
    } | null;
    readonly " $refType": "PartnersSpecialtyAutocomplete_viewer";
};
export type PartnersSpecialtyAutocomplete_viewer$data = PartnersSpecialtyAutocomplete_viewer;
export type PartnersSpecialtyAutocomplete_viewer$key = {
    readonly " $data"?: PartnersSpecialtyAutocomplete_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"PartnersSpecialtyAutocomplete_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "near",
      "type": "String"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "type",
      "type": "[PartnerClassification]"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnersSpecialtyAutocomplete_viewer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "aggregations",
          "value": [
            "CATEGORY",
            "TOTAL"
          ]
        },
        {
          "kind": "Literal",
          "name": "defaultProfilePublic",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "eligibleForListing",
          "value": true
        },
        {
          "kind": "Variable",
          "name": "near",
          "variableName": "near"
        },
        {
          "kind": "Literal",
          "name": "size",
          "value": 0
        },
        {
          "kind": "Variable",
          "name": "type",
          "variableName": "type"
        }
      ],
      "concreteType": "FilterPartners",
      "kind": "LinkedField",
      "name": "filterPartners",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "total",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PartnersAggregationResults",
          "kind": "LinkedField",
          "name": "aggregations",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "AggregationCount",
              "kind": "LinkedField",
              "name": "counts",
              "plural": true,
              "selections": [
                {
                  "alias": "text",
                  "args": null,
                  "kind": "ScalarField",
                  "name": "name",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "value",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "count",
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
  ],
  "type": "Viewer"
};
(node as any).hash = '0a2f7d1a599101a1c9dc34a8107ade5e';
export default node;
