/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SavedSearchAlertEditForm_artist = {
    readonly internalID: string;
    readonly name: string | null;
    readonly slug: string;
    readonly " $refType": "SavedSearchAlertEditForm_artist";
};
export type SavedSearchAlertEditForm_artist$data = SavedSearchAlertEditForm_artist;
export type SavedSearchAlertEditForm_artist$key = {
    readonly " $data"?: SavedSearchAlertEditForm_artist$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"SavedSearchAlertEditForm_artist">;
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
(node as any).hash = 'ccdcd948b1202d1dc9a3c87bab8c71fc';
export default node;
