/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistConsignRecentlySold_artist = {
    readonly targetSupply: {
        readonly microfunnel: {
            readonly artworks: ReadonlyArray<{
                readonly artwork: {
                    readonly image: {
                        readonly aspectRatio: number;
                        readonly width: number | null;
                        readonly height: number | null;
                    } | null;
                    readonly " $fragmentRefs": FragmentRefs<"FillwidthItem_artwork">;
                } | null;
                readonly realizedPrice: string | null;
            } | null> | null;
        } | null;
    } | null;
    readonly name: string | null;
    readonly " $refType": "ArtistConsignRecentlySold_artist";
};
export type ArtistConsignRecentlySold_artist$data = ArtistConsignRecentlySold_artist;
export type ArtistConsignRecentlySold_artist$key = {
    readonly " $data"?: ArtistConsignRecentlySold_artist$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistConsignRecentlySold_artist">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "ArtistConsignRecentlySold_artist",
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
                          "kind": "ScalarField",
                          "alias": null,
                          "name": "aspectRatio",
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
                    },
                    {
                      "kind": "FragmentSpread",
                      "name": "FillwidthItem_artwork",
                      "args": null
                    }
                  ]
                },
                {
                  "kind": "ScalarField",
                  "alias": null,
                  "name": "realizedPrice",
                  "args": null,
                  "storageKey": null
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = '796c6909af76876d049a50784d7fb593';
export default node;
