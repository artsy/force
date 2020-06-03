/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistTopWorksRail_artist = {
    readonly slug: string;
    readonly topWorksArtworks: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly image: {
                    readonly href: string | null;
                    readonly imageAspectRatio: number;
                    readonly resized: {
                        readonly url: string | null;
                        readonly width: number | null;
                        readonly height: number | null;
                    } | null;
                } | null;
                readonly " $fragmentRefs": FragmentRefs<"FillwidthItem_artwork">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "ArtistTopWorksRail_artist";
};
export type ArtistTopWorksRail_artist$data = ArtistTopWorksRail_artist;
export type ArtistTopWorksRail_artist$key = {
    readonly " $data"?: ArtistTopWorksRail_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistTopWorksRail_artist">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtistTopWorksRail_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slug",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": "topWorksArtworks",
      "name": "artworksConnection",
      "storageKey": "artworksConnection(first:10,sort:\"ICONICITY_DESC\")",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "ICONICITY_DESC"
        }
      ],
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
                      "kind": "ScalarField",
                      "alias": null,
                      "name": "href",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "ScalarField",
                      "alias": "imageAspectRatio",
                      "name": "aspectRatio",
                      "args": null,
                      "storageKey": null
                    },
                    {
                      "kind": "LinkedField",
                      "alias": null,
                      "name": "resized",
                      "storageKey": "resized(height:300)",
                      "args": [
                        {
                          "kind": "Literal",
                          "name": "height",
                          "value": 300
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
                  "name": "FillwidthItem_artwork",
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
(node as any).hash = 'c2b8d0f78fc7800e02094649d21fe20d';
export default node;
