/**
 * @generated SignedSource<<c8a72e0320bb0fbd813716e7a0188fe2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavedSearchAlertEditForm_searchCriteria$data = {
  readonly acquireable: boolean | null | undefined;
  readonly additionalGeneIDs: ReadonlyArray<string>;
  readonly artistIDs: ReadonlyArray<string> | null | undefined;
  readonly artistSeriesIDs: ReadonlyArray<string>;
  readonly atAuction: boolean | null | undefined;
  readonly attributionClass: ReadonlyArray<string>;
  readonly colors: ReadonlyArray<string>;
  readonly dimensionRange: string | null | undefined;
  readonly height: string | null | undefined;
  readonly inquireableOnly: boolean | null | undefined;
  readonly internalID: string;
  readonly locationCities: ReadonlyArray<string>;
  readonly majorPeriods: ReadonlyArray<string>;
  readonly materialsTerms: ReadonlyArray<string>;
  readonly offerable: boolean | null | undefined;
  readonly partnerIDs: ReadonlyArray<string>;
  readonly priceRange: string | null | undefined;
  readonly sizes: ReadonlyArray<string>;
  readonly userAlertSettings: {
    readonly details: string | null | undefined;
    readonly email: boolean;
    readonly name: string | null | undefined;
    readonly push: boolean;
  };
  readonly width: string | null | undefined;
  readonly " $fragmentType": "SavedSearchAlertEditForm_searchCriteria";
};
export type SavedSearchAlertEditForm_searchCriteria$key = {
  readonly " $data"?: SavedSearchAlertEditForm_searchCriteria$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavedSearchAlertEditForm_searchCriteria">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavedSearchAlertEditForm_searchCriteria",
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
          "name": "details",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "SearchCriteria",
  "abstractKey": null
};

(node as any).hash = "3e2d3c86c8e55e44a64781d471d086cc";

export default node;
