/**
 * @generated SignedSource<<f9da3d7bb8efe83a6a8fe10ab3cadf78>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InsightsAuctionResults_me$data = {
  readonly myCollectionAuctionResults: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"ArtistAuctionResultItem_auctionResult">;
      } | null;
    } | null> | null;
  } | null;
  readonly " $fragmentType": "InsightsAuctionResults_me";
};
export type InsightsAuctionResults_me$key = {
  readonly " $data"?: InsightsAuctionResults_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"InsightsAuctionResults_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InsightsAuctionResults_me",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 6
        }
      ],
      "concreteType": "AuctionResultConnection",
      "kind": "LinkedField",
      "name": "myCollectionAuctionResults",
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
              "concreteType": "AuctionResult",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ArtistAuctionResultItem_auctionResult"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "myCollectionAuctionResults(first:6)"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "b483ead964ca2dfd7c04d73e25ec8637";

export default node;
