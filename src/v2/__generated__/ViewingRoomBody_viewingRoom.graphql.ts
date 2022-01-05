/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomBody_viewingRoom = {
    readonly body: string | null;
    readonly " $refType": "ViewingRoomBody_viewingRoom";
};
export type ViewingRoomBody_viewingRoom$data = ViewingRoomBody_viewingRoom;
export type ViewingRoomBody_viewingRoom$key = {
    readonly " $data"?: ViewingRoomBody_viewingRoom$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomBody_viewingRoom">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ViewingRoomBody_viewingRoom",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "body",
      "storageKey": null
    }
  ],
  "type": "ViewingRoom",
  "abstractKey": null
};
(node as any).hash = '3a96bc19185c2caf33ddadc0ef420926';
export default node;
