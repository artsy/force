/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairExhibitorRailArtworks_show = {
    readonly artworks: {
        readonly edges: ReadonlyArray<{
            readonly artwork: {
                readonly internalID: string;
                readonly slug: string;
                readonly " $fragmentRefs": FragmentRefs<"FillwidthItem_artwork">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "FairExhibitorRailArtworks_show";
};
export type FairExhibitorRailArtworks_show$data = FairExhibitorRailArtworks_show;
export type FairExhibitorRailArtworks_show$key = {
    readonly " $data"?: FairExhibitorRailArtworks_show$data;
    readonly " $fragmentRefs": FragmentRefs<"FairExhibitorRailArtworks_show">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairExhibitorRailArtworks_show",
  "selections": [
    {
      "alias": "artworks",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        }
      ],
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
              "alias": "artwork",
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
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "slug",
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
      "storageKey": "artworksConnection(first:20)"
    }
  ],
  "type": "Show"
};
(node as any).hash = '30c2338aa32b73b3949ac6bfb1955657';
export default node;
