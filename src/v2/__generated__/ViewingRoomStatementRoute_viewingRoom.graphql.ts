/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomStatementRoute_viewingRoom = {
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomIntro_viewingRoom" | "ViewingRoomWorks_viewingRoom" | "ViewingRoomPullQuote_viewingRoom" | "ViewingRoomBody_viewingRoom" | "ViewingRoomSubsections_viewingRoom">;
    readonly " $refType": "ViewingRoomStatementRoute_viewingRoom";
};
export type ViewingRoomStatementRoute_viewingRoom$data = ViewingRoomStatementRoute_viewingRoom;
export type ViewingRoomStatementRoute_viewingRoom$key = {
    readonly " $data"?: ViewingRoomStatementRoute_viewingRoom$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomStatementRoute_viewingRoom">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ViewingRoomStatementRoute_viewingRoom",
  "type": "ViewingRoom",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "FragmentSpread",
      "name": "ViewingRoomIntro_viewingRoom",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ViewingRoomWorks_viewingRoom",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ViewingRoomPullQuote_viewingRoom",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ViewingRoomBody_viewingRoom",
      "args": null
    },
    {
      "kind": "FragmentSpread",
      "name": "ViewingRoomSubsections_viewingRoom",
      "args": null
    }
  ]
};
(node as any).hash = 'f407bc7c23d72df0e083441cdbd5bece';
export default node;
