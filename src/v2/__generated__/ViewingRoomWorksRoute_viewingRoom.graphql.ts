/* tslint:disable */

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
                    readonly resized: {
                        readonly url: string | null;
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
    readonly " $data"?: ViewingRoomWorksRoute_viewingRoom$data;
    readonly " $fragmentRefs": FragmentRefs<"ViewingRoomWorksRoute_viewingRoom">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "ViewingRoomWorksRoute_viewingRoom",
  "type": "ViewingRoom",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artworksConnection",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtworkConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "ArtworkEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "Artwork",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "title",
                  "args": null,
                  "storageKey": null
                },
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "images",
                  "storageKey": null,
                  "args": null,
                  "concreteType": "Image",
                  "plural": true,
                  "selections": [
                    (v0/*: any*/),
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "resized",
                      "storageKey": "resized(height:1100,version:\"normalized\")",
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "height",
                          "value": 1100
                        },
                        {
                          "kind": "Literal",
                          "name": "version",
                          "value": "normalized"
                        }
                      ],
                      "concreteType": "ResizedImageUrl",
                      "plural": false,
                      "selections": [
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "name": "url",
                          "args": null,
                          "storageKey": null
                        },
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "name": "width",
                          "args": null,
                          "storageKey": null
                        },
                        {
                          "kind": "ScalarField",
                          "alias": null,
                          "name": "height",
                          "args": null,
                          "storageKey": null
                        }
                      ]
                    }
                  ]
                },
                {
                  "kind": "FragmentSpread",
                  "name": "ViewingRoomArtworkDetails_artwork",
                  "args": null
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
(node as any).hash = '5eb993431963feae086cbb4bfcc063ca';
export default node;
