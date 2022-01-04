/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRooms_partner = {
    readonly slug: string;
    readonly currentViewingRooms: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
            } | null;
            readonly " $fragmentRefs": FragmentRefs<"ViewingRooms_edges">;
        } | null> | null;
    } | null;
    readonly upcomingViewingRooms: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
            } | null;
            readonly " $fragmentRefs": FragmentRefs<"ViewingRooms_edges">;
        } | null> | null;
    } | null;
    readonly " $refType": "ViewingRooms_partner";
};
export type ViewingRooms_partner$data = ViewingRooms_partner;
export type ViewingRooms_partner$key = {
    readonly " $data"?: ViewingRooms_partner$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRooms_partner">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "first",
  "value": 12
},
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ViewingRoomsEdge",
    "kind": "LinkedField",
    "name": "edges",
    "plural": true,
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
          }
        ],
        "storageKey": null
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "ViewingRooms_edges"
      }
    ],
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ViewingRooms_partner",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": "currentViewingRooms",
      "args": [
        (v0/*: any*/),
        {
          "kind": "Literal",
          "name": "statuses",
          "value": "live"
        }
      ],
      "concreteType": "ViewingRoomsConnection",
      "kind": "LinkedField",
      "name": "viewingRoomsConnection",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": "viewingRoomsConnection(first:12,statuses:\"live\")"
    },
    {
      "alias": "upcomingViewingRooms",
      "args": [
        (v0/*: any*/),
        {
          "kind": "Literal",
          "name": "statuses",
          "value": "scheduled"
        }
      ],
      "concreteType": "ViewingRoomsConnection",
      "kind": "LinkedField",
      "name": "viewingRoomsConnection",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": "viewingRoomsConnection(first:12,statuses:\"scheduled\")"
    }
  ],
  "type": "Partner"
};
})();
(node as any).hash = 'd01b2daf350626bf9e90d8e1a49f98b0';
export default node;
