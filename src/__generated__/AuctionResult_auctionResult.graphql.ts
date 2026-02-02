/**
 * @generated SignedSource<<cde630c9673128f02d0a7ff9b9804f65>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionResult_auctionResult$data = {
  readonly artist: {
    readonly href: string | null | undefined;
    readonly id: string;
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly comparableAuctionResults: {
    readonly edges: ReadonlyArray<{
      readonly cursor: string;
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"ArtistAuctionResultItem_auctionResult">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly internalID: string;
  readonly title: string | null | undefined;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionResultImage_auctionResult" | "AuctionResultMetaData_auctionResult" | "AuctionResultPrice_auctionResult" | "AuctionResultTitleInfo_auctionResult">;
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
      "kind": "ScalarField",
      "name": "internalID",
      "storageKey": null
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
          "name": "id",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "href",
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

(node as any).hash = "811435ba389f2665172fdb2e1ba4f211";

export default node;
