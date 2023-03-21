/**
 * @generated SignedSource<<cf716c0c47670b7b8a97498899951cf5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkActionsWatchLotButton_artwork$data = {
  readonly isSaved: boolean | null;
  readonly sale: {
    readonly isLiveOpen: boolean | null;
    readonly isRegistrationClosed: boolean | null;
    readonly liveStartAt: string | null;
    readonly registrationStatus: {
      readonly qualifiedForBidding: boolean | null;
    } | null;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkAuctionRegistrationPanel_artwork">;
  readonly " $fragmentType": "ArtworkActionsWatchLotButton_artwork";
};
export type ArtworkActionsWatchLotButton_artwork$key = {
  readonly " $data"?: ArtworkActionsWatchLotButton_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkActionsWatchLotButton_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkActionsWatchLotButton_artwork",
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
          "name": "isLiveOpen",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isRegistrationClosed",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "liveStartAt",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Bidder",
          "kind": "LinkedField",
          "name": "registrationStatus",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "qualifiedForBidding",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isSaved",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkAuctionRegistrationPanel_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "706c3445b489851fd8117297efc3d97c";

export default node;
