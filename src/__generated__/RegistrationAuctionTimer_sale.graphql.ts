/**
 * @generated SignedSource<<04f5b3b253f3c99b352f4eb2c3a0ea3d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RegistrationAuctionTimer_sale$data = {
  readonly isRegistrationClosed: boolean | null;
  readonly registrationEndsAt: string | null;
  readonly " $fragmentType": "RegistrationAuctionTimer_sale";
};
export type RegistrationAuctionTimer_sale$key = {
  readonly " $data"?: RegistrationAuctionTimer_sale$data;
  readonly " $fragmentSpreads": FragmentRefs<"RegistrationAuctionTimer_sale">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RegistrationAuctionTimer_sale",
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
  "type": "Sale",
  "abstractKey": null
};

(node as any).hash = "1e67b75b8ca7cbd2948580649814ac6f";

export default node;
