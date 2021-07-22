/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkLightbox_artwork = {
    readonly formattedMetadata: string | null;
    readonly images: ReadonlyArray<{
        readonly isDefault: boolean | null;
        readonly fallback: {
            readonly width: number;
            readonly height: number;
            readonly src: string;
            readonly srcSet: string;
        } | null;
        readonly resized: {
            readonly width: number | null;
            readonly height: number | null;
            readonly src: string;
            readonly srcSet: string;
        } | null;
    } | null> | null;
    readonly " $refType": "ArtworkLightbox_artwork";
};
export type ArtworkLightbox_artwork$data = ArtworkLightbox_artwork;
export type ArtworkLightbox_artwork$key = {
    readonly " $data"?: ArtworkLightbox_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtworkLightbox_artwork">;
};



const node: ReaderFragment = (function(){
var v0 = [
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
v1 = [
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
  },
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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkLightbox_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "formattedMetadata",
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
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isDefault",
          "storageKey": null
        },
        {
          "alias": "fallback",
          "args": (v0/*: any*/),
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": "cropped(height:800,version:[\"normalized\",\"larger\",\"large\"],width:800)"
        },
        {
          "alias": null,
          "args": (v0/*: any*/),
          "concreteType": "ResizedImageUrl",
          "kind": "LinkedField",
          "name": "resized",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": "resized(height:800,version:[\"normalized\",\"larger\",\"large\"],width:800)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork"
};
})();
(node as any).hash = '7c2f8996741173585967135127ee151f';
export default node;
