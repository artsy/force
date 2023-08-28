/**
 * @generated SignedSource<<65e33742be706f950351f5bc53e589ac>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerApp_partner$data = {
  readonly categories: ReadonlyArray<{
    readonly id: string;
    readonly name: string | null;
  } | null> | null;
  readonly displayFullPartnerPage: boolean | null;
  readonly internalID: string;
  readonly isDefaultProfilePublic: boolean | null;
  readonly partnerPageEligible: boolean | null;
  readonly partnerType: string | null;
  readonly profile: {
    readonly " $fragmentSpreads": FragmentRefs<"PartnerHeaderImage_profile">;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"NavigationTabs_partner" | "PartnerHeader_partner" | "PartnerMeta_partner">;
  readonly " $fragmentType": "PartnerApp_partner";
};
export type PartnerApp_partner$key = {
  readonly " $data"?: PartnerApp_partner$data;
  readonly " $fragmentSpreads": FragmentRefs<"PartnerApp_partner">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PartnerApp_partner",
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
      "name": "partnerType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "displayFullPartnerPage",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "partnerPageEligible",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isDefaultProfilePublic",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PartnerCategory",
      "kind": "LinkedField",
      "name": "categories",
      "plural": true,
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
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Profile",
      "kind": "LinkedField",
      "name": "profile",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PartnerHeaderImage_profile"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PartnerMeta_partner"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PartnerHeader_partner"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NavigationTabs_partner"
    }
  ],
  "type": "Partner",
  "abstractKey": null
};

(node as any).hash = "9db7bc7d8ab75e3488b5d16ad875d4f7";

export default node;
