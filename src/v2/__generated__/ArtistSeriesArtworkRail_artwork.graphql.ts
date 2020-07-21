/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistSeriesArtworkRail_artwork = {
    readonly artistSeriesConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly slug: string;
                readonly artworksConnection: {
                    readonly edges: ReadonlyArray<{
                        readonly node: {
                            readonly image: {
                                readonly resized: {
                                    readonly height: number | null;
                                    readonly width: number | null;
                                } | null;
                            } | null;
                            readonly " $fragmentRefs": FragmentRefs<"FillwidthItem_artwork">;
                        } | null;
                    } | null> | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "ArtistSeriesArtworkRail_artwork";
};
export type ArtistSeriesArtworkRail_artwork$data = ArtistSeriesArtworkRail_artwork;
export type ArtistSeriesArtworkRail_artwork$key = {
    readonly " $data"?: ArtistSeriesArtworkRail_artwork$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistSeriesArtworkRail_artwork">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtistSeriesArtworkRail_artwork",
  "type": "Artwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "artistSeriesConnection",
      "storageKey": "artistSeriesConnection(first:1)",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        }
      ],
      "concreteType": "ArtistSeriesConnection",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "edges",
          "storageKey": null,
          "args": null,
          "concreteType": "ArtistSeriesEdge",
          "plural": true,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "node",
              "storageKey": null,
              "args": null,
              "concreteType": "ArtistSeries",
              "plural": false,
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
                  "alias": null,
                  "name": "artworksConnection",
                  "storageKey": "artworksConnection(first:20)",
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "first",
                      "value": 20
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
                                  "alias": null,
                                  "name": "resized",
                                  "storageKey": "resized(height:200)",
                                  "args": [
                                    {
                                      "kind": "Literal",
                                      "name": "height",
                                      "value": 200
                                    }
                                  ],
                                  "concreteType": "ResizedImageUrl",
                                  "plural": false,
                                  "selections": [
                                    {
                                      "kind": "ScalarField",
                                      "alias": null,
                                      "name": "height",
                                      "args": null,
                                      "storageKey": null
                                    },
                                    {
                                      "kind": "ScalarField",
                                      "alias": null,
                                      "name": "width",
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
            }
          ]
        }
      ]
    }
  ]
};
(node as any).hash = 'a51597e3761d7cabb5642743fda2eb0e';
export default node;
