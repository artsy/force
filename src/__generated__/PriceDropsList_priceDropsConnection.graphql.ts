/**
 * @generated SignedSource<<5a576a791490730b9a5b6dfe5601f533>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PriceDropsList_priceDropsConnection$data = {
  readonly edges: ReadonlyArray<{
    readonly node: {
      readonly artwork: {
        readonly internalID: string;
        readonly " $fragmentSpreads": FragmentRefs<"NotificationArtwork_artwork">;
      };
      readonly " $fragmentSpreads": FragmentRefs<"PriceDrop_priceDrop">;
    } | null | undefined;
  } | null | undefined> | null | undefined;
  readonly " $fragmentType": "PriceDropsList_priceDropsConnection";
};
export type PriceDropsList_priceDropsConnection$key = {
  readonly " $data"?: PriceDropsList_priceDropsConnection$data;
  readonly " $fragmentSpreads": FragmentRefs<"PriceDropsList_priceDropsConnection">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PriceDropsList_priceDropsConnection",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PriceDropEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "PriceDrop",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "PriceDrop_priceDrop"
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Artwork",
              "kind": "LinkedField",
              "name": "artwork",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "internalID",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "NotificationArtwork_artwork"
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
  "type": "PriceDropConnection",
  "abstractKey": null
};

(node as any).hash = "3ed602faae694392244053f5dd0037a7";

export default node;
