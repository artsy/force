/**
 * @generated SignedSource<<fab98e750d5faefd525338da6d55143e>>
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
  "type": "ViewingRoomsConnection",
  "abstractKey": null
};

(node as any).hash = "22496eadfb02ab912add5fd7821bcb7f";

export default node;
