/**
 * @generated SignedSource<<9a3da8cba940578287296db868a8c8c0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettingsEditProfileYourGalleryIntro_me$data = {
  readonly inquiryIntroduction: string | null;
  readonly " $fragmentType": "SettingsEditProfileYourGalleryIntro_me";
};
export type SettingsEditProfileYourGalleryIntro_me$key = {
  readonly " $data"?: SettingsEditProfileYourGalleryIntro_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettingsEditProfileYourGalleryIntro_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettingsEditProfileYourGalleryIntro_me",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "inquiryIntroduction",
      "storageKey": null
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "38dc0be24336b7644ea3761c66c36590";

export default node;
