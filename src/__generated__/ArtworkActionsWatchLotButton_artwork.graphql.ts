/**
 * @generated SignedSource<<ba453fa233afc25c599304b842bf105b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkActionsWatchLotButton_artwork$data = {
  readonly sale: {
    readonly isLiveOpen: boolean | null | undefined;
    readonly isRegistrationClosed: boolean | null | undefined;
    readonly liveStartAt: string | null | undefined;
    readonly registrationStatus: {
      readonly qualifiedForBidding: boolean | null | undefined;
    } | null | undefined;
  } | null | undefined;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkAuctionRegistrationPanel_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "6082d7984e0f86314ccfee557da7362d";

export default node;
