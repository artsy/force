/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomApp_viewingRoom = {
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomMeta_viewingRoom" | "ViewingRoomHeader_viewingRoom">;
    readonly " $refType": "ViewingRoomApp_viewingRoom";
};
export type ViewingRoomApp_viewingRoom$data = ViewingRoomApp_viewingRoom;
export type ViewingRoomApp_viewingRoom$key = {
    readonly " $data"?: ViewingRoomApp_viewingRoom$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomApp_viewingRoom">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ViewingRoomApp_viewingRoom",
  "type": "ViewingRoom",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ViewingRoomMeta_viewingRoom",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ViewingRoomHeader_viewingRoom",
      "args": null
    }
  ]
};
(node as any).hash = 'd2efc956a382ae816a9b332367fad39d';
export default node;
