/**
 * @generated SignedSource<<0845e0a2b4d00e855a39966ec06a3a1b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionBuyNowRail_sale$data = {
  readonly promotedSale: {
    readonly href: string | null;
    readonly internalID: string;
    readonly name: string | null;
    readonly saleArtworksConnection: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly artwork: {
            readonly " $fragmentSpreads": FragmentRefs<"ShelfArtwork_artwork">;
          } | null;
        } | null;
      } | null> | null;
    } | null;
  } | null;
  readonly " $fragmentType": "AuctionBuyNowRail_sale";
};
export type AuctionBuyNowRail_sale$key = {
  readonly " $data"?: AuctionBuyNowRail_sale$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionBuyNowRail_sale">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionBuyNowRail_sale",
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

(node as any).hash = "71a4747d9c93969a248b348f9154dd35";

export default node;
