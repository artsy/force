/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SavedSearchAlertEditForm_me = {
    readonly savedSearch: {
        readonly internalID: string;
        readonly acquireable: boolean | null;
        readonly additionalGeneIDs: ReadonlyArray<string>;
        readonly artistIDs: ReadonlyArray<string> | null;
        readonly atAuction: boolean | null;
        readonly attributionClass: ReadonlyArray<string>;
        readonly colors: ReadonlyArray<string>;
        readonly dimensionRange: string | null;
        readonly sizes: ReadonlyArray<string>;
        readonly width: string | null;
        readonly height: string | null;
        readonly inquireableOnly: boolean | null;
        readonly locationCities: ReadonlyArray<string>;
        readonly majorPeriods: ReadonlyArray<string>;
        readonly materialsTerms: ReadonlyArray<string>;
        readonly offerable: boolean | null;
        readonly partnerIDs: ReadonlyArray<string>;
        readonly priceRange: string | null;
        readonly userAlertSettings: {
            readonly name: string | null;
            readonly email: boolean;
            readonly push: boolean;
        };
        readonly labels?: ReadonlyArray<{
            readonly field: string;
            readonly value: string;
            readonly displayValue: string;
        }>;
    } | null;
    readonly " $refType": "SavedSearchAlertEditForm_me";
};
export type SavedSearchAlertEditForm_me$data = SavedSearchAlertEditForm_me;
export type SavedSearchAlertEditForm_me$key = {
    readonly " $data"?: SavedSearchAlertEditForm_me$data;
    readonly " $fragmentRefs": FragmentRefs<"SavedSearchAlertEditForm_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "savedSearchId"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "withAggregations"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavedSearchAlertEditForm_me",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "savedSearchId"
        }
      ],
      "concreteType": "SearchCriteria",
      "kind": "LinkedField",
      "name": "savedSearch",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "acquireable",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "additionalGeneIDs",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "artistIDs",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "atAuction",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "attributionClass",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "colors",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "dimensionRange",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "sizes",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "width",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "height",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "inquireableOnly",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "locationCities",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "majorPeriods",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "materialsTerms",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "offerable",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "partnerIDs",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "priceRange",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "SavedSearchUserAlertSettings",
          "kind": "LinkedField",
          "name": "userAlertSettings",
          "plural": false,
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
              "name": "email",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "push",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "condition": "withAggregations",
          "kind": "Condition",
          "passingValue": false,
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
                  "name": "field",
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
                  "name": "displayValue",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ]
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = '1f8ca40d6ff77c4fb56b84763c946395';
export default node;
