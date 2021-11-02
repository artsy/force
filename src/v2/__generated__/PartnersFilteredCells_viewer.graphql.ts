/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PartnersFilteredCells_viewer = {
    readonly filterPartners: {
        readonly total: number | null;
        readonly aggregations: ReadonlyArray<{
            readonly counts: ReadonlyArray<{
                readonly name: string;
                readonly value: string;
                readonly count: number;
            } | null> | null;
        } | null> | null;
        readonly hits: ReadonlyArray<{
            readonly internalID: string;
            readonly " $fragmentRefs": FragmentRefs<"PartnerCell_partner">;
        } | null> | null;
    } | null;
    readonly " $refType": "PartnersFilteredCells_viewer";
};
export type PartnersFilteredCells_viewer$data = PartnersFilteredCells_viewer;
export type PartnersFilteredCells_viewer$key = {
    readonly " $data"?: PartnersFilteredCells_viewer$data;
    readonly " $fragmentRefs": FragmentRefs<"PartnersFilteredCells_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "category",
      "type": "[String]"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "near",
      "type": "String"
    },
    {
      "defaultValue": 1,
      "kind": "LocalArgument",
      "name": "page",
      "type": "Int"
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
  "name": "PartnersFilteredCells_viewer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "aggregations",
          "value": [
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
          "kind": "Variable",
          "name": "page",
          "variableName": "page"
        },
        {
          "kind": "Variable",
          "name": "partnerCategories",
          "variableName": "category"
        },
        {
          "kind": "Literal",
          "name": "size",
          "value": 12
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "RANDOM_SCORE_DESC"
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
                  "alias": null,
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
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Partner",
          "kind": "LinkedField",
          "name": "hits",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "internalID",
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "PartnerCell_partner"
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
(node as any).hash = 'da136d97d7ef75805c0a24dbda576aae';
export default node;
