/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type DefaultHeader_headerArtworks = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly id: string;
            readonly image: {
                readonly large: {
                    readonly width: number | null;
                    readonly height: number | null;
                } | null;
                readonly small: {
                    readonly width: number | null;
                    readonly height: number | null;
                } | null;
            } | null;
        } | null;
        readonly " $fragmentRefs": FragmentRefs<"DefaultHeaderArtwork_artwork">;
    } | null> | null;
    readonly " $refType": "DefaultHeader_headerArtworks";
};
export type DefaultHeader_headerArtworks$data = DefaultHeader_headerArtworks;
export type DefaultHeader_headerArtworks$key = {
    readonly " $data"?: DefaultHeader_headerArtworks$data;
    readonly " $fragmentRefs": FragmentRefs<"DefaultHeader_headerArtworks">;
};



const node: ReaderFragment = (function(){
var v0 = [
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
  "name": "DefaultHeader_headerArtworks",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "FilterArtworksEdge",
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
              "kind": "ScalarField",
              "name": "id",
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
                  "alias": "large",
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "height",
                      "value": 230
                    }
                  ],
                  "concreteType": "ResizedImageUrl",
                  "kind": "LinkedField",
                  "name": "resized",
                  "plural": false,
                  "selections": (v0/*: any*/),
                  "storageKey": "resized(height:230)"
                },
                {
                  "alias": "small",
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "height",
                      "value": 160
                    }
                  ],
                  "concreteType": "ResizedImageUrl",
                  "kind": "LinkedField",
                  "name": "resized",
                  "plural": false,
                  "selections": (v0/*: any*/),
                  "storageKey": "resized(height:160)"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "DefaultHeaderArtwork_artwork"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "FilterArtworksConnection"
};
})();
(node as any).hash = 'ae5d379a80797d4438c3da3bbd5c6375';
export default node;
