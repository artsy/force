/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistConsignHeaderImages_artist = {
    readonly targetSupply: {
        readonly microfunnel: {
            readonly artworks: ReadonlyArray<{
                readonly artwork: {
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
              "concreteType": "ArtistTargetSupplyMicrofunnelArtwork",
              "kind": "LinkedField",
              "name": "artworks",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Artwork",
                  "kind": "LinkedField",
                  "name": "artwork",
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
  "type": "Artist"
};
(node as any).hash = 'f7f772023dc79dc472421a1b53b4cffd';
export default node;
