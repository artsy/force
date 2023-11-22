/**
 * @generated SignedSource<<8b8ff96485bf431bb47d594d953bc85d>>
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
    readonly qualifiedForBidding: boolean | null | undefined;
  } | null | undefined;
  readonly isAuction: boolean | null | undefined;
  readonly isClosed: boolean | null | undefined;
  readonly isLiveOpen: boolean | null | undefined;
  readonly isPreview: boolean | null | undefined;
  readonly isRegistrationClosed: boolean | null | undefined;
  readonly liveURLIfOpen: string | null | undefined;
  readonly registrationStatus: {
    readonly internalID: string;
  } | null | undefined;
  readonly requireIdentityVerification: boolean | null | undefined;
  readonly slug: string;
  readonly status: string | null | undefined;
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
      "name": "isPreview",
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

(node as any).hash = "e18690c44438367e8901d36af57723fa";

export default node;
