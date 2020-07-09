/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomsApp_featuredViewingRooms = {
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomsRail_featuredViewingRooms">;
    readonly " $refType": "ViewingRoomsApp_featuredViewingRooms";
};
export type ViewingRoomsApp_featuredViewingRooms$data = ViewingRoomsApp_featuredViewingRooms;
export type ViewingRoomsApp_featuredViewingRooms$key = {
    readonly " $data"?: ViewingRoomsApp_featuredViewingRooms$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomsApp_featuredViewingRooms">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ViewingRoomsApp_featuredViewingRooms",
  "type": "ViewingRoomConnection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ViewingRoomsRail_featuredViewingRooms",
      "args": null
    }
  ]
};
(node as any).hash = '7c8ae6252f46be07f53d89a2b6ce0430';
export default node;
