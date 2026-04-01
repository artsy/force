/**
 * @generated SignedSource<<3c500ebed6c2b279b4445efdd1bd4936>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomWorksRoute_viewingRoom$data = {
  readonly artworksConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly images: ReadonlyArray<{
          readonly internalID: string | null | undefined;
          readonly resized: {
            readonly height: number | null | undefined;
            readonly src: string;
            readonly srcSet: string;
            readonly width: number | null | undefined;
          } | null | undefined;
          readonly solo: {
            readonly height: number | null | undefined;
            readonly src: string;
            readonly srcSet: string;
            readonly width: number | null | undefined;
          } | null | undefined;
        } | null | undefined> | null | undefined;
        readonly internalID: string;
        readonly title: string | null | undefined;
        readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomArtworkDetails_artwork">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly slug: string;
  readonly " $fragmentType": "ViewingRoomWorksRoute_viewingRoom";
};
export type ViewingRoomWorksRoute_viewingRoom$key = {
  readonly " $data"?: ViewingRoomWorksRoute_viewingRoom$data;
  readonly " $fragmentSpreads": FragmentRefs<"ViewingRoomWorksRoute_viewingRoom">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = {
  "kind": "Literal",
  "name": "version",
  "value": "normalized"
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
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "width",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "height",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 12,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": [
          "artworksConnection"
        ]
      }
    ]
  },
  "name": "ViewingRoomWorksRoute_viewingRoom",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": "artworksConnection",
      "args": null,
      "concreteType": "ArtworkConnection",
      "kind": "LinkedField",
      "name": "__ViewingRoomWorksRoute_artworksConnection_connection",
      "plural": false,
      "selections": [
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
                (v0/*: any*/),
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
                  "concreteType": "Image",
                  "kind": "LinkedField",
                  "name": "images",
                  "plural": true,
                  "selections": [
                    (v0/*: any*/),
                    {
                      "alias": "solo",
                      "args": [
                        (v1/*: any*/),
                        {
                          "kind": "Literal",
                          "name": "width",
                          "value": 600
                        }
                      ],
                      "concreteType": "ResizedImageUrl",
                      "kind": "LinkedField",
                      "name": "resized",
                      "plural": false,
                      "selections": (v2/*: any*/),
                      "storageKey": "resized(version:\"normalized\",width:600)"
                    },
                    {
                      "alias": null,
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "height",
                          "value": 550
                        },
                        (v1/*: any*/)
                      ],
                      "concreteType": "ResizedImageUrl",
                      "kind": "LinkedField",
                      "name": "resized",
                      "plural": false,
                      "selections": (v2/*: any*/),
                      "storageKey": "resized(height:550,version:\"normalized\")"
                    }
                  ],
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ViewingRoomArtworkDetails_artwork"
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
  "type": "ViewingRoom",
  "abstractKey": null
};
})();

(node as any).hash = "ac895736773b79a87f8cb478c742d0f7";

export default node;
