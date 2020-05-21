/* tslint:disable */

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
  "kind": "Fragment",
  "name": "ViewingRoomPullQuote_viewingRoom",
  "type": "ViewingRoom",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "pullQuote",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '69ccb558158ea6f401e3263146f93fd2';
export default node;
