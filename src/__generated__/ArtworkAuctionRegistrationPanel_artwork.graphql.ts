/**
 * @generated SignedSource<<a84e0a193c5b21cbc6073c4939653ed6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkAuctionRegistrationPanel_artwork$data = {
  readonly sale: {
    readonly isRegistrationClosed: boolean | null | undefined;
    readonly registrationEndsAt: string | null | undefined;
    readonly slug: string;
  } | null | undefined;
  readonly " $fragmentType": "ArtworkAuctionRegistrationPanel_artwork";
};
export type ArtworkAuctionRegistrationPanel_artwork$key = {
  readonly " $data"?: ArtworkAuctionRegistrationPanel_artwork$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtworkAuctionRegistrationPanel_artwork">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtworkAuctionRegistrationPanel_artwork",
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
          "name": "isRegistrationClosed",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artwork",
  "abstractKey": null
};

(node as any).hash = "2623e667bbf5314680f6d12b6b152301";

export default node;
