/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SettingsEditProfileYourGalleryIntro_me = {
    readonly inquiryIntroduction: string | null;
    readonly " $refType": "SettingsEditProfileYourGalleryIntro_me";
};
export type SettingsEditProfileYourGalleryIntro_me$data = SettingsEditProfileYourGalleryIntro_me;
export type SettingsEditProfileYourGalleryIntro_me$key = {
    readonly " $data"?: SettingsEditProfileYourGalleryIntro_me$data;
    readonly " $fragmentRefs": FragmentRefs<"SettingsEditProfileYourGalleryIntro_me">;
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
  "type": "Me"
};
(node as any).hash = '38dc0be24336b7644ea3761c66c36590';
export default node;
