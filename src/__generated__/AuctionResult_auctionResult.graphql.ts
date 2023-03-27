/**
 * @generated SignedSource<<34965f5693792ecf43997603d37d2906>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionResult_auctionResult$data = {
  readonly artist: {
    readonly name: string | null;
  } | null;
  readonly comparableAuctionResults: {
    readonly edges: ReadonlyArray<{
      readonly cursor: string;
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"ArtistAuctionResultItem_auctionResult">;
      } | null;
    } | null> | null;
  } | null;
  readonly title: string | null;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionResultBackLink_auctionResult" | "AuctionResultImage_auctionResult" | "AuctionResultMetaData_auctionResult" | "AuctionResultPrice_auctionResult" | "AuctionResultTitleInfo_auctionResult">;
  readonly " $fragmentType": "AuctionResult_auctionResult";
};
export type AuctionResult_auctionResult$key = {
  readonly " $data"?: AuctionResult_auctionResult$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionResult_auctionResult">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionResult_auctionResult",
  "selections": [
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "AuctionResultBackLink_auctionResult"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AuctionResultImage_auctionResult"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AuctionResultMetaData_auctionResult"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AuctionResultPrice_auctionResult"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AuctionResultTitleInfo_auctionResult"
    }
  ],
  "type": "AuctionResult",
  "abstractKey": null
};

(node as any).hash = "37755af0da4035a369d5cf2d61808844";

export default node;
