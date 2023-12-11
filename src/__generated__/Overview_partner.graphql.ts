/**
 * @generated SignedSource<<e57d7572c01fa7f29aebfc5861dcf00d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Overview_partner$data = {
  readonly displayArtistsSection: boolean | null | undefined;
  readonly displayFullPartnerPage: boolean | null | undefined;
  readonly partnerType: string | null | undefined;
  readonly profileBannerDisplay: string | null | undefined;
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"AboutPartner_partner" | "ArticlesRail_partner" | "ArtistsRail_partner" | "ShowsRail_partner" | "SubscriberBanner_partner">;
  readonly " $fragmentType": "Overview_partner";
};
export type Overview_partner$key = {
  readonly " $data"?: Overview_partner$data;
  readonly " $fragmentSpreads": FragmentRefs<"Overview_partner">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Overview_partner",
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
      "name": "profileBannerDisplay",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "displayArtistsSection",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AboutPartner_partner"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShowsRail_partner"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistsRail_partner"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SubscriberBanner_partner"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArticlesRail_partner"
    }
  ],
  "type": "Partner",
  "abstractKey": null
};

(node as any).hash = "d0a31ff389e9ae2c848d12fa894112f9";

export default node;
