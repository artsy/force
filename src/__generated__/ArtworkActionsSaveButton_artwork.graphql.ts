/**
 * @generated SignedSource<<c94a954c60b0a468c3d40981b437b510>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkActionsSaveButton_artwork$data = {
  readonly id: string;
  readonly internalID: string;
  readonly isSaved: boolean | null;
  readonly sale: {
    readonly isAuction: boolean | null;
    readonly isClosed: boolean | null;
  } | null;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkActionsSaveButtonV2_artwork" | "ArtworkActionsWatchLotButton_artwork" | "ArtworkAuctionRegistrationPanel_artwork">;
  readonly " $fragmentType": "ArtworkActionsSaveButton_artwork";
};
export type ArtworkActionsSaveButton_artwork$key = {
  readonly " $data"?: ArtworkActionsSaveButton_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkActionsSaveButton_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkActionsSaveButton_artwork",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
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
      "name": "slug",
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
          "name": "isAuction",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isClosed",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkActionsWatchLotButton_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkAuctionRegistrationPanel_artwork"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkActionsSaveButtonV2_artwork"
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "0e3b8c0c932990c00d680379298e5407";

export default node;
