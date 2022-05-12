/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewingRoomWorksRoute_viewingRoom = {
    readonly artworksConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly title: string | null;
                readonly images: ReadonlyArray<{
                    readonly internalID: string | null;
                    readonly solo: {
                        readonly src: string;
                        readonly srcSet: string;
                        readonly width: number | null;
                        readonly height: number | null;
                    } | null;
                    readonly resized: {
                        readonly src: string;
                        readonly srcSet: string;
                        readonly width: number | null;
                        readonly height: number | null;
                    } | null;
                } | null> | null;
                readonly " $fragmentRefs": FragmentRefs<"ViewingRoomArtworkDetails_artwork">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "ViewingRoomWorksRoute_viewingRoom";
};
export type ViewingRoomWorksRoute_viewingRoom$data = ViewingRoomWorksRoute_viewingRoom;
export type ViewingRoomWorksRoute_viewingRoom$key = {
    readonly " $data"?: ViewingRoomWorksRoute_viewingRoom$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomWorksRoute_viewingRoom">;
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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ViewingRoomWorksRoute_viewingRoom",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtworkConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
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
  "type": "ViewingRoom",
  "abstractKey": null
};
})();
(node as any).hash = 'ec3ae2365d5c3b73112c59e847447b20';
export default node;
