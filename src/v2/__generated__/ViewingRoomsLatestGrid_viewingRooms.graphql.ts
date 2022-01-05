/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomsLatestGrid_viewingRooms = {
    readonly viewingRoomsConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly slug: string;
                readonly status: string;
                readonly title: string;
                readonly image: {
                    readonly imageURLs: {
                        readonly normalized: string | null;
                    } | null;
                } | null;
                readonly distanceToOpen: string | null;
                readonly distanceToClose: string | null;
                readonly partner: {
                    readonly name: string | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "ViewingRoomsLatestGrid_viewingRooms";
};
export type ViewingRoomsLatestGrid_viewingRooms$data = ViewingRoomsLatestGrid_viewingRooms;
export type ViewingRoomsLatestGrid_viewingRooms$key = {
    readonly " $data"?: ViewingRoomsLatestGrid_viewingRooms$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomsLatestGrid_viewingRooms">;
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
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "count",
      "type": "Int"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after",
      "type": "String"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "after",
        "direction": "forward",
        "path": [
          "viewingRoomsConnection"
        ]
      }
    ]
  },
  "name": "ViewingRoomsLatestGrid_viewingRooms",
  "selections": [
    {
      "alias": "viewingRoomsConnection",
      "args": null,
      "concreteType": "ViewingRoomsConnection",
      "kind": "LinkedField",
      "name": "__ViewingRoomsLatestGrid_viewingRoomsConnection_connection",
      "plural": false,
      "selections": [
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
                  "name": "slug",
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
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "title",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "ARImage",
                  "kind": "LinkedField",
                  "name": "image",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "ImageURLs",
                      "kind": "LinkedField",
                      "name": "imageURLs",
                      "plural": false,
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "normalized",
                          "storageKey": null
                        }
                      ],
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": (v0/*: any*/),
                  "kind": "ScalarField",
                  "name": "distanceToOpen",
                  "storageKey": "distanceToOpen(short:true)"
                },
                {
                  "alias": null,
                  "args": (v0/*: any*/),
                  "kind": "ScalarField",
                  "name": "distanceToClose",
                  "storageKey": "distanceToClose(short:true)"
                },
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
                      "name": "name",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer"
};
})();
(node as any).hash = '8a3e6fe9095d678b418a8c2f34a18dae';
export default node;
