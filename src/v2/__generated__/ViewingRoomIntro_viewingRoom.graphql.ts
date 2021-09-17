/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomIntro_viewingRoom = {
    readonly introStatement: string | null;
    readonly " $refType": "ViewingRoomIntro_viewingRoom";
};
export type ViewingRoomIntro_viewingRoom$data = ViewingRoomIntro_viewingRoom;
export type ViewingRoomIntro_viewingRoom$key = {
    readonly " $data"?: ViewingRoomIntro_viewingRoom$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomIntro_viewingRoom">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ViewingRoomIntro_viewingRoom",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "introStatement",
      "storageKey": null
    }
  ],
  "type": "ViewingRoom",
  "abstractKey": null
};
(node as any).hash = 'f6bd6fd9181c2b21295bf6f5bc6d3aff';
export default node;
