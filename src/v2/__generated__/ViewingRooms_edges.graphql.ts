/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRooms_edges = ReadonlyArray<{
    readonly node: {
        readonly internalID: string;
        readonly " $fragmentRefs": FragmentRefs<"ViewingRoomCard_viewingRoom">;
    } | null;
    readonly " $refType": "ViewingRooms_edges";
}>;
export type ViewingRooms_edges$data = ViewingRooms_edges;
export type ViewingRooms_edges$key = ReadonlyArray<{
    readonly " $data"?: ViewingRooms_edges$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRooms_edges">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ViewingRooms_edges",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ViewingRoom",
      "kind": "LinkedField",
      "name": "node",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ViewingRoomCard_viewingRoom"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ViewingRoomsEdge"
};
(node as any).hash = '10570b18f93a16f1d36cfb55965fc316';
export default node;
