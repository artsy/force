/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomsApp_featuredViewingRooms = {
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomsFeaturedRail_featuredViewingRooms">;
    readonly " $refType": "ViewingRoomsApp_featuredViewingRooms";
};
export type ViewingRoomsApp_featuredViewingRooms$data = ViewingRoomsApp_featuredViewingRooms;
export type ViewingRoomsApp_featuredViewingRooms$key = {
    readonly " $data"?: ViewingRoomsApp_featuredViewingRooms$data;
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
  "type": "ViewingRoomConnection"
};
(node as any).hash = '25c9423c629024672425973f7b3d17ac';
export default node;
