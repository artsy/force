/**
 * @generated SignedSource<<6abc60c84789b413433be039e9eb2878>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BidTimerLine_artwork$data = {
  readonly collectorSignals: {
    readonly auction: {
      readonly lotClosesAt: string | null | undefined;
      readonly onlineBiddingExtended: boolean;
      readonly registrationEndsAt: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
  readonly " $fragmentType": "BidTimerLine_artwork";
};
export type BidTimerLine_artwork$key = {
  readonly " $data"?: BidTimerLine_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"BidTimerLine_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BidTimerLine_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CollectorSignals",
      "kind": "LinkedField",
      "name": "collectorSignals",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AuctionCollectorSignals",
          "kind": "LinkedField",
          "name": "auction",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "lotClosesAt",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "registrationEndsAt",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "onlineBiddingExtended",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "c4397270f2ed5f4915b5c65fc4df5769";

export default node;
