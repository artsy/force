/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Auction2App_sale = {
    readonly internalID: string;
    readonly coverImage: {
        readonly cropped: {
            readonly src: string;
        } | null;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"Auction2Meta_sale" | "AuctionPromotedSaleRail_sale" | "AuctionDetails_sale">;
    readonly " $refType": "Auction2App_sale";
};
export type Auction2App_sale$data = Auction2App_sale;
export type Auction2App_sale$key = {
    readonly " $data"?: Auction2App_sale$data;
    readonly " $fragmentRefs": FragmentRefs<"Auction2App_sale">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Auction2App_sale",
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
              "value": "wide"
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
          "storageKey": "cropped(height:600,version:\"wide\",width:1800)"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Auction2Meta_sale"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AuctionPromotedSaleRail_sale"
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
(node as any).hash = 'ccb0e4a93b40c16edbf0b9121bc6648d';
export default node;
