/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewInRoom_artwork = {
    readonly " $fragmentRefs": FragmentRefs<"ViewInRoomArtwork_artwork">;
    readonly " $refType": "ViewInRoom_artwork";
};
export type ViewInRoom_artwork$data = ViewInRoom_artwork;
export type ViewInRoom_artwork$key = {
    readonly " $data"?: ViewInRoom_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ViewInRoom_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ViewInRoom_artwork",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ViewInRoomArtwork_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = 'eba50f7c0264f6d63495b60cc89dd360';
export default node;
