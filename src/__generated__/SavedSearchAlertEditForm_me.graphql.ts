/**
 * @generated SignedSource<<8fef1405178a6f20aba9a806141d254e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type UserSearchCriteriaFrequency = "daily" | "instant" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SavedSearchAlertEditForm_me$data = {
  readonly savedSearch: {
    readonly acquireable: boolean | null;
    readonly additionalGeneIDs: ReadonlyArray<string>;
    readonly artistIDs: ReadonlyArray<string> | null;
    readonly atAuction: boolean | null;
    readonly attributionClass: ReadonlyArray<string>;
    readonly colors: ReadonlyArray<string>;
    readonly dimensionRange: string | null;
    readonly height: string | null;
    readonly inquireableOnly: boolean | null;
    readonly internalID: string;
    readonly locationCities: ReadonlyArray<string>;
    readonly majorPeriods: ReadonlyArray<string>;
    readonly materialsTerms: ReadonlyArray<string>;
    readonly offerable: boolean | null;
    readonly partnerIDs: ReadonlyArray<string>;
    readonly priceRange: string | null;
    readonly sizes: ReadonlyArray<string>;
    readonly userAlertSettings: {
      readonly email: boolean;
      readonly frequency: UserSearchCriteriaFrequency;
      readonly name: string | null;
      readonly push: boolean;
    };
    readonly width: string | null;
  } | null;
  readonly " $fragmentType": "SavedSearchAlertEditForm_me";
};
export type SavedSearchAlertEditForm_me$key = {
  readonly " $data"?: SavedSearchAlertEditForm_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavedSearchAlertEditForm_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "savedSearchId"
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
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "frequency",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "37ee1dfe8af0053119d548baf48b2162";

export default node;
