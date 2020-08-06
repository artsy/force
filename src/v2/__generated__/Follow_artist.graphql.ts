/* tslint:disable */

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
  "kind": "Fragment",
  "name": "Follow_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "id",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "internalID",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "is_followed",
      "name": "isFollowed",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = 'a79fc7c37e66978ac1b86bac912ac995';
export default node;
