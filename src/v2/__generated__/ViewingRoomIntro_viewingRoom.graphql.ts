/* tslint:disable */

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
  "kind": "Fragment",
  "name": "ViewingRoomIntro_viewingRoom",
  "type": "ViewingRoom",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "introStatement",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = 'f6bd6fd9181c2b21295bf6f5bc6d3aff';
export default node;
