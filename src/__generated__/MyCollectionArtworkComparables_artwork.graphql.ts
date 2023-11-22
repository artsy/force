/**
 * @generated SignedSource<<aab43d52a2cf413a5c1be2bd56a9efeb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkComparables_artwork$data = {
  readonly artist: {
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly auctionResult: {
    readonly edges: ReadonlyArray<{
      readonly cursor: string;
      readonly node: {
        readonly artistID: string;
        readonly internalID: string;
        readonly " $fragmentSpreads": FragmentRefs<"ArtistAuctionResultItem_auctionResult">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "MyCollectionArtworkComparables_artwork";
};
export type MyCollectionArtworkComparables_artwork$key = {
  readonly " $data"?: MyCollectionArtworkComparables_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkComparables_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyCollectionArtworkComparables_artwork",
  "selections": [
    {
      "alias": "auctionResult",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 6
        }
      ],
      "concreteType": "AuctionResultConnection",
      "kind": "LinkedField",
      "name": "comparableAuctionResults",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AuctionResultEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "AuctionResult",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ArtistAuctionResultItem_auctionResult"
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "artistID",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "internalID",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "comparableAuctionResults(first:6)"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "7d30a78ec5af365b6c6aaec39b80f2d1";

export default node;
