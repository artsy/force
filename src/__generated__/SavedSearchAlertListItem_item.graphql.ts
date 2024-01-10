/**
 * @generated SignedSource<<c5958790b0707991811db694da2710ff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavedSearchAlertListItem_item$data = {
  readonly artistIDs: ReadonlyArray<string | null | undefined> | null | undefined;
  readonly artistSeriesIDs: ReadonlyArray<string | null | undefined> | null | undefined;
  readonly displayName: string;
  readonly href: string | null | undefined;
  readonly internalID: string;
  readonly labels: ReadonlyArray<{
    readonly displayValue: string;
  } | null | undefined>;
  readonly settings: {
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "SavedSearchAlertListItem_item";
};
export type SavedSearchAlertListItem_item$key = {
  readonly " $data"?: SavedSearchAlertListItem_item$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavedSearchAlertListItem_item">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavedSearchAlertListItem_item",
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
      "name": "displayName",
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
      "name": "href",
      "storageKey": null
    },
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
        }
      ],
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Alert",
  "abstractKey": null
};

(node as any).hash = "bcc237f9ea90dec4f82411e75a863305";

export default node;
