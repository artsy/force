/**
 * @generated SignedSource<<5c213b288c2b8292d120c49f84e8bcc7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HammerPriceApp_auctionResult$data = {
  readonly dateText: string | null | undefined;
  readonly images: {
    readonly larger: {
      readonly url: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly internalID: string;
  readonly " $fragmentSpreads": FragmentRefs<"HammerPriceLotDetails_auctionResult">;
  readonly " $fragmentType": "HammerPriceApp_auctionResult";
};
export type HammerPriceApp_auctionResult$key = {
  readonly " $data"?: HammerPriceApp_auctionResult$data;
  readonly " $fragmentSpreads": FragmentRefs<"HammerPriceApp_auctionResult">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HammerPriceApp_auctionResult",
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
      "name": "dateText",
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "HammerPriceLotDetails_auctionResult"
    }
  ],
  "type": "AuctionResult",
  "abstractKey": null
};

(node as any).hash = "21551631902e5eb2cb1fafd3fdd5c840";

export default node;
