/* tslint:disable */

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
  "kind": "ScalarField",
  "alias": null,
  "name": "cents",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Fragment",
  "name": "BidForm_saleArtwork",
  "type": "SaleArtwork",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "minimumNextBid",
      "storageKey": null,
      "args": null,
      "concreteType": "SaleArtworkMinimumNextBid",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "increments",
      "storageKey": "increments(useMyMaxBid:true)",
      "args": [
        {
          "kind": "Literal",
          "name": "useMyMaxBid",
          "value": true
        }
      ],
      "concreteType": "BidIncrementsFormatted",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "display",
          "args": null,
          "storageKey": null
        }
      ]
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "sale",
      "storageKey": null,
      "args": null,
      "concreteType": "Sale",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "slug",
          "args": null,
          "storageKey": null
        },
        {
          "kind": "LinkedField",
          "alias": null,
          "name": "registrationStatus",
          "storageKey": null,
          "args": null,
          "concreteType": "Bidder",
          "plural": false,
          "selections": [
            {
              "kind": "ScalarField",
              "alias": null,
              "name": "qualifiedForBidding",
              "args": null,
              "storageKey": null
            }
          ]
        }
      ]
    }
  ]
};
})();
(node as any).hash = '40cc7961713f7964a792ce4f22933426';
export default node;
