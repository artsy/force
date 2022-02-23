/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionPromotedSaleRail_sale = {
    readonly promotedSale: {
        readonly href: string | null;
        readonly internalID: string;
        readonly name: string | null;
        readonly saleArtworksConnection: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly artwork: {
                        readonly " $fragmentRefs": FragmentRefs<"ShelfArtwork_artwork">;
                    } | null;
                } | null;
            } | null> | null;
        } | null;
    } | null;
    readonly " $refType": "AuctionPromotedSaleRail_sale";
};
export type AuctionPromotedSaleRail_sale$data = AuctionPromotedSaleRail_sale;
export type AuctionPromotedSaleRail_sale$key = {
    readonly " $data"?: AuctionPromotedSaleRail_sale$data;
    readonly " $fragmentRefs": FragmentRefs<"AuctionPromotedSaleRail_sale">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionPromotedSaleRail_sale",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Sale",
      "kind": "LinkedField",
      "name": "promotedSale",
      "plural": false,
      "selections": [
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
          "name": "internalID",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "first",
              "value": 99
            }
          ],
          "concreteType": "SaleArtworkConnection",
          "kind": "LinkedField",
          "name": "saleArtworksConnection",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "SaleArtworkEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "SaleArtwork",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "Artwork",
                      "kind": "LinkedField",
                      "name": "artwork",
                      "plural": false,
                      "selections": [
                        {
                          "args": null,
                          "kind": "FragmentSpread",
                          "name": "ShelfArtwork_artwork"
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
          "storageKey": "saleArtworksConnection(first:99)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Sale",
  "abstractKey": null
};
(node as any).hash = '0b86aecff19346453a1e00f54bdf3dde';
export default node;
