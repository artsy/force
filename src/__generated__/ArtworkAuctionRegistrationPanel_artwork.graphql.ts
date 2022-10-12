/**
 * @generated SignedSource<<4785cff90ca5dc2a4ac1c3470525f4b2>>
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
    readonly isRegistrationClosed: boolean | null;
    readonly registrationEndsAt: string | null;
  } | null;
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

(node as any).hash = "be17eca6cd8987b627c99e5e0e09ab10";

export default node;
