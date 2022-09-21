/**
 * @generated SignedSource<<55df872d129aeeceb7ae1844b8404183>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowAbout_show$data = {
  readonly about: string | null;
  readonly " $fragmentType": "ShowAbout_show";
};
export type ShowAbout_show$key = {
  readonly " $data"?: ShowAbout_show$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShowAbout_show">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowAbout_show",
  "selections": [
    {
      "alias": "about",
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    }
  ],
  "type": "Show",
  "abstractKey": null
};

(node as any).hash = "92f8732ee2cb13fd54f4824aea8e2fe6";

export default node;
