/**
 * @generated SignedSource<<d99617f891e57572ce6bdf5536714c40>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionConfirmRegistrationRoute_me$data = {
  readonly hasQualifiedCreditCards: boolean | null;
  readonly identityVerified: boolean | null;
  readonly internalID: string;
  readonly phoneNumber: {
    readonly originalNumber: string | null;
  } | null;
  readonly " $fragmentType": "AuctionConfirmRegistrationRoute_me";
};
export type AuctionConfirmRegistrationRoute_me$key = {
  readonly " $data"?: AuctionConfirmRegistrationRoute_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionConfirmRegistrationRoute_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionConfirmRegistrationRoute_me",
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
      "name": "identityVerified",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasQualifiedCreditCards",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PhoneNumberType",
      "kind": "LinkedField",
      "name": "phoneNumber",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "originalNumber",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "7e0abef463814bf2c57aa0ea3a2d17f0";

export default node;
