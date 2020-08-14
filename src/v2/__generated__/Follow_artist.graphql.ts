/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Follow_artist = {
    readonly id: string;
    readonly internalID: string;
    readonly name: string | null;
    readonly is_followed: boolean | null;
    readonly " $refType": "Follow_artist";
};
export type Follow_artist$data = Follow_artist;
export type Follow_artist$key = {
    readonly " $data"?: Follow_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"Follow_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Follow_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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
      "alias": "is_followed",
      "args": null,
      "kind": "ScalarField",
      "name": "isFollowed",
      "storageKey": null
    }
  ],
  "type": "Artist"
};
(node as any).hash = 'a79fc7c37e66978ac1b86bac912ac995';
export default node;
