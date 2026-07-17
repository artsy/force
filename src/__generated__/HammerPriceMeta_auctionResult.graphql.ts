/**
 * @generated SignedSource<<9e5b6826e31cd82af6fc6f09ba15591f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HammerPriceMeta_auctionResult$data = {
  readonly artist: {
    readonly name: string | null | undefined;
  } | null | undefined;
  readonly images: {
    readonly larger: {
      readonly url: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly internalID: string;
  readonly title: string | null | undefined;
  readonly " $fragmentType": "HammerPriceMeta_auctionResult";
};
export type HammerPriceMeta_auctionResult$key = {
  readonly " $data"?: HammerPriceMeta_auctionResult$data;
  readonly " $fragmentSpreads": FragmentRefs<"HammerPriceMeta_auctionResult">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HammerPriceMeta_auctionResult",
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
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Artist",
      "kind": "LinkedField",
      "name": "artist",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AuctionLotImages",
      "kind": "LinkedField",
      "name": "images",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "larger",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "version",
                  "value": "larger"
                }
              ],
              "kind": "ScalarField",
              "name": "url",
              "storageKey": "url(version:\"larger\")"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AuctionResult",
  "abstractKey": null
};

(node as any).hash = "bcebc1bafce62ec5ceccb247e43bda35";

export default node;
