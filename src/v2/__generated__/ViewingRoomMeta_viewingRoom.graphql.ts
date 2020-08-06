/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomMeta_viewingRoom = {
    readonly title: string;
    readonly " $refType": "ViewingRoomMeta_viewingRoom";
};
export type ViewingRoomMeta_viewingRoom$data = ViewingRoomMeta_viewingRoom;
export type ViewingRoomMeta_viewingRoom$key = {
    readonly " $data"?: ViewingRoomMeta_viewingRoom$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomMeta_viewingRoom">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ViewingRoomMeta_viewingRoom",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "ViewingRoom"
};
(node as any).hash = 'f5a9381a6e0146081302824e86beb903';
export default node;
