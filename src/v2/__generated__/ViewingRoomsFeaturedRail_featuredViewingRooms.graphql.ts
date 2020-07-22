/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomsFeaturedRail_featuredViewingRooms = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly status: string;
            readonly slug: string;
            readonly title: string;
            readonly heroImageURL: string | null;
            readonly distanceToOpen: string | null;
            readonly distanceToClose: string | null;
            readonly partner: {
                readonly name: string | null;
            } | null;
        } | null;
    } | null> | null;
    readonly " $refType": "ViewingRoomsFeaturedRail_featuredViewingRooms";
};
export type ViewingRoomsFeaturedRail_featuredViewingRooms$data = ViewingRoomsFeaturedRail_featuredViewingRooms;
export type ViewingRoomsFeaturedRail_featuredViewingRooms$key = {
    readonly " $data"?: ViewingRoomsFeaturedRail_featuredViewingRooms$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomsFeaturedRail_featuredViewingRooms">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "short",
    "value": true
  }
];
return {
  "kind": "Fragment",
  "name": "ViewingRoomsFeaturedRail_featuredViewingRooms",
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
              "name": "status",
              "args": null,
              "storageKey": null
            },
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
              "name": "title",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "heroImageURL",
              "args": null,
              "storageKey": null
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "distanceToOpen",
              "args": (v0/*: any*/),
              "storageKey": "distanceToOpen(short:true)"
            },
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "distanceToClose",
              "args": (v0/*: any*/),
              "storageKey": "distanceToClose(short:true)"
            },
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "partner",
              "storageKey": null,
              "args": null,
              "concreteType": "Partner",
              "plural": false,
              "selections": [
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "name",
                  "args": null,
                  "storageKey": null
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = 'b0db84fe428ac769d4f470ef6e09732f';
export default node;
