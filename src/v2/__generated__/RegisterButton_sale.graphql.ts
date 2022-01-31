/**
 * @generated SignedSource<<7c43e4b70df84ab1ac2470ec65fb3282>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RegisterButton_sale$data = {
  readonly bidder: {
    readonly qualifiedForBidding: boolean | null;
  } | null;
  readonly isAuction: boolean | null;
  readonly isClosed: boolean | null;
  readonly isLiveOpen: boolean | null;
  readonly isRegistrationClosed: boolean | null;
  readonly liveURLIfOpen: string | null;
  readonly requireIdentityVerification: boolean | null;
  readonly registrationStatus: {
    readonly internalID: string;
  } | null;
  readonly slug: string;
  readonly status: string | null;
  readonly " $fragmentType": "RegisterButton_sale";
};
export type RegisterButton_sale$key = {
  readonly " $data"?: RegisterButton_sale$data;
  readonly " $fragmentSpreads": FragmentRefs<"RegisterButton_sale">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RegisterButton_sale",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Bidder",
      "kind": "LinkedField",
      "name": "bidder",
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
    },
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
    },
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
      "name": "liveURLIfOpen",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "requireIdentityVerification",
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
          "name": "internalID",
          "storageKey": null
        }
      ],
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
      "name": "status",
      "storageKey": null
    }
  ],
  "type": "Sale",
  "abstractKey": null
};

(node as any).hash = "70eb9020abfc06c5aa8350243fd5f520";

export default node;
