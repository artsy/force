/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistConsignHeaderImages_artist = {
    readonly targetSupply: {
        readonly microfunnel: {
            readonly artworksConnection: {
                readonly edges: ReadonlyArray<{
                    readonly node: {
                        readonly image: {
                            readonly resized: {
                                readonly width: number | null;
                                readonly height: number | null;
                                readonly url: string;
                            } | null;
                        } | null;
                        readonly " $fragmentRefs": FragmentRefs<"FillwidthItem_artwork">;
                    } | null;
                } | null> | null;
            } | null;
        } | null;
    } | null;
    readonly " $refType": "ArtistConsignHeaderImages_artist";
};
export type ArtistConsignHeaderImages_artist$data = ArtistConsignHeaderImages_artist;
export type ArtistConsignHeaderImages_artist$key = {
    readonly " $data"?: ArtistConsignHeaderImages_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistConsignHeaderImages_artist">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistConsignHeaderImages_artist",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistTargetSupply",
      "kind": "LinkedField",
      "name": "targetSupply",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ArtistTargetSupplyMicrofunnel",
          "kind": "LinkedField",
          "name": "microfunnel",
          "plural": false,
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
                                  "value": 395
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
                                  "name": "url",
                                  "storageKey": null
                                }
                              ],
                              "storageKey": "resized(height:395)"
                            }
                          ],
                          "storageKey": null
                        },
                        {
                          "args": null,
                          "kind": "FragmentSpread",
                          "name": "FillwidthItem_artwork"
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
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
(node as any).hash = '64c51ded546f812a6837400f30c8ca29';
export default node;
