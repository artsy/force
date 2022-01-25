/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SavedSearchEditAlert_artist = {
    readonly internalID: string;
    readonly name: string | null;
    readonly slug: string;
    readonly " $refType": "SavedSearchEditAlert_artist";
};
export type SavedSearchEditAlert_artist$data = SavedSearchEditAlert_artist;
export type SavedSearchEditAlert_artist$key = {
    readonly " $data"?: SavedSearchEditAlert_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"SavedSearchEditAlert_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavedSearchEditAlert_artist",
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
(node as any).hash = 'c38dd9b2ba7ea4c5ff3765ef29c1ab4d';
export default node;
