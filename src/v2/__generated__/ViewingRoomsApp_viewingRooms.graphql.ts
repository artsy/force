/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomsApp_viewingRooms = {
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomsLatestGrid_viewingRooms">;
    readonly " $refType": "ViewingRoomsApp_viewingRooms";
};
export type ViewingRoomsApp_viewingRooms$data = ViewingRoomsApp_viewingRooms;
export type ViewingRoomsApp_viewingRooms$key = {
    readonly " $data"?: ViewingRoomsApp_viewingRooms$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomsApp_viewingRooms">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ViewingRoomsApp_viewingRooms",
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
(node as any).hash = 'f3e002162e70aa67c9c98ad0e0760ef3';
export default node;
