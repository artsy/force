/* tslint:disable */

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
  "name": "DefaultHeader_headerArtworks",
  "type": "FilterArtworksConnection",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "edges",
      "storageKey": null,
      "args": null,
      "concreteType": "FilterArtworksEdge",
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
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "id",
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
        },
        {
          "kind": "FragmentSpread",
          "name": "DefaultHeaderArtwork_artwork",
          "args": null
        }
      ]
    }
  ]
};
})();
(node as any).hash = 'ae5d379a80797d4438c3da3bbd5c6375';
export default node;
