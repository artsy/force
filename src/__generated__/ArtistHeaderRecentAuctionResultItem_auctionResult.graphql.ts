/**
 * @generated SignedSource<<6c7d3c14ebb15d99d85624e18db1cabd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistHeaderRecentAuctionResultItem_auctionResult$data = {
  readonly dateText: string | null | undefined;
  readonly images: {
    readonly thumbnail: {
      readonly resized: {
        readonly src: string;
        readonly srcSet: string;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly internalID: string;
  readonly performance: {
    readonly mid: string | null | undefined;
  } | null | undefined;
  readonly priceRealized: {
    readonly centsUSD: number | null | undefined;
    readonly display: string | null | undefined;
  } | null | undefined;
  readonly saleDate: string | null | undefined;
  readonly slug: string | null | undefined;
  readonly title: string | null | undefined;
  readonly " $fragmentType": "ArtistHeaderRecentAuctionResultItem_auctionResult";
};
export type ArtistHeaderRecentAuctionResultItem_auctionResult$key = {
  readonly " $data"?: ArtistHeaderRecentAuctionResultItem_auctionResult$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistHeaderRecentAuctionResultItem_auctionResult">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistHeaderRecentAuctionResultItem_auctionResult",
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "dateText",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "saleDate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AuctionLotImages",
      "kind": "LinkedField",
      "name": "images",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "thumbnail",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 130
                },
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 130
                }
              ],
              "concreteType": "ResizedImageUrl",
              "kind": "LinkedField",
              "name": "resized",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "src",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "srcSet",
                  "storageKey": null
                }
              ],
              "storageKey": "resized(height:130,width:130)"
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
      "concreteType": "AuctionResultPriceRealized",
      "kind": "LinkedField",
      "name": "priceRealized",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "display",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "centsUSD",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AuctionLotPerformance",
      "kind": "LinkedField",
      "name": "performance",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "mid",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AuctionResult",
  "abstractKey": null
};

(node as any).hash = "3323264af008bad169eb30dada244e78";

export default node;
