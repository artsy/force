/**
 * @generated SignedSource<<a07c99a56d56258133515c2a2c32a5e8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionConfirmRegistrationRoute_me$data = {
  readonly hasQualifiedCreditCards: boolean | null | undefined;
  readonly internalID: string;
  readonly isIdentityVerified: boolean | null | undefined;
  readonly phoneNumber: {
    readonly originalNumber: string | null | undefined;
  } | null | undefined;
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
      "name": "isIdentityVerified",
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

(node as any).hash = "f90b50cc94d41e7c22411ce475c2f6e8";

export default node;
