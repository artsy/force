/**
 * @generated SignedSource<<d3305f897a487496c17843b0a72fff38>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistHeaderRecentAuctionResults_artist$data = {
  readonly internalID: string;
  readonly recentAuctionResultsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly " $fragmentSpreads": FragmentRefs<"ArtistHeaderRecentAuctionResultItem_auctionResult">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly slug: string;
  readonly " $fragmentType": "ArtistHeaderRecentAuctionResults_artist";
};
export type ArtistHeaderRecentAuctionResults_artist$key = {
  readonly " $data"?: ArtistHeaderRecentAuctionResults_artist$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistHeaderRecentAuctionResults_artist">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "saleEndYear"
    },
    {
      "kind": "RootArgument",
      "name": "saleStartYear"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistHeaderRecentAuctionResults_artist",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": "recentAuctionResultsConnection",
      "args": [
        {
          "kind": "Literal",
          "name": "allowUnspecifiedSaleDates",
          "value": false
        },
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        },
        {
          "kind": "Literal",
          "name": "includeUnknownPrices",
          "value": false
        },
        {
          "kind": "Variable",
          "name": "saleEndYear",
          "variableName": "saleEndYear"
        },
        {
          "kind": "Variable",
          "name": "saleStartYear",
          "variableName": "saleStartYear"
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "DATE_DESC"
        }
      ],
      "concreteType": "AuctionResultConnection",
      "kind": "LinkedField",
      "name": "auctionResultsConnection",
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
                (v0/*: any*/),
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ArtistHeaderRecentAuctionResultItem_auctionResult"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artist",
  "abstractKey": null
};
})();

(node as any).hash = "c1e7d91de8304ef5c2f5ab5362f1fe60";

export default node;
