/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionAssociatedSale_sale = {
    readonly associatedSale: {
        readonly coverImage: {
            readonly cropped: {
                readonly src: string;
                readonly srcSet: string;
            } | null;
        } | null;
        readonly displayTimelyAt: string | null;
        readonly href: string | null;
        readonly slug: string;
        readonly name: string | null;
    } | null;
    readonly " $refType": "AuctionAssociatedSale_sale";
};
export type AuctionAssociatedSale_sale$data = AuctionAssociatedSale_sale;
export type AuctionAssociatedSale_sale$key = {
    readonly " $data"?: AuctionAssociatedSale_sale$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"AuctionAssociatedSale_sale">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionAssociatedSale_sale",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Sale",
      "kind": "LinkedField",
      "name": "associatedSale",
      "plural": false,
      "selections": [
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
                  "value": 250
                },
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 445
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
                }
              ],
              "storageKey": "cropped(height:250,width:445)"
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "displayTimelyAt",
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
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Sale",
  "abstractKey": null
};
(node as any).hash = '834abac48e3175cdd56f6627bd3cde6d';
export default node;
