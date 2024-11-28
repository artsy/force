/**
 * @generated SignedSource<<2dd6304af979112b3e27a8bfb5eaf120>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleSponsor_sponsor$data = {
  readonly partnerDarkLogo: string | null | undefined;
  readonly partnerLightLogo: string | null | undefined;
  readonly partnerLogoLink: string | null | undefined;
  readonly " $fragmentType": "ArticleSponsor_sponsor";
};
export type ArticleSponsor_sponsor$key = {
  readonly " $data"?: ArticleSponsor_sponsor$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleSponsor_sponsor">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleSponsor_sponsor",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "partnerLightLogo",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "partnerDarkLogo",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "partnerLogoLink",
      "storageKey": null
    }
  ],
  "type": "ArticleSponsor",
  "abstractKey": null
};

(node as any).hash = "d51ce9d47167c32f0ec3435c942a9380";

export default node;
