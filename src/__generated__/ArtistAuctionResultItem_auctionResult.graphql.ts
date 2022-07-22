/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistAuctionResultItem_auctionResult = {
    readonly title: string | null;
    readonly dimension_text: string | null;
    readonly organization: string | null;
    readonly images: {
        readonly larger: {
            readonly cropped: {
                readonly src: string;
                readonly srcSet: string;
                readonly width: number;
                readonly height: number;
            } | null;
        } | null;
    } | null;
    readonly mediumText: string | null;
    readonly categoryText: string | null;
    readonly date_text: string | null;
    readonly saleDate: string | null;
    readonly boughtIn: boolean | null;
    readonly currency: string | null;
    readonly price_realized: {
        readonly display: string | null;
        readonly display_usd: string | null;
        readonly cents_usd: number | null;
    } | null;
    readonly performance: {
        readonly mid: string | null;
    } | null;
    readonly estimate: {
        readonly display: string | null;
    } | null;
    readonly " $refType": "ArtistAuctionResultItem_auctionResult";
};
export type ArtistAuctionResultItem_auctionResult$data = ArtistAuctionResultItem_auctionResult;
export type ArtistAuctionResultItem_auctionResult$key = {
    readonly " $data"?: ArtistAuctionResultItem_auctionResult$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ArtistAuctionResultItem_auctionResult">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistAuctionResultItem_auctionResult",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": "dimension_text",
      "args": null,
      "kind": "ScalarField",
      "name": "dimensionText",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "organization",
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
          "name": "larger",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 100
                },
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 100
                }
              ],
              "concreteType": "CroppedImageUrl",
              "kind": "LinkedField",
              "name": "cropped",
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
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "width",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "height",
                  "storageKey": null
                }
              ],
              "storageKey": "cropped(height:100,width:100)"
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
      "name": "mediumText",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "categoryText",
      "storageKey": null
    },
    {
      "alias": "date_text",
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
      "kind": "ScalarField",
      "name": "boughtIn",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currency",
      "storageKey": null
    },
    {
      "alias": "price_realized",
      "args": null,
      "concreteType": "AuctionResultPriceRealized",
      "kind": "LinkedField",
      "name": "priceRealized",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": "display_usd",
          "args": null,
          "kind": "ScalarField",
          "name": "displayUSD",
          "storageKey": null
        },
        {
          "alias": "cents_usd",
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AuctionLotEstimate",
      "kind": "LinkedField",
      "name": "estimate",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "AuctionResult",
  "abstractKey": null
};
})();
(node as any).hash = 'aa76b5ea027deae82c223d182589b741';
export default node;
