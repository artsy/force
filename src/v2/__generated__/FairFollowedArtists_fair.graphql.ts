/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairFollowedArtists_fair = {
    readonly slug: string;
    readonly followedArtistArtworks: {
        readonly edges: ReadonlyArray<{
            readonly artwork: {
                readonly " $fragmentRefs": FragmentRefs<"FillwidthItem_artwork">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "FairFollowedArtists_fair";
};
export type FairFollowedArtists_fair$data = FairFollowedArtists_fair;
export type FairFollowedArtists_fair$key = {
    readonly " $data"?: FairFollowedArtists_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairFollowedArtists_fair">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairFollowedArtists_fair",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": "followedArtistArtworks",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        },
        {
          "kind": "Literal",
          "name": "includeArtworksByFollowedArtists",
          "value": true
        }
      ],
      "concreteType": "FilterArtworksConnection",
      "kind": "LinkedField",
      "name": "filterArtworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "FilterArtworksEdge",
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
      "storageKey": "filterArtworksConnection(first:20,includeArtworksByFollowedArtists:true)"
    }
  ],
  "type": "Fair"
};
(node as any).hash = 'f2a46b7155c7bf542cc4b9a10fb4fa5e';
export default node;
