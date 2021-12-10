/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RecentlyViewed_me = {
    readonly recentlyViewedArtworksConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly " $fragmentRefs": FragmentRefs<"ShelfArtwork_artwork">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "RecentlyViewed_me";
};
export type RecentlyViewed_me$data = RecentlyViewed_me;
export type RecentlyViewed_me$key = {
    readonly " $data"?: RecentlyViewed_me$data;
    readonly " $fragmentRefs": FragmentRefs<"RecentlyViewed_me">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RecentlyViewed_me",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 20
        }
      ],
      "concreteType": "ArtworkConnection",
      "kind": "LinkedField",
      "name": "recentlyViewedArtworksConnection",
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
                  "name": "id",
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
      "storageKey": "recentlyViewedArtworksConnection(first:20)"
    }
  ],
  "type": "Me",
  "abstractKey": null
};
(node as any).hash = '54d03de051db4de38baaf24ffaca7866';
export default node;
