/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistsApp_featuredGenes = ReadonlyArray<{
    readonly name: string | null;
    readonly genes: ReadonlyArray<{
        readonly internalID?: string;
        readonly name?: string | null;
        readonly href?: string | null;
        readonly image?: {
            readonly thumb: {
                readonly width: number;
                readonly height: number;
                readonly src: string;
                readonly srcSet: string;
            } | null;
        } | null;
        readonly trendingArtists?: ReadonlyArray<{
            readonly internalID: string;
            readonly " $fragmentRefs": FragmentRefs<"ArtistsArtistCard_artist">;
        } | null> | null;
    } | null> | null;
    readonly " $refType": "ArtistsApp_featuredGenes";
}>;
export type ArtistsApp_featuredGenes$data = ArtistsApp_featuredGenes;
export type ArtistsApp_featuredGenes$key = ReadonlyArray<{
    readonly " $data"?: ArtistsApp_featuredGenes$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistsApp_featuredGenes">;
}>;



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ArtistsApp_featuredGenes",
  "selections": [
    (v0/*: any*/),
    {
      "alias": "genes",
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "items",
      "plural": true,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": [
            (v1/*: any*/),
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "href",
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
                  "alias": "thumb",
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "height",
                      "value": 80
                    },
                    {
                      "kind": "Literal",
                      "name": "width",
                      "value": 80
                    }
                  ],
                  "concreteType": "CroppedImageUrl",
                  "kind": "LinkedField",
                  "name": "cropped",
                  "plural": false,
                  "selections": [
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
                  ],
                  "storageKey": "cropped(height:80,width:80)"
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "sample",
                  "value": 4
                }
              ],
              "concreteType": "Artist",
              "kind": "LinkedField",
              "name": "trendingArtists",
              "plural": true,
              "selections": [
                (v1/*: any*/),
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ArtistsArtistCard_artist"
                }
              ],
              "storageKey": "trendingArtists(sample:4)"
            }
          ],
          "type": "Gene"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "OrderedSet"
};
})();
(node as any).hash = '3e8ff756b62d773e2f6cbb43eddeacf1';
export default node;
