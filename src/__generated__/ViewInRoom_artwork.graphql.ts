/**
 * @generated SignedSource<<6ab16dbbbd93b8a1bf62b458bec8ccbf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewInRoom_artwork$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ViewInRoomArtwork_artwork">;
  readonly " $fragmentType": "ViewInRoom_artwork";
};
export type ViewInRoom_artwork$key = {
  readonly " $data"?: ViewInRoom_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ViewInRoom_artwork">;
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

(node as any).hash = "eba50f7c0264f6d63495b60cc89dd360";

export default node;
