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
                readonly artworksConnection: {
                    readonly totalCount: number | null;
                    readonly edges: ReadonlyArray<{
                        readonly node: {
                            readonly image: {
                                readonly tall: {
                                    readonly src: string;
                                    readonly srcSet: string;
                                } | null;
                                readonly square: {
                                    readonly src: string;
                                    readonly srcSet: string;
                                } | null;
                            } | null;
                        } | null;
                    } | null> | null;
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
],
v1 = {
  "kind": "Literal",
  "name": "width",
  "value": 140
},
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "src",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "srcSet",
    "storageKey": null
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
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "first",
                      "value": 2
                    }
                  ],
                  "concreteType": "ArtworkConnection",
                  "kind": "LinkedField",
                  "name": "artworksConnection",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "totalCount",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "ArtworkEdge",
                      "kind": "LinkedField",
                      "name": "edges",
                      "plural": true,
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "concreteType": "Artwork",
                          "kind": "LinkedField",
                          "name": "node",
                          "plural": false,
                          "selections": [
                            {
                              "alias": null,
                              "args": null,
                              "concreteType": "Image",
                              "kind": "LinkedField",
                              "name": "image",
                              "plural": false,
                              "selections": [
                                {
                                  "alias": "tall",
                                  "args": [
                                    {
                                      "kind": "Literal",
                                      "name": "height",
                                      "value": 280
                                    },
                                    (v1/*: any*/)
                                  ],
                                  "concreteType": "CroppedImageUrl",
                                  "kind": "LinkedField",
                                  "name": "cropped",
                                  "plural": false,
                                  "selections": (v2/*: any*/),
                                  "storageKey": "cropped(height:280,width:140)"
                                },
                                {
                                  "alias": "square",
                                  "args": [
                                    {
                                      "kind": "Literal",
                                      "name": "height",
                                      "value": 140
                                    },
                                    (v1/*: any*/)
                                  ],
                                  "concreteType": "CroppedImageUrl",
                                  "kind": "LinkedField",
                                  "name": "cropped",
                                  "plural": false,
                                  "selections": (v2/*: any*/),
                                  "storageKey": "cropped(height:140,width:140)"
                                }
                              ],
                              "storageKey": null
                            }
                          ],
                          "storageKey": null
                        }
                      ],
                      "storageKey": null
                    }
                  ],
                  "storageKey": "artworksConnection(first:2)"
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
(node as any).hash = '5749e886d2569028cc98ad3edf47a9df';
export default node;
