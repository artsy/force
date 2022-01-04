/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BidForm_saleArtwork = {
    readonly minimumNextBid: {
        readonly cents: number | null;
    } | null;
    readonly increments: ReadonlyArray<{
        readonly cents: number | null;
        readonly display: string | null;
    } | null> | null;
    readonly sale: {
        readonly slug: string;
        readonly registrationStatus: {
            readonly qualifiedForBidding: boolean | null;
        } | null;
    } | null;
    readonly " $refType": "BidForm_saleArtwork";
};
export type BidForm_saleArtwork$data = BidForm_saleArtwork;
export type BidForm_saleArtwork$key = {
    readonly " $data"?: BidForm_saleArtwork$data;
    readonly " $fragmentRefs": FragmentRefs<"BidForm_saleArtwork">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cents",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BidForm_saleArtwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "SaleArtworkMinimumNextBid",
      "kind": "LinkedField",
      "name": "minimumNextBid",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "useMyMaxBid",
          "value": true
        }
      ],
      "concreteType": "BidIncrementsFormatted",
      "kind": "LinkedField",
      "name": "increments",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "display",
          "storageKey": null
        }
      ],
      "storageKey": "increments(useMyMaxBid:true)"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Sale",
      "kind": "LinkedField",
      "name": "sale",
      "plural": false,
      "selections": [
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
          "concreteType": "Bidder",
          "kind": "LinkedField",
          "name": "registrationStatus",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "qualifiedForBidding",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "SaleArtwork",
  "abstractKey": null
};
})();
(node as any).hash = '40cc7961713f7964a792ce4f22933426';
export default node;
