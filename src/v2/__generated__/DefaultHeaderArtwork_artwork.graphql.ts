/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type DefaultHeaderArtwork_artwork = {
    readonly node: {
        readonly id: string;
        readonly href: string | null;
        readonly slug: string;
        readonly image: {
            readonly large: {
                readonly url: string | null;
                readonly width: number | null;
                readonly height: number | null;
            } | null;
            readonly small: {
                readonly url: string | null;
                readonly width: number | null;
                readonly height: number | null;
            } | null;
        } | null;
    } | null;
    readonly " $refType": "DefaultHeaderArtwork_artwork";
};
export type DefaultHeaderArtwork_artwork$data = DefaultHeaderArtwork_artwork;
export type DefaultHeaderArtwork_artwork$key = {
    readonly " $data"?: DefaultHeaderArtwork_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"DefaultHeaderArtwork_artwork">;
};



const node: ReaderFragment = (function(){
var v0 = [
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
];
return {
  "kind": "Fragment",
  "name": "DefaultHeaderArtwork_artwork",
  "type": "FilterArtworksEdge",
  "metadata": null,
  "argumentDefinitions": [],
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
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "id",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "href",
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
          "kind": "LinkedField",
          "alias": null,
          "name": "image",
          "storageKey": null,
          "args": null,
          "concreteType": "Image",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": "large",
              "name": "resized",
              "storageKey": "resized(height:230)",
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 230
                }
              ],
              "concreteType": "ResizedImageUrl",
              "plural": false,
              "selections": (v0/*: any*/)
            },
            {
              "kind": "LinkedField",
              "alias": "small",
              "name": "resized",
              "storageKey": "resized(height:160)",
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 160
                }
              ],
              "concreteType": "ResizedImageUrl",
              "plural": false,
              "selections": (v0/*: any*/)
            }
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = '24e6e5115f0261e709f2bfd2b6b69148';
export default node;
