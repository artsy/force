/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomsApp_viewingRooms = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly slug: string;
            readonly status: string;
            readonly title: string;
        } | null;
    } | null> | null;
    readonly " $refType": "ViewingRoomsApp_viewingRooms";
};
export type ViewingRoomsApp_viewingRooms$data = ViewingRoomsApp_viewingRooms;
export type ViewingRoomsApp_viewingRooms$key = {
    readonly " $data"?: ViewingRoomsApp_viewingRooms$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomsApp_viewingRooms">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ViewingRoomsApp_viewingRooms",
  "type": "ViewingRoomConnection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "edges",
      "storageKey": null,
      "args": null,
      "concreteType": "ViewingRoomEdge",
      "plural": true,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "node",
          "storageKey": null,
          "args": null,
          "concreteType": "ViewingRoom",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "slug",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "status",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "title",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = '2b68ac862b09713726f8f1bb9c442c1f';
export default node;
