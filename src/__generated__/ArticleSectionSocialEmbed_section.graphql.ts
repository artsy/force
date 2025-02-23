/**
 * @generated SignedSource<<48a032dac47c625b5a05c4b4cd0765f1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleSectionSocialEmbed_section$data = {
  readonly embed: string | null | undefined;
  readonly url: string | null | undefined;
  readonly " $fragmentType": "ArticleSectionSocialEmbed_section";
};
export type ArticleSectionSocialEmbed_section$key = {
  readonly " $data"?: ArticleSectionSocialEmbed_section$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleSectionSocialEmbed_section">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleSectionSocialEmbed_section",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "url",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "embed",
      "storageKey": null
    }
  ],
  "type": "ArticleSectionSocialEmbed",
  "abstractKey": null
};

(node as any).hash = "b7f9db17c3dddbf8881a190693a98762";

export default node;
