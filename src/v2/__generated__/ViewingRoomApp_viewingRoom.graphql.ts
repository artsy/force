/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomApp_viewingRoom = {
    readonly partner: {
        readonly internalID: string;
    } | null;
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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ViewingRoomApp_viewingRoom",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Partner",
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ViewingRoomMeta_viewingRoom"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ViewingRoomHeader_viewingRoom"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ViewingRoomContentNotAccessible_viewingRoom"
    }
  ],
  "type": "ViewingRoom",
  "abstractKey": null
};
(node as any).hash = '42b4a4acd26b4325cfef0fefd73552d6';
export default node;
