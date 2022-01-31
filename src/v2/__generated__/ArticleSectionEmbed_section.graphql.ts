/**
 * @generated SignedSource<<7e681670754b384bf5d6dc69a9ea2e72>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleSectionEmbed_section$data = {
  readonly url: string | null;
  readonly height: number | null;
  readonly mobileHeight: number | null;
  readonly " $fragmentType": "ArticleSectionEmbed_section";
};
export type ArticleSectionEmbed_section$key = {
  readonly " $data"?: ArticleSectionEmbed_section$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleSectionEmbed_section">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleSectionEmbed_section",
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
      "name": "height",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mobileHeight",
      "storageKey": null
    }
  ],
  "type": "ArticleSectionEmbed",
  "abstractKey": null
};

(node as any).hash = "86cfdfbb14bd51cba0fc15dc335edd65";

export default node;
