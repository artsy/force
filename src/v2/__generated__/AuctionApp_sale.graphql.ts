/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionApp_sale = {
    readonly internalID: string;
    readonly coverImage: {
        readonly cropped: {
            readonly src: string;
        } | null;
    } | null;
    readonly showBuyNowTab: {
        readonly internalID: string;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"AuctionMeta_sale" | "AuctionBuyNowRail_sale" | "AuctionDetails_sale">;
    readonly " $refType": "AuctionApp_sale";
};
export type AuctionApp_sale$data = AuctionApp_sale;
export type AuctionApp_sale$key = {
    readonly " $data"?: AuctionApp_sale$data;
    readonly " $fragmentRefs": FragmentRefs<"AuctionApp_sale">;
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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionApp_sale",
  "selections": [
    (v0/*: any*/),
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
              "name": "height",
              "value": 600
            },
            {
              "kind": "Literal",
              "name": "version",
              "value": "normalized"
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 1800
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
            }
          ],
          "storageKey": "cropped(height:600,version:\"normalized\",width:1800)"
        }
      ],
      "storageKey": null
    },
    {
      "alias": "showBuyNowTab",
      "args": null,
      "concreteType": "Sale",
      "kind": "LinkedField",
      "name": "promotedSale",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
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
      "name": "AuctionBuyNowRail_sale"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AuctionDetails_sale"
    }
  ],
  "type": "Sale",
  "abstractKey": null
};
})();
(node as any).hash = '9077dfe25809a523f8872d20fd378b3a';
export default node;
