/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomsApp_featuredViewingRooms = {
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomsFeaturedRail_featuredViewingRooms">;
    readonly " $refType": "ViewingRoomsApp_featuredViewingRooms";
};
export type ViewingRoomsApp_featuredViewingRooms$data = ViewingRoomsApp_featuredViewingRooms;
export type ViewingRoomsApp_featuredViewingRooms$key = {
    readonly " $data"?: ViewingRoomsApp_featuredViewingRooms$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomsApp_featuredViewingRooms">;
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
(node as any).hash = '25c9423c629024672425973f7b3d17ac';
export default node;
