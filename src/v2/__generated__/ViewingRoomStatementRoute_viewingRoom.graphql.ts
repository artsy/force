/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomStatementRoute_viewingRoom = {
    readonly artworkIDs: ReadonlyArray<string>;
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
      "kind": "ScalarField",
      "alias": null,
      "name": "artworkIDs",
      "args": null,
      "storageKey": null
    },
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
(node as any).hash = '8f189f22d2939cfece7cf0e73ccd3f35';
export default node;
