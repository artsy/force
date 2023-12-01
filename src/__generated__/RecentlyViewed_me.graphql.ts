/**
 * @generated SignedSource<<f18ef4cb96b23c77e0d7b520e3a50775>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RecentlyViewed_me$data = {
  readonly recentlyViewedArtworksConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"ShelfArtwork_artwork">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "RecentlyViewed_me";
};
export type RecentlyViewed_me$key = {
  readonly " $data"?: RecentlyViewed_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"RecentlyViewed_me">;
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

(node as any).hash = "54d03de051db4de38baaf24ffaca7866";

export default node;
