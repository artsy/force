/* tslint:disable */

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
                            readonly url: string | null;
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
  "kind": "Fragment",
  "name": "ArtistConsignHeaderImages_artist",
  "type": "Artist",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "targetSupply",
      "storageKey": null,
      "args": null,
      "concreteType": "ArtistTargetSupply",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "microfunnel",
          "storageKey": null,
          "args": null,
          "concreteType": "ArtistTargetSupplyMicrofunnel",
          "plural": false,
          "selections": [
            {
              "kind": "LinkedField",
              "alias": null,
              "name": "artworks",
              "storageKey": null,
              "args": null,
              "concreteType": "ArtistTargetSupplyMicrofunnelArtwork",
              "plural": true,
              "selections": [
                {
                  "kind": "LinkedField",
                  "alias": null,
                  "name": "artwork",
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
                          "storageKey": "resized(height:395)",
                          "args": [
                            {
                              "kind": "Literal",
                              "name": "height",
                              "value": 395
                            }
                          ],
                          "concreteType": "ResizedImageUrl",
                          "plural": false,
                          "selections": [
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
                            },
                            {
                              "kind": "ScalarField",
                              "alias": null,
                              "name": "url",
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
};
(node as any).hash = 'f7f772023dc79dc472421a1b53b4cffd';
export default node;
