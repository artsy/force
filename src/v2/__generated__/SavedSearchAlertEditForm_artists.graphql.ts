/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SavedSearchAlertEditForm_artists = ReadonlyArray<{
    readonly internalID: string;
    readonly name: string | null;
    readonly slug: string;
    readonly " $refType": "SavedSearchAlertEditForm_artists";
}>;
export type SavedSearchAlertEditForm_artists$data = SavedSearchAlertEditForm_artists;
export type SavedSearchAlertEditForm_artists$key = ReadonlyArray<{
    readonly " $data"?: SavedSearchAlertEditForm_artists$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"SavedSearchAlertEditForm_artists">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "SavedSearchAlertEditForm_artists",
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
(node as any).hash = '5f5806c4409466904f531226140bd6aa';
export default node;
