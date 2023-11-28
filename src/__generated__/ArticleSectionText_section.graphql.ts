/**
 * @generated SignedSource<<6563af729fef5968709edfbff76ca239>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArticleSectionText_section$data = {
  readonly body: string | null | undefined;
  readonly " $fragmentType": "ArticleSectionText_section";
};
export type ArticleSectionText_section$key = {
  readonly " $data"?: ArticleSectionText_section$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArticleSectionText_section">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArticleSectionText_section",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "body",
      "storageKey": null
    }
  ],
  "type": "ArticleSectionText",
  "abstractKey": null
};

(node as any).hash = "a00101254647fcc4430a60a6032e3e0c";

export default node;
