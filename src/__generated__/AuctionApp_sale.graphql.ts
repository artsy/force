/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionApp_sale = {
    readonly internalID: string;
    readonly slug: string;
    readonly isClosed: boolean | null;
    readonly eligibleSaleArtworksCount: number | null;
    readonly coverImage: {
        readonly url: string | null;
    } | null;
    readonly showAssociatedSale: {
        readonly internalID: string;
    } | null;
    readonly showBuyNowTab: {
        readonly internalID: string;
    } | null;
    readonly cascadingEndTimeIntervalMinutes: number | null;
    readonly extendedBiddingIntervalMinutes: number | null;
    readonly status: string | null;
    readonly " $fragmentRefs": FragmentRefs<"AuctionMeta_sale" | "AuctionAssociatedSale_sale" | "AuctionBuyNowRail_sale" | "AuctionDetails_sale" | "CascadingEndTimesBanner_sale">;
    readonly " $refType": "AuctionApp_sale";
};
export type AuctionApp_sale$data = AuctionApp_sale;
export type AuctionApp_sale$key = {
    readonly " $data"?: AuctionApp_sale$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"AuctionApp_sale">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = [
  (v0/*: any*/)
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionApp_sale",
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
      "name": "isClosed",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "eligibleSaleArtworksCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "coverImage",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": [
                "wide",
                "source",
                "large_rectangle"
              ]
            }
          ],
          "kind": "ScalarField",
          "name": "url",
          "storageKey": "url(version:[\"wide\",\"source\",\"large_rectangle\"])"
        }
      ],
      "storageKey": null
    },
    {
      "alias": "showAssociatedSale",
      "args": null,
      "concreteType": "Sale",
      "kind": "LinkedField",
      "name": "associatedSale",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": "showBuyNowTab",
      "args": null,
      "concreteType": "Sale",
      "kind": "LinkedField",
      "name": "promotedSale",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "cascadingEndTimeIntervalMinutes",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "extendedBiddingIntervalMinutes",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AuctionMeta_sale"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AuctionAssociatedSale_sale"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AuctionBuyNowRail_sale"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AuctionDetails_sale"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CascadingEndTimesBanner_sale"
    }
  ],
  "type": "Sale",
  "abstractKey": null
};
})();
(node as any).hash = '2548ffc42b777c1adf49ec5cc14644f3';
export default node;
