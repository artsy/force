/**
 * @generated SignedSource<<3d7bd707cd27cb16b7e26ea83315568b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavedSearchAlertEditForm_artist$data = {
  readonly internalID: string;
  readonly name: string | null;
  readonly slug: string;
  readonly " $fragmentType": "SavedSearchAlertEditForm_artist";
};
export type SavedSearchAlertEditForm_artist$key = {
  readonly " $data"?: SavedSearchAlertEditForm_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavedSearchAlertEditForm_artist">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavedSearchAlertEditForm_artist",
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};

(node as any).hash = "ccdcd948b1202d1dc9a3c87bab8c71fc";

export default node;
