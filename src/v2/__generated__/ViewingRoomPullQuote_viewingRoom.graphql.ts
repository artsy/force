/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomPullQuote_viewingRoom = {
    readonly pullQuote: string | null;
    readonly " $refType": "ViewingRoomPullQuote_viewingRoom";
};
export type ViewingRoomPullQuote_viewingRoom$data = ViewingRoomPullQuote_viewingRoom;
export type ViewingRoomPullQuote_viewingRoom$key = {
    readonly " $data"?: ViewingRoomPullQuote_viewingRoom$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomPullQuote_viewingRoom">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ViewingRoomPullQuote_viewingRoom",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "pullQuote",
      "storageKey": null
    }
  ],
  "type": "ViewingRoom"
};
(node as any).hash = '69ccb558158ea6f401e3263146f93fd2';
export default node;
