/**
 * @generated SignedSource<<02398bb86fe7b6516098df8100d04cc2>>
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
    readonly coverArtwork: {
      readonly image: {
        readonly url: string | null | undefined;
      } | null | undefined;
    } | null | undefined;
    readonly href: string | null | undefined;
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
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "href",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Artwork",
          "kind": "LinkedField",
          "name": "coverArtwork",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Image",
              "kind": "LinkedField",
              "name": "image",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "version",
                      "value": "large"
                    }
                  ],
                  "kind": "ScalarField",
                  "name": "url",
                  "storageKey": "url(version:\"large\")"
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

(node as any).hash = "a9c47feb17ff2a68f1c6fdbbfedf2124";

export default node;
