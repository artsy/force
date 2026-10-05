/**
 * @generated SignedSource<<90754e1fbe27f5e02a21caf51e985e69>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistHeaderRecentAuctionResults_artist$data = {
  readonly href: string | null | undefined;
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
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
          "value": "PRICE_AND_DATE_DESC"
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

(node as any).hash = "d57db764d85e4539a033f0094ddc8aa2";

export default node;
