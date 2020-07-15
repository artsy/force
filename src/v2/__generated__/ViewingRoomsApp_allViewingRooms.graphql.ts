/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomsApp_allViewingRooms = {
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomsLatestGrid_viewingRooms">;
    readonly " $refType": "ViewingRoomsApp_allViewingRooms";
};
export type ViewingRoomsApp_allViewingRooms$data = ViewingRoomsApp_allViewingRooms;
export type ViewingRoomsApp_allViewingRooms$key = {
    readonly " $data"?: ViewingRoomsApp_allViewingRooms$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomsApp_allViewingRooms">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ViewingRoomsApp_allViewingRooms",
  "type": "ViewingRoomConnection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ViewingRoomsLatestGrid_viewingRooms",
      "args": null
    }
  ]
};
(node as any).hash = '3b354e454f4f9e239b57a6c272cd42ae';
export default node;
