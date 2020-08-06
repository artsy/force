/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistAuctionResultItem_auctionResult = {
    readonly title: string | null;
    readonly dimension_text: string | null;
    readonly organization: string | null;
    readonly images: {
        readonly thumbnail: {
            readonly url: string | null;
        } | null;
    } | null;
    readonly mediumText: string | null;
    readonly categoryText: string | null;
    readonly description: string | null;
    readonly date_text: string | null;
    readonly saleDate: string | null;
    readonly price_realized: {
        readonly display: string | null;
        readonly cents_usd: number | null;
    } | null;
    readonly estimate: {
        readonly display: string | null;
    } | null;
    readonly " $refType": "ArtistAuctionResultItem_auctionResult";
};
export type ArtistAuctionResultItem_auctionResult$data = ArtistAuctionResultItem_auctionResult;
export type ArtistAuctionResultItem_auctionResult$key = {
    readonly " $data"?: ArtistAuctionResultItem_auctionResult$data;
    readonly " $fragmentRefs": FragmentRefs<"ArtistAuctionResultItem_auctionResult">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "display",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "ArtistAuctionResultItem_auctionResult",
  "type": "AuctionResult",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "title",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "dimension_text",
      "name": "dimensionText",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "organization",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "images",
      "storageKey": null,
      "args": null,
      "concreteType": "AuctionLotImages",
      "plural": false,
      "selections": [
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "thumbnail",
          "storageKey": null,
          "args": null,
          "concreteType": "Image",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "url",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "mediumText",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "categoryText",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "description",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": "date_text",
      "name": "dateText",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "saleDate",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": "price_realized",
      "name": "priceRealized",
      "storageKey": null,
      "args": null,
      "concreteType": "AuctionResultPriceRealized",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "kind": "ScalarField",
          "alias": "cents_usd",
          "name": "centsUSD",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "estimate",
      "storageKey": null,
      "args": null,
      "concreteType": "AuctionLotEstimate",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ]
    }
  ]
};
})();
(node as any).hash = '3a2f0277ca44b0ac5b199a1c147fdc7f';
export default node;
