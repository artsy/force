/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomApp_viewingRoom = {
    readonly status: string;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomMeta_viewingRoom" | "ViewingRoomHeader_viewingRoom" | "ViewingRoomContentNotAccessible_viewingRoom">;
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
      "kind": "ScalarField",
      "alias": null,
      "name": "status",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ViewingRoomMeta_viewingRoom",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ViewingRoomHeader_viewingRoom",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ViewingRoomContentNotAccessible_viewingRoom",
      "args": null
    }
  ]
};
(node as any).hash = '3427b73db005d63baf296e26766e02ec';
export default node;
