/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AboutArtworksRail_viewer = {
    readonly artworks: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly " $fragmentRefs": FragmentRefs<"ShelfArtwork_artwork">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "AboutArtworksRail_viewer";
};
export type AboutArtworksRail_viewer$data = AboutArtworksRail_viewer;
export type AboutArtworksRail_viewer$key = {
    readonly " $data"?: AboutArtworksRail_viewer$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"AboutArtworksRail_viewer">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AboutArtworksRail_viewer",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "ids",
          "value": [
            "5f3b5f320a69fc000de1b7ea",
            "59e61ee8a09a6749ab69e49d",
            "5d9b926cce2ff90011a84978",
            "5e5572e72dbb7d000e386988"
          ]
        }
      ],
      "concreteType": "ArtworkConnection",
      "kind": "LinkedField",
      "name": "artworks",
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
                  "kind": "ScalarField",
                  "name": "internalID",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ShelfArtwork_artwork"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artworks(ids:[\"5f3b5f320a69fc000de1b7ea\",\"59e61ee8a09a6749ab69e49d\",\"5d9b926cce2ff90011a84978\",\"5e5572e72dbb7d000e386988\"])"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};
(node as any).hash = '6037a35d73fcfd5a37e0af6dacf88162';
export default node;
