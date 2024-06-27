/**
 * @generated SignedSource<<4495522d5aed629521d6385a60a851e6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
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
  "name": "quality",
  "value": 85
},
v2 = {
  "kind": "Literal",
  "name": "version",
  "value": "normalized"
},
v3 = [
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
                        (v2/*: any*/),
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
                      "selections": (v3/*: any*/),
                      "storageKey": "resized(quality:85,version:\"normalized\",width:600)"
                    },
                    {
                      "alias": null,
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "height",
                          "value": 550
                        },
                        (v1/*: any*/),
                        (v2/*: any*/)
                      ],
                      "concreteType": "ResizedImageUrl",
                      "kind": "LinkedField",
                      "name": "resized",
                      "plural": false,
                      "selections": (v3/*: any*/),
                      "storageKey": "resized(height:550,quality:85,version:\"normalized\")"
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

(node as any).hash = "142035b04d50d64b6b605a0bba0561e0";

export default node;
