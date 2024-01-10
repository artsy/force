/**
 * @generated SignedSource<<8e42eec3b27aa6b6eb0eb262867fd0c5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type AlertSettingsFrequency = "DAILY" | "INSTANT" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SavedSearchAlertEditForm_me$data = {
  readonly alert: {
    readonly acquireable: boolean | null | undefined;
    readonly additionalGeneIDs: ReadonlyArray<string | null | undefined> | null | undefined;
    readonly artistIDs: ReadonlyArray<string | null | undefined> | null | undefined;
    readonly artistSeriesIDs: ReadonlyArray<string | null | undefined> | null | undefined;
    readonly atAuction: boolean | null | undefined;
    readonly attributionClass: ReadonlyArray<string | null | undefined> | null | undefined;
    readonly colors: ReadonlyArray<string | null | undefined> | null | undefined;
    readonly dimensionRange: string | null | undefined;
    readonly height: string | null | undefined;
    readonly inquireableOnly: boolean | null | undefined;
    readonly internalID: string;
    readonly locationCities: ReadonlyArray<string | null | undefined> | null | undefined;
    readonly majorPeriods: ReadonlyArray<string | null | undefined> | null | undefined;
    readonly materialsTerms: ReadonlyArray<string | null | undefined> | null | undefined;
    readonly offerable: boolean | null | undefined;
    readonly partnerIDs: ReadonlyArray<string | null | undefined> | null | undefined;
    readonly priceRange: string | null | undefined;
    readonly settings: {
      readonly details: string | null | undefined;
      readonly email: boolean | null | undefined;
      readonly frequency: AlertSettingsFrequency | null | undefined;
      readonly name: string | null | undefined;
      readonly push: boolean | null | undefined;
    } | null | undefined;
    readonly sizes: ReadonlyArray<string | null | undefined> | null | undefined;
    readonly width: string | null | undefined;
  } | null | undefined;
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
      "name": "alertID"
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
          "variableName": "alertID"
        }
      ],
      "concreteType": "Alert",
      "kind": "LinkedField",
      "name": "alert",
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
          "name": "artistSeriesIDs",
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
          "concreteType": "AlertSettings",
          "kind": "LinkedField",
          "name": "settings",
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
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "details",
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

(node as any).hash = "107137dadedf626c5284e3d41dea8333";

export default node;
