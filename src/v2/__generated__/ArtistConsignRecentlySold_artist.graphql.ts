/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistConsignRecentlySold_artist = {
    readonly targetSupply: {
        readonly microfunnel: {
            readonly artworks: ReadonlyArray<{
                readonly artwork: {
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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistConsignRecentlySold_artist",
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
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "FillwidthItem_artwork"
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "realizedPrice",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Artist"
};
(node as any).hash = '9554efc6c368bc6a4feebaeb434924ed';
export default node;
