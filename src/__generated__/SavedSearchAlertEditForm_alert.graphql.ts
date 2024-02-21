/**
 * @generated SignedSource<<80d2c1bdfcb491e6ad34c2559ba733d6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavedSearchAlertEditForm_alert$data = {
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
    readonly email: boolean;
    readonly name: string | null | undefined;
    readonly push: boolean;
  };
  readonly sizes: ReadonlyArray<string | null | undefined> | null | undefined;
  readonly width: string | null | undefined;
  readonly " $fragmentType": "SavedSearchAlertEditForm_alert";
};
export type SavedSearchAlertEditForm_alert$key = {
  readonly " $data"?: SavedSearchAlertEditForm_alert$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavedSearchAlertEditForm_alert">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavedSearchAlertEditForm_alert",
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
      "name": "artistSeriesIDs",
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
          "name": "details",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Alert",
  "abstractKey": null
};

(node as any).hash = "4785e6b553b699302af9da671f2460c3";

export default node;
