/**
 * @generated SignedSource<<82983b3abacdb66ba52807cca4a8c0b8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomsApp_featuredViewingRooms$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomsFeaturedRail_featuredViewingRooms">;
  readonly " $fragmentType": "ViewingRoomsApp_featuredViewingRooms";
};
export type ViewingRoomsApp_featuredViewingRooms$key = {
  readonly " $data"?: ViewingRoomsApp_featuredViewingRooms$data;
  readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomsApp_featuredViewingRooms">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ViewingRoomsApp_featuredViewingRooms",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ViewingRoomsFeaturedRail_featuredViewingRooms"
    }
  ],
  "type": "ViewingRoomConnection",
  "abstractKey": null
};

(node as any).hash = "25c9423c629024672425973f7b3d17ac";

export default node;
