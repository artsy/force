/**
 * @generated SignedSource<<0502e84acbea8fe627644e174b7215cf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyBids_me$data = {
  readonly myBids: {
    readonly active: ReadonlyArray<{
      readonly sale: {
        readonly slug: string;
        readonly " $fragmentSpreads": FragmentRefs<"MyBidsBidHeader_sale">;
      } | null | undefined;
      readonly saleArtworks: ReadonlyArray<{
        readonly " $fragmentSpreads": FragmentRefs<"MyBidsBidItem_saleArtwork">;
      } | null | undefined> | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "MyBids_me";
};
export type MyBids_me$key = {
  readonly " $data"?: MyBids_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"MyBids_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MyBids_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MyBids",
      "kind": "LinkedField",
      "name": "myBids",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "MyBid",
          "kind": "LinkedField",
          "name": "active",
          "plural": true,
          "selections": [
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "MyBidsBidHeader_sale"
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "SaleArtwork",
              "kind": "LinkedField",
              "name": "saleArtworks",
              "plural": true,
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "MyBidsBidItem_saleArtwork"
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
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "cfac86169241a72deeba877e77134538";

export default node;
