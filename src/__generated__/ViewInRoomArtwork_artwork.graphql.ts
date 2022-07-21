/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ViewInRoomArtwork_artwork = {
    readonly widthCm: number | null;
    readonly heightCm: number | null;
    readonly image: {
        readonly resized: {
            readonly src: string;
            readonly srcSet: string;
            readonly width: number | null;
            readonly height: number | null;
        } | null;
    } | null;
    readonly " $refType": "ViewInRoomArtwork_artwork";
};
export type ViewInRoomArtwork_artwork$data = ViewInRoomArtwork_artwork;
export type ViewInRoomArtwork_artwork$key = {
    readonly " $data"?: ViewInRoomArtwork_artwork$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ViewInRoomArtwork_artwork">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ViewInRoomArtwork_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "widthCm",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "heightCm",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 800
            },
            {
              "kind": "Literal",
              "name": "version",
              "value": [
                "normalized",
                "larger",
                "large"
              ]
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 800
            }
          ],
          "concreteType": "ResizedImageUrl",
          "kind": "LinkedField",
          "name": "resized",
          "plural": false,
          "selections": [
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
          ],
          "storageKey": "resized(height:800,version:[\"normalized\",\"larger\",\"large\"],width:800)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};
(node as any).hash = 'bc5464f76e87fec45a2755a5c070c322';
export default node;
