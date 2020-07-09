/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomsRail_featuredViewingRooms = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly slug: string;
            readonly status: string;
            readonly title: string;
        } | null;
    } | null> | null;
    readonly " $refType": "ViewingRoomsRail_featuredViewingRooms";
};
export type ViewingRoomsRail_featuredViewingRooms$data = ViewingRoomsRail_featuredViewingRooms;
export type ViewingRoomsRail_featuredViewingRooms$key = {
    readonly " $data"?: ViewingRoomsRail_featuredViewingRooms$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomsRail_featuredViewingRooms">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ViewingRoomsRail_featuredViewingRooms",
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
(node as any).hash = 'ca581e73a3cd8d57377c5ed20c66f7fc';
export default node;
